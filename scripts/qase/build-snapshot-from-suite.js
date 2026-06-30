#!/usr/bin/env node
/**
 * Normalize a list_cases / qql_search response into snapshot format.
 * Usage: node build-snapshot-from-suite.js <raw-response.json> <output-snapshot.json>
 *
 * Also maps legacy Qase IDs to rule IDs for delta keying.
 */
const fs = require("fs");
const { LEGACY_QASE_TO_RULE } = require("./lib/legacy-case-mapping");

function normalizeCase(entity) {
  const tags = (entity.tags || []).map((t) =>
    typeof t === "string" ? t : t.title
  );
  return {
    id: entity.id,
    title: entity.title,
    description: entity.description,
    preconditions: entity.preconditions,
    postconditions: entity.postconditions,
    severity: entity.severity,
    priority: entity.priority,
    type: entity.type,
    layer: entity.layer,
    is_flaky: Boolean(entity.is_flaky),
    behavior: entity.behavior,
    automation: entity.automation,
    status: entity.status,
    suite_id: entity.suite_id,
    steps_type: entity.steps_type,
    tags,
    custom_field: entity.custom_fields
      ? Object.fromEntries(entity.custom_fields.map((f) => [f.id, f.value]))
      : {},
    steps: (entity.steps || []).map((s) => ({
      action: s.action,
      expected_result: s.expected_result,
      data: s.data || "",
      attachments: s.attachments || [],
    })),
    params: entity.params || {},
  };
}

function main() {
  const [, , inputPath, outputPath] = process.argv;
  if (!inputPath || !outputPath) {
    console.error(
      "Usage: node build-snapshot-from-suite.js <raw-response.json> <output-snapshot.json>"
    );
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(inputPath, "utf-8"));
  const entities = raw.entities || raw.cases || [];

  const cases = {};
  for (const entity of entities) {
    const ruleId = LEGACY_QASE_TO_RULE[entity.id];
    const key = ruleId || `legacy-${entity.id}`;
    cases[key] = { ...normalizeCase(entity), legacyQaseId: entity.id };
  }

  const snapshot = {
    fetchedAt: new Date().toISOString(),
    projectCode: "ACCESSFLOW",
    suiteId: 902,
    caseCount: entities.length,
    cases,
  };

  fs.writeFileSync(outputPath, JSON.stringify(snapshot, null, 2));
  console.log(`Snapshot: ${entities.length} cases → ${outputPath}`);
}

main();
