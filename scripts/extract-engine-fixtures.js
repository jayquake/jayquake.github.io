/**
 * Extract inline htmlExamples content from large engine rule JSX files
 * into public/fixtures/engine/{ruleId}/{slug}.html and rewrite sources.
 *
 * Usage: node scripts/extract-engine-fixtures.js [minBytes=100000]
 */

const fs = require("fs");
const path = require("path");

const ENGINE_RULES = path.join(__dirname, "../src/components/pages/engine-rules");
const FIXTURES_ROOT = path.join(__dirname, "../public/fixtures/engine");
const minBytes = Number(process.argv[2] || 100000);

function slugify(name, index) {
  const base = (name || `example-${index}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
  return base || `example-${index}`;
}

function extractContentBlocks(source) {
  const blocks = [];
  const marker = "content: `";
  let searchFrom = 0;

  while (true) {
    const start = source.indexOf(marker, searchFrom);
    if (start === -1) break;

    const contentStart = start + marker.length;
    let pos = contentStart;
    while (pos < source.length) {
      if (source[pos] === "`" && source[pos - 1] !== "\\") break;
      pos += 1;
    }

    const content = source.slice(contentStart, pos);
    const before = source.lastIndexOf("{", start);
    const header = source.slice(before, start);
    const filenameMatch = header.match(/filename:\s*"([^"]*)"/);
    const filename = filenameMatch ? filenameMatch[1] : "";

    let blockEnd = pos + 1;
    while (blockEnd < source.length && /[\s,]/.test(source[blockEnd])) blockEnd += 1;
    if (source[blockEnd] === "}") blockEnd += 1;

    blocks.push({ filename, content, start: before, end: blockEnd });
    searchFrom = blockEnd;
  }

  return blocks;
}

function processFile(filePath) {
  const stat = fs.statSync(filePath);
  if (stat.size < minBytes) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  if (!source.includes("htmlExamples") || !source.includes("content: `")) {
    return null;
  }

  const blocks = extractContentBlocks(source);
  if (!blocks.length) return null;

  const ruleId = path.basename(path.dirname(filePath));
  const fixtureDir = path.join(FIXTURES_ROOT, ruleId);
  fs.mkdirSync(fixtureDir, { recursive: true });

  let next = "";
  let cursor = 0;
  const replacements = [];

  blocks.forEach((block, index) => {
    const slug = `${index}-${slugify(block.filename, index)}`;
    const fixtureRel = `${ruleId}/${slug}.html`;
    const outPath = path.join(FIXTURES_ROOT, fixtureRel);
    fs.writeFileSync(outPath, block.content);

    const replacement = `{ filename: ${JSON.stringify(block.filename)}, fixture: ${JSON.stringify(fixtureRel)} }`;
    next += source.slice(cursor, block.start);
    next += replacement;
    cursor = block.end;
    replacements.push({ fixtureRel, bytes: block.content.length });
  });

  next += source.slice(cursor);
  fs.writeFileSync(filePath, next);

  return {
    file: path.relative(path.join(__dirname, ".."), filePath),
    ruleId,
    fixtures: replacements,
    savedBytes: blocks.reduce((sum, b) => sum + b.content.length, 0),
  };
}

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else if (entry.name.endsWith("Success.jsx") || entry.name.endsWith("Failure.jsx")) {
      const report = processFile(full);
      if (report) results.push(report);
    }
  }
  return results;
}

const reports = walk(ENGINE_RULES);
if (!reports.length) {
  console.log(`[extract-engine-fixtures] No files >= ${minBytes} bytes with inline content.`);
} else {
  reports.forEach((r) => {
    console.log(
      `[extract-engine-fixtures] ${r.file}: ${r.fixtures.length} fixture(s), ~${(r.savedBytes / 1024).toFixed(0)}KB moved`
    );
  });
}
