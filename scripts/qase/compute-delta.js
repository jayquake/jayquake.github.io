#!/usr/bin/env node
/**
 * Compute delta between snapshot and intended Qase case states.
 * Usage: node scripts/qase/compute-delta.js <snapshot.json> <intended.json> <output-delta.json>
 */
const fs = require("fs");

const COMPARE_FIELDS = [
  "title",
  "description",
  "preconditions",
  "postconditions",
  "severity",
  "priority",
  "type",
  "layer",
  "behavior",
  "automation",
  "status",
  "is_flaky",
  "steps_type",
  "suite_id",
  "tags",
  "custom_field",
  "steps",
  "params",
];

function stableStringify(value) {
  if (value === null || value === undefined) return String(value);
  if (typeof value !== "object") return JSON.stringify(value);
  return JSON.stringify(value, Object.keys(value).sort());
}

function fieldDiff(from, to) {
  const fromStr = stableStringify(from ?? null);
  const toStr = stableStringify(to ?? null);
  if (fromStr === toStr) return null;
  return { from, to };
}

function computeDelta(snapshot, intended) {
  const delta = [];
  let unchanged = 0;

  for (const [key, intendedCase] of Object.entries(intended.cases)) {
    const snapshotCase = snapshot.cases[key];
    if (!snapshotCase) {
      delta.push({
        key,
        action: "create",
        ruleId: intendedCase.ruleId || key,
        payload: intendedCase,
      });
      continue;
    }

    const changes = {};
    for (const field of COMPARE_FIELDS) {
      if (intendedCase[field] === undefined) continue;
      const diff = fieldDiff(snapshotCase[field], intendedCase[field]);
      if (diff) changes[field] = diff;
    }

    if (Object.keys(changes).length === 0) {
      unchanged += 1;
    } else {
      delta.push({
        key,
        action: "update",
        id: snapshotCase.id,
        ruleId: intendedCase.ruleId || key,
        changes,
        payload: intendedCase,
      });
    }
  }

  return {
    computedAt: new Date().toISOString(),
    totalCases: Object.keys(intended.cases).length,
    casesToUpdate: delta.filter((d) => d.action === "update").length,
    casesToCreate: delta.filter((d) => d.action === "create").length,
    casesUnchanged: unchanged,
    delta,
  };
}

function main() {
  const [, , snapshotPath, intendedPath, outputPath] = process.argv;
  if (!snapshotPath || !intendedPath || !outputPath) {
    console.error(
      "Usage: node compute-delta.js <snapshot.json> <intended.json> <output-delta.json>"
    );
    process.exit(1);
  }

  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf-8"));
  const intended = JSON.parse(fs.readFileSync(intendedPath, "utf-8"));
  const result = computeDelta(snapshot, intended);

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log(
    `Delta: ${result.casesToUpdate} updates, ${result.casesToCreate} creates, ${result.casesUnchanged} unchanged`
  );
}

if (require.main === module) main();

module.exports = { computeDelta, fieldDiff };
