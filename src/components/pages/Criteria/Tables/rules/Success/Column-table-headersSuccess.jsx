/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): table-column-header
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Tables: Column Table Headers - Success";

const ColumntableheadersSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="tables-column-table-headers-success-success-1"
          data-atomic-source="table-column-header/table-headers-native-th"
          dangerouslySetInnerHTML={{
            __html: `<table>
  <thead>
    <tr role="row">
      <th class="test-subject">
        <span>First Name</span>
      </th>
      <th class="test-subject">
        <span>Last Name</span>
      </th>
      <th class="test-subject">
        <span>Company Name</span>
      </th>
      <th class="test-subject">
        <span>Job Title</span>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>Doe</td>
      <td>Google</td>
      <td>Sales</td>
    </tr>
  </tbody>
</table>`,
          }}
        />
        <div
          className="list-item"
          id="tables-column-table-headers-success-success-2"
          data-atomic-source="table-column-header/table-roles-headers-with-role-column-header"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .test-subject {
    font-weight: bold;
  }
  [role=table] {
    display: table;
  }

  [role=row] {
    display: table-row;
  }

  [role=row] > * {
    display: table-cell;
    border: 1px solid black;
    width: 100px;
  }
</style>
</style>
<div role="table">
  <div role="row">
    <div role="columnheader" class="test-subject">Header 1</div>
    <div role="columnheader" class="test-subject">Header 2</div>
  </div>
  <div role="row">
    <div role="cell">Row 1, Cell 1</div>
    <div role="cell">Row 1, Cell 2</div>
  </div>
  <div role="row">
    <div role="cell">Row 2, Cell 1</div>
    <div role="cell">Row 2, Cell 2</div>
  </div>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default ColumntableheadersSuccess;
