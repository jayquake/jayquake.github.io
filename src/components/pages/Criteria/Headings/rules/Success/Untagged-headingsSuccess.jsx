/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): heading-mismatch
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Headings: Untagged Headings - Success";

const UntaggedheadingsSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="headings-untagged-headings-success-success-1"
          data-atomic-source="heading-mismatch/h1-sr-only"
          dangerouslySetInnerHTML={{
            __html: `<style>
    body {
        font-size: 16px;
        font-weight: 400;
    }
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

<h1 class="sr-only">Heading element</h1>`,
          }}
        />
        <div
          className="list-item"
          id="headings-untagged-headings-success-success-2"
          data-atomic-source="heading-mismatch/native-html-headers"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <h1>Regular H1 Heading</h1>
    <h2>Regular H2 Heading</h2>
    <h3>Regular H3 Heading</h3>
    <h4>Regular H4 Heading</h4>
    <h5>Regular H5 Heading</h5>
    <h6>Regular H6 Heading</h6>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="headings-untagged-headings-success-success-3"
          data-atomic-source="heading-mismatch/no-perceivable-heading-too-long"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <style>
      body {
        font-size: 16px;
        font-weight: 400;
      }
      .too-long {
        font-size: 22px;
        font-weight: 500;
      }
    </style>

    <div class="too-long">This heading text is intentionally longer than sixty characters to test the limit.</div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="headings-untagged-headings-success-success-4"
          data-atomic-source="heading-mismatch/no-perceivable-heading-too-small"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <style>
      body {
        font-size: 16px;
        font-weight: 400;
      }
      .too-small {
        font-size: 14px; /* Smaller than the base size */
        font-weight: 500;
      }
    </style>

    <div class="too-small">Text with too small font</div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="headings-untagged-headings-success-success-5"
          data-atomic-source="heading-mismatch/perceivable-heading-has-role-heading-and-aria-level"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <style>
      body {
        font-size: 16px;
        font-weight: 400;
      }
      .text-xl {
        font-size: 20px;
        font-weight: 400;
      }
    </style>
    <div class="text-xl" role="heading" aria-level="1">Big Heading</div>
    <p>Regular body text</p>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="headings-untagged-headings-success-success-6"
          data-atomic-source="heading-mismatch/perceivable-heading-has-role-heading-but-no-aria-level"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <style>
      body {
        font-size: 16px;
        font-weight: 400;
      }
      .text-xl {
        font-size: 20px;
        font-weight: 400;
      }
    </style>

    <div class="text-xl" role="heading">Big Heading</div>
    <p>Regular body text</p>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="headings-untagged-headings-success-success-7"
          data-atomic-source="heading-mismatch/perceivable-heading-with-native-header-tag"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <style>
      body {
        font-size: 16px;
        font-weight: 400;
      }
      .text-xl {
        font-size: 20px;
        font-weight: 400;
      }
    </style>
    <h4 class="text-xl">Big Heading</h4>
    <p>Regular body text</p>
  </body>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default UntaggedheadingsSuccess;
