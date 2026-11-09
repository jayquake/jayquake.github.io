/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): html-lang-valid, html-lang
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Document: Language Report - Success";

const LanguagereportSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="document-language-report-success-success-1"
          data-atomic-source="html-lang-valid/act-test-case-lang-en-US-GB"
          dangerouslySetInnerHTML={{
            __html: `<html lang="en-US-GB">
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
          id="document-language-report-success-success-2"
          data-atomic-source="html-lang-valid/lang-with-3-tags"
          dangerouslySetInnerHTML={{
            __html: `<!--should pass based on W3 because "de-uk-gb" is a valid language tag with primary language subtag "de" (German), region subtag "GB" (United Kingdom), and variant subtag "uk".-->
<!DOCTYPE html>
<html lang="de-uk-gb">
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
          id="document-language-report-success-success-3"
          data-atomic-source="html-lang-valid/page-with-language-and-region"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>Page with language, script and region</title>
</head>
<body>
    <h1>Page with language, script and region</h1>

</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-success-success-4"
          data-atomic-source="html-lang-valid/page-with-language-and-script-and-region-and-variant"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="de-Latn-DE-1996">
<head>
    <title>Page with language, script, region and variant</title>
</head>
<body>
    <h1>Page with language, script, region and variant</h1>

</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-success-success-5"
          data-atomic-source="html-lang-valid/page-with-language-and-script-and-region"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="sr-Latn-RS">
<head>
    <title>Page with language, script and region</title>
</head>
<body>
    <h1>Page with language, script and region</h1>

</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-success-success-6"
          data-atomic-source="html-lang-valid/page-with-language-and-script"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="zh-Hans">
<head>
    <title>Page with language and script</title>
</head>
<body>
    <h1>Page with language and script</h1>

</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-success-success-7"
          data-atomic-source="html-lang-valid/page-with-language-and-variant"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="de-1901">
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
          id="document-language-report-success-success-8"
          data-atomic-source="html-lang-valid/page-with-language-only"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Page with language only</title>
</head>
<body>
    <h1>Page with language only</h1>
</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-success-success-9"
          data-atomic-source="html-lang/page-with-lang-attribute"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Page with lang attribute</title>
</head>
<body>
    <h1>Heading element</h1>
</body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="document-language-report-success-success-10"
          data-atomic-source="html-lang/page-with-lang-set-from-js-api"
          dangerouslySetInnerHTML={{
            __html: `<!DOCTYPE html>
<html>
<head>
    <title>Page with lang set from JS API</title>
    <script>
        document.documentElement.lang = 'en';
    </script>
</head>
<body>
    <h1>Page with lang set from JS API</h1>
</body>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default LanguagereportSuccess;
