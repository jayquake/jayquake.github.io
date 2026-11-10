/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): link-context
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Clickables: Link Context - Failure";

const LinkcontextFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="clickables-link-context-failure-failure-1"
          data-atomic-source="link-context/a-with-icon-but-no-text"
          dangerouslySetInnerHTML={{
            __html: `<a href="/home"><img src="/icon-home.png" /></a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-link-context-failure-failure-2"
          data-atomic-source="link-context/a-with-only-numeric-content"
          dangerouslySetInnerHTML={{
            __html: `<a href="/home" aria-label="123 12">1234 5</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-link-context-failure-failure-3"
          data-atomic-source="link-context/a-with-only-symbols-content"
          dangerouslySetInnerHTML={{
            __html: `<a href="/home" aria-label="---">?!?!?!</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-link-context-failure-failure-4"
          data-atomic-source="link-context/a-with-too-short-text"
          dangerouslySetInnerHTML={{
            __html: `<a href="/home">Go</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-link-context-failure-failure-5"
          data-atomic-source="link-context/a-without-any-text"
          dangerouslySetInnerHTML={{
            __html: `<a href="/home"></a>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default LinkcontextFailures;
