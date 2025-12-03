import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const HeadingSingleH1Failure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Heading Single H1"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "h1 and aria level 1", content: `<h1>Heading element</h1>
<div role="heading" aria-level="1">Heading element</div>` },
  { filename: "multiple h1", content: `<h1 id="firstH1">Heading element</h1>
<h1 id="secondH1">Heading element</h1>` },
  { filename: "multiple role heading aria level 1", content: `<div id="firstH1" role="heading" aria-level="1">Heading element</div>
<div id="secondH1" role="heading" aria-level="1">Heading element</div>` }
      ]}
    />
  );
};

export default HeadingSingleH1Failure;
