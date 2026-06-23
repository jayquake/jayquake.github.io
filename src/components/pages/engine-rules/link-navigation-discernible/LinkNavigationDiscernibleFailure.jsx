import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkNavigationDiscernibleFailure = () => {
  const ruleId = "link-navigation-discernible";
  const title = `Navigation links should have a descriptive label`;
  const description = `Activating navigation links enables users to navigate to a different page within the site. Links that do not contain visible text or labeled images should be assigned labels that inform screen reader users of their destination.`;
  const helpText = `If a navigation link does not contain a labeled image or visible text, assign an aria-label that describes the destination of the link.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "link no content", content: `<a href="path/to/page" style="width: 100px; height: 100px"></a>` },
  { filename: "link svg icon", content: `<a id="test-subject" href="/search">
  <svg style="width:100px;height:100px;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>
</a>` },
  { filename: "link wtih image content and no aria label", content: `<a href="path/to/page"><img src="path/to/graphic/cotnent" /></a>` }
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

export default LinkNavigationDiscernibleFailure;
