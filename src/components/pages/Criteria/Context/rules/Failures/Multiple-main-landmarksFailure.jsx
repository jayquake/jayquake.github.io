/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): region-main-content-single
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Context: Multiple Main Landmarks - Failure";

const MultiplemainlandmarksFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="context-multiple-main-landmarks-failure-failure-1"
          data-atomic-source="region-main-content-single/multiple-visible-elements-with-role-main"
          dangerouslySetInnerHTML={{
            __html: `<div role="main">Some main content</div>
<div role="main" id="redundant-1">Some main content</div>
<div role="main" id="redundant-2">Some main content</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-multiple-main-landmarks-failure-failure-2"
          data-atomic-source="region-main-content-single/multiple-visible-main-elements-and-role-main"
          dangerouslySetInnerHTML={{
            __html: `<main>Main content</main>
<div role="main" id="redundant-1">Some main content</div>
<main id="redundant-2">Some main content</main>`,
          }}
        />
        <div
          className="list-item"
          id="context-multiple-main-landmarks-failure-failure-3"
          data-atomic-source="region-main-content-single/multiple-visible-main-elements"
          dangerouslySetInnerHTML={{
            __html: `<main>Main content</main>
<main id="redundant-1">Main content</main>
<main id="redundant-2">Main content</main>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MultiplemainlandmarksFailure;
