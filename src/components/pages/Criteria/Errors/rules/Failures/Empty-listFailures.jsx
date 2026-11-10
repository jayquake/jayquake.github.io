/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): list-not-empty
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Empty List - Failure";

const EmptylistFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-empty-list-failure-failure-1"
          data-atomic-source="list-not-empty/empty-lists"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <ol></ol>
    <ul></ul>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-empty-list-failure-failure-2"
          data-atomic-source="list-not-empty/role-list-without-list-items"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
  <div role="list">
  </div>
  </body>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default EmptylistFailures;
