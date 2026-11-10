/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): focus-noticeable
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Keyboard: Noticeable Focus - Success";

const NoticeablefocusSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="keyboard-noticeable-focus-success-success-1"
          data-atomic-source="focus-noticeable/simple-anchor"
          dangerouslySetInnerHTML={{
            __html: `<a id="test-subject" href="#info">info</a>
<div id="info">Some Info</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noticeable-focus-success-success-2"
          data-atomic-source="focus-noticeable/simple-button"
          dangerouslySetInnerHTML={{
            __html: `<button id="test-subject">Test Button</button>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noticeable-focus-success-success-3"
          data-atomic-source="focus-noticeable/simple-div"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject"><span>some text</span></div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noticeable-focus-success-success-4"
          data-atomic-source="focus-noticeable/simple-input"
          dangerouslySetInnerHTML={{
            __html: `<input id="test-subject" placeholder="test input" />
<label for="test-subject">test label</label>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default NoticeablefocusSuccess;
