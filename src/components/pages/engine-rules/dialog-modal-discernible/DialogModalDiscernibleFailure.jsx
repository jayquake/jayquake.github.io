import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const DialogModalDiscernibleFailure = () => {
  const ruleId = "dialog-modal-discernible";
  const title = `Modals should have a label`;
  const description = `Modals should be assigned labels that inform screen reader users of their purpose.`;
  const helpText = `Add an aria-label or aria-labelledby attribute to the modal.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "dialog no visible content no label", content: `<style>
  .backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 100; }
  dialog { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200px; z-index: 101; padding: 16px; }
</style>
<div class="backdrop"></div>
<!-- Dialog with no text content and no label — e.g. an icon-only action panel -->
<dialog open>
  <button aria-label="Share">
    <svg aria-hidden="true" width="20" height="20"><use href="#icon-share"/></svg>
  </button>
  <button aria-label="Download">
    <svg aria-hidden="true" width="20" height="20"><use href="#icon-download"/></svg>
  </button>
  <button aria-label="Close">
    <svg aria-hidden="true" width="20" height="20"><use href="#icon-close"/></svg>
  </button>
</dialog>` },
  { filename: "dialog without aria label", content: `<style>
  dialog { width: 400px; height: 300px; }
  .backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 100; }
  dialog { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 101; }
</style>
<div class="backdrop"></div>
<dialog open>
  <h2>Subscribe to our newsletter</h2>
  <p>Enter your email to stay updated.</p>
  <button>Close</button>
</dialog>` },
  { filename: "div role dialog without label", content: `<style>
  body { margin: 0; height: 100%; }
</style>
<div style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 100;"></div>
<div id="modal" role="dialog" aria-modal="true" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 24px; width: 400px; z-index: 101;">
  <h2>Cookie Preferences</h2>
  <p>Manage your cookie settings below.</p>
  <button>Accept All</button>
  <button>Decline</button>
  <button>Close</button>
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

export default DialogModalDiscernibleFailure;
