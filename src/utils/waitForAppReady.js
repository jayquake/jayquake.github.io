import { fetchEngineRulesCatalog } from "./engineRulesDataService";

const FONT_READY_TIMEOUT_MS = 1000;

function waitForDomReady() {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }
  if (document.readyState !== "loading") {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", resolve, { once: true });
  });
}

function waitForFontsReady() {
  if (typeof document === "undefined" || !document.fonts?.ready) {
    return Promise.resolve();
  }
  return Promise.race([
    document.fonts.ready.catch(() => {}),
    new Promise((resolve) => setTimeout(resolve, FONT_READY_TIMEOUT_MS)),
  ]);
}

function waitForCatalogReady() {
  return fetchEngineRulesCatalog().catch(() => null);
}

/** Resolves when DOM, fonts, and engine-rules catalog are ready (catalog errors do not block). */
export function waitForAppReady() {
  return Promise.all([waitForDomReady(), waitForCatalogReady(), waitForFontsReady()]);
}
