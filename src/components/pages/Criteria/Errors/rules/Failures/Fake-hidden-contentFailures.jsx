/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): visibility-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Fake Hidden Content - Failure";

const FakehiddencontentFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-fake-hidden-content-failure-failure-1"
          data-atomic-source="visibility-misuse/div-height-0-overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: `<div style="height: 0; overflow: hidden">Hidden content</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-failure-failure-2"
          data-atomic-source="visibility-misuse/div-opacity-0"
          dangerouslySetInnerHTML={{
            __html: `<div style="opacity: 0">This is visually hidden</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-failure-failure-3"
          data-atomic-source="visibility-misuse/div-text-indent-negative-9999px"
          dangerouslySetInnerHTML={{
            __html: `<div style="text-indent: -9999px">Hidden text</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-failure-failure-4"
          data-atomic-source="visibility-misuse/div-width-0-height-0-overflow-hidden"
          dangerouslySetInnerHTML={{
            __html: `<div style="width: 0; height: 0; overflow: hidden">Hidden visually</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-failure-failure-5"
          data-atomic-source="visibility-misuse/nested-invisible-elements"
          dangerouslySetInnerHTML={{
            __html: `<!-- This test is skipped because the span is perceivable visible (even though it shouldn't be) -->

<div style="height: 0.5px; width: 0.5px; overflow: hidden">
    <div id="test-subject">
        This text is still visible to
        <span class="should not appear in the failed nodes array as it's a child of a failed node">screen reader</span>
    </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-failure-failure-6"
          data-atomic-source="visibility-misuse/zero-opacity-element"
          dangerouslySetInnerHTML={{
            __html: `<div style="opacity: 0">This text is still visible to screen reader</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FakehiddencontentFailures;
