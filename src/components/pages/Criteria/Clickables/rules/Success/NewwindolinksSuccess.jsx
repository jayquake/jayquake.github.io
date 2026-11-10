/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): link-new-window-warning
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Clickables: New Window Links - Success";

const NewwindolinksSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="clickables-new-window-links-success-success-1"
          data-atomic-source="link-new-window-warning/link-with-target-blank-aria-describedby-with-new-window"
          dangerouslySetInnerHTML={{
            __html: `<a href="/docs" target="_blank" aria-describedby="new-window-desc">Docs</a>
<span id="new-window-desc">Opens in a new window</span>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-new-window-links-success-success-2"
          data-atomic-source="link-new-window-warning/link-with-target-blank-aria-label-with-new-window"
          dangerouslySetInnerHTML={{
            __html: `<a href="path/to/page" target="_blank" aria-label="link to new window">link to somewhere</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-new-window-links-success-success-3"
          data-atomic-source="link-new-window-warning/link-with-target-blank-content-with-hebrew-new-window"
          dangerouslySetInnerHTML={{
            __html: `<html lang="he">
    <a href="path/to/page" target="_blank">לינק לחלון חדש</a>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-new-window-links-success-success-4"
          data-atomic-source="link-new-window-warning/link-with-target-blank-content-with-new-tab"
          dangerouslySetInnerHTML={{
            __html: `<a href="path/to/page" target="_blank">link to new tab</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-new-window-links-success-success-5"
          data-atomic-source="link-new-window-warning/link-with-target-blank-content-with-new-window"
          dangerouslySetInnerHTML={{
            __html: `<a href="path/to/page" target="_blank">link to new Window</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-new-window-links-success-success-6"
          data-atomic-source="link-new-window-warning/link-with-target-blank-content-with-separate-tab"
          dangerouslySetInnerHTML={{
            __html: `<a href="path/to/page" target="_blank">link to separate tab</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-new-window-links-success-success-7"
          data-atomic-source="link-new-window-warning/link-with-target-blank-content-with-separate-window"
          dangerouslySetInnerHTML={{
            __html: `<a href="path/to/page" target="_blank">link to separate tab</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-new-window-links-success-success-8"
          data-atomic-source="link-new-window-warning/link-with-target-self"
          dangerouslySetInnerHTML={{
            __html: `<a href="path/to/page" target="_self">link to somewhere</a>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default NewwindolinksSuccess;
