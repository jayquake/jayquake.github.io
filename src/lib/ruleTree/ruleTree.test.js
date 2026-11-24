import {
  DEFAULT_EXPANDED,
  EXPANDED_STORAGE_KEY,
  RULE_ACTIONS,
  activeAncestors,
  activeRuleOf,
  buildRuleTree,
  healthFromResults,
  loadExpanded,
  orderLegacyCriteria,
  saveExpanded,
} from ".";
import { DEFAULT_QUERY, engineRule, exampleHref, ruleHref, ruleLabHref } from "../libraryLocation";
import legacyCriteria from "../../data/legacy-criteria.json";
import { legacyCriteriaColor } from "./legacyCriteriaColors";

const { CATEGORIES } = require("../rulesCatalog");

const hrefs = {
  rule: (r) => ruleHref(r, DEFAULT_QUERY),
  example: (r, v) => exampleHref(r, v, DEFAULT_QUERY),
  ruleLab: (r) => ruleLabHref(r),
};

const engineCategories = [
  { id: "aria", label: "ARIA", icon: "Accessibility", color: "#000", rules: ["alt-misuse", "stub-rule", "aria-hidden"] },
  { id: "forms", label: "Forms", icon: "EditNote", color: "#111", rules: ["form-label"] },
];
const populatedIds = new Set(["alt-misuse", "aria-hidden", "form-label"]);
const titles = { "alt-misuse": "Alt text misuse", "aria-hidden": "Hidden focusables", "form-label": "Form labels" };
const engineTitle = (id) => titles[id] || id;

const legacyRules = [
  { route: "form-labels", name: "Form Labels", criteria: "forms" },
  { route: "alt-text", name: "Alt Text", criteria: "Graphics" },
  { route: "mystery", name: "Mystery", criteria: "zzz-new" },
  { route: "skip-link", name: "Skip Link", criteria: "keyboard" },
];
const entries = [
  { id: "graphics", label: "Graphics", order: 0 },
  { id: "forms", label: "Forms", order: 1 },
  { id: "keyboard", label: "Keyboard", order: 2 },
];

const location = { pathname: "/", search: "" };

function tree(overrides = {}) {
  return buildRuleTree({
    engineCategories,
    populatedIds,
    engineTitle,
    legacyRules,
    legacyCriteria: entries,
    hrefs,
    location,
    ...overrides,
  });
}

describe("buildRuleTree: engine tier", () => {
  test("excludes stub rules and counts match", () => {
    const [engine] = tree();
    expect(engine.count).toBe(3);
    const ids = engine.categories.flatMap((c) => c.rules.map((r) => r.id));
    expect(ids).toEqual(["alt-misuse", "aria-hidden", "form-label"]);
    expect(engine.categories.reduce((n, c) => n + c.count, 0)).toBe(engine.count);
  });

  test("engine rule node: id label, title tooltip, href", () => {
    const rule = tree()[0].categories[0].rules[0];
    expect(rule).toMatchObject({
      key: "rule-engine-alt-misuse",
      label: "alt-misuse",
      title: "Alt text misuse",
      href: "/engine/alt-misuse",
      health: "gray",
      active: false,
      showActions: false,
    });
  });

  test("search uses catalog hits and prunes empty categories", () => {
    const [engine] = tree({ search: "x", engineSearchHits: new Set(["form-label"]) });
    expect(engine.categories.map((c) => c.id)).toEqual(["forms"]);
    expect(engine.categories[0].count).toBe(1);
    expect(engine.count).toBe(3);
  });

  test("empty categories stay when not searching", () => {
    const [engine] = tree({ populatedIds: new Set(["alt-misuse"]) });
    expect(engine.categories.map((c) => [c.id, c.count])).toEqual([["aria", 1], ["forms", 0]]);
  });

  test("real catalog categories: every tree leaf is populated", () => {
    const all = CATEGORIES.flatMap((c) => c.rules);
    const pop = new Set(all.slice(0, all.length - 5));
    const [engine] = buildRuleTree({ engineCategories: CATEGORIES, populatedIds: pop, hrefs, location });
    expect(engine.categories.reduce((n, c) => n + c.count, 0)).toBe(pop.size);
  });
});

describe("buildRuleTree: legacy tier", () => {
  test("orders criteria by entries, unknown appended, count is the rule total", () => {
    const [, legacy] = tree();
    expect(legacy.count).toBe(4);
    expect(legacy.categories.map((c) => [c.id, c.label])).toEqual([
      ["graphics", "Graphics"],
      ["forms", "Forms"],
      ["keyboard", "Keyboard"],
      ["zzz-new", "Zzz New"],
    ]);
    expect(legacy.categories[0].color).toBe(legacyCriteriaColor("graphics"));
  });

  test("count is 0 while legacy rules are loading", () => {
    expect(tree({ legacyRules: [] })[1].count).toBe(0);
  });

  test("legacy rule node: name label, route title, criteria href", () => {
    const rule = tree()[1].categories[1].rules[0];
    expect(rule).toMatchObject({
      key: "rule-legacy-form-labels",
      label: "Form Labels",
      title: "form-labels",
      href: "/forms/form-labels",
    });
  });

  test("search is a substring match on route and name", () => {
    const [, legacy] = tree({ search: "skip" });
    expect(legacy.categories.map((c) => c.id)).toEqual(["keyboard"]);
    const [, byName] = tree({ search: "alt text" });
    expect(byName.categories.map((c) => c.id)).toEqual(["graphics"]);
  });

  test("real criteria file has ordered entries for every criterion", () => {
    expect(legacyCriteria.entries.map((e) => e.id).sort()).toEqual([...legacyCriteria.criteria].sort());
    const ordered = orderLegacyCriteria(
      legacyCriteria.criteria.map((c) => ({ route: `r-${c}`, criteria: c })),
      legacyCriteria.entries
    );
    expect(ordered[0].id).toBe("graphics");
  });
});

describe("active rule and actions", () => {
  test("active engine rule shows actions and active example", () => {
    const loc = { pathname: "/engine/alt-misuse_failure", search: "" };
    const rule = tree({ activeRule: engineRule("alt-misuse"), location: loc }).at(0).categories[0].rules[0];
    expect(rule.active).toBe(true);
    expect(rule.showActions).toBe(true);
    expect(rule.actions.map((a) => [a.key, a.active])).toEqual([
      ["success", false],
      ["failure", true],
      ["rule-lab", false],
    ]);
  });

  test("three actions, Rule Lab only once", () => {
    expect(RULE_ACTIONS.map((a) => a.key)).toEqual(["success", "failure", "rule-lab"]);
    const rule = tree().at(0).categories[0].rules[0];
    expect(rule.actions.map((a) => a.href)).toEqual([
      "/engine/alt-misuse_success",
      "/engine/alt-misuse_failure",
      "/rule-lab?ruleId=alt-misuse&type=engine",
    ]);
  });

  test("manually opened rule shows actions", () => {
    const rule = tree({ openRules: new Set(["rule-engine-aria-hidden"]) }).at(0).categories[0].rules[1];
    expect(rule.open).toBe(true);
    expect(rule.showActions).toBe(true);
  });

  test("legacy active rule must match criteria", () => {
    const active = { type: "legacy", criteria: "keyboard", route: "form-labels" };
    const rule = tree({ activeRule: active }).at(1).categories[1].rules[0];
    expect(rule.active).toBe(false);
  });

  test("activeRuleOf", () => {
    expect(activeRuleOf({ kind: "home" })).toBeNull();
    expect(activeRuleOf({ kind: "example", rule: engineRule("x") })).toEqual(engineRule("x"));
  });

  test("activeAncestors", () => {
    expect(activeAncestors(engineRule("form-label"), engineCategories)).toEqual(["tier-engine", "cat-engine-forms"]);
    expect(activeAncestors(engineRule("nope"), engineCategories)).toEqual([]);
    expect(activeAncestors({ type: "legacy", criteria: "forms", route: "x" }, engineCategories)).toEqual([
      "tier-legacy",
      "cat-legacy-forms",
    ]);
    expect(activeAncestors(null, engineCategories)).toEqual([]);
  });

  test("expanded flags come from state", () => {
    const [engine, legacy] = tree({ expanded: { "tier-engine": true, "cat-engine-forms": true } });
    expect(engine.expanded).toBe(true);
    expect(legacy.expanded).toBe(false);
    expect(engine.categories.map((c) => c.expanded)).toEqual([false, true]);
  });
});

describe("healthFromResults", () => {
  const audit = (summary) => ({ audit: { summary: { critical: 0, serious: 0, moderate: 0, minor: 0, ...summary } } });
  test("red, yellow, green", () => {
    const map = new Map([
      ["a", [audit({ minor: 1 }), audit({ serious: 2 })]],
      ["b", [audit({ moderate: 1 }), {}]],
      ["c", [audit({})]],
    ]);
    expect(healthFromResults(map)).toEqual({ a: "red", b: "yellow", c: "green" });
  });

  test("feeds rule nodes", () => {
    const rule = tree({ health: { "alt-misuse": "red" } }).at(0).categories[0].rules[0];
    expect(rule.health).toBe("red");
  });
});

describe("expanded persistence", () => {
  function memoryStorage(initial) {
    const data = { ...initial };
    return {
      getItem: (k) => (k in data ? data[k] : null),
      setItem: (k, v) => {
        data[k] = v;
      },
      data,
    };
  }

  test("defaults when empty or corrupt", () => {
    expect(loadExpanded(memoryStorage())).toEqual(DEFAULT_EXPANDED);
    expect(loadExpanded(memoryStorage({ [EXPANDED_STORAGE_KEY]: "{bad" }))).toEqual(DEFAULT_EXPANDED);
    expect(loadExpanded(null)).toEqual(DEFAULT_EXPANDED);
  });

  test("drops rule-* keys on load and save", () => {
    const stored = { "tier-legacy": true, "cat-engine-forms": true, "rule-engine-x": true, "tier-engine": false };
    const storage = memoryStorage({ [EXPANDED_STORAGE_KEY]: JSON.stringify(stored) });
    expect(loadExpanded(storage)).toEqual({ "tier-engine": false, "tier-legacy": true, "cat-engine-forms": true });

    saveExpanded(storage, { "tier-engine": true, "rule-legacy-y": true });
    expect(JSON.parse(storage.data[EXPANDED_STORAGE_KEY])).toEqual({ "tier-engine": true });
  });
});
