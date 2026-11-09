/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): region-main-content-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Context: Incorrect Main Landmark - Failure";

const IncorrectmainlandmarkFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="context-incorrect-main-landmark-failure-failure-1"
          data-atomic-source="region-main-content-misuse/full-page-main"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html>
  <body style="margin: 0">
    <div role="main" style="height: 100vh">Full page content block</div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="context-incorrect-main-landmark-failure-failure-2"
          data-atomic-source="region-main-content-misuse/incorrect-main"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html>
  <body>
    <header>Header content</header>
    <main style="height: 300px">Smaller div</main>
    <div id="larger" style="height: 700px">Larger div</div>
    <footer>Footer content</footer>
  </body>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default IncorrectmainlandmarkFailures;
