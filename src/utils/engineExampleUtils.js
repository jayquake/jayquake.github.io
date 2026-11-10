/** @typedef {'success' | 'failure'} ExampleVariant */

/**
 * Map kebab rule id to PascalCase component base (e.g. captcha-accessible-provider-2.0 → CaptchaAccessibleProviderV2_0).
 * @param {string} ruleId
 */
export function ruleIdToComponentBase(ruleId) {
  return ruleId
    .split("-")
    .map((part) => {
      if (/^\d/.test(part) || part.includes(".")) {
        return `V${part.replace(/\./g, "_")}`;
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}

/**
 * Dynamically load one success/failure example page (small per-rule chunk).
 * @param {string} ruleId
 * @param {ExampleVariant} variant
 */
export function loadEngineExample(ruleId, variant) {
  const base = ruleIdToComponentBase(ruleId);
  const suffix = variant === "success" ? "Success" : "Failure";
  return import(
    /* webpackChunkName: "engine-[request]" */
    `../components/pages/engine-rules/${ruleId}/${base}${suffix}.jsx`
  );
}

/** Warm the module cache without rendering. */
export function prefetchEngineExample(ruleId, variant) {
  if (!ruleId || !variant) return;
  loadEngineExample(ruleId, variant).catch(() => {});
}

/** Prefetch both variants during idle time (e.g. when viewing a rule in the library). */
export function prefetchEngineExamplePair(ruleId) {
  if (!ruleId || typeof window === "undefined") return;
  const run = () => {
    prefetchEngineExample(ruleId, "success");
    prefetchEngineExample(ruleId, "failure");
  };
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 2500 });
  } else {
    setTimeout(run, 400);
  }
}
