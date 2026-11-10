/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): tabindex-valid
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Keyboard: Broken Tabindex - Failure";

const BrokentabindexFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="keyboard-broken-tabindex-failure-failure-1"
          data-atomic-source="tabindex-valid/div-with-tabindex--2"
          dangerouslySetInnerHTML={{
            __html: `<div tabindex="-2">Heading element</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-broken-tabindex-failure-failure-2"
          data-atomic-source="tabindex-valid/div-with-tabindex-2"
          dangerouslySetInnerHTML={{
            __html: `<div tabindex="2">Heading element</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BrokentabindexFailure;
