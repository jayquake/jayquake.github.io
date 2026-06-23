import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const RegionFooterMismatchFailure = () => {
  const ruleId = "region-footer-mismatch";
  const title = `Global site information that appears at the end of each page is contained in a contentinfo landmark (footer)`;
  const description = `The contentinfo region, typically represented by the <footer> element, is found at the end of each page and provides screen reader users with information about the website, such as copyright, contact details, legal information, and navigation links.`;
  const helpText = `Use a <footer> element or assign role="contentinfo" to the section that provides global information and consistently appears at the end of each page.`;
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
    <div class="footer">Footer content</div>
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

export default RegionFooterMismatchFailure;
