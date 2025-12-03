import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const SkipLinkExistsSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Skip Link Exists"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "page with skip link", content: `<head>
  <style>
    .skip-link {
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    .skip-link:focus {
      position: static;
      width: auto;
      height: auto;
    }
  </style>
</head>
<body>
  <a href="#main" class="skip-link">Skip to main content</a>
  <main id="main"></main>
</body>` }
      ]}
    />
  );
};

export default SkipLinkExistsSuccess;
