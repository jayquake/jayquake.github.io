import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const SrHiddenTabbableSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Sr Hidden Tabbable"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
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
      ]}
    />
  );
};

export default SrHiddenTabbableSuccess;
