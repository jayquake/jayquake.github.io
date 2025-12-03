import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const FormDuplicateIdFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Form Duplicate Id"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "duplicate ids form and fields", content: `<form id="form">
  <input id="form" type="text" />
  <input type="password" />
  <button>submit</button>
</form>` },
  { filename: "duplicate ids in form fields", content: `<form>
  <input id="name" type="text" />
  <input id="name" type="password" />
  <button>Not a submit button</button>
</form>` },
  { filename: "duplicate ids in forms", content: `<form id="form">
  <input type="text" />
  <input type="password" />
  <button>submit</button>
</form>

<form id="form">
  <input type="text" />
  <input type="number" />
  <button>clear</button>
</form>` }
      ]}
    />
  );
};

export default FormDuplicateIdFailure;
