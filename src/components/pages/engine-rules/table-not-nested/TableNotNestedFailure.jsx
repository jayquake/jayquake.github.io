import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TableNotNestedFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Table Not Nested"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "multi table nested in table", content: `<table id="not-nested-table">
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
</table>` },
  { filename: "role table nested in role table", content: `<div role="table" id="not-nested-table">
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
</div>` },
  { filename: "role table nested in table", content: `<table id="not-nested-table">
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
</table>` },
  { filename: "table nested in role table", content: `<div role="table" id="not-nested-table">
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
</div>` },
  { filename: "table nested in table", content: `<table id="not-nested-table">
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
</table>` }
      ]}
    />
  );
};

export default TableNotNestedFailure;
