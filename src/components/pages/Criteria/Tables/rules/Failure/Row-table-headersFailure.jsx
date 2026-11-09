/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): table-row-header
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Tables: Row Table Headers - Failure";

const RowtableheadersFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="tables-row-table-headers-failure-failure-1"
          data-atomic-source="table-row-header/table-roles-styled-row-headers-with-role-cell"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .test-subject {
    background-color: aqua;
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
    <div role="cell" class="test-subject">Row 1</div>
    <div role="cell">Row 1, Cell 1</div>
  </div>
  <div role="row">
    <div role="cell" class="test-subject">Row 2</div>
    <div role="cell">Row 2, Cell 1</div>
  </div>
  <div role="row">
    <div role="cell" class="test-subject">Row 3</div>
    <div role="cell">Row 3, Cell 1</div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="tables-row-table-headers-failure-failure-2"
          data-atomic-source="table-row-header/table-styled-row-headers-tagged-as-td-in-tbody"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .test-subject {
    font-weight: bold;
  }

   td, th {
     border: 1px solid black;
     width: 100px;
   }
</style>
<table>
  <tbody>
    <tr>
      <td class="test-subject">Row 1</td>
      <td>Row 1, Cell 1</td>
    </tr>
    <tr>
      <td class="test-subject">Row 2</td>
      <td>Row 2, Cell 1</td>
    </tr>
    <tr>
      <td class="test-subject">Row 3</td>
      <td>Row 3, Cell 1</td>
    </tr>
  </tbody>
</table>`,
          }}
        />
        <div
          className="list-item"
          id="tables-row-table-headers-failure-failure-3"
          data-atomic-source="table-row-header/table-styled-row-headers-tagged-as-td-no-tbody"
          dangerouslySetInnerHTML={{
            __html: `<style>
  td, th {
    border: 1px solid black;
    width: 100px;
  }

  .test-subject {
    font-weight: bold;
  }
</style>
<table>
  <tr>
    <td class="test-subject">Row 1</td>
    <td>Row 1, Cell 1</td>
  </tr>
  <tr>
    <td class="test-subject">Row 2</td>
    <td>Row 2, Cell 1</td>
  </tr>
  <tr>
    <td class="test-subject">Row 3</td>
    <td>Row 3, Cell 1</td>
  </tr>
</table>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default RowtableheadersFailure;
