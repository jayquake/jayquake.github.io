import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const AriaDescribedbyHasReferenceSuccess = () => {
  const ruleId = "aria-describedby-has-reference";
  const title = `aria-describedby should reference a valid element id`;
  const description = `If an element’s aria-describedby attribute points to an id that does not exist or is not valid, assistive technologies will not convey the intended description, causing users to miss important context.`;
  const helpText = `Ensure aria-describedby references an existing, unique id on the page. Remove or update the attribute if the target element is missing or no longer relevant.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "input with aria describedby and matching element", content: `<input aria-describedby="description" />
<div id="description">Some description</div>` },
  { filename: "input without aria references", content: `<input aria-label="label" />` },
  { filename: "multiple inputs with labelledby and describedby with matching element", content: `<input id="describedby-by" aria-describedby="description" />
<div id="description">Some description</div>
<input id="describedby-by-2" aria-describedby="description-2" />
<div id="description-2">Some description</div>` }
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

export default AriaDescribedbyHasReferenceSuccess;
