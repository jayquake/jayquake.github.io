import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const TableRowHeaderSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Table Row Header"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "table role with correct roles", content: `<style>
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
</div>` },
  { filename: "table row headers with correct tagging multiple tables", content: `<style>
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
</table>` },
  { filename: "table row headers with correct tagging", content: `<style>
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
</table>` }
      ]}
    />
  );
};

export default TableRowHeaderSuccess;
