import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const RedundantDiscernibleContentSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Redundant Discernible Content"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "anchor without content and with aria label", content: `<a aria-label="SoMe CoNtEnT"><i class="icon"></i></a>` },
  { filename: "button with content and without aria label", content: `<button>SoMe CoNtEnT</button>` },
  { filename: "button with different content and aria label arabic", content: `<button aria-label="شكرًا لك">وداعًا</button>` },
  { filename: "button with different content and aria label", content: `<button aria-label="some content">some other content<i class="icon"></i></button>` },
  { filename: "button with different content and aria labelledby element", content: `<button aria-labelledby="btn-label">some other content<i class="icon"></i></button>
<label id="btn-label">some content</label>` }
      ]}
    />
  );
};

export default RedundantDiscernibleContentSuccess;
