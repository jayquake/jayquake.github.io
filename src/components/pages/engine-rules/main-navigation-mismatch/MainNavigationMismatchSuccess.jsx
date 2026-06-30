import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const MainNavigationMismatchSuccess = () => {
  const ruleId = "main-navigation-mismatch";
  const title = `Main navigation should have role navigation`;
  const description = `Main navigation elements should have role navigation to ensure that screen readers can identify them as navigation regions.`;
  const helpText = `Add role=navigation to the main navigation elements`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "accessiBe main menu nav with role navigation", fixture: "main-navigation-mismatch/0-accessibe-main-menu-nav-with-role-navigation.html" },
  { filename: "accessiBe main menu nav", fixture: "main-navigation-mismatch/1-accessibe-main-menu-nav.html" },
  { filename: "accessiBe main menu role navigation", fixture: "main-navigation-mismatch/2-accessibe-main-menu-role-navigation.html" },
  { filename: "shopify main nav", fixture: "main-navigation-mismatch/3-shopify-main-nav.html" }
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

export default MainNavigationMismatchSuccess;
