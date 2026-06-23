import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const NavigationMisuseFailure = () => {
  const ruleId = "navigation-misuse";
  const title = `Navigation landmark does not contain key site navigation links`;
  const description = `A navigation landmark should identify a section that contains primary links for moving through the site or page. Using navigation landmarks for minor or secondary link groups makes it harder for screen reader users to locate the page’s key navigation areas.`;
  const helpText = `Use navigation landmarks only for key navigation sections, such as the main site menu, table of contents, breadcrumbs, or pagination. Avoid using them for general link lists, social links, related links, or other secondary link groups, and keep the number of navigation landmarks as limited as practical.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
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

export default NavigationMisuseFailure;
