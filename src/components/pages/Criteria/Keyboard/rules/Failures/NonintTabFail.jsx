/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): tabbable-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Keyboard: Noninteractive Tabindex - Failure";

const NonintTabFail = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="keyboard-noninteractive-tabindex-failure-failure-1"
          data-atomic-source="tabbable-misuse/non-interactive-element-with-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<div tabindex="0">
  <span>Not Interactive</span>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default NonintTabFail;
