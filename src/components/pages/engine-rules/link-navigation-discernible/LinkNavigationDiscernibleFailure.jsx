import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkNavigationDiscernibleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Link Navigation Discernible"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "link no content", content: `<a href="path/to/page" style="width: 100px; height: 100px"></a>` },
  { filename: "link svg icon", content: `<a id="test-subject" href="/search">
  <svg style="width:100px;height:100px;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>
</a>` },
  { filename: "link wtih image content and no aria label", content: `<a href="path/to/page"><img src="path/to/graphic/cotnent" /></a>` }
      ]}
    />
  );
};

export default LinkNavigationDiscernibleFailure;
