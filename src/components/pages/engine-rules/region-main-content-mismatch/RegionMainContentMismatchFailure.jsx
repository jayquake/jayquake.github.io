import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const RegionMainContentMismatchFailure = () => {
  const ruleId = "region-main-content-mismatch";
  const title = `All of the main content on the page is contained in the main landmark`;
  const description = `The main landmark represents the primary content of a page. It should include only content unique to that page and must remain separate from repeated elements, such as navigation, header, or footer.`;
  const helpText = `Avoid nesting <main> or elements with role="main" and other landmark or sectioning elements such as <header>, <footer>, <nav>, <article>, or <aside> (including elements with respective ARIA roles). Ensure that the main landmark contains all of the main content, and it is not enclosing the entire HTML document or positioned outside the primary content area.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "landmark no role", content: `<!DOCTYPE html>
<html>
  <body>
    <header>Header content</header>
    <div style="height: 300px;">Smaller div</div>
    <div id="larger" style="height: 700px;">Larger div</div>
    <footer>Footer content</footer>
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

export default RegionMainContentMismatchFailure;
