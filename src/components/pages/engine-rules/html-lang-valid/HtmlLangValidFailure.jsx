import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const HtmlLangValidFailure = () => {
  const ruleId = "html-lang-valid";
  const title = `HTML lang attribute should have a valid value`;
  const description = `Assigning a valid ISO language value to the <html> lang attribute ensures that screen readers use the correct pronunciation rules, browsers apply proper spell-checking and translation, and search engines index the content in the appropriate language.`;
  const helpText = `Make sure that the lang attribute on the <html> element is assigned a valid ISO language code that matches the default language of the page.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "act test case lang em US", content: `<!--supposed to fail because of typo in the primary tag (em)-->
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
</html>` },
  { filename: "act test case lang eng", content: `<!--supposed to fail because a 3-letter primary tag is rejected-->
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
</html>` },
  { filename: "act test case lang hashtag 1", content: `<!--fail because #1 is not a valid language-->
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
</html>` },
  { filename: "act test case lang i lux", content: `<!--supposed to fail because the primary tag is not 2 letters-->
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
</html>` },
  { filename: "page no lang attribute", content: `<!DOCTYPE html>
<html>
<head>
    <title>Page with no lang attribute</title>
</head>
<body>
    <h1>Heading element</h1>
</body>
</html>` },
  { filename: "page with invalid value 1", content: `<!DOCTYPE html>
<html lang="de--1901">
<head>
    <title>Page with language and variant</title>
</head>
<body>
    <h1>Page with language and variant</h1>

</body>
</html>` },
  { filename: "page with invalid value 2", content: `<!DOCTYPE html>
<html lang="deasd-1901">
<head>
    <title>Page with language and variant</title>
</head>
<body>
    <h1>Page with language and variant</h1>

</body>
</html>` }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default HtmlLangValidFailure;
