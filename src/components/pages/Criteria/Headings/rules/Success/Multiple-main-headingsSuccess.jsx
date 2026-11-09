/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): heading-single-h1
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Headings: Multiple Main Headings - Success";

const MultiplemainheadingsSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="headings-multiple-main-headings-success-success-1"
          data-atomic-source="heading-single-h1/no-h1"
          dangerouslySetInnerHTML={{
            __html: `<div></div>`,
          }}
        />
        <div
          className="list-item"
          id="headings-multiple-main-headings-success-success-2"
          data-atomic-source="heading-single-h1/single-aria-level-1"
          dangerouslySetInnerHTML={{
            __html: `<div role="heading" aria-level="1">Heading element</div>`,
          }}
        />
        <div
          className="list-item"
          id="headings-multiple-main-headings-success-success-3"
          data-atomic-source="heading-single-h1/single-h1"
          dangerouslySetInnerHTML={{
            __html: `<h1>Heading element</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-multiple-main-headings-success-success-4"
          data-atomic-source="heading-single-h1/two-h1-first-visibility-hidden-second-visible"
          dangerouslySetInnerHTML={{
            __html: `<h1 id="hiddenHeading" style="visibility: hidden">Hidden heading</h1>
<h1 id="visibleHeading">Visible heading</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-multiple-main-headings-success-success-5"
          data-atomic-source="heading-single-h1/two-h1-one-with-aria-level-2"
          dangerouslySetInnerHTML={{
            __html: `<h1>Heading element</h1>
<h1 aria-level="2">Heading element</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-multiple-main-headings-success-success-6"
          data-atomic-source="heading-single-h1/two-h1-switch-visibility-between-desktop-and-mobile"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #mobileHeading {
    display: none;
  }

  @media (max-width: 767px) {
    #mobileHeading {
      display: block;
    }

    #desktopHeading {
      display: none;
    }
  }
</style>

<h1 id="mobileHeading">Mobile heading</h1>
<h1 id="desktopHeading">Desktop heading</h1>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MultiplemainheadingsSuccess;
