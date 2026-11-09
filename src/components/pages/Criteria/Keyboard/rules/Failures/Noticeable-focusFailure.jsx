/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): focus-noticeable
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Keyboard: Noticeable Focus - Failure";

const NoticeablefocusFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="keyboard-noticeable-focus-failure-failure-1"
          data-atomic-source="focus-noticeable/anchor-with-overridden-outline"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #test-subject:focus {
    outline: none;
  }
</style>
<a id="test-subject" href="#info">info</a>
<div id="info">Some Info</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noticeable-focus-failure-failure-2"
          data-atomic-source="focus-noticeable/button-with-overridden-outline"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #test-subject:focus {
    outline: none;
  }
</style>
<button id="test-subject">Click this</button>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noticeable-focus-failure-failure-3"
          data-atomic-source="focus-noticeable/div-with-tabindex-with-overridden-outline"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #test-subject:focus {
    outline: none;
  }
</style>
<div id="test-subject" tabindex="0">Content</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noticeable-focus-failure-failure-4"
          data-atomic-source="focus-noticeable/input-with-overridden-outline"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #test-subject:focus {
    outline: none;
  }
</style>
<input id="test-subject" placeholder="test input" />
<label for="test-subject">test label</label>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default NoticeablefocusFailure;
