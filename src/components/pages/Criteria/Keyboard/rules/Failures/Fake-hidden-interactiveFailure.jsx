/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): tabbable-exposed
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Keyboard: Fake Hidden Interactive - Failure";

const FakehiddeninteractiveFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-failure-failure-1"
          data-atomic-source="tabbable-exposed/form-aria-hidden"
          dangerouslySetInnerHTML={{
            __html: `<form aria-hidden="true">
  <label for="fname">First Name:</label><br />
  <input type="text" id="fname" name="fname" required /><br /><br />

  <label for="lname">Last Name:</label><br />
  <input type="text" id="lname" name="lname" required /><br /><br />

  <label for="address">Address:</label><br />
  <input type="text" id="address" name="address" required /><br /><br />

  <input type="submit" value="Submit" />
</form>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-failure-failure-2"
          data-atomic-source="tabbable-exposed/w3c-failed-example-1-offscreen-link"
          dangerouslySetInnerHTML={{
            __html: `<!-- W3C ACT 6cfa84: Failed Example 1 -->
<div aria-hidden="true">
  <a href="/" id="offscreen-link" style="position: absolute; top: -999em">Link</a>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-failure-failure-3"
          data-atomic-source="tabbable-exposed/w3c-failed-example-2-aria-disabled-input"
          dangerouslySetInnerHTML={{
            __html: `<!-- W3C ACT 6cfa84: Failed Example 2 -->
<div aria-hidden="true">
  <input id="aria-disabled-input" aria-disabled="true" />
</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-failure-failure-4"
          data-atomic-source="tabbable-exposed/w3c-failed-example-3-ancestor-aria-hidden"
          dangerouslySetInnerHTML={{
            __html: `<!-- W3C ACT 6cfa84: Failed Example 3 -->
<div aria-hidden="true">
  <div aria-hidden="false">
    <button id="nested-aria-hidden-button">Some button</button>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-failure-failure-5"
          data-atomic-source="tabbable-exposed/w3c-failed-example-4-tabindex-zero"
          dangerouslySetInnerHTML={{
            __html: `<!-- W3C ACT 6cfa84: Failed Example 4 -->
<p id="tabindexed-paragraph" tabindex="0" aria-hidden="true">Some text</p>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-failure-failure-6"
          data-atomic-source="tabbable-exposed/w3c-failed-example-5-summary"
          dangerouslySetInnerHTML={{
            __html: `<!-- W3C ACT 6cfa84: Failed Example 5 -->
<details aria-hidden="true">
  <summary id="hidden-summary">Some button</summary>
  <p>Some details</p>
</details>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-failure-failure-7"
          data-atomic-source="tabbable-exposed/w3c-failed-example-6-unhandled-focus-sentinel"
          dangerouslySetInnerHTML={{
            __html: `<!-- W3C ACT 6cfa84: Failed Example 6 -->
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
</script>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FakehiddeninteractiveFailure;
