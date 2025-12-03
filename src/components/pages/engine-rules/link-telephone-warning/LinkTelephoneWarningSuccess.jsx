import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LinkTelephoneWarningSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Link Telephone Warning"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "link tel sr element", content: `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>
<p>
  <a href="tel:0000000001" id="tel-link"
    >Call us now at 000-000-0001
    <span id="tel-desc" class="sr-only">Opens phone app</span>
  </a>
</p>` },
  { filename: "link tel with aria describedby", content: `<p>
  <a href="tel:0000000001" id="tel-link" aria-describedby="tel-desc">Call us now at 000-000-0001</a>
</p>
<p id="tel-desc">Opens phone.</p>` },
  { filename: "link tel with aria label", content: `<p>
  <a href="tel:0000000001" aria-label="call us now | Opens dialer app">Call us now at 000-000-0001 </a>
</p>` },
  { filename: "link tel with aria labelledby", content: `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>
<p>
  <a href="tel:0000000001" id="tel-link" aria-labelledby="tel-desc">Call us now at 000-000-0001 </a>
  <span id="tel-desc" class="sr-only">Opens Dialer</span>
</p>` },
  { filename: "remediated link tel", content: `<html lang="de">
  <a href="tel:0000000001">Call<span data-acsb-sr-only="true" class="acsb-sr-only" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important"> | Öffnet Telefon</span></a>
</html>` }
      ]}
    />
  );
};

export default LinkTelephoneWarningSuccess;
