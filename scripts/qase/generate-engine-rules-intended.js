#!/usr/bin/env node
/**
 * Generate intended Qase case state for all Unified engine rules.
 * Output: scripts/qase/engine-rules-intended.json
 */
const fs = require("fs");
const path = require("path");
const { buildAllCases } = require("./lib/engine-rule-case-builder");
const { LEGACY_QASE_TO_RULE, LEGACY_EXTRA_RULES } = require("./lib/legacy-case-mapping");

const OUT = path.join(__dirname, "engine-rules-intended.json");

function main() {
  const { ruleIds, cases } = buildAllCases();

  const qaseIdByRule = {};
  for (const [qaseId, ruleId] of Object.entries(LEGACY_QASE_TO_RULE)) {
    qaseIdByRule[ruleId] = Number(qaseId);
  }

  const intendedCases = {};
  for (const ruleId of ruleIds) {
    intendedCases[ruleId] = cases[ruleId];
  }

  const summary = {
    totalRules: ruleIds.length,
    withFixtures: ruleIds.filter((id) => cases[id].fixtureSummary.total > 0).length,
    withoutFixtures: ruleIds.filter((id) => cases[id].fixtureSummary.total === 0).length,
    totalPassFixtures: ruleIds.reduce((n, id) => n + cases[id].fixtureSummary.pass, 0),
    totalFailFixtures: ruleIds.reduce((n, id) => n + cases[id].fixtureSummary.fail, 0),
    legacyMapped: Object.keys(LEGACY_QASE_TO_RULE).length,
    legacyExtraRules: Object.values(LEGACY_EXTRA_RULES).flat().length,
  };

  const output = {
    projectCode: "ACCESSFLOW",
    suiteId: 902,
    generatedAt: new Date().toISOString(),
    summary,
    qaseIdByRule,
    legacyExtraRules: LEGACY_EXTRA_RULES,
    cases: intendedCases,
  };

  fs.writeFileSync(OUT, JSON.stringify(output, null, 2));
  console.log(`Wrote ${OUT}`);
  console.log(JSON.stringify(summary, null, 2));
}

main();
