#!/usr/bin/env node
/**
 * List duplicate Unified Engine case IDs to delete (not in canonical map).
 * Canonical = legacy IDs + creates from engine-rules-apply-results.json
 */
const fs = require("fs");
const path = require("path");

const apply = JSON.parse(
  fs.readFileSync(path.join(__dirname, "engine-rules-apply-results.json"), "utf-8")
);
const { LEGACY_QASE_TO_RULE } = require("./lib/legacy-case-mapping");

const canonical = new Set([
  2969, // skipped but valid
  ...apply.updatesApplied,
  ...apply.updatesSkipped,
  ...apply.createsApplied.map((c) => c.id),
]);

// Pass unified-engine case list via stdin JSON { entities: [...] }
let input = "";
process.stdin.on("data", (c) => (input += c));
process.stdin.on("end", () => {
  const data = JSON.parse(input || "{}");
  const entities = data.entities || [];
  const dupes = entities
    .filter((e) => e.title?.startsWith("Unified Engine:") && !canonical.has(e.id))
    .map((e) => ({ id: e.id, title: e.title.slice(0, 60) }))
    .sort((a, b) => a.id - b.id);

  console.log(
    JSON.stringify(
      {
        canonicalCount: canonical.size,
        duplicateCount: dupes.length,
        duplicates: dupes,
        deleteIds: dupes.map((d) => d.id),
      },
      null,
      2
    )
  );
});
