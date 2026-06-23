import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const TabbableVisibleSuccess = () => {
  const ruleId = "tabbable-visible";
  const title = `Use the tabindex attribute correctly to manage focus for visible and hidden interactive elements`;
  const description = `When interactive elements remain focusable while they are visually hidden, keyboard users may encounter controls that they cannot see and that should not be available in the current interface.`;
  const helpText = `Apply tabindex="0" to custom interactive elements so they follow the natural tab sequence, and tabindex="-1" when an element is offscreen or when it should only be reachable programmatically. Consider using CSS techniques, such as display:none or visibility:hidden when content should be hidden from all users.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "element negative tabindex", content: `<!-- none of them is tabbable so passedNodes and failedNodes arrays stay empty -->
<div style="opacity: 0">
  <input tabindex="-1" type="text" />
  <button tabindex="-1">Click</button>
</div>` },
  { filename: "fixed tabbable element inside clipped shadow dom", content: `<!-- Tests that a fixed tabbable element inside clipped shadow-DOM containers still passes because fixed visibility is based on the viewport, not ancestor clipping. -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        margin: 0;
        min-height: 1200px;
      }

      #clipped-host-container {
        margin-top: 600px;
        overflow: hidden;
        height: 5px;
      }
    </style>
    <script>
      window.addEventListener("DOMContentLoaded", () => {
        const host = document.getElementById("shadow-host");
        const shadowRoot = host.attachShadow({ mode: "open" });

        shadowRoot.innerHTML = \`
          <style>
            #wrapper {
              overflow: hidden;
              height: 5px;
            }

            #target {
              position: fixed;
              top: 0;
              left: 0;
              width: 180px;
              height: 40px;
              box-sizing: border-box;
              font-size: 16px;
            }
          </style>
          <div id="wrapper">
            <input id="target" type="text" value="Shadow DOM fixed input" />
          </div>
        \`;
      });
    </script>
  </head>
  <body>
    <div id="clipped-host-container">
      <div id="shadow-host"></div>
    </div>
  </body>
</html>` },
  { filename: "in viewport fixed tabbable element on tall page", content: `<!-- Tests that a fixed tabbable element positioned within the viewport still passes on a tall page because fixed bounds are measured against the viewport. -->
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
        top: calc(100vh - 64px);
        left: 24px;
        width: 220px;
        height: 40px;
        box-sizing: border-box;
      }
    </style>
  </head>
  <body>
    <input id="target" type="text" value="In viewport fixed input" />
  </body>
</html>` },
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
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default TabbableVisibleSuccess;
