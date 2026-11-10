/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): region-main-content-single
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Context: Multiple Main Landmarks - Success";

const MultiplemainlandmarksSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="context-multiple-main-landmarks-success-success-1"
          data-atomic-source="region-main-content-single/single-element-with-role-main"
          dangerouslySetInnerHTML={{
            __html: `<div role="main">Some main content</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-multiple-main-landmarks-success-success-2"
          data-atomic-source="region-main-content-single/single-main-element"
          dangerouslySetInnerHTML={{
            __html: `<main>Some main content</main>`,
          }}
        />
        <div
          className="list-item"
          id="context-multiple-main-landmarks-success-success-3"
          data-atomic-source="region-main-content-single/two-elements-with-role-main-one-is-display-none"
          dangerouslySetInnerHTML={{
            __html: `<div role="main">Some main content</div>
<div role="main" style="display: none">Some main content</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-multiple-main-landmarks-success-success-4"
          data-atomic-source="region-main-content-single/two-elements-with-role-main-one-is-visibility-hidden"
          dangerouslySetInnerHTML={{
            __html: `<div role="main">Some main content</div>
<div role="main" style="visibility: hidden">Some main content</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-multiple-main-landmarks-success-success-5"
          data-atomic-source="region-main-content-single/two-main-elements-one-is-display-none"
          dangerouslySetInnerHTML={{
            __html: `<main>Some main content</main>
<main style="display: none">Some main content</main>`,
          }}
        />
        <div
          className="list-item"
          id="context-multiple-main-landmarks-success-success-6"
          data-atomic-source="region-main-content-single/two-main-elements-one-is-visibility-hidden"
          dangerouslySetInnerHTML={{
            __html: `<main>Some main content</main>
<main style="visibility: hidden">Some main content</main>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MultiplemainlandmarksSuccess;
