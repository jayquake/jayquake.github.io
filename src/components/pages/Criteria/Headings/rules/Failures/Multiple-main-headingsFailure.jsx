/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): heading-single-h1
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Headings: Multiple Main Headings - Failure";

const MultiplemainheadingsFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="headings-multiple-main-headings-failure-failure-1"
          data-atomic-source="heading-single-h1/h1-and-aria-level-1"
          dangerouslySetInnerHTML={{
            __html: `<h1>Heading element</h1>
<div role="heading" aria-level="1">Heading element</div>`,
          }}
        />
        <div
          className="list-item"
          id="headings-multiple-main-headings-failure-failure-2"
          data-atomic-source="heading-single-h1/multiple-h1"
          dangerouslySetInnerHTML={{
            __html: `<h1 id="firstH1">Heading element</h1>
<h1 id="secondH1">Heading element</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-multiple-main-headings-failure-failure-3"
          data-atomic-source="heading-single-h1/multiple-role-heading-aria-level-1"
          dangerouslySetInnerHTML={{
            __html: `<div id="firstH1" role="heading" aria-level="1">Heading element</div>
<div id="secondH1" role="heading" aria-level="1">Heading element</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MultiplemainheadingsFailure;
