import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const RegionFooterMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Region Footer Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "landmark no role", content: `<!DOCTYPE html>
<html>
  <body>
    <header>Header content</header>
    <div style="height: 300px;">Smaller div</div>
    <div id="larger" style="height: 700px;">Larger div</div>
    <div class="footer">Footer content</div>
  </body>
</html>` }
      ]}
    />
  );
};

export default RegionFooterMismatchFailure;
