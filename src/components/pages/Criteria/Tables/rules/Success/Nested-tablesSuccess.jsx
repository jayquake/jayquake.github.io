/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): table-not-nested
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Tables: Nested Tables - Success";

const NestedtablesSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="tables-nested-tables-success-success-1"
          data-atomic-source="table-not-nested/table-not-nested-multi"
          dangerouslySetInnerHTML={{
            __html: `<table>
  <th>Countries</th>
  <tr>
    <td>Finland</td>
    <td>Brazil</td>
    <td>Japan</td>
    <td>Korea</td>
  </tr>
</table>

<table>
  <th>Cities</th>
  <tr>
    <td>Bat Yam</td>
    <td>Cairo</td>
    <td>Beirut</td>
    <td>Shanghai</td>
  </tr>
</table>`,
          }}
        />
        <div
          className="list-item"
          id="tables-nested-tables-success-success-2"
          data-atomic-source="table-not-nested/table-not-nested"
          dangerouslySetInnerHTML={{
            __html: `<table>
  <th>Countries</th>
  <tr>
    <td>Finland</td>
    <td>Jerusalem</td>
    <td>Beirut</td>
    <td>Shanghai</td>
  </tr>
</table>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default NestedtablesSuccess;
