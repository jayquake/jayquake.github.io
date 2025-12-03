import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TableRowHeaderFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Table Row Header"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "table roles styled row headers with role cell", content: `<style>
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
</div>` },
  { filename: "table styled row headers tagged as td in tbody", content: `<style>
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
</table>` },
  { filename: "table styled row headers tagged as td no tbody", content: `<style>
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
</table>` }
      ]}
    />
  );
};

export default TableRowHeaderFailure;
