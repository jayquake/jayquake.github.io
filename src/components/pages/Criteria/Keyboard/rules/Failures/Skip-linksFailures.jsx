/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): skip-link-exists
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Keyboard: Skip Links - Failure";

const SkiplinksFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="keyboard-skip-links-failure-failure-1"
          data-atomic-source="skip-link-exists/page-without-skip-link"
          dangerouslySetInnerHTML={{
            __html: `<main id="main"></main>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SkiplinksFailures;
