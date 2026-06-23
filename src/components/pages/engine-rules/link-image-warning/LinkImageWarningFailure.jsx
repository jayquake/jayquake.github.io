import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkImageWarningFailure = () => {
  const ruleId = "link-image-warning";
  const title = `Warning a user when a link triggers an image to open is recommended`;
  const description = `It's good practice to warn users about the expected behavior when activating a link triggers an image to appear.`;
  const helpText = `Add a visibly hidden text element that contains 'Opens image'. Assign a unique id attribute to the element and add aria-describedby to the link, referencing the text element's id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "link image without warning", content: `<p>
  <a href="https://example.com/image.png" id="image-link">View Image</a>
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

export default LinkImageWarningFailure;
