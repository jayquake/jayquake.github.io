/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): page-meta-viewport-valid, page-meta-viewport
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Document: Viewport Scalability - Success";

const ViewportscalabilitySuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="document-viewport-scalability-success-success-1"
          data-atomic-source="page-meta-viewport-valid/meta-viewport-content-with-maximum-scale-equal-to-2"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2" />
  </head>
  <body></body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-viewport-scalability-success-success-2"
          data-atomic-source="page-meta-viewport-valid/meta-viewport-content-with-maximum-scale-greater-than-2"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3" />
  </head>
  <body></body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-viewport-scalability-success-success-3"
          data-atomic-source="page-meta-viewport-valid/meta-with-valid-value"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-viewport-scalability-success-success-4"
          data-atomic-source="page-meta-viewport/page-with-meta"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="width=device-width, initial-scale=1" />
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

export default ViewportscalabilitySuccess;
