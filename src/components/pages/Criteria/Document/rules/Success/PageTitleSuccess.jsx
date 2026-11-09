/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): page-title, page-title-valid
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Document: Page Title - Success";

const PageTitleSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="document-page-title-success-success-1"
          data-atomic-source="page-title/page-empty-title"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
    <title></title>
</head>
<body>
</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-page-title-success-success-2"
          data-atomic-source="page-title/page-title-element"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
    <title>Page Title</title>
</head>
<body>
</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-page-title-success-success-3"
          data-atomic-source="page-title-valid/page-no-title-element"
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
          id="document-page-title-success-success-4"
          data-atomic-source="page-title-valid/page-title-element"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
    <title>Descriptive Title</title>
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

export default PageTitleSuccess;
