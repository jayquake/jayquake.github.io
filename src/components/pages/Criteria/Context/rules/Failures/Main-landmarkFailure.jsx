/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): region-main-content
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Context: Main Landmark - Failure";

const MainlandmarkFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="context-main-landmark-failure-failure-1"
          data-atomic-source="region-main-content/aria-hidden-single-main-element"
          dangerouslySetInnerHTML={{
            __html: `<main aria-hidden="true">Main content</main>`,
          }}
        />
        <div
          className="list-item"
          id="context-main-landmark-failure-failure-2"
          data-atomic-source="region-main-content/display-none-single-main-element"
          dangerouslySetInnerHTML={{
            __html: `<main style="display: none">Main content</main>`,
          }}
        />
        <div
          className="list-item"
          id="context-main-landmark-failure-failure-3"
          data-atomic-source="region-main-content/non-visible-multiple-main-elements"
          dangerouslySetInnerHTML={{
            __html: `<div role="main" style="display: none">Some main content</div>
<div role="main" id="redundant-1" aria-hidden="true">Some main content</div>
<div role="main" id="redundant-2" style="visibility: hidden">Some main content</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-main-landmark-failure-failure-4"
          data-atomic-source="region-main-content/single-element-without-indication-of-being-main"
          dangerouslySetInnerHTML={{
            __html: `<div>Main content</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-main-landmark-failure-failure-5"
          data-atomic-source="region-main-content/visibility-hidden-single-main-element"
          dangerouslySetInnerHTML={{
            __html: `<main style="visibility: hidden">Main content</main>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MainlandmarkFailure;
