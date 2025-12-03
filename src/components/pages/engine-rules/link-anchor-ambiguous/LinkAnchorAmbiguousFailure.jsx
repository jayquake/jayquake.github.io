import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkAnchorAmbiguousFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Link Anchor Ambiguous"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "link with ambiguous content and ambiguous aria label", content: `<a href="#more" aria-label="show more">click here</a>


<section id="more">

</section>` },
  { filename: "link with ambiguous content", content: `<header id="top"></header>

<a href="#top">click here</a>` },
  { filename: "link with image content with ambiguous alt", content: `<a href="#info"><img alt="click here" /></a>


<section id="info"></section>` }
      ]}
    />
  );
};

export default LinkAnchorAmbiguousFailure;
