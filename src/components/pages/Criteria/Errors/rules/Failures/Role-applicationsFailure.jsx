/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): no-role-application
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Role Applications - Failure";

const RoleapplicationsFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-role-applications-failure-failure-1"
          data-atomic-source="no-role-application/element-with-role-application"
          dangerouslySetInnerHTML={{
            __html: `<html>
<head>
</head>
<body>
<div role="application">...</div>
</body>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default RoleapplicationsFailure;
