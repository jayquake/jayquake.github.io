/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): heading-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Headings: Empty Headings - Failure";

const EmptyheadingsFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="headings-empty-headings-failure-failure-1"
          data-atomic-source="heading-discernible/empty-heading"
          dangerouslySetInnerHTML={{
            __html: `<h4 class="f-agent__info-subtitle"></h4>`,
          }}
        />
        <div
          className="list-item"
          id="headings-empty-headings-failure-failure-2"
          data-atomic-source="heading-discernible/heading-wtih-image-content-and-no-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<h1><img src="path/to/graphic/cotnent" /></h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-empty-headings-failure-failure-3"
          data-atomic-source="heading-discernible/link-no-content"
          dangerouslySetInnerHTML={{
            __html: `<h1 style="width:100px;height:100px;"></h1>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default EmptyheadingsFailure;
