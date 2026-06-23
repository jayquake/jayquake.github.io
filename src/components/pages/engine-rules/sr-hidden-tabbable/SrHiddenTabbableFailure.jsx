import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const SrHiddenTabbableFailure = () => {
  const ruleId = "sr-hidden-tabbable";
  const title = `Hidden elements should not be keyboard navigable`;
  const description = `Allowing hidden content to receive keyboard focus creates a confusing tab order, where keyboard users and screen reader users that navigate with the TAB key may encounter interactive controls that are unrelated to the current context.`;
  const helpText = `Use tabindex="-1" to remove elements from the tab order when they should not be exposed to assistive technology. Consider using CSS techniques, such as display:none or visibility:hidden when the content should be hidden from all users.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "form aria hidden", content: `<form aria-hidden="true">
  <label for="fname">First Name:</label><br />
  <input type="text" id="fname" name="fname" required /><br /><br />

  <label for="lname">Last Name:</label><br />
  <input type="text" id="lname" name="lname" required /><br /><br />

  <label for="address">Address:</label><br />
  <input type="text" id="address" name="address" required /><br /><br />

  <input type="submit" value="Submit" />
</form>` },
  { filename: "form hidden", content: `<form hidden>
  <label for="fname">First Name:</label><br />
  <input type="text" id="fname" name="fname" required /><br /><br />

  <label for="lname">Last Name:</label><br />
  <input type="text" id="lname" name="lname" required /><br /><br />

  <label for="address">Address:</label><br />
  <input type="text" id="address" name="address" required /><br /><br />

  <input type="submit" value="Submit" />
</form>` }
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

export default SrHiddenTabbableFailure;
