/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): region-main-content
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Context: Main Landmark - Success";

const MainlandmarkSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="context-main-landmark-success-success-1"
          data-atomic-source="region-main-content/multiple-elements-with-role-main"
          dangerouslySetInnerHTML={{
            __html: `<div role="main" id="first">Some main content</div>
<div role="main" id="second">Some main content</div>
<div role="main" id="third">Some main content</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-main-landmark-success-success-2"
          data-atomic-source="region-main-content/multiple-main-elements-and-role-main"
          dangerouslySetInnerHTML={{
            __html: `<main id="first">Main content</main>
<div role="main" id="second">Some main content</div>
<div role="main" id="third">Some main content</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-main-landmark-success-success-3"
          data-atomic-source="region-main-content/multiple-main-elements"
          dangerouslySetInnerHTML={{
            __html: `<main id="first">Some main content</main>
<main id="second">Some main content</main>
<main id="third">Some main content</main>`,
          }}
        />
        <div
          className="list-item"
          id="context-main-landmark-success-success-4"
          data-atomic-source="region-main-content/single-element-with-role-main"
          dangerouslySetInnerHTML={{
            __html: `<div role="main">Some main content</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-main-landmark-success-success-5"
          data-atomic-source="region-main-content/single-main-element"
          dangerouslySetInnerHTML={{
            __html: `<main>Some main content</main>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MainlandmarkSuccess;
