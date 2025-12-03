import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const TableNotNestedSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Table Not Nested"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "table not nested multi", content: `<table>
  <th>Countries</th>
  <tr>
    <td>Finland</td>
    <td>Brazil</td>
    <td>Japan</td>
    <td>Korea</td>
  </tr>
</table>

<table>
  <th>Cities</th>
  <tr>
    <td>Bat Yam</td>
    <td>Cairo</td>
    <td>Beirut</td>
    <td>Shanghai</td>
  </tr>
</table>` },
  { filename: "table not nested", content: `<table>
  <th>Countries</th>
  <tr>
    <td>Finland</td>
    <td>Jerusalem</td>
    <td>Beirut</td>
    <td>Shanghai</td>
  </tr>
</table>` }
      ]}
    />
  );
};

export default TableNotNestedSuccess;
