import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const StrongMismatchSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Strong Mismatch"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "button has direct text no element children font weight equal to 700", content: `<p style="margin-left: 20px">I would like to be notified by <button style="font-weight: 700">email</button>, not other forms of communication.</p>` },
  { filename: "not perceivable strong", content: `<p style="margin-left: 20px">I would like to be notified by <span style="font-weight: 400">email</span>, not other forms of communication.</p>` },
  { filename: "role strong has direct text no element children font weight equal to 700", content: `<p style="margin-left: 20px">I would like to be notified by <span role="strong" style="font-weight: 700">email</span>, not other forms of communication.</p>` },
  { filename: "role strong has direct text no element children font weight greater than 700", content: `<p style="margin-left: 20px">I would like to be notified by <span role="strong" style="font-weight: 900">email</span>, not other forms of communication.</p>` },
  { filename: "strong has direct text no element children font weight equal to 700", content: `<p style="margin-left: 20px">I would like to be notified by <strong style="font-weight: 700">email</strong>, not other forms of communication.</p>` },
  { filename: "strong has direct text no element children font weight greater than 700", content: `<p style="margin-left: 20px">I would like to be notified by <strong style="font-weight: 900">email</strong>, not other forms of communication.</p>` }
      ]}
    />
  );
};

export default StrongMismatchSuccess;
