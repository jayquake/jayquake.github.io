#!/usr/bin/env node
/**
 * Split delta into batch JSON files for rate-limited MCP/REST apply.
 * Output: scripts/qase/batches/updates-001.json, creates-001.json, ...
 */
const fs = require("fs");
const path = require("path");

const BATCH = 5;
const delta = JSON.parse(
  fs.readFileSync(path.join(__dirname, "engine-rules-delta.json"), "utf-8")
);
const outDir = path.join(__dirname, "batches");
fs.mkdirSync(outDir, { recursive: true });

function writeBatches(entries, prefix) {
  for (let i = 0; i < entries.length; i += BATCH) {
    const batch = entries.slice(i, i + BATCH);
    const n = String(Math.floor(i / BATCH) + 1).padStart(3, "0");
    fs.writeFileSync(
      path.join(outDir, `${prefix}-${n}.json`),
      JSON.stringify(batch, null, 2)
    );
  }
  return Math.ceil(entries.length / BATCH);
}

const updates = delta.delta.filter((e) => e.action === "update");
const creates = delta.delta.filter((e) => e.action === "create");

const uBatches = writeBatches(updates, "updates");
const cBatches = writeBatches(creates, "creates");

console.log(`Wrote ${uBatches} update batches, ${cBatches} create batches → ${outDir}`);
