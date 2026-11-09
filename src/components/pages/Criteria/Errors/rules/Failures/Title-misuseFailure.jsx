/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): no-extra-information-in-title
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Title Misuse - Failure";

const TitlemisuseFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-title-misuse-failure-failure-1"
          data-atomic-source="no-extra-information-in-title/h1-with-srVisibleText-does-not-contain-title"
          dangerouslySetInnerHTML={{
            __html: `<h1 title="test attribute" class="test" aria-label="title 1">Title</h1>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-failure-failure-2"
          data-atomic-source="no-extra-information-in-title/img-with-title-and-alt"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <img alt="A beautiful beach with clear blue water" title="info" />
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-title-misuse-failure-failure-3"
          data-atomic-source="no-extra-information-in-title/input-with-title-and-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <input title="info" aria-label="Search" />
  </body>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default TitlemisuseFailure;
