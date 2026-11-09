/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): table-not-nested
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Tables: Nested Tables - Failure";

const NestedtablesFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="tables-nested-tables-failure-failure-1"
          data-atomic-source="table-not-nested/multi-table-nested-in-table"
          dangerouslySetInnerHTML={{
            __html: `<table id="not-nested-table">
  <th>Table #2</th>
  <tr>
    <td>
      <table id="nested-table1">
        <th>Table #3</th>
        <tr>
          <td>
            <table id="nested-table2">
              <tr>
                <td>Tickets</td>
                <td>5</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
          }}
        />
        <div
          className="list-item"
          id="tables-nested-tables-failure-failure-2"
          data-atomic-source="table-not-nested/role-table-nested-in-role-table"
          dangerouslySetInnerHTML={{
            __html: `<div role="table" id="not-nested-table">
  <div role="row">
    <div role="columnheader">Nested Column 1</div>
    <div role="columnheader">Nested Column 2</div>
  </div>
  <div role="row">
    <div role="cell">Nested Row 1, Cell 1</div>
    <div role="cell">Nested Row 1, Cell 2</div>
  </div>
  <div role="row">
    <div role="cell">Nested Row 2, Cell 1</div>
    <div role="cell">
      <div id="nested-table" role="table">
        <div role="row">
          <div role="columnheader">Nested Column 1</div>
          <div role="columnheader">Nested Column 2</div>
        </div>
        <div role="row">
          <div role="cell">Nested Row 1, Cell 1</div>
          <div role="cell">Nested Row 1, Cell 2</div>
        </div>
        <div role="row">
          <div role="cell">Nested Row 2, Cell 1</div>
          <div role="cell">Nested Row 2, Cell 2</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="tables-nested-tables-failure-failure-3"
          data-atomic-source="table-not-nested/role-table-nested-in-table"
          dangerouslySetInnerHTML={{
            __html: `<table id="not-nested-table">
  <tr>
    <th>Column 1</th>
    <th>Column 2</th>
  </tr>
  <tr>
    <td>Row 1, Cell 1</td>
    <td>
      <!-- Nested table made of divs -->
      <div id="nested-table" role="table" class="divTable">
        <div role="row" class="divTableRow">
          <div role="columnheader" class="divTableHead">Nested Column 1</div>
          <div role="columnheader" class="divTableHead">Nested Column 2</div>
        </div>
        <div role="row" class="divTableRow">
          <div role="cell" class="divTableCell">Nested Row 1, Cell 1</div>
          <div role="cell" class="divTableCell">Nested Row 1, Cell 2</div>
        </div>
        <div role="row" class="divTableRow">
          <div role="cell" class="divTableCell">Nested Row 2, Cell 1</div>
          <div role="cell" class="divTableCell">Nested Row 2, Cell 2</div>
        </div>
      </div>
    </td>
  </tr>
  <tr>
    <td>Row 2, Cell 1</td>
    <td>Row 2, Cell 2</td>
  </tr>
</table>`,
          }}
        />
        <div
          className="list-item"
          id="tables-nested-tables-failure-failure-4"
          data-atomic-source="table-not-nested/table-nested-in-role-table"
          dangerouslySetInnerHTML={{
            __html: `<div role="table" id="not-nested-table">
  <div role="row">
    <div role="cell">
      <!-- Nested traditional table -->
      <table id="nested-table">
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
        </tr>
        <tr>
          <td>Row 1, Cell 1</td>
          <td>Row 1, Cell 2</td>
        </tr>
        <tr>
          <td>Row 2, Cell 1</td>
          <td>Row 2, Cell 2</td>
        </tr>
      </table>
    </div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="tables-nested-tables-failure-failure-5"
          data-atomic-source="table-not-nested/table-nested-in-table"
          dangerouslySetInnerHTML={{
            __html: `<table id="not-nested-table">
  <th>Table #2</th>
  <tr>
    <td>
      <table id="nested-table">
        <tr>
          <td>Tickets</td>
          <td>5</td>
        </tr>
      </table>
    </td>
  </tr>
</table>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default NestedtablesFailure;
