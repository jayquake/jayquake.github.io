import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ListNotEmptyFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="List Not Empty"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "empty lists", content: `<html>
  <head> </head>
  <body>
    <ol></ol>
    <ul></ul>
  </body>
</html>` },
  { filename: "list with invisible items", content: `<html>
  <head> </head>
  <body>
    <ol>
      <li style="display: none">Milk</li>
    </ol>
    <ul>
      <li style="visibility: hidden">Coffee</li>
    </ul>
  </body>
</html>` },
  { filename: "role list without list items", content: `<html>
  <head> </head>
  <body>
  <div role="list">
  </div>
  </body>
</html>` }
      ]}
    />
  );
};

export default ListNotEmptyFailure;
