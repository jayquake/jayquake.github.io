#!/usr/bin/env node
/**
 * Output case IDs for create_plan from intended + qaseIdByRule mapping.
 * After creates, re-fetch suite and update qaseIdByRule, or pass --delta with create results.
 *
 * Usage: node generate-engine-rules-plan-cases.js
 */
const fs = require("fs");
const path = require("path");

const intendedPath = path.join(__dirname, "engine-rules-intended.json");
const intended = JSON.parse(fs.readFileSync(intendedPath, "utf-8"));

const ruleIds = Object.keys(intended.cases).sort();
const mapped = intended.qaseIdByRule || {};

const caseIds = [];
const missing = [];

for (const ruleId of ruleIds) {
  if (mapped[ruleId]) {
    caseIds.push(mapped[ruleId]);
  } else {
    missing.push(ruleId);
  }
}

console.log(
  JSON.stringify(
    {
      title: "Unified Engine Rules — E2E Example Coverage (167 rules)",
      description:
        "Complete RAIDEN engine rule library coverage with atomic-test-backed pass/fail examples as source of truth for AccessFlow issue generation.",
      suiteId: 902,
      mappedCaseIds: caseIds.length,
      missingRuleIds: missing.length,
      cases: caseIds,
      missing,
    },
    null,
    2
  )
);
