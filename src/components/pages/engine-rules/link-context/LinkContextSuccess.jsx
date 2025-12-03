import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LinkContextSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Link Context"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "a with ambiguous text", content: `<a href="/home">Click here</a>` },
  { filename: "a with long text", content: `<a href="/home"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi tenetur exercitationem, commodi sequi nisi ab, dolorem adipisci hic in repudiandae enim iste repellendus, est voluptates tempore quibusdam neque doloremque accusamus! By the way this leads home. </a>` },
  { filename: "a with no text with aria label", content: `<a href="/home" aria-label="Going home"></a>` },
  { filename: "a with no text with icon with alt", content: `<a href="/home"><img alt="Home link image" /></a>` },
  { filename: "a with text", content: `<a href="/home">Home</a>` }
      ]}
    />
  );
};

export default LinkContextSuccess;
