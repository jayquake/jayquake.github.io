/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): region-main-content-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Context: Incorrect Main Landmark - Success";

const IncorrectmainlandmarkSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="context-incorrect-main-landmark-success-success-1"
          data-atomic-source="region-main-content-misuse/main-landmark-by-role-main"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html>
  <body>
    <header>Header content</header>
    <div role="main">
      <h1>Main heading</h1>
      <section style="height: 600px">Nested main content</section>
    </div>
    <footer>Footer content</footer>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="context-incorrect-main-landmark-success-success-2"
          data-atomic-source="region-main-content-misuse/main-landmark"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html>
  <body>
    <header>Header content</header>
    <div style="height: 300px">Smaller div</div>
    <main id="larger" style="height: 700px">Larger div</main>
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

export default IncorrectmainlandmarkSuccess;
