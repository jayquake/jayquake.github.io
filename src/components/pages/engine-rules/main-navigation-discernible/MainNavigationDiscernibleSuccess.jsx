import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const MainNavigationDiscernibleSuccess = () => {
  const ruleId = "main-navigation-discernible";
  const title = `Main navigation should be labelled properly`;
  const description = `Main navigation elements should have text available for screen readers explaining that it is the main navigation.`;
  const helpText = `Add an aria-label to the main navigation elements`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "accessiBe main menu with aria label", fixture: "main-navigation-discernible/0-accessibe-main-menu-with-aria-label.html" },
  { filename: "main menu with aria label", fixture: "main-navigation-discernible/1-main-menu-with-aria-label.html" }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default MainNavigationDiscernibleSuccess;
