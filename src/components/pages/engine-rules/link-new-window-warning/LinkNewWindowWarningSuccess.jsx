import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LinkNewWindowWarningSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Link New Window Warning"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "link with target blank aria label with new window", content: `<a href="path/to/page" target="_blank" aria-label="link to new window">link to somewhere</a>` },
  { filename: "link with target blank content with hebrew new window", content: `<html lang="he">
    <a href="path/to/page" target="_blank">לינק לחלון חדש</a>
</html>` },
  { filename: "link with target blank content with new tab", content: `<a href="path/to/page" target="_blank">link to new tab</a>` },
  { filename: "link with target blank content with new window", content: `<a href="path/to/page" target="_blank">link to new Window</a>` },
  { filename: "link with target blank content with separate tab", content: `<a href="path/to/page" target="_blank">link to separate tab</a>` },
  { filename: "link with target blank content with separate window", content: `<a href="path/to/page" target="_blank">link to separate tab</a>` },
  { filename: "link with target self", content: `<a href="path/to/page" target="_self">link to somewhere</a>` }
      ]}
    />
  );
};

export default LinkNewWindowWarningSuccess;
