#!/usr/bin/env node
/**
 * Apply engine-rules-delta.json to Qase via REST API.
 * Requires QASE_API_TOKEN and QASE_PROJECT_CODE=ACCESSFLOW in environment.
 *
 * Usage:
 *   QASE_API_TOKEN=... QASE_PROJECT_CODE=ACCESSFLOW node apply-engine-rules-delta.js [--dry-run]
 */
const fs = require("fs");
const path = require("path");
const axios = require("axios");

const DELTA_PATH = path.join(__dirname, "engine-rules-delta.json");
const BATCH_SIZE = 5;
const BATCH_DELAY_MS = 3000;

const token = process.env.QASE_API_TOKEN;
const project = process.env.QASE_PROJECT_CODE || "ACCESSFLOW";
const dryRun = process.argv.includes("--dry-run");

if (!token && !dryRun) {
  console.error("Set QASE_API_TOKEN (and optionally QASE_PROJECT_CODE)");
  process.exit(1);
}

const baseURL = `https://api.qase.io/v1`;

function client() {
  return axios.create({
    baseURL,
    headers: { Token: token, "Content-Type": "application/json" },
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function toApiPayload(entry) {
  const p = entry.payload;
  return {
    title: p.title,
    description: p.description,
    preconditions: p.preconditions,
    postconditions: p.postconditions,
    severity: p.severity,
    priority: p.priority,
    type: p.type,
    layer: p.layer,
    behavior: p.behavior,
    automation: p.automation,
    status: p.status,
    is_flaky: p.is_flaky,
    suite_id: p.suite_id,
    steps_type: p.steps_type,
    tags: p.tags,
    custom_field: p.custom_field,
    steps: p.steps,
    params: p.params,
  };
}

async function applyUpdates(entries) {
  const api = client();
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    for (const entry of batch) {
      const payload = toApiPayload(entry);
      if (dryRun) {
        console.log(`[dry-run] UPDATE ${entry.id} ${entry.ruleId}`);
        continue;
      }
      await api.patch(`/case/${project}/${entry.id}`, payload);
      console.log(`Updated ${entry.id} (${entry.ruleId})`);
    }
    if (i + BATCH_SIZE < entries.length) await sleep(BATCH_DELAY_MS);
  }
}

async function applyCreates(entries) {
  const api = client();
  for (let i = 0; i < entries.length; i += BATCH_SIZE) {
    const batch = entries.slice(i, i + BATCH_SIZE);
    if (dryRun) {
      batch.forEach((e) => console.log(`[dry-run] CREATE ${e.ruleId}`));
      continue;
    }
    const cases = batch.map(toApiPayload);
    const res = await api.post(`/case/${project}/bulk`, { cases });
    const ids = (res.data?.result || []).map((r) => r.id).join(", ");
    console.log(`Created batch ${i / BATCH_SIZE + 1}: ${ids}`);
    await sleep(BATCH_DELAY_MS);
  }
}

async function main() {
  const delta = JSON.parse(fs.readFileSync(DELTA_PATH, "utf-8"));
  const updates = delta.delta.filter((e) => e.action === "update");
  const creates = delta.delta.filter((e) => e.action === "create");

  console.log(`Applying ${updates.length} updates, ${creates.length} creates...`);
  await applyUpdates(updates);
  await applyCreates(creates);
  console.log("Done.");
}

main().catch((err) => {
  console.error(err.response?.data || err.message);
  process.exit(1);
});
