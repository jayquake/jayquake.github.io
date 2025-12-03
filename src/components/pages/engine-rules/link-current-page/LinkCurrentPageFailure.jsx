import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const LinkCurrentPageFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Link Current Page"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "a tag aria current is not page", content: `<a class="current" href="http://127.0.0.1:9000/rules/link-current-page/atomic-tests/fail/a-tag-aria-current-is-not-page.html" aria-current="true">current</a>` },
  { filename: "a tag no aria current page", content: `<a class="current" href="http://127.0.0.1:9000/rules/link-current-page/atomic-tests/fail/a-tag-no-aria-current-page.html">current</a>` },
  { filename: "breadcrumb no aria current page", content: `<nav aria-label="Breadcrumb" class="breadcrumb">
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
      <a class="current" href="http://127.0.0.1:9000/rules/link-current-page/atomic-tests/fail/breadcrumb-no-aria-current-page.html">ARIA: \`aria-current\` attribute</a>
    </li>
  </ol>
</nav>` },
  { filename: "div role link no aria current page", content: `<div role="link" class="current" href="http://127.0.0.1:9000/rules/link-current-page/atomic-tests/fail/div-role-link-no-aria-current-page.html">current</div>` },
  { filename: "nav no aria current page", content: `<nav>
  <ul>
    <li><a class="current" id="link-home" href="http://127.0.0.1:9000/rules/link-current-page/atomic-tests/fail/nav-no-aria-current-page.html">Home</a></li>
    <li><a href="/">About</a></li>
    <li><a href="/">Contact</a></li>
  </ul>
</nav>` }
      ]}
    />
  );
};

export default LinkCurrentPageFailure;
