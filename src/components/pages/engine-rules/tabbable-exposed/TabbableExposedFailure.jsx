import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TabbableExposedFailure = () => {
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
  { filename: "form aria hidden", content: `<form aria-hidden="true">
  <label for="fname">First Name:</label><br />
  <input type="text" id="fname" name="fname" required /><br /><br />

  <label for="lname">Last Name:</label><br />
  <input type="text" id="lname" name="lname" required /><br /><br />

  <label for="address">Address:</label><br />
  <input type="text" id="address" name="address" required /><br /><br />

  <input type="submit" value="Submit" />
</form>` },
  { filename: "w3c failed example 1 offscreen link", content: `<!-- W3C ACT 6cfa84: Failed Example 1 -->
<div aria-hidden="true">
  <a href="/" id="offscreen-link" style="position: absolute; top: -999em">Link</a>
</div>` },
  { filename: "w3c failed example 2 aria disabled input", content: `<!-- W3C ACT 6cfa84: Failed Example 2 -->
<div aria-hidden="true">
  <input id="aria-disabled-input" aria-disabled="true" />
</div>` },
  { filename: "w3c failed example 3 ancestor aria hidden", content: `<!-- W3C ACT 6cfa84: Failed Example 3 -->
<div aria-hidden="true">
  <div aria-hidden="false">
    <button id="nested-aria-hidden-button">Some button</button>
  </div>
</div>` },
  { filename: "w3c failed example 4 tabindex zero", content: `<!-- W3C ACT 6cfa84: Failed Example 4 -->
<p id="tabindexed-paragraph" tabindex="0" aria-hidden="true">Some text</p>` },
  { filename: "w3c failed example 5 summary", content: `<!-- W3C ACT 6cfa84: Failed Example 5 -->
<details aria-hidden="true">
  <summary id="hidden-summary">Some button</summary>
  <p>Some details</p>
</details>` },
  { filename: "w3c failed example 6 unhandled focus sentinel", content: `<!-- W3C ACT 6cfa84: Failed Example 6 -->
<div id="sample-modal" role="dialog" aria-label="Sample Modal" aria-modal="true" style="border: solid black 1px; padding: 1rem">
  <label>First and last name <input id="dialog-first" /></label><br />
  <button id="close-button">Close button</button>
</div>
<div aria-hidden="true">
  <a href="#" id="sentinel-after" style="position: absolute; top: -999em">Upon receiving focus, this focus sentinel should wrap focus to the top of the modal</a>
</div>
<script>
  document.getElementById("close-button").addEventListener("click", () => {
    document.getElementById("sample-modal").style.display = "none";
  });
</script>` }
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

export default TabbableExposedFailure;
