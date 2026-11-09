/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): page-title, page-title-valid
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Document: Page Title - Failure";

const PageTitleFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="document-page-title-failure-failure-1"
          data-atomic-source="page-title/page-no-title-element"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
</head>
<body>
</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-page-title-failure-failure-2"
          data-atomic-source="page-title-valid/page-title-one-word"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
    <title>ONEWORD</title>
</head>
<body>
</body>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default PageTitleFailure;
