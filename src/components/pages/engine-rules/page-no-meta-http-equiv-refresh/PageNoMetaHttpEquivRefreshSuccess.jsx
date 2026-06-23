import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const PageNoMetaHttpEquivRefreshSuccess = () => {
  const ruleId = "page-no-meta-http-equiv-refresh";
  const title = `Pages should not use <meta http-equiv="refresh"> for automatic redirection or reloading`;
  const description = `A <meta> element with http-equiv="refresh" is sometimes used to automatically redirect users after a time delay. These timed changes can interrupt and disorient users who rely on assistive technology`;
  const helpText = `Remove <meta> elements with http-equiv="refresh". If timed user sessions are necessary, ensure users can extend the session time limit.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "content above 72000 with js url", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="72001; URL='javascript:#'" />
    <title>Atomic Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "content above 72000 with url", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="refresh" content="72001; URL='#'" />
    <title>Atomic Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "page with no meta with http equiv refresh", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
  </body>
</html>` },
  { filename: "page with no meta", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Test Page</title>
  </head>
  <body>
    <p>Content of the page</p>
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

export default PageNoMetaHttpEquivRefreshSuccess;
