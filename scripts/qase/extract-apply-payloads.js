#!/usr/bin/env node
/**
 * Extract MCP-ready apply payloads from delta JSON.
 * Usage: node extract-apply-payloads.js <delta.json> [--updates|--creates]
 */
const fs = require("fs");

function toCreatePayload(entry) {
  const p = entry.payload;
  return {
    title: p.title,
    description: p.description,
    preconditions: p.preconditions,
    postconditions: p.postconditions,
    severity: String(p.severity),
    priority: String(p.priority),
    type: String(p.type),
    layer: String(p.layer),
    behavior: String(p.behavior),
    automation: String(p.automation),
    status: String(p.status),
    is_flaky: p.is_flaky,
    suite_id: p.suite_id,
    steps_type: p.steps_type,
    tags: p.tags,
    custom_field: p.custom_field,
    steps: p.steps,
    params: p.params,
    ruleId: p.ruleId,
  };
}

function toUpdatePayload(entry) {
  const p = entry.payload;
  return {
    id: entry.id,
    title: p.title,
    description: p.description,
    preconditions: p.preconditions,
    postconditions: p.postconditions,
    severity: String(p.severity),
    priority: String(p.priority),
    type: String(p.type),
    layer: String(p.layer),
    behavior: String(p.behavior),
    automation: String(p.automation),
    status: String(p.status),
    is_flaky: p.is_flaky,
    steps_type: p.steps_type,
    tags: p.tags,
    custom_field: p.custom_field,
    steps: p.steps,
    params: p.params,
    ruleId: p.ruleId,
  };
}

function main() {
  const deltaPath = process.argv[2];
  const filter = process.argv[3] || "all";
  const delta = JSON.parse(fs.readFileSync(deltaPath, "utf-8"));

  let entries = delta.delta;
  if (filter === "--updates") entries = entries.filter((e) => e.action === "update");
  if (filter === "--creates") entries = entries.filter((e) => e.action === "create");

  const payloads = entries.map((e) =>
    e.action === "update" ? toUpdatePayload(e) : toCreatePayload(e)
  );

  console.log(JSON.stringify(payloads, null, 2));
}

main();
