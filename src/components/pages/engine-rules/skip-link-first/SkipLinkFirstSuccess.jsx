import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const SkipLinkFirstSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Skip Link First"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "multi skip links before tabbables", content: `<head>
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
  <div>
    <a class="skip-link" href="#main">Skip to main content</a>
    <a class="skip-link" href="#main-nav">Skip to main navigation</a>
    <a class="skip-link" href="#footer">Skip to footer</a>
  </div>
  <main id="main"></main>
</body>` },
  { filename: "page without skip links", content: `<main id="main"></main>` },
  { filename: "skip link as first element", content: `<head>
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

export default SkipLinkFirstSuccess;
