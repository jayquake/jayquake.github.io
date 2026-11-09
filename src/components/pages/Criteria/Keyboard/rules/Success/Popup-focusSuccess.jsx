/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): dialog-modal-focus
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Keyboard: Popup Focus - Success";

const PopupfocusSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="keyboard-popup-focus-success-success-1"
          data-atomic-source="dialog-modal-focus/dialog-with-autofocus"
          dangerouslySetInnerHTML={{
            __html: `<html>
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
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default PopupfocusSuccess;
