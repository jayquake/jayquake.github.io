const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const AUDIT_RULES_ROOT = path.join(__dirname, "..");
const CORE_RULES_DIR =
  process.env.CORE_ENGINE_RULES ||
  path.resolve(AUDIT_RULES_ROOT, "../../../Desktop/core-engine-auditor/src/rules");
const TARGET_DIR = path.join(
  AUDIT_RULES_ROOT,
  "src/components/pages/engine-rules"
);

const AUDIT_ONLY_RULES = new Set([
  "captcha-accessible-provider",
  "list-item-within-list",
  "navigation-submenu-discernible",
  "navigation-submenu-region",
]);

function hashFile(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function collectAtomicHtmlFiles(ruleDir) {
  const atomicDir = path.join(ruleDir, "atomic-tests");
  if (!fs.existsSync(atomicDir)) {
    return [];
  }
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(".html")) {
        files.push(path.relative(ruleDir, fullPath));
      }
    }
  };
  walk(atomicDir);
  return files.sort();
}

function main() {
  const errors = [];
  let passCount = 0;
  let failCount = 0;

  const coreRules = fs
    .readdirSync(CORE_RULES_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  for (const ruleName of coreRules) {
    const coreRuleDir = path.join(CORE_RULES_DIR, ruleName);
    const targetRuleDir = path.join(TARGET_DIR, ruleName);

    if (!fs.existsSync(targetRuleDir)) {
      errors.push(`Missing rule directory in audit-rules: ${ruleName}`);
      continue;
    }

    const coreFiles = collectAtomicHtmlFiles(coreRuleDir);
    const targetFiles = collectAtomicHtmlFiles(targetRuleDir);

    for (const relPath of coreFiles) {
      if (relPath.includes("/pass/")) {
        passCount += 1;
      } else if (relPath.includes("/fail/")) {
        failCount += 1;
      }

      const coreFile = path.join(coreRuleDir, relPath);
      const targetFile = path.join(targetRuleDir, relPath);

      if (!fs.existsSync(targetFile)) {
        errors.push(`Missing atomic test: ${ruleName}/${relPath}`);
        continue;
      }

      if (hashFile(coreFile) !== hashFile(targetFile)) {
        errors.push(`Content mismatch: ${ruleName}/${relPath}`);
      }
    }

    for (const relPath of targetFiles) {
      if (!coreFiles.includes(relPath)) {
        errors.push(`Extra atomic test in audit-rules: ${ruleName}/${relPath}`);
      }
    }
  }

  for (const ruleName of AUDIT_ONLY_RULES) {
    const targetRuleDir = path.join(TARGET_DIR, ruleName);
    if (fs.existsSync(targetRuleDir)) {
      errors.push(`Audit-only rule still present: ${ruleName}`);
    }
  }

  if (errors.length > 0) {
    console.error("Atomic test parity validation FAILED:\n");
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    process.exit(1);
  }

  console.log("Atomic test parity validation passed.");
  console.log(`  Rules checked: ${coreRules.length}`);
  console.log(`  Pass fixtures: ${passCount}`);
  console.log(`  Fail fixtures: ${failCount}`);
  console.log(`  Total fixtures: ${passCount + failCount}`);
}

main();
