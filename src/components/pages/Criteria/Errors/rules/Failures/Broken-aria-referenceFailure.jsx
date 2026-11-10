/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): aria-labelledby-has-reference, aria-describedby-has-reference
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Broken Aria Reference - Failure";

const BrokenariareferenceFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-broken-aria-reference-failure-failure-1"
          data-atomic-source="aria-labelledby-has-reference/input-with-aria-labelledby-but-no-matching-element-id"
          dangerouslySetInnerHTML={{
            __html: `<input aria-labelledby="label" />
<div id="label-bad-id">Some label</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-reference-failure-failure-2"
          data-atomic-source="aria-labelledby-has-reference/input-with-aria-labelledby-but-no-matching-element"
          dangerouslySetInnerHTML={{
            __html: `<input aria-labelledby="label" />`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-reference-failure-failure-3"
          data-atomic-source="aria-labelledby-has-reference/multiple-inputs-with-labelledby-but-no-fitting-element"
          dangerouslySetInnerHTML={{
            __html: `<input id="labelled-by" aria-labelledby="labelled-2" />
<div id="label-bad-id-1">Some label</div>
<input id="labelled-by-2" aria-labelledby="label" />
<div id="label-bad-id">Some label</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-reference-failure-failure-4"
          data-atomic-source="aria-describedby-has-reference/input-with-aria-describedby-but-no-matching-element-id"
          dangerouslySetInnerHTML={{
            __html: `<input aria-describedby="description" />
<div id="description-bad-id">Some description</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-reference-failure-failure-5"
          data-atomic-source="aria-describedby-has-reference/input-with-aria-describedby-but-no-matching-element"
          dangerouslySetInnerHTML={{
            __html: `<input aria-describedby="description" />`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-reference-failure-failure-6"
          data-atomic-source="aria-describedby-has-reference/input-with-valid-aria-describedby-and-invalid-aria-labelledby"
          dangerouslySetInnerHTML={{
            __html: `<input aria-labelledby="label" aria-describedby="description" />
<div id="description-bad">Some description</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BrokenariareferenceFailure;
