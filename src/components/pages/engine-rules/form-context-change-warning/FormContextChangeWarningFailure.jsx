import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const FormContextChangeWarningFailure = () => {
  const ruleId = "N/A";
  const title = `N/A`;
  const description = `N/A`;
  const helpText = `N/A`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "button outside div role form  associated to it but its not native form", content: `<div role="form" id="test"></div>

<button type="submit" form="test">hi</button>` },
  { filename: "form with button not calssified as submit", content: `<form>
  <input type="text" />
  <input type="password" />
  <button>Other button</button>
</form>` },
  { filename: "form without submit button", content: `<form>
  <input type="text" />
  <input type="password" />
</form>` },
  { filename: "multiple forms  associated button inside another div role form", content: `<!-- test is skipped due to classifier wrongfully detecting this submit button -->
<div id="submit-1" role="form">
  <input type="text" />
  <input type="password" />
</div>

<form id="missing-submit-2">
  <input type="submit" form="submit-1" />
  <input type="text" />
  <input type="password" />
</form>` },
  { filename: "multiple forms  associated button inside another form", content: `<!-- test is skipped due to classifier wrongfully detecting this submit button -->
<form id="submit-1" role="form">
  <input type="text" />
  <input type="password" />
</form>

<form id="missing-submit-2">
  <input type="submit" form="submit-1" />
  <input type="text" />
  <input type="password" />
</form>` },
  { filename: "multiple forms one without submit button", content: `<form id="submit-1">
  <input type="text" />
  <input type="password" />
  <input type="submit">
</form>
<form id="missing-submit-2">
  <input type="text" />
  <input type="password" />
</form>` },
  { filename: "multiple forms only one with associated submit button", content: `<form id="submit-1">
  <input type="text" />
  <input type="password" />
</form>
<input type="submit" form="submit-1" />
<form id="missing-submit-2">
  <input type="text" />
  <input type="password" />
</form>` },
  { filename: "multiple forms without submit button", content: `<form id="missing-submit-1">
  <input type="text" />
  <input type="password" />
</form>
<form id="missing-submit-2">
  <input type="text" />
  <input type="password" />
</form>` },
  { filename: "sr only warning hidden from screen reader", content: `<!-- The warning text sits inside an sr-only element but under aria-hidden, so a screen reader never announces it. -->
<form><input type="text"><span data-acsb-sr-only="true" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;">Note: <span aria-hidden="true">filling out the following fields will automatically submit the form</span></span></form>` }
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

export default FormContextChangeWarningFailure;
