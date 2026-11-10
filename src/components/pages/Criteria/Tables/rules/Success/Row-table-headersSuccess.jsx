/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): table-row-header
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Tables: Row Table Headers - Success";

const RowtableheadersSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="tables-row-table-headers-success-success-1"
          data-atomic-source="table-row-header/table-role-with-correct-roles"
          dangerouslySetInnerHTML={{
            __html: `<style>
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
    <div role="rowheader" class="test-subject">Row 1</div>
    <div role="cell">Row 1, Cell 1</div>
  </div>
  <div role="row">
    <div role="rowheader" class="test-subject">Row 2</div>
    <div role="cell">Row 2, Cell 1</div>
  </div>
  <div role="row">
    <div role="rowheader" class="test-subject">Row 3</div>
    <div role="cell">Row 3, Cell 1</div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="tables-row-table-headers-success-success-2"
          data-atomic-source="table-row-header/table-row-headers-with-correct-tagging-multiple-tables"
          dangerouslySetInnerHTML={{
            __html: `<style>
  td, th {
    border: 1px solid black;
    width: 100px;
  }
</style>

<table>
  <tr>
    <th class="test-subject">Row 1</th>
    <td>Row 1, Cell 1</td>
  </tr>
  <tr>
    <th class="test-subject">Row 2</th>
    <td>Row 2, Cell 1</td>
  </tr>
</table>
<table>
  <tr>
    <th class="test-subject">Row 1</th>
    <td>Row 1, Cell 1</td>
  </tr>
  <tr>
    <th class="test-subject">Row 2</th>
    <td>Row 2, Cell 1</td>
  </tr>
</table>`,
          }}
        />
        <div
          className="list-item"
          id="tables-row-table-headers-success-success-3"
          data-atomic-source="table-row-header/table-row-headers-with-correct-tagging"
          dangerouslySetInnerHTML={{
            __html: `<style>
  td, th {
    border: 1px solid black;
    width: 100px;
  }
</style>

<table>
  <tr>
    <th class="test-subject">Row 1</th>
    <td>Row 1, Cell 1</td>
  </tr>
  <tr>
    <th class="test-subject">Row 2</th>
    <td>Row 2, Cell 1</td>
  </tr>
</table>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default RowtableheadersSuccess;
