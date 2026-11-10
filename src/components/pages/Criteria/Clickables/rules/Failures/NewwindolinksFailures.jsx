/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): link-new-window-warning
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Clickables: New Window Links - Failure";

const NewwindolinksFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="clickables-new-window-links-failure-failure-1"
          data-atomic-source="link-new-window-warning/link-blank-no-new-window-in-content"
          dangerouslySetInnerHTML={{
            __html: `<a href="path/to/page" target="_blank">Link to somewhere</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-new-window-links-failure-failure-2"
          data-atomic-source="link-new-window-warning/link-with-no-content"
          dangerouslySetInnerHTML={{
            __html: `<a href="path/to/page" target="_blank"></a>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default NewwindolinksFailures;
