import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const HtmlLangValidSuccess = () => {
  const ruleId = "html-lang-valid";
  const title = `HTML lang attribute should have a valid value`;
  const description = `Assigning a valid ISO language value to the <html> lang attribute ensures that screen readers use the correct pronunciation rules, browsers apply proper spell-checking and translation, and search engines index the content in the appropriate language.`;
  const helpText = `Make sure that the lang attribute on the <html> element is assigned a valid ISO language code that matches the default language of the page.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "act test case lang en US GB", content: `<html lang="en-US-GB">
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
  { filename: "lang with 3 tags", content: `<!--should pass based on W3 because "de-uk-gb" is a valid language tag with primary language subtag "de" (German), region subtag "GB" (United Kingdom), and variant subtag "uk".-->
<!DOCTYPE html>
<html lang="de-uk-gb">
  <head>
    <title>Page with language and variant</title>
  </head>
  <body>
    <h1>Page with language and variant</h1>
  </body>
</html>` },
  { filename: "page with language and region", content: `<!DOCTYPE html>
<html lang="en-US">
<head>
    <title>Page with language, script and region</title>
</head>
<body>
    <h1>Page with language, script and region</h1>

</body>
</html>` },
  { filename: "page with language and script and region and variant", content: `<!DOCTYPE html>
<html lang="de-Latn-DE-1996">
<head>
    <title>Page with language, script, region and variant</title>
</head>
<body>
    <h1>Page with language, script, region and variant</h1>

</body>
</html>` },
  { filename: "page with language and script and region", content: `<!DOCTYPE html>
<html lang="sr-Latn-RS">
<head>
    <title>Page with language, script and region</title>
</head>
<body>
    <h1>Page with language, script and region</h1>

</body>
</html>` },
  { filename: "page with language and script", content: `<!DOCTYPE html>
<html lang="zh-Hans">
<head>
    <title>Page with language and script</title>
</head>
<body>
    <h1>Page with language and script</h1>

</body>
</html>` },
  { filename: "page with language and variant", content: `<!DOCTYPE html>
<html lang="de-1901">
<head>
    <title>Page with language and variant</title>
</head>
<body>
    <h1>Page with language and variant</h1>

</body>
</html>` },
  { filename: "page with language only", content: `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Page with language only</title>
</head>
<body>
    <h1>Page with language only</h1>
</body>
</html>` }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default HtmlLangValidSuccess;
