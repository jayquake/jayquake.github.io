import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const NavigationMismatchFailure = () => {
  const ruleId = "navigation-mismatch";
  const title = `A list of navigation links is not contained in a navigation landmark`;
  const description = `Screen readers rely on accurate tagging and labeling to provide necessary context. If a navigation region is not tagged as a navigation landmark, screen reader users may lose orientation and find the page's structure difficult to understand.`;
  const helpText = `Add role="navigation" to the custom navigation region, or use a HTML <nav> element.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "hotmobile co il main nav", fixture: "navigation-mismatch/0-hotmobile-co-il-main-nav.html" },
  { filename: "isabelbernard com navigation with images", fixture: "navigation-mismatch/1-isabelbernard-com-navigation-with-images.html" },
  { filename: "navigation no role", fixture: "navigation-mismatch/2-navigation-no-role.html" },
  { filename: "nested nav element with divs", fixture: "navigation-mismatch/3-nested-nav-element-with-divs.html" },
  { filename: "nested nav element with lists", fixture: "navigation-mismatch/4-nested-nav-element-with-lists.html" },
  { filename: "partner co il main nav", fixture: "navigation-mismatch/5-partner-co-il-main-nav.html" }
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

export default NavigationMismatchFailure;
