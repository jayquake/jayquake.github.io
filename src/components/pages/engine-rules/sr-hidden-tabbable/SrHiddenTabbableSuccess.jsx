import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const SrHiddenTabbableSuccess = () => {
  const ruleId = "sr-hidden-tabbable";
  const title = `Hidden elements should not be keyboard navigable`;
  const description = `Allowing hidden content to receive keyboard focus creates a confusing tab order, where keyboard users and screen reader users that navigate with the TAB key may encounter interactive controls that are unrelated to the current context.`;
  const helpText = `Use tabindex="-1" to remove elements from the tab order when they should not be exposed to assistive technology. Consider using CSS techniques, such as display:none or visibility:hidden when the content should be hidden from all users.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "button hidden", content: `<button hidden>Not tabbable button</button>` },
  { filename: "form role none", content: `<form role="none">
  <label for="fname">First Name:</label><br />
  <input type="text" id="fname" name="fname" required /><br /><br />

  <label for="lname">Last Name:</label><br />
  <input type="text" id="lname" name="lname" required /><br /><br />

  <label for="address">Address:</label><br />
  <input type="text" id="address" name="address" required /><br /><br />

  <input type="submit" value="Submit" />
</form>` },
  { filename: "form role presentation", content: `<form role="presentation">
  <label for="fname">First Name:</label><br />
  <input type="text" id="fname" name="fname" required /><br /><br />

  <label for="lname">Last Name:</label><br />
  <input type="text" id="lname" name="lname" required /><br /><br />

  <label for="address">Address:</label><br />
  <input type="text" id="address" name="address" required /><br /><br />

  <input type="submit" value="Submit" />
</form>` },
  { filename: "hidden not tabbable", content: `<div hidden>
  <p>This is a paragraph.</p>
</div>` },
  { filename: "hidden with tabindex", content: `<form hidden>
  <label for="fname">First Name:</label><br />
  <input type="text" id="fname" name="fname" required tabindex="-1" /><br /><br />

  <label for="lname">Last Name:</label><br />
  <input type="text" id="lname" name="lname" required tabindex="-1" /><br /><br />

  <label for="address">Address:</label><br />
  <input type="text" id="address" name="address" required tabindex="-1" /><br /><br />

  <input type="submit" value="Submit" tabindex="-1" />
</form>` }
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

export default SrHiddenTabbableSuccess;
