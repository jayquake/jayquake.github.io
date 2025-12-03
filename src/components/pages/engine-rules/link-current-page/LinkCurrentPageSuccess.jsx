import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LinkCurrentPageSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Link Current Page"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "a tag aria current page", content: `<a class="current" href="http://127.0.0.1:9000/rules/link-current-page/atomic-tests/pass/a-tag-aria-current-page.html" aria-current="page">current</a>` },
  { filename: "breadcrumb aria current page", content: `<nav aria-label="Breadcrumb" class="breadcrumb">
  <ol>
    <li>
      <a href="../../../../../">Web technology for developers</a>
    </li>
    <li>
      <a href="../../../../">Accessibility</a>
    </li>
    <li>
      <a href="../../../">ARIA</a>
    </li>
    <li>
      <a href="../../">ARIA States and Properties</a>
    </li>
    <li>
      <a class="current" href="http://127.0.0.1:9000/rules/link-current-page/atomic-tests/pass/breadcrumb-aria-current-page.html" aria-current="page">ARIA: \`aria-current\` attribute</a>
    </li>
  </ol>
</nav>` },
  { filename: "div role link aria current page", content: `<div role="link" class="current" href="http://127.0.0.1:9000/rules/link-current-page/atomic-tests/pass/div-role-link-aria-current-page.html" aria-current="page">current</div>` },
  { filename: "nav aria current page", content: `<nav>
  <ul>
    <li><a class="current" id="link-home" href="http://127.0.0.1:9000/rules/link-current-page/atomic-tests/pass/nav-aria-current-page.html" aria-current="page">Home</a></li>
    <li><a href="/">About</a></li>
    <li><a href="/">Contact</a></li>
  </ul>
</nav>` },
  { filename: "no current page", content: `<a href="http://127.0.0.1:9000/rules">no current</a>` }
      ]}
    />
  );
};

export default LinkCurrentPageSuccess;
