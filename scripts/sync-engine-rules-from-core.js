const fs = require("fs");
const path = require("path");

const AUDIT_RULES_ROOT = path.join(__dirname, "..");
const CORE_RULES_DIR =
  process.env.CORE_ENGINE_RULES ||
  path.resolve(AUDIT_RULES_ROOT, "../../../Desktop/core-engine-auditor/src/rules");
const TARGET_DIR = path.join(
  AUDIT_RULES_ROOT,
  "src/components/pages/engine-rules"
);

const AUDIT_ONLY_RULES = [
  "captcha-accessible-provider",
  "list-item-within-list",
  "navigation-submenu-discernible",
  "navigation-submenu-region",
];

const SKIP_ENTRIES = new Set(["index.ts", "category-metadata.ts"]);

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    return;
  }
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

function removeDirectory(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  fs.rmSync(dir, { recursive: true, force: true });
}

function syncRule(ruleName, stats) {
  const sourceRuleDir = path.join(CORE_RULES_DIR, ruleName);
  const targetRuleDir = path.join(TARGET_DIR, ruleName);
  const existed = fs.existsSync(targetRuleDir);

  fs.mkdirSync(targetRuleDir, { recursive: true });

  const indexSrc = path.join(sourceRuleDir, "index.ts");
  if (!fs.existsSync(indexSrc)) {
    throw new Error(`Missing index.ts for rule: ${ruleName}`);
  }
  copyFile(indexSrc, path.join(targetRuleDir, "index.ts"));

  const specSrc = path.join(sourceRuleDir, "index.spec.ts");
  const specDest = path.join(targetRuleDir, "index.spec.ts");
  if (fs.existsSync(specSrc)) {
    copyFile(specSrc, specDest);
  } else if (fs.existsSync(specDest)) {
    fs.unlinkSync(specDest);
  }

  const atomicSrc = path.join(sourceRuleDir, "atomic-tests");
  const atomicDest = path.join(targetRuleDir, "atomic-tests");
  removeDirectory(atomicDest);
  copyDirectory(atomicSrc, atomicDest);

  if (existed) {
    stats.updated += 1;
  } else {
    stats.added += 1;
  }
}

function main() {
  if (!fs.existsSync(CORE_RULES_DIR)) {
    console.error(`Core rules directory not found: ${CORE_RULES_DIR}`);
    process.exit(1);
  }

  const stats = { added: 0, updated: 0, removed: 0 };

  const coreRules = fs
    .readdirSync(CORE_RULES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const ruleName of coreRules) {
    syncRule(ruleName, stats);
  }

  copyFile(
    path.join(CORE_RULES_DIR, "interfaces.ts"),
    path.join(TARGET_DIR, "interfaces.ts")
  );
  copyFile(
    path.join(CORE_RULES_DIR, "index.ts"),
    path.join(TARGET_DIR, "index.ts")
  );

  for (const ruleName of AUDIT_ONLY_RULES) {
    const targetRuleDir = path.join(TARGET_DIR, ruleName);
    if (fs.existsSync(targetRuleDir)) {
      removeDirectory(targetRuleDir);
      stats.removed += 1;
      console.log(`Removed audit-only rule: ${ruleName}`);
    }
  }

  console.log("\nSync complete:");
  console.log(`  Source: ${CORE_RULES_DIR}`);
  console.log(`  Target: ${TARGET_DIR}`);
  console.log(`  Added:   ${stats.added}`);
  console.log(`  Updated: ${stats.updated}`);
  console.log(`  Removed: ${stats.removed}`);
  console.log(`  Total rules in core: ${coreRules.length}`);
}

main();
