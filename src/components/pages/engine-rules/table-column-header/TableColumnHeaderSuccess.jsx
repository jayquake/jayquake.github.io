import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const TableColumnHeaderSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Table Column Header"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "table headers native th", content: `<table>
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
</table>` },
  { filename: "table roles headers with role column header", content: `<style>
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
</div>` }
      ]}
    />
  );
};

export default TableColumnHeaderSuccess;
