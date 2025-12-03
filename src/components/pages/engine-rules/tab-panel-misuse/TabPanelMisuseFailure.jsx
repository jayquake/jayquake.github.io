import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TabPanelMisuseFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Tab Panel Misuse"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "skip link role tabpanel", content: `<div>
  <nav>
    <div>
      <ul>
        <li>
          <span role="tabpanel"><a href="#main-content">Skip to main content</a></span>
        </li>
        <li>
          <a href="#footer">Skip to footer</a>
        </li>
      </ul>
    </div>
    <p>some text in here</p>
  </nav>
</div>` }
      ]}
    />
  );
};

export default TabPanelMisuseFailure;
