import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TableColumnHeaderFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Table Column Header"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "table native tds styled as headers no thead or tbody", content: `<style>
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
</table>` },
  { filename: "table native tds styled as headers with thead", content: `<style>
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
</table>` },
  { filename: "table roles cell role styled as headers", content: `<style>
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
</div>` }
      ]}
    />
  );
};

export default TableColumnHeaderFailure;
