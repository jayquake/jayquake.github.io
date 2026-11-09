/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): link-context
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Clickables: Link Context - Success";

const LinkcontextSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="clickables-link-context-success-success-1"
          data-atomic-source="link-context/a-with-ambiguous-text"
          dangerouslySetInnerHTML={{
            __html: `<a href="/home">Click here</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-link-context-success-success-2"
          data-atomic-source="link-context/a-with-long-text"
          dangerouslySetInnerHTML={{
            __html: `<a href="/home"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi tenetur exercitationem, commodi sequi nisi ab, dolorem adipisci hic in repudiandae enim iste repellendus, est voluptates tempore quibusdam neque doloremque accusamus! By the way this leads home. </a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-link-context-success-success-3"
          data-atomic-source="link-context/a-with-no-text-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<a href="/home" aria-label="Going home"></a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-link-context-success-success-4"
          data-atomic-source="link-context/a-with-no-text-with-icon-with-alt"
          dangerouslySetInnerHTML={{
            __html: `<a href="/home"><img alt="Home link image" /></a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-link-context-success-success-5"
          data-atomic-source="link-context/a-with-text"
          dangerouslySetInnerHTML={{
            __html: `<a href="/home">Home</a>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default LinkcontextSuccess;
