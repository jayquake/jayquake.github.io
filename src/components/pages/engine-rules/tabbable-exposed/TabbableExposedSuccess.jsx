import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const TabbableExposedSuccess = () => {
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
  { filename: "button hidden", content: `<button hidden>Not tabbable button</button>` },
  { filename: "form hidden", content: `<form hidden>
  <label for="fname">First Name:</label><br />
  <input type="text" id="fname" name="fname" required /><br /><br />

  <label for="lname">Last Name:</label><br />
  <input type="text" id="lname" name="lname" required /><br /><br />

  <label for="address">Address:</label><br />
  <input type="text" id="address" name="address" required /><br /><br />

  <input type="submit" value="Submit" />
</form>` },
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
</form>` },
  { filename: "w3c passed example 4 focus sentinel", content: `<!-- W3C ACT 6cfa84: Passed Example 4 -->
<!-- TODO: currently skipped because we don't have the capability of detecting focus sentinels -->
<div id="sample-modal" role="dialog" aria-label="Sample Modal" aria-modal="true" style="border: solid black 1px; padding: 1rem">
  <label>First and last name <input id="dialog-first" /></label><br />
  <button id="close-button">Close button</button>
</div>
<div aria-hidden="true">
  <a href="#" id="sentinel-after" style="position: absolute; top: -999em">Upon receiving focus, this focus sentinel should wrap focus to the top of the modal</a>
</div>
<script>
  document.getElementById("sentinel-after").addEventListener("focus", () => {
    document.getElementById("dialog-first").focus();
  });
  document.getElementById("close-button").addEventListener("click", () => {
    document.getElementById("sample-modal").style.display = "none";
  });
</script>` },
  { filename: "w3c passed example 6 focusable ancestor", content: `<!-- W3C ACT 6cfa84: Passed Example 6 -->
<a href="#" id="act-link">
  <svg width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="11" r="4" stroke="black" stroke-width="2" fill="transparent" />
  </svg>
  Hello ACT
</a>` }
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

export default TabbableExposedSuccess;
