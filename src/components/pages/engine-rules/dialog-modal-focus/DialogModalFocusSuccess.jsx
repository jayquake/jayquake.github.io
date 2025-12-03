import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const DialogModalFocusSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Dialog Modal Focus"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "dialog with autofocus", content: `<html>
  <head>
    <style>
      [role="dialog"] {
        position: absolute;
        z-index: 10;
        top: 2rem;
        left: 50vw;
        transform: translateX(-50%);
        min-width: calc(640px - (15px * 2));
        min-height: auto;
        box-shadow: 0 19px 38px rgb(0 0 0 / 12%), 0 15px 12px rgb(0 0 0 / 22%);
      }
    </style>
  </head>
  <body>
    <button type="button" onclick="console.log('open dialog')" aria-haspopup="dialog">Show message</button>
    <div id="dialog_layer" class="dialogs">
      <div role="dialog" id="dialog1" aria-labelledby="dialog1_label" aria-modal="true" tabindex="0" autofocus>
        <h2 id="dialog1_label" class="dialog_label">Important information</h2>
        <p class="dialog_content">some important information here that the user needs to read before continuing</p>
        <div id="dialog-actions">
          <button type="button" onclick="console.log('close dialog')">Close</button>
          <button type="button" onclick="console.log('accept')">Accept</button>
        </div>
      </div>
    </div>
  </body>
</html>` }
      ]}
    />
  );
};

export default DialogModalFocusSuccess;
