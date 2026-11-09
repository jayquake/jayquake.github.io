/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): html-lang-valid, html-lang
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Document: Language Report - Failure";

const LanguagereportFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="document-language-report-failure-failure-1"
          data-atomic-source="html-lang-valid/act-test-case-lang-em-US"
          dangerouslySetInnerHTML={{
            __html: `<!--supposed to fail because of typo in the primary tag (em)-->
<html lang="em-US">
  <head>
    <script src="http://localhost:9002/app.js" async=""></script>
    <style id="jc-autofill-preloader-styles">
      .jc-autofill-preloader {
        position: absolute;
        cursor: pointer;
        z-index: 999999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease, transform 0.15s ease;
        background: transparent;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .jc-autofill-preloader:hover {
        opacity: 1 !important;
        visibility: visible !important;
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .jc-autofill-preloader img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    </style>
  </head>
  <body></body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-failure-failure-2"
          data-atomic-source="html-lang-valid/act-test-case-lang-eng"
          dangerouslySetInnerHTML={{
            __html: `<!--supposed to fail because a 3-letter primary tag is rejected-->
<html lang="eng">
  <head>
    <script src="http://localhost:9002/app.js" async=""></script>
    <style id="jc-autofill-preloader-styles">
      .jc-autofill-preloader {
        position: absolute;
        cursor: pointer;
        z-index: 999999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease, transform 0.15s ease;
        background: transparent;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .jc-autofill-preloader:hover {
        opacity: 1 !important;
        visibility: visible !important;
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .jc-autofill-preloader img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    </style>
  </head>
  <body>
    <p lang="en">I love ACT rules!</p>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-failure-failure-3"
          data-atomic-source="html-lang-valid/act-test-case-lang-hashtag-1"
          dangerouslySetInnerHTML={{
            __html: `<!--fail because #1 is not a valid language-->
<html lang="#1">
  <head>
    <script src="http://localhost:9002/app.js" async=""></script>
    <style id="jc-autofill-preloader-styles">
      .jc-autofill-preloader {
        position: absolute;
        cursor: pointer;
        z-index: 999999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease, transform 0.15s ease;
        background: transparent;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .jc-autofill-preloader:hover {
        opacity: 1 !important;
        visibility: visible !important;
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .jc-autofill-preloader img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    </style>
  </head>
  <body></body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-failure-failure-4"
          data-atomic-source="html-lang-valid/act-test-case-lang-i-lux"
          dangerouslySetInnerHTML={{
            __html: `<!--supposed to fail because the primary tag is not 2 letters-->
<html lang="i-lux">
  <head>
    <script src="http://localhost:9002/app.js" async=""></script>
    <style id="jc-autofill-preloader-styles">
      .jc-autofill-preloader {
        position: absolute;
        cursor: pointer;
        z-index: 999999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s ease, transform 0.15s ease;
        background: transparent;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .jc-autofill-preloader:hover {
        opacity: 1 !important;
        visibility: visible !important;
        transform: scale(1.05);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .jc-autofill-preloader img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    </style>
  </head>
  <body>
    <p lang="lb">Lëtzebuerg ass e Land an Europa.</p>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-failure-failure-5"
          data-atomic-source="html-lang-valid/page-no-lang-attribute"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html>
<head>
    <title>Page with no lang attribute</title>
</head>
<body>
    <h1>Heading element</h1>
</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-failure-failure-6"
          data-atomic-source="html-lang-valid/page-with-invalid-value-1"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="de--1901">
<head>
    <title>Page with language and variant</title>
</head>
<body>
    <h1>Page with language and variant</h1>

</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-failure-failure-7"
          data-atomic-source="html-lang-valid/page-with-invalid-value-2"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="deasd-1901">
<head>
    <title>Page with language and variant</title>
</head>
<body>
    <h1>Page with language and variant</h1>

</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-failure-failure-8"
          data-atomic-source="html-lang/page-no-lang-attribute"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html>
<head>
    <title>Page with no lang attribute</title>
</head>
<body>
    <h1>Heading element</h1>
</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-failure-failure-9"
          data-atomic-source="html-lang/page-whitespace-lang-attribute"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang=" ">
<head>
    <title>Page with whitespace lang attribute</title>
</head>
<body>
    <h1>Heading element</h1>
</body>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default LanguagereportFailure;
