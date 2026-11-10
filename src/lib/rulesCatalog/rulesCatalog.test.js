const {
  normalizeRule,
  query,
  toKebabId,
  toEngineId,
  ID_TO_KEBAB,
  isPopulated,
  resolveRule,
  indexById,
  CATEGORY_BY_KEBAB_ID,
} = require("./index");

describe("aliases", () => {
  test.each(Object.entries(ID_TO_KEBAB))("%s → %s", (id, kebab) => {
    expect(toKebabId(id)).toBe(kebab);
    expect(toEngineId(kebab)).toBe(id);
  });

  test("retired ids resolve to current kebabIds", () => {
    expect(toKebabId("interactive-not-tabbable")).toBe("tabbable-mismatch");
    expect(toKebabId("tabbable-non-interactive")).toBe("tabbable-misuse");
    expect(toKebabId("navigation-submenu-region")).toBe("menu-trigger-mismatch");
  });
});

describe("normalizeRule", () => {
  test("keeps raw and plain advice, all refs, populated flag", () => {
    const rule = normalizeRule({
      id: "list-item-missuse",
      kebabId: "list-item-misuse",
      title: "List item misuse",
      description: "Desc",
      adviceHtml: "<p>Fix it</p>",
      impact: "serious",
      refs: [
        { type: "WCAG", id: "1.3.1", level: "A", link: "https://example" },
        { type: "Best Practice", id: "bp-1", level: "", link: "" },
      ],
    });
    expect(rule.kebabId).toBe("list-item-misuse");
    expect(rule.id).toBe("list-item-missuse");
    expect(rule.advice).toBe("Fix it");
    expect(rule.adviceHtml).toBe("<p>Fix it</p>");
    expect(rule.refs).toHaveLength(2);
    expect(rule.wcag).toEqual([{ id: "1.3.1", level: "A", link: "https://example" }]);
    expect(rule.populated).toBe(true);
    expect(rule.category).toBe(CATEGORY_BY_KEBAB_ID["list-item-misuse"]);
    expect(rule.detailUrl).toBe("/engine/list-item-misuse");
  });

  test("stubs are not populated", () => {
    const rule = normalizeRule({
      id: "color-contrast",
      kebabId: "color-contrast",
      title: "",
      description: "",
      adviceHtml: "",
      refs: [],
    });
    expect(isPopulated(rule)).toBe(false);
    expect(rule.populated).toBe(false);
  });

  test("dialog-modal-discernible lands in interactive-widgets", () => {
    const rule = normalizeRule({
      id: "dialog-modal-discernible",
      kebabId: "dialog-modal-discernible",
      title: "Dialog modal discernible",
      description: "x",
      refs: [],
    });
    expect(rule.category).toBe("interactive-widgets");
  });
});

describe("query", () => {
  const rules = [
    normalizeRule({
      id: "alt-misuse",
      kebabId: "alt-misuse",
      title: "Alt misuse",
      description: "Images need good alt",
      adviceHtml: "Use alt",
      impact: "critical",
      refs: [{ type: "WCAG", id: "1.1.1", level: "A", link: "" }],
    }),
    normalizeRule({
      id: "image-discernible",
      kebabId: "image-discernible",
      title: "Image discernible",
      description: "Something about images",
      adviceHtml: "",
      impact: "serious",
      refs: [{ type: "WCAG", id: "1.1.1", level: "A", link: "" }],
    }),
    normalizeRule({
      id: "color-contrast",
      kebabId: "color-contrast",
      title: "",
      description: "",
      refs: [],
    }),
  ];

  test("hides stubs by default and ranks id/title hits first", () => {
    const { rules: hit } = query(rules, {
      q: "alt-misuse",
      filters: { category: "all", impact: "all", level: "all", wcag: "all", legacy: "all" },
    });
    expect(hit.map((r) => r.kebabId)).toEqual(["alt-misuse"]);
    expect(hit.every((r) => r.populated)).toBe(true);
  });

  test("facets include levels and criteria from the pool", () => {
    const { facets } = query(rules, { q: "", filters: {} });
    expect(facets.levels).toContain("A");
    expect(facets.criteria).toContain("1.1.1");
  });

  test("includeStubs shows metadata-only rules", () => {
    const { rules: hit } = query(
      rules,
      { q: "color-contrast", filters: {} },
      { includeStubs: true }
    );
    expect(hit.map((r) => r.kebabId)).toEqual(["color-contrast"]);
  });

  test("filters by impact and category", () => {
    const { rules: hit } = query(rules, {
      q: "",
      filters: { category: "images-media", impact: "critical", level: "all", wcag: "all", legacy: "all" },
    });
    expect(hit.map((r) => r.kebabId)).toEqual(["alt-misuse"]);
  });
});

describe("resolveRule / indexById", () => {
  test("resolves both engine id and kebabId", () => {
    const rule = normalizeRule({
      id: "breadcrumbs-in-nav",
      kebabId: "breadcrumbs-nav",
      title: "Breadcrumbs nav",
      description: "x",
      refs: [],
    });
    const byId = indexById([rule]);
    expect(resolveRule(byId, "breadcrumbs-in-nav").kebabId).toBe("breadcrumbs-nav");
    expect(resolveRule(byId, "breadcrumbs-nav").id).toBe("breadcrumbs-in-nav");
  });
});

describe("engine id redirects", () => {
  const redirects = require("../../data/engine-id-redirects.json");

  test.each(Object.entries(ID_TO_KEBAB))(
    "/engine/%s redirects to /engine/%s",
    (id, kebab) => {
      expect(redirects[`/engine/${id}`]).toBe(`/engine/${kebab}`);
      expect(redirects[`/engine/${id}_success`]).toBe(`/engine/${kebab}_success`);
      expect(redirects[`/engine/${id}_failure`]).toBe(`/engine/${kebab}_failure`);
    }
  );
});
