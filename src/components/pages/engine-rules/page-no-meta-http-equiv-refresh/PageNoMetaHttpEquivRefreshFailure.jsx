import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const PageNoMetaHttpEquivRefreshFailure = () => {
  const ruleId = "page-no-meta-http-equiv-refresh";
  const title = `Pages should not use <meta http-equiv="refresh"> for automatic redirection or reloading`;
  const description = `A <meta> element with http-equiv="refresh" is sometimes used to automatically redirect users after a time delay. These timed changes can interrupt and disorient users who rely on assistive technology`;
  const helpText = `Remove <meta> elements with http-equiv="refresh". If timed user sessions are necessary, ensure users can extend the session time limit.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "content above 0 and under 72000", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="50000; #" />
    <title>Atomic Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "content above 72000 no url defined", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="73000" />
    <title>Atomic Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "content exactly 72000", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="72000; #" />
    <title>Atomic Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "content has empty value", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="" />
    <title>Atomic Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "content has non numeric value", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="sizar" />
    <title>Atomic Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "content no time with url defined", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="URL='#'" />
    <title>Atomic Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "content timed at 20 seconds", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="20; #" />
    <title>Atomic Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "invalid content definiton", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <!--uses : instead of ;-->
    <meta http-equiv="refresh" content="0: https://w3.org" />
    <title>Atomic Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "page with meta with http equiv refresh with url", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="5;url=#" />
    <title>Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "page with meta with http equiv refresh without url", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="5" />
    <title>Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
    <p1>This is a sentence, hello world, hello world, 123</p1>
  </body>
</html>` },
  { filename: "page with multiple meta with http equiv refresh", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="5; url=#" />
    <meta http-equiv="refresh" content="10" />
    <title>Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
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

export default PageNoMetaHttpEquivRefreshFailure;
