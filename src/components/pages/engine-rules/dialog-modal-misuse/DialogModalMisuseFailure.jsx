import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const DialogModalMisuseFailure = () => {
  const ruleId = "dialog-modal-misuse";
  const title = `Only elements that function as dialogs should be tagged as dialog`;
  const description = `Marking up elements as dialogs without actual dialog behavior causes screen readers to announce a dialog, misleading users into expecting modal interaction and restricted reading order that do not occur.`;
  const helpText = `Remove role="dialog" from the non-dialog element or add role="presentation" if the HTML <dialog> element is used.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "backdrop width outside tolerance", content: `<!-- Tests that a dialog fails modal backdrop detection when the fixed backdrop is more than 1px narrower than the viewport. -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html,
      body {
        height: 100%;
        margin: 0;
      }

      body {
        font-family: Arial, sans-serif;
      }

      .backdrop {
        position: fixed;
        inset: 0 auto auto 0;
        width: calc(100vw - 2px);
        height: 100vh;
        background: rgba(15, 23, 42, 0.45);
        z-index: 10;
      }

      #test-subject {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 320px;
        min-height: 180px;
        padding: 24px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 16px 48px rgba(15, 23, 42, 0.25);
        z-index: 11;
      }

      h1 {
        margin: 0 0 12px;
        font-size: 24px;
      }

      p {
        margin: 0;
        line-height: 1.5;
      }

      .actions {
        display: flex;
        gap: 12px;
        margin-top: 24px;
      }
    </style>
  </head>
  <body>
    <div class="backdrop" aria-hidden="true"></div>
    <div id="test-subject" role="dialog" aria-modal="true" aria-label="Product update dialog">
      <h1>Stay updated</h1>
      <p>This dialog should not be recognized when the backdrop is genuinely narrower than the viewport.</p>
      <div class="actions">
        <button type="button">Close</button>
        <button type="button">Subscribe</button>
      </div>
    </div>
  </body>
</html>` },
  { filename: "simple div role dialog modal", content: `<div role="dialog" aria-modal="true">Dialog</div>` }
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

export default DialogModalMisuseFailure;
