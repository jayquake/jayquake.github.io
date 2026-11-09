/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): table-column-header
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Tables: Column Table Headers - Failure";

const ColumntableheadersFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="tables-column-table-headers-failure-failure-1"
          data-atomic-source="table-column-header/table-native-tds-styled-as-headers-no-thead-or-tbody"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .test-subject {
    font-weight: bold;
  }
</style>
<table>
  <tr>
    <td class="test-subject">
      <span>First Name</span>
    </td>
    <td class="test-subject">
      <span>Last Name</span>
    </td>
    <td class="test-subject">
      <span>Company Name</span>
    </td>
    <td class="test-subject">
      <span>Job Title</span>
    </td>
  </tr>
  <tr>
    <td>John</td>
    <td>Doe</td>
    <td>Google</td>
    <td>Sales</td>
  </tr>
</table>`,
          }}
        />
        <div
          className="list-item"
          id="tables-column-table-headers-failure-failure-2"
          data-atomic-source="table-column-header/table-native-tds-styled-as-headers-with-thead"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .test-subject {
    font-weight: bold;
  }
</style>
<table>
  <thead>
    <tr>
      <td class="test-subject">
        <span>First Name</span>
      </td>
      <td class="test-subject">
        <span>Last Name</span>
      </td>
      <td class="test-subject">
        <span>Company Name</span>
      </td>
      <td class="test-subject">
        <span>Job Title</span>
      </td>
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
          id="tables-column-table-headers-failure-failure-3"
          data-atomic-source="table-column-header/table-roles-cell-role-styled-as-headers"
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
<div role="table">
  <div role="row">
    <div role="cell" class="test-subject">Header 1</div>
    <div role="cell" class="test-subject">Header 2</div>
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

export default ColumntableheadersFailure;
