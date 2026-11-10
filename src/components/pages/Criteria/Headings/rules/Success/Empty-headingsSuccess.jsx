/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): heading-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Headings: Empty Headings - Success";

const EmptyheadingsSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="headings-empty-headings-success-success-1"
          data-atomic-source="heading-discernible/heading-with-complex-content"
          dangerouslySetInnerHTML={{
            __html: `<h2 data-heading-level="manual" class="sc-dmyCSP fhJXZs sc-fYrVWQ kOOKzb">
  <button type="button" aria-controls="radix-:r4:" aria-expanded="false" data-state="closed" class="sc-GkLId ixespc">
    <span>Add alt text to inserted email images</span>
    <div class="sc-iBdnpw hjoFUu">
      <i role="presentation" aria-hidden="true" class="sc-hABBmJ bHDvnc"
        ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m20 8-8 8-8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg
      ></i>
    </div>
  </button>
</h2>`,
          }}
        />
        <div
          className="list-item"
          id="headings-empty-headings-success-success-2"
          data-atomic-source="heading-discernible/heading-with-content"
          dangerouslySetInnerHTML={{
            __html: `<h1>Some text content</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-empty-headings-success-success-3"
          data-atomic-source="heading-discernible/heading-with-img-as-content-and-aria-label-on-nested-img"
          dangerouslySetInnerHTML={{
            __html: `<h1><img src="path/to/image" aria-label="describe the button" /></h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-empty-headings-success-success-4"
          data-atomic-source="heading-discernible/heading-with-img-as-content-and-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<h1 aria-label="describe the button"><img src="path/to/image" /></h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-empty-headings-success-success-5"
          data-atomic-source="heading-discernible/heading-with-labelled-alt-img"
          dangerouslySetInnerHTML={{
            __html: `<h1 id="test-subject"><img src="image.png" alt="Image description">1</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-empty-headings-success-success-6"
          data-atomic-source="heading-discernible/heading-with-labelled-svg"
          dangerouslySetInnerHTML={{
            __html: `<h3><svg aria-label="SVG Heading alt text"></svg></h3>`,
          }}
        />
        <div
          className="list-item"
          id="headings-empty-headings-success-success-7"
          data-atomic-source="heading-discernible/role-heading-with-content--no-aria-level"
          dangerouslySetInnerHTML={{
            __html: `<div role="heading">Accessible Heading</div>`,
          }}
        />
        <div
          className="list-item"
          id="headings-empty-headings-success-success-8"
          data-atomic-source="heading-discernible/role-heading-with-content"
          dangerouslySetInnerHTML={{
            __html: `<div role="heading" aria-level="1">Some text content</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default EmptyheadingsSuccess;
