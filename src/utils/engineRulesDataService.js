/** Runtime fetch for engine rules — keeps ~204KB metadata out of the main bundle. */

let indexPromise = null;
let fullPromise = null;

export function fetchEngineRulesIndex() {
  if (!indexPromise) {
    indexPromise = fetch(`${process.env.PUBLIC_URL || ""}/engine-rules-index.json`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load engine-rules-index.json");
        return r.json();
      })
      .catch((err) => {
        indexPromise = null;
        throw err;
      });
  }
  return indexPromise;
}

export function fetchEngineRulesFull() {
  if (!fullPromise) {
    fullPromise = fetch(`${process.env.PUBLIC_URL || ""}/engine-rules-metadata.json`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load engine-rules-metadata.json");
        return r.json();
      })
      .catch((err) => {
        fullPromise = null;
        throw err;
      });
  }
  return fullPromise;
}

/** Map slim index row → shape expected by library table helpers. */
export function indexRowToRule(row) {
  return {
    id: row.id,
    kebabId: row.id,
    title: row.title,
    description: "",
    impact: row.impact,
    refs: (row.wcag || []).map((w) => ({ type: "WCAG", id: w.id, level: w.level })),
  };
}
