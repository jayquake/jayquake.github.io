import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const RegionMainContentMismatchSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Region Main Content Mismatch"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "main landmark by role main", content: `<!DOCTYPE html>
<html>
  <body>
    <header>Header content</header>
    <div role="main">
      <section style="height: 600px;">Nested main content</section>
    </div>
    <footer>Footer content</footer>
  </body>
</html>` },
  { filename: "main landmark", content: `<!DOCTYPE html>
<html>
  <body>
    <header>Header content</header>
    <div style="height: 300px;">Smaller div</div>
    <main id="larger" style="height: 700px;">Larger div</main>
    <footer>Footer content</footer>
  </body>
</html>` }
      ]}
    />
  );
};

export default RegionMainContentMismatchSuccess;
