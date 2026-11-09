import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const DialogModalDiscernibleSuccess = () => {
  const ruleId = "dialog-modal-discernible";
  const title = `Modals should have a label`;
  const description = `Modals should be assigned labels that inform screen reader users of their purpose.`;
  const helpText = `Add an aria-label or aria-labelledby attribute to the modal.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "dialog with aria label", content: `<style>
  dialog { width: 400px; height: 300px; }
</style>
<dialog open aria-label="Newsletter Subscription">
  <p>Enter your email to subscribe.</p>
  <button>Subscribe</button>
  <button>Cancel</button>
  <button>Close</button>
</dialog>` },
  { filename: "dialog with aria labelledby", content: `<style>
  .backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 100; }
  dialog { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; z-index: 101; }
</style>
<div class="backdrop"></div>
<dialog open aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Your Order</h2>
  <p>Please review your order before completing the purchase.</p>
  <button>Confirm</button>
  <button>Cancel</button>
  <button>Close</button>
</dialog>` },
  { filename: "div role dialog with aria label", content: `<style>
  body { margin: 0; height: 100%; }
</style>
<div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100;"></div>
<div id="modal" role="dialog" aria-modal="true" aria-label="Cookie Preferences" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 24px; width: 400px; z-index: 101;">
  <p>Manage your cookie settings below.</p>
  <button>Accept All</button>
  <button>Decline</button>
  <button>Close</button>
</div>` },
  { filename: "div role dialog with aria labelledby", content: `<style>
  body { margin: 0; height: 100%; }
</style>
<div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100;"></div>
<div id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-heading" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 24px; width: 400px; z-index: 101;">
  <h2 id="modal-heading">Account Settings</h2>
  <p>Update your profile and preferences.</p>
  <button>Save</button>
  <button>Cancel</button>
  <button>Close</button>
</div>` },
  { filename: "valid modal not visible", content: `<style>
  dialog { width: 400px; height: 300px; opacity: 0 }
</style>
<!-- A compliant modal with a label that is hidden — should be inapplicable, not failed -->
<dialog open aria-label="Newsletter Subscription" role="dialog">
  <h2>Subscribe to our newsletter</h2>
  <p>Enter your email to stay updated.</p>
  <button>Close</button>
</dialog>` }
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

export default DialogModalDiscernibleSuccess;
