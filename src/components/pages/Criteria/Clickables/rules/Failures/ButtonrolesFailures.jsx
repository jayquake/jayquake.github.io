/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): button-mismatch, toggle-button-mismatch
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Clickables: Button Roles - Failure";

const ButtonrolesFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="clickables-button-roles-failure-failure-1"
          data-atomic-source="button-mismatch/button-like-link-href-javascript"
          dangerouslySetInnerHTML={{
            __html: `<a href="javascript: console.log()">I am a button</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-button-roles-failure-failure-2"
          data-atomic-source="button-mismatch/link-with-role-button"
          dangerouslySetInnerHTML={{
            __html: `<a href="#anchor" role="button"></a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-button-roles-failure-failure-3"
          data-atomic-source="toggle-button-mismatch/button-toggle-context--no-aria-pressed"
          dangerouslySetInnerHTML={{
            __html: `<button>Off</button>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-button-roles-failure-failure-4"
          data-atomic-source="toggle-button-mismatch/toggle-button-without-aria-pressed-attr"
          dangerouslySetInnerHTML={{
            __html: `<div role="button" style="cursor: pointer">On</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default ButtonrolesFailures;
