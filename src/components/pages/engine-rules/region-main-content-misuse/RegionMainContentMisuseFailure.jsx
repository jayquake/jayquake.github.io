import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const RegionMainContentMisuseFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Region Main Content Misuse"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "full page main", content: `<!DOCTYPE html>
<html>
  <body style="margin: 0">
    <div role="main" style="height: 100vh">Full page content block</div>
  </body>
</html>` },
  { filename: "incorrect main", content: `<!DOCTYPE html>
<html>
  <body>
    <header>Header content</header>
    <main style="height: 300px">Smaller div</main>
    <div id="larger" style="height: 700px">Larger div</div>
    <footer>Footer content</footer>
  </body>
</html>` }
      ]}
    />
  );
};

export default RegionMainContentMisuseFailure;
