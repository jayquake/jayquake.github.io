#!/usr/bin/env node
/**
 * Build ruleId → Qase case ID mapping from apply results + legacy mapping.
 * Usage: node build-rule-qase-mapping.js [/tmp/qase-apply-results.json]
 */
const fs = require("fs");
const path = require("path");
const { LEGACY_QASE_TO_RULE } = require("./lib/legacy-case-mapping");

const applyPath = process.argv[2] || "/tmp/qase-apply-results.json";
const apply = JSON.parse(fs.readFileSync(applyPath, "utf-8"));

const ruleToQase = { ...Object.fromEntries(
  Object.entries(LEGACY_QASE_TO_RULE).map(([id, rule]) => [rule, Number(id)])
) };

for (const { id, title } of apply.createsApplied) {
  const m = title.match(/^Unified Engine: ([^—]+) —/);
  if (m) ruleToQase[m[1].trim()] = id;
}

const out = path.join(__dirname, "engine-rules-qase-id-map.json");
fs.writeFileSync(
  out,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      projectCode: "ACCESSFLOW",
      suiteId: 902,
      totalRules: Object.keys(ruleToQase).length,
      ruleToQase,
    },
    null,
    2
  )
);
console.log(`Wrote ${Object.keys(ruleToQase).length} mappings → ${out}`);
