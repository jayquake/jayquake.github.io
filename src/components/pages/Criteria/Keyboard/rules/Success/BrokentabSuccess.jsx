/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): tabindex-valid
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Keyboard: Broken Tabindex - Success";

const BrokentabSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="keyboard-broken-tabindex-success-success-1"
          data-atomic-source="tabindex-valid/div-with-tabindex--1"
          dangerouslySetInnerHTML={{
            __html: `<div tabindex="-1">Heading element</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-broken-tabindex-success-success-2"
          data-atomic-source="tabindex-valid/div-with-tabindex-0"
          dangerouslySetInnerHTML={{
            __html: `<div tabindex="0">Heading element</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-broken-tabindex-success-success-3"
          data-atomic-source="tabindex-valid/svg-with-tabindex-6"
          dangerouslySetInnerHTML={{
            __html: `<svg xmlns="http://www.w3.org/2000/svg" tabindex="6">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BrokentabSuccess;
