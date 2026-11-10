/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): redundant-discernible-content
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Redundant Aria Labels - Failure";

const RedundantarialabelsFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-redundant-aria-labels-failure-failure-1"
          data-atomic-source="redundant-discernible-content/anchor-with-same-content-and-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<a target="_blank" aria-label="Home" class="btn-new silent compensate-left e16fm13v0 e1of9yu15 css-6x6bk e1figufi0"
    href="/home"><span class="silent css-17qgsod e1of9yu11">Home</span></a>`,
          }}
        />
        <div
          className="list-item"
          id="errors-redundant-aria-labels-failure-failure-2"
          data-atomic-source="redundant-discernible-content/anchor-with-same-diff-case-content-and-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<a aria-label="sOmE cOnTeNt">SoMe CoNtEnT<i class="icon"></i></a>`,
          }}
        />
        <div
          className="list-item"
          id="errors-redundant-aria-labels-failure-failure-3"
          data-atomic-source="redundant-discernible-content/button-with-aria-label-child-with-same-content"
          dangerouslySetInnerHTML={{
            __html: `<button aria-label="some content"><span>some content</span>&nbsp;<i class="icon"></i></button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-redundant-aria-labels-failure-failure-4"
          data-atomic-source="redundant-discernible-content/button-with-same-content-after-icon-and-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<button aria-label="some content"><i class="icon"></i>some content</button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-redundant-aria-labels-failure-failure-5"
          data-atomic-source="redundant-discernible-content/button-with-same-content-and-aria-label-arabic"
          dangerouslySetInnerHTML={{
            __html: `<button aria-label="شكرًا لك">شكرًا لك</button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-redundant-aria-labels-failure-failure-6"
          data-atomic-source="redundant-discernible-content/button-with-same-content-and-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<button aria-label="some content">some content<i class="icon"></i></button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-redundant-aria-labels-failure-failure-7"
          data-atomic-source="redundant-discernible-content/button-with-same-content-and-aria-labelled-by"
          dangerouslySetInnerHTML={{
            __html: `<button aria-labelledby="btn-label">some content<i class="icon"></i></button>
<label id="btn-label">some content</label>`,
          }}
        />
        <div
          className="list-item"
          id="errors-redundant-aria-labels-failure-failure-8"
          data-atomic-source="redundant-discernible-content/button-with-same-content-with-whitespace"
          dangerouslySetInnerHTML={{
            __html: `<button aria-label="  some other content                ">some other content<i class="icon"></i></button>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default RedundantarialabelsFailure;
