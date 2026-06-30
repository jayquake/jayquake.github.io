import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const MainNavigationDiscernibleFailure = () => {
  const ruleId = "main-navigation-discernible";
  const title = `Main navigation should be labelled properly`;
  const description = `Main navigation elements should have text available for screen readers explaining that it is the main navigation.`;
  const helpText = `Add an aria-label to the main navigation elements`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "accessiBe main menu without aria label", fixture: "main-navigation-discernible/0-accessibe-main-menu-without-aria-label.html" },
  { filename: "main menu without aria label", fixture: "main-navigation-discernible/1-main-menu-without-aria-label.html" }
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

export default MainNavigationDiscernibleFailure;
