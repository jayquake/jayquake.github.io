/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): page-meta-viewport-valid, page-meta-viewport
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Document: Viewport Scalability - Failure";

const ViewportscalabilityFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="document-viewport-scalability-failure-failure-1"
          data-atomic-source="page-meta-viewport-valid/meta-no-content"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
    <meta name="viewport" >
</head>
<body>
</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-viewport-scalability-failure-failure-2"
          data-atomic-source="page-meta-viewport-valid/meta-viewport-content-is-empty-string"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="" />
  </head>
  <body></body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-viewport-scalability-failure-failure-3"
          data-atomic-source="page-meta-viewport-valid/meta-viewport-content-with-maximum-scale-less-than-2"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.5" />
  </head>
  <body></body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-viewport-scalability-failure-failure-4"
          data-atomic-source="page-meta-viewport-valid/meta-viewport-content-with-user-scalable-no"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head>
    <!-- mobile viewport meta tab -->
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
  </head>
  <body></body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-viewport-scalability-failure-failure-5"
          data-atomic-source="page-meta-viewport/page-with-no-meta"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
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

export default ViewportscalabilityFailure;
