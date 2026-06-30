import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const MainNavigationMismatchFailure = () => {
  const ruleId = "main-navigation-mismatch";
  const title = `Main navigation should have role navigation`;
  const description = `Main navigation elements should have role navigation to ensure that screen readers can identify them as navigation regions.`;
  const helpText = `Add role=navigation to the main navigation elements`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "accessiBe main menu without role navigation", fixture: "main-navigation-mismatch/0-accessibe-main-menu-without-role-navigation.html" }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default MainNavigationMismatchFailure;
