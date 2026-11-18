#!/usr/bin/env node
/**
 * Non-destructive check for AccessFlow SDK local env (never prints secrets).
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(root, ".env");

const requiredAudit = ["AF_NODE_PACKAGE_KEY", "ACCESSFLOW_SDK_API_KEY"];
const requiredRegistry = [
  "GCP_SDK_NPM_REGISTRY_URL",
  "ACCESSFLOW_NPM_REGISTRY_TOKEN",
];

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  const out = {};
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    out[trimmed.slice(0, eq)] = trimmed.slice(eq + 1);
  }
  return out;
}

const fileEnv = parseEnvFile(envPath);
const env = { ...fileEnv, ...process.env };

let ok = true;

const hasAudit = requiredAudit.some((k) => env[k]?.trim());
if (!hasAudit) {
  console.error(
    "Missing audit key: set AF_NODE_PACKAGE_KEY or ACCESSFLOW_SDK_API_KEY in .env",
  );
  ok = false;
} else {
  console.log("Audit API key: set");
}

const hasRegistry = requiredRegistry.every((k) => env[k]?.trim());
if (!hasRegistry) {
  console.warn(
    "Registry install: GCP_SDK_NPM_REGISTRY_URL and/or ACCESSFLOW_NPM_REGISTRY_TOKEN unset — using file:…tgz is fine",
  );
} else {
  console.log("GCP npm registry: configured");
}

const tgz = resolve(
  root,
  "sdk/packages/node/acsbe-accessflow-sdk-1.3.1.tgz",
);
if (existsSync(tgz)) {
  console.log("Local SDK tarball: present");
} else {
  console.warn("Local SDK tarball: missing (registry install required)");
}

if (env.BASE_URL && !env.BASE_URL.includes("3003")) {
  console.warn(
    `BASE_URL=${env.BASE_URL} — Playwright uses :3003 via npm start; set BASE_URL=http://localhost:3003 for Selenium`,
  );
}

process.exit(ok ? 0 : 1);