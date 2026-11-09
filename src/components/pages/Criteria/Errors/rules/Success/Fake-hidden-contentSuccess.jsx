/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): visibility-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Errors: Fake Hidden Content - Success";

const FakehiddencontentSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-1"
          data-atomic-source="visibility-misuse/div-clipped-content"
          dangerouslySetInnerHTML={{
            __html: `<!-- The element is inapplicable because it is detected as SR-Only -->

<div style="clip: rect(1px, 1px, 1px, 1px); position: absolute;">Hidden text</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-2"
          data-atomic-source="visibility-misuse/div-opacity-0-position-absolute"
          dangerouslySetInnerHTML={{
            __html: `<!-- The element is inapplicable because it is detected as SR-Only -->

<div style="opacity: 0; position: absolute;">Hidden message</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-3"
          data-atomic-source="visibility-misuse/div-position-absolute-left-negative-9999px"
          dangerouslySetInnerHTML={{
            __html: `<!-- The element is inapplicable because it is detected as SR-Only -->

<div style="position: absolute; left: -9999px">Visually hidden</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-4"
          data-atomic-source="visibility-misuse/element-parent-of-hidden-element"
          dangerouslySetInnerHTML={{
            __html: `<div id="target">
  <div hidden>123</div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-5"
          data-atomic-source="visibility-misuse/element-with-display-none"
          dangerouslySetInnerHTML={{
            __html: `<div style="display: none">Some invisible content</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-6"
          data-atomic-source="visibility-misuse/element-with-nested-sr-only-element"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head>
    <style>
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    </style>
  </head>
  <body>
    <div><span class="sr-only">is being skipped</span></div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-7"
          data-atomic-source="visibility-misuse/element-with-sr-only-content"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head>
    <style>
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    </style>
  </head>
  <body>
    <div>test<span class="sr-only">is being skipped</span></div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-8"
          data-atomic-source="visibility-misuse/element-with-visibility-hidden"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <div style="visibility: hidden">
      <span style="visibility: visible"> Some visible content </span>
    </div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-9"
          data-atomic-source="visibility-misuse/empty-div"
          dangerouslySetInnerHTML={{
            __html: `<div></div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-10"
          data-atomic-source="visibility-misuse/image-with-alt-no-src"
          dangerouslySetInnerHTML={{
            __html: `<button tabindex="-1" role="button" type="button" class="oke-media-link">
  <img alt="Customer-uploaded image, show more details" draggable="false" class="oke-media-image" style="opacity: 0" />
</button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-11"
          data-atomic-source="visibility-misuse/nested-sr-only-element"
          dangerouslySetInnerHTML={{
            __html: `<a
  href="https://accessibe.com/blog/knowledgebase/screen-reader-guide"
  target="_blank"
  rel="noopener"
  data-acsb="sr-trigger"
  data-acsb-sr-only="true"
  class="acsb-sr-only"
  style="position: absolute; width: 200px; height: 1px; margin-top: -1px; z-index: -1; border: 0px; top: 0px; left: 0px; overflow: hidden; outline: 0px"
  data-custom-button-processed="true"
>
  Accessibility Screen-Reader Guide, Feedback, and Issue Reporting
  <span data-acsb-sr-only="true" class="acsb-sr-only" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important"> | New Window</span>
</a>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-12"
          data-atomic-source="visibility-misuse/out-of-screen-with-aria-hidden"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head>
    <style>
      .out-of-screen {
        position: absolute;
        left: -9999px;
      }
    </style>
  </head>
  <body>
    <div class="out-of-screen" aria-hidden="true">Some invisible content</div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-13"
          data-atomic-source="visibility-misuse/out-of-viewport-element"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head>
    <style>
      .out-of-screen {
        position: absolute;
        left: -9999px;
      }
    </style>
  </head>
  <body>
    <!-- why is it detected as screen reader only?  -->
    <div class="out-of-screen">This text is still visible to screen reader</div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-14"
          data-atomic-source="visibility-misuse/slot-with-assigned-content"
          dangerouslySetInnerHTML={{
            __html: `<!--
  This test shows that even though a slot element doesn't have children in the DOM,
  it can still have assigned content which it adopts as it's children in the
  accessibility tree. If the slot is marked as aria-hidden, then the content that
  is assigned (in this case the div) will also be hidden from the screen reader.
 -->


<custom-element>
  <template shadowrootmode="open"><slot></slot></template>
  <div>
    This is shadow dom content. If the slot element is marked as aria-hidden.
    This content will also be hidden from the screen reader!
  </div>
</custom-element>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-15"
          data-atomic-source="visibility-misuse/visible-element-in-hidden-element"
          dangerouslySetInnerHTML={{
            __html: `<div id="parent" style="height: 0.5px; width: 0.5px; overflow: hidden">
    <div id="child" style="position: fixed">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.83 3.296a2.452 2.452 0 0 1 2.339 0c.36.195.665.48.882.831l7.615 12.392a2.247 2.247 0 0 1 .002 2.35 2.347 2.347 0 0 1-.882.834c-.36.196-.763.297-1.17.297H4.384c-.408 0-.811-.101-1.17-.297a2.347 2.347 0 0 1-.883-.834 2.247 2.247 0 0 1 .002-2.35L9.95 4.127c.217-.351.523-.636.882-.831ZM12 9a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Zm1 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
              fill="currentColor"
            ></path>
        </svg>
    </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-16"
          data-atomic-source="visibility-misuse/zero-opacity-with-aria-hidden"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <div style="opacity: 0" aria-hidden="true">Some invisible content</div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="errors-fake-hidden-content-success-success-17"
          data-atomic-source="visibility-misuse/zoomed-out-element-to-invisible-size"
          dangerouslySetInnerHTML={{
            __html: `<div aria-hidden="true">1</div>

<style>
  body {
    margin: 0;
    zoom: 0.5;
  }

  div {
    background-color: red;
    height: 5px;
    width: 5px;
  }
</style>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FakehiddencontentSuccess;
