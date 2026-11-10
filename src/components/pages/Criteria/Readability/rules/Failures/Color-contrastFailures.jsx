/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): color-contrast
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Readability: Color Contrast - Failure";

const ColorcontrastFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="readability-color-contrast-failure-failure-1"
          data-atomic-source="color-contrast/div-with-background-black-and-color-black"
          dangerouslySetInnerHTML={{
            __html: `<div style="background-color: black; color: black">Content</div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-color-contrast-failure-failure-2"
          data-atomic-source="color-contrast/div-with-background-transparent-and-color-white-and-parent-transparent"
          dangerouslySetInnerHTML={{
            __html: `<div style="background-color: transparent">
  <div id="test-subject" style="background-color: transparent; color: white">Content</div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-color-contrast-failure-failure-3"
          data-atomic-source="color-contrast/div-with-background-transparent-and-color-white"
          dangerouslySetInnerHTML={{
            __html: `<div style="background-color: transparent; color: white">Content</div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-color-contrast-failure-failure-4"
          data-atomic-source="color-contrast/div-with-background-white-and-color-white"
          dangerouslySetInnerHTML={{
            __html: `<div style="background-color: white; color: white">Content</div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-color-contrast-failure-failure-5"
          data-atomic-source="color-contrast/div-with-font-size-16px-with-ratio-3.5"
          dangerouslySetInnerHTML={{
            __html: `<div style="font-size: 16px; color: #000000; background-color: #C80909;">Text Contrast Ratio 3.49:1</div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-color-contrast-failure-failure-6"
          data-atomic-source="color-contrast/lab-color-background-contrast-too-dark"
          dangerouslySetInnerHTML={{
            __html: `<style>
    :root {
        --color-wicked-black: lab(14.9042% -15.339 28.5532);
        --color-noir-black: lab(0% 0 0);
    }

    .bg-wicked-black {
        background-color: var(--color-wicked-black);
    }

    .text-noir-black {
        color: var(--color-noir-black);
    }
</style>

<div class="bg-wicked-black text-noir-black">
  “Dressing in one color—head-to-toe—is less complicated... it is just bold and fierce, for lack of a better word.”
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default ColorcontrastFailures;
