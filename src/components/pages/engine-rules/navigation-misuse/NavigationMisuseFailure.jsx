import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const NavigationMisuseFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Navigation Misuse"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "nav element is container of nav container", content: `<div>
  <nav>
    <div>
      <ul>
        <li>
          <a href="#main-content">Skip to main content</a>
        </li>
        <li>
          <a href="#footer">Skip to footer</a>
        </li>
      </ul>
    </div>
    <p>some text in here</p>
  </nav>
</div>` },
  { filename: "nav is used as container of no list menus", content: `<div>
  <nav>
    <h1>Page header</h1>
    <div>
      <article>
        <h2>Article header</h2>
        <p>Article content</p>
      </article>
    </div>
  </nav>
</div>` }
      ]}
    />
  );
};

export default NavigationMisuseFailure;
