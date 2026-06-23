import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkHomepageWarningFailure = () => {
  const ruleId = "link-homepage-warning";
  const title = `Warning a user that a link navigates to the homepage is recommended`;
  const description = `It's good practice to ensure that users can always identify links to the homepage.`;
  const helpText = `Add a visibly hidden text element that contains 'Home'. Assign a unique id attribute to the element and add aria-describedby to the link, referencing the text element's id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "link homepage without warning", content: `<p>
  <a href="/" id="homepage-link">link to page...</a>
</p>` }
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

export default LinkHomepageWarningFailure;
