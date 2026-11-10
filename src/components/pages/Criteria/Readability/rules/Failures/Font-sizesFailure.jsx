/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): font-sizes
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Readability: Font Sizes - Failure";

const FontsizesFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="readability-font-sizes-failure-failure-1"
          data-atomic-source="font-sizes/div-with-bad-font-size-in-style-attribute"
          dangerouslySetInnerHTML={{
            __html: `<div style="font-size: 10px">Some text content</div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-failure-failure-2"
          data-atomic-source="font-sizes/nested-with-bad-font-size-in-css-class"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .bad-font-size {
    font-size: 10px;
  }
</style>
<div>
  <div id="div1" style="font-size: 8px">
    This is a div with font-size 8px.
    <p id="p1">
      This is a paragraph.
      <span id="span1" class="bad-font-size"> This is a span with no style or class. </span>
    </p>
  </div>
  <div id="div2" style="font-size: 12px">
    <p id="p2" style="font-size: 6px">
      This is a paragraph with font-size 14px.
      <span id="span2" class="bad-font-size">
        <!-- This is a span with no text -->
      </span>
    </p>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-failure-failure-3"
          data-atomic-source="font-sizes/paragraph-with-bad-font-size-in-css-class"
          dangerouslySetInnerHTML={{
            __html: `<style>
.bad-font-size {
    font-size: 10px;
}
</style>
<p class="bad-font-size">Some text content</p>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-failure-failure-4"
          data-atomic-source="font-sizes/paragraph-with-bad-font-size-in-css-selector"
          dangerouslySetInnerHTML={{
            __html: `<style>
p {
    font-size: 10px;
}
</style>
<p>Some text content</p>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-failure-failure-5"
          data-atomic-source="font-sizes/paragraph-with-bad-font-size-in-style-attribute"
          dangerouslySetInnerHTML={{
            __html: `<p style="font-size: 10px;">Some text content</p>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-failure-failure-6"
          data-atomic-source="font-sizes/paragraph-with-good-font-size-in-css-class"
          dangerouslySetInnerHTML={{
            __html: `<!-- Currently multiple direct visible text sources are not supported as we can't determine which font-size to check -->

<style>
.good-font-size {
    font-size: 12px;
}
.good-font-size::before {
    content: '"before text"';
    font-size: 10px;
}
.good-font-size::after {
    content: '"after text"';
    font-size: 8px;
}
</style>
<p class="good-font-size">Some text content</p>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FontsizesFailure;
