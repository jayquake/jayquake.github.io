/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): heading-mismatch
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Headings: Untagged Headings - Failure";

const UntaggedheadingsFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="headings-untagged-headings-failure-failure-1"
          data-atomic-source="heading-mismatch/perceivable-heading-no-role-heading"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <style>
      body {
        font-size: 16px;
        font-weight: 400;
      }
      .text-xl {
        font-size: 20px;
        font-weight: 400;
      }
    </style>

    <div class="text-xl">Big Heading</div>
    <p>Regular body text</p>
  </body>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default UntaggedheadingsFailures;
