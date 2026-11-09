/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): heading-h1
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Headings: Main Heading - Success";

const MainheadingSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="headings-main-heading-success-success-1"
          data-atomic-source="heading-h1/single-aria-level-1"
          dangerouslySetInnerHTML={{
            __html: `<div role="heading" aria-level="1">Heading element</div>`,
          }}
        />
        <div
          className="list-item"
          id="headings-main-heading-success-success-2"
          data-atomic-source="heading-h1/single-h1-single-aria-level-1"
          dangerouslySetInnerHTML={{
            __html: `<h1>Test</h1>
<div role="heading" aria-level="1">Heading element</div>`,
          }}
        />
        <div
          className="list-item"
          id="headings-main-heading-success-success-3"
          data-atomic-source="heading-h1/single-h1-sr-only"
          dangerouslySetInnerHTML={{
            __html: `<style>
    body {
        font-size: 16px;
        font-weight: 400;
    }
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
</style>

<h1 class="sr-only">Heading element</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-main-heading-success-success-4"
          data-atomic-source="heading-h1/single-h1"
          dangerouslySetInnerHTML={{
            __html: `<h1>Heading element</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-main-heading-success-success-5"
          data-atomic-source="heading-h1/single-h2-aria-level-1"
          dangerouslySetInnerHTML={{
            __html: `<h2 aria-level="1">Heading element</h2>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MainheadingSuccess;
