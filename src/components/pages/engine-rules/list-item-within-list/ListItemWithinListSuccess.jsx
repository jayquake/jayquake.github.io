import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ListItemWithinListSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="List Item Within List"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "ol with list item", content: `<html>
  <head> </head>
  <body>
    <ol>
      <li>Coffee</li>
    </ol>
  </body>
</html>` },
  { filename: "role list with list item", content: `<html>
  <head> </head>
  <body>
    <div role="list">
      <div role="listitem">Milk</div>
    </div>
  </body>
</html>` },
  { filename: "ul with list item", content: `<html>
  <head> </head>
  <body>
    <ul>
      <li>Milk</li>
    </ul>
  </body>
</html>` }
      ]}
    />
  );
};

export default ListItemWithinListSuccess;
