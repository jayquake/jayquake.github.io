import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TabbableVisibleFailure = () => {
  const ruleId = "tabbable-visible";
  const title = `Use the tabindex attribute correctly to manage focus for visible and hidden interactive elements`;
  const description = `When interactive elements remain focusable while they are visually hidden, keyboard users may encounter controls that they cannot see and that should not be available in the current interface.`;
  const helpText = `Apply tabindex="0" to custom interactive elements so they follow the natural tab sequence, and tabindex="-1" when an element is offscreen or when it should only be reachable programmatically. Consider using CSS techniques, such as display:none or visibility:hidden when content should be hidden from all users.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "hidden dimensions tabbable element", content: `<div style="height: 1px; width: 1px; overflow: hidden;">
  <input type="text" />
  <button>Click</button>
</div>` },
  { filename: "no content tabbable", content: `<div tabindex="0">
  <span></span>
</div>` },
  { filename: "opacity zero tabbable element", content: `<div style="opacity: 0">
  <input type="text" />
  <button>Click</button>
</div>` },
  { filename: "out of viewport fixed tabbable element on tall page", content: `<!-- Tests that a fixed tabbable element positioned below the viewport still fails on a tall page because fixed bounds are measured against the viewport. -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        min-height: 4000px;
        margin: 0;
        background: linear-gradient(#f8fafc, #e2e8f0);
      }

      #target {
        position: fixed;
        top: calc(100vh + 24px);
        left: 24px;
        width: 220px;
        height: 40px;
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <input id="target" type="text" value="Below viewport fixed input" />
  </body>
</html>` },
  { filename: "out of viewport tabbable element", content: `<div style="position: absolute; left: -500px;">
  <input type="text" />
</div>` }
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

export default TabbableVisibleFailure;
