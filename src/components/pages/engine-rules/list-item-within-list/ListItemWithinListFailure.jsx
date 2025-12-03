import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ListItemWithinListFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="List Item Within List"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "li outside list parent", content: `<html>
  <head> </head>
  <body>
    <div>
      <li class="orphaned">item #1</li>
    </div>
  </body>
</html>` },
  { filename: "role listitem outside list", content: `<html>
  <head> </head>
  <body>
    <div>
      <div role="listitem" class="orphaned">item #1</li>
    </div>
  </body>
</html>` }
      ]}
    />
  );
};

export default ListItemWithinListFailure;
