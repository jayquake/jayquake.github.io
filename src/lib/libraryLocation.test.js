import ENGINE_RULE_CATEGORIES from "../data/engine-rule-categories";
import {
  DEFAULT_QUERY,
  activeFilterCount,
  applyChange,
  engineRule,
  exampleHref,
  homeHref,
  parseQuery,
  parseRoute,
  parseSlug,
  ruleHref,
  ruleLabHref,
  serializeQuery,
} from "./libraryLocation";

const CATEGORY = ENGINE_RULE_CATEGORIES[0].id;
const legacy = { type: "legacy", criteria: "forms", route: "form-labels" };

describe("parseSlug", () => {
  test.each([
    ["alt-misuse", { id: "alt-misuse", variant: null }],
    ["alt-misuse_success", { id: "alt-misuse", variant: "success" }],
    ["alt-misuse_failure", { id: "alt-misuse", variant: "failure" }],
    ["captcha-accessible-provider-2.0_success", { id: "captcha-accessible-provider-2.0", variant: "success" }],
    ["some_rule_failure", { id: "some_rule", variant: "failure" }],
    ["", { id: "", variant: null }],
    [undefined, { id: "", variant: null }],
  ])("%s", (slug, expected) => {
    expect(parseSlug(slug)).toEqual(expected);
  });
});

describe("parseRoute", () => {
  test.each([
    ["/", { kind: "home" }],
    ["/engine/library", { kind: "home" }],
    ["/engine/alt-misuse", { kind: "rule", rule: engineRule("alt-misuse"), variant: null }],
    ["/engine/alt-misuse/", { kind: "rule", rule: engineRule("alt-misuse"), variant: null }],
    ["/engine/alt-misuse_failure", { kind: "example", rule: engineRule("alt-misuse"), variant: "failure" }],
    ["/forms/form-labels", { kind: "rule", rule: legacy, variant: null }],
    ["/forms/form-labels_success", { kind: "example", rule: legacy, variant: "success" }],
    ["/rule-lab", { kind: "other" }],
    ["/test-runner/history", { kind: "other" }],
    ["/notacriteria/thing", { kind: "other" }],
    ["/engine/a/b", { kind: "other" }],
  ])("%s", (pathname, expected) => {
    expect(parseRoute(pathname)).toEqual(expected);
  });
});

describe("parseQuery", () => {
  test("defaults when empty", () => {
    expect(parseQuery("")).toEqual(DEFAULT_QUERY);
  });

  test("reads every param", () => {
    expect(parseQuery(`?q=%20label%20&category=${CATEGORY}&impact=Serious&level=aa&wcag=2.4.4&legacy=0&detail=closed`)).toEqual({
      q: "label",
      filters: { category: CATEGORY, impact: "serious", level: "AA", wcag: "2.4.4", legacy: "no" },
      detailOpen: false,
    });
  });

  test("invalid values fall back to all", () => {
    expect(parseQuery("?category=nope&impact=huge&level=Z&wcag=abc&legacy=maybe&detail=open").filters).toEqual(
      DEFAULT_QUERY.filters
    );
    expect(parseQuery("?detail=open").detailOpen).toBe(true);
  });
});

describe("serializeQuery", () => {
  test("omits defaults", () => {
    expect(serializeQuery(DEFAULT_QUERY)).toBe("");
  });

  test("writes only detail=closed, never detail=open", () => {
    expect(serializeQuery({ ...DEFAULT_QUERY, detailOpen: false })).toBe("?detail=closed");
    expect(serializeQuery({ ...DEFAULT_QUERY, detailOpen: true }, "?detail=open")).toBe("");
  });

  test("preserves foreign params from the base search", () => {
    expect(serializeQuery({ ...DEFAULT_QUERY, q: "x" }, "?view=tree&q=old")).toBe("?view=tree&q=x");
  });

  test("round-trips through parseQuery", () => {
    const query = {
      q: "color contrast",
      filters: { category: CATEGORY, impact: "minor", level: "AAA", wcag: "1.4.3", legacy: "yes" },
      detailOpen: false,
    };
    expect(parseQuery(serializeQuery(query))).toEqual(query);
  });
});

describe("applyChange + activeFilterCount", () => {
  test("merges filters, replaces the rest", () => {
    const start = parseQuery("?q=a&impact=minor");
    const next = applyChange(start, { filters: { level: "A" }, q: "b" });
    expect(next).toEqual({ q: "b", filters: { ...start.filters, level: "A" }, detailOpen: true });
    expect(activeFilterCount(next.filters)).toBe(2);
  });
});

describe("hrefs", () => {
  const query = parseQuery("?q=alt&impact=minor&detail=closed");

  test("library links carry q + filters and reset detail", () => {
    expect(homeHref(query)).toBe("/?q=alt&impact=minor");
    expect(ruleHref(engineRule("alt-misuse"), query)).toBe("/engine/alt-misuse?q=alt&impact=minor");
    expect(exampleHref(engineRule("alt-misuse"), "success", query)).toBe("/engine/alt-misuse_success?q=alt&impact=minor");
  });

  test("legacy rules get legacy paths, not engine paths", () => {
    expect(ruleHref(legacy, DEFAULT_QUERY)).toBe("/forms/form-labels");
    expect(exampleHref(legacy, "failure", DEFAULT_QUERY)).toBe("/forms/form-labels_failure");
  });

  test("Rule Lab does not carry library state", () => {
    expect(ruleLabHref(engineRule("alt-misuse"))).toBe("/rule-lab?ruleId=alt-misuse&type=engine");
    expect(ruleLabHref(legacy)).toBe("/rule-lab?ruleId=form-labels&type=legacy");
  });

  test("every href parses back to the same route", () => {
    const href = exampleHref(legacy, "success", query);
    const [path, search] = href.split("?");
    expect(parseRoute(path)).toEqual({ kind: "example", rule: legacy, variant: "success" });
    expect(parseQuery(search).q).toBe("alt");
  });
});
