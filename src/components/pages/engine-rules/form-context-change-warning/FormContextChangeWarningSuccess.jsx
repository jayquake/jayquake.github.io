import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const FormContextChangeWarningSuccess = () => {
  const ruleId = "N/A";
  const title = `N/A`;
  const description = `N/A`;
  const helpText = `N/A`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "button not inside form but associated to it", content: `<form id="test"></form>

<button type="submit" form="test">hi</button>` },
  { filename: "form with submit button", content: `<form>
  <input type="text" />
  <input type="password" />
  <button type="submit">Confirm</button>
</form>` },
  { filename: "form with submit input", content: `<form>
  <input type="text" />
  <input type="password" />
  <input type="submit" />
</form>` },
  { filename: "hidden form without submit button", content: `<form style="display: none">
  <input type="text" />
  <input type="password" />
</form>` },
  { filename: "input type image", content: `<form>
  <input type="image" />
</form>` },
  { filename: "remediated form with aria label", content: `<form aria-label="Contact Please note, filling out the following fields will automatically submit the form"><input type="text"></form>` },
  { filename: "remediated form with aria labelledby", content: `<form aria-labelledby="t sro-1"><h2 id="t">Contact</h2><input type="text"><span data-acsb-sr-only="true" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;" id="sro-1">Please note, filling out the following fields will automatically submit the form</span></form>` },
  { filename: "remediated form with sr only warning", content: `<form><input type="text"><span data-acsb-sr-only="true" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;">Please note, filling out the following fields will automatically submit the form</span></form>` }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default FormContextChangeWarningSuccess;
