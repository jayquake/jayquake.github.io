import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkNavigationAmbiguousFailure = () => {
  const ruleId = "link-navigation-ambiguous";
  const title = `Link context should be exposed to assistive technology`;
  const description = `Screen reader users may find it difficult to distinguish between links when the purpose of each link cannot be determined from its text alone or together with its immediate context.`;
  const helpText = `Assign a unique id to an existing element that contains additional context for the link, add aria-describedby to the link and reference the assigned id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "link short content", content: `<a href="http://localhost/">Go</a>` },
  { filename: "link with ambiguous content and ambiguous aria label", content: `<a href="/homepage" aria-label="show more">click here</a>` },
  { filename: "link with ambiguous content", content: `<a href="/homepage">click here</a>` },
  { filename: "link with image content with ambiguous alt", content: `<a href="/homepage"><img alt="click here" /></a>` },
  { filename: "link with numeric characters only", content: `<a href="http://localhost/" aria-label="123 12">1234 5</a>` },
  { filename: "link with special characters only", content: `<a href="http://localhost/" aria-label="---">?!?!?!</a>` }
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

export default LinkNavigationAmbiguousFailure;
