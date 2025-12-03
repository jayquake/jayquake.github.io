import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LinkPdfWarningSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Link Pdf Warning"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "link pdf acsb sr element", content: `<a href="aaa.pdf" id="pdf-link">
  link
  <span data-acsb-sr-only="true" class="acsb-sr-only" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important">this link Opens PDF</span>
</a>` },
  { filename: "link pdf sr element", content: `<style>
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
  <a href="file.pdf" id="pdf-link"
    > view
  <span id="pdf-desc" class="sr-only">PDF</span>
</a>
</p>` },
  { filename: "link pdf with aria describedby", content: `<p>
  <a href="file.pdf" id="pdf-link" aria-describedby="pdf-desc">link</a>
</p>
<p id="pdf-desc">Opens PDF</p>` },
  { filename: "link pdf with aria label", content: `<p>
  <a href="pdf-file.pdf" aria-label="downloads pdf file">Open</a>
</p>` },
  { filename: "link pdf with aria labelledby", content: `<p>
  <a href=".pdf" id="pdf-link" aria-labelledby="pdf-desc">Opens</a>
  <span id="pdf-desc">This link opens pdf application.</span>
</p>` },
  { filename: "non pdf link", content: `<a href="malware.zip" id="pdf-link">
  Please click here
</a>` }
      ]}
    />
  );
};

export default LinkPdfWarningSuccess;
