/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): aria-labelledby-has-reference, aria-describedby-has-reference
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Errors: Broken Aria Reference - Success";

const BrokenariareferenceSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-broken-aria-reference-success-success-1"
          data-atomic-source="aria-labelledby-has-reference/input-with-aria-labelledby-and-matching-element"
          dangerouslySetInnerHTML={{
            __html: `<input aria-labelledby="label" />
<div id="label">Some label</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-reference-success-success-2"
          data-atomic-source="aria-labelledby-has-reference/input-without-aria-references"
          dangerouslySetInnerHTML={{
            __html: `<input aria-label="label" />`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-reference-success-success-3"
          data-atomic-source="aria-labelledby-has-reference/multiple-inputs-with-labelledby-and-with-matching-element"
          dangerouslySetInnerHTML={{
            __html: `<input id="labelled-by" aria-labelledby="description" />
<div id="description">Some label</div>
<input id="labelled-by-1" aria-labelledby="label" />
<div id="label">Some label</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-reference-success-success-4"
          data-atomic-source="aria-describedby-has-reference/input-with-aria-describedby-and-matching-element"
          dangerouslySetInnerHTML={{
            __html: `<input aria-describedby="description" />
<div id="description">Some description</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-reference-success-success-5"
          data-atomic-source="aria-describedby-has-reference/input-without-aria-references"
          dangerouslySetInnerHTML={{
            __html: `<input aria-label="label" />`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-reference-success-success-6"
          data-atomic-source="aria-describedby-has-reference/multiple-inputs-with-labelledby-and-describedby-with-matching-element"
          dangerouslySetInnerHTML={{
            __html: `<input id="describedby-by" aria-describedby="description" />
<div id="description">Some description</div>
<input id="describedby-by-2" aria-describedby="description-2" />
<div id="description-2">Some description</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BrokenariareferenceSuccess;
