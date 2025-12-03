import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const TabbableVisibleSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Tabbable Visible"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "element negative tabindex", content: `<!-- none of them is tabbable so passedNodes and failedNodes arrays stay empty -->
<div style="opacity: 0">
  <input tabindex="-1" type="text" />
  <button tabindex="-1">Click</button>
</div>` },
  { filename: "overflow dimensions nested tabbable element", content: `<div style="height: 1px; width: 1px; overflow: visible;">
  <button>Click</button>
</div>` },
  { filename: "skip link", content: `<head>
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
</body>` },
  { filename: "visible tabbable element", content: `<input type="text" id="username" aria-label="Username" />` }
      ]}
    />
  );
};

export default TabbableVisibleSuccess;
