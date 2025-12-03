import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const MenuItemAvoidSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Menu Item Avoid"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "div with role navigation containing ul and li without roles", content: `<div role="navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>` },
  { filename: "nav containing ul and li without roles", content: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>` }
      ]}
    />
  );
};

export default MenuItemAvoidSuccess;
