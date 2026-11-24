import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { RENDER_FAILED_HTML, engineExampleDescriptors, legacyExamples } from "./examplePage";

describe("legacyExamples", () => {
  test("uses children marked list-item when present", () => {
    const content = (
      <div>
        <p>intro</p>
        <div className="list-item">
          <img src="a.png" alt="" />
        </div>
        <div className="x list-item">
          <button>b</button>
        </div>
      </div>
    );
    const out = legacyExamples(content, renderToStaticMarkup);
    expect(out.map((e) => e.html)).toEqual(['<div class="list-item"><img src="a.png" alt=""/></div>', '<div class="x list-item"><button>b</button></div>']);
    expect(React.isValidElement(out[0].reactContent)).toBe(true);
  });

  test("falls back to the content itself when no list-item children", () => {
    const content = (
      <div>
        <span>a</span>
      </div>
    );
    expect(legacyExamples(content, renderToStaticMarkup).map((e) => e.html)).toEqual(["<div><span>a</span></div>"]);
  });

  test("fragments and arrays: every child, strings kept as-is", () => {
    const content = ["<b>raw</b>", <i key="i">x</i>];
    expect(legacyExamples(content, renderToStaticMarkup).map((e) => e.html)).toEqual(["<b>raw</b>", "<i>x</i>"]);
  });

  test("render failure yields placeholder html", () => {
    const out = legacyExamples(<p>x</p>, () => {
      throw new Error("boom");
    });
    expect(out[0].html).toBe(RENDER_FAILED_HTML);
  });
});

describe("engineExampleDescriptors", () => {
  test("strings, inline content and fixtures", () => {
    expect(
      engineExampleDescriptors(["<a>", { filename: "f.html", content: "<b>" }, { filename: "g.html", fixture: "x/g.html" }, {}])
    ).toEqual([
      { filename: null, html: "<a>", fixture: null },
      { filename: "f.html", html: "<b>", fixture: null },
      { filename: "g.html", html: null, fixture: "x/g.html" },
      { filename: null, html: "", fixture: null },
    ]);
  });

  test("missing input", () => {
    expect(engineExampleDescriptors(undefined)).toEqual([]);
  });
});
