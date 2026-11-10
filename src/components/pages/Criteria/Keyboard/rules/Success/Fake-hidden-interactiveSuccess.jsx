/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): tabbable-exposed
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Keyboard: Fake Hidden Interactive - Success";

const FakehiddeninteractiveSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-success-success-1"
          data-atomic-source="tabbable-exposed/button-hidden"
          dangerouslySetInnerHTML={{
            __html: `<button hidden>Not tabbable button</button>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-success-success-2"
          data-atomic-source="tabbable-exposed/form-hidden"
          dangerouslySetInnerHTML={{
            __html: `<form hidden>
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
          id="keyboard-fake-hidden-interactive-success-success-3"
          data-atomic-source="tabbable-exposed/form-role-none"
          dangerouslySetInnerHTML={{
            __html: `<form role="none">
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
          id="keyboard-fake-hidden-interactive-success-success-4"
          data-atomic-source="tabbable-exposed/form-role-presentation"
          dangerouslySetInnerHTML={{
            __html: `<form role="presentation">
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
          id="keyboard-fake-hidden-interactive-success-success-5"
          data-atomic-source="tabbable-exposed/hidden-not-tabbable"
          dangerouslySetInnerHTML={{
            __html: `<div hidden>
  <p>This is a paragraph.</p>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-success-success-6"
          data-atomic-source="tabbable-exposed/hidden-with-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<form hidden>
  <label for="fname">First Name:</label><br />
  <input type="text" id="fname" name="fname" required tabindex="-1" /><br /><br />

  <label for="lname">Last Name:</label><br />
  <input type="text" id="lname" name="lname" required tabindex="-1" /><br /><br />

  <label for="address">Address:</label><br />
  <input type="text" id="address" name="address" required tabindex="-1" /><br /><br />

  <input type="submit" value="Submit" tabindex="-1" />
</form>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-success-success-7"
          data-atomic-source="tabbable-exposed/w3c-passed-example-4-focus-sentinel"
          dangerouslySetInnerHTML={{
            __html: `<!-- W3C ACT 6cfa84: Passed Example 4 -->
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
</script>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-fake-hidden-interactive-success-success-8"
          data-atomic-source="tabbable-exposed/w3c-passed-example-6-focusable-ancestor"
          dangerouslySetInnerHTML={{
            __html: `<!-- W3C ACT 6cfa84: Passed Example 6 -->
<a href="#" id="act-link">
  <svg width="16" height="16" aria-hidden="true">
    <circle cx="8" cy="11" r="4" stroke="black" stroke-width="2" fill="transparent" />
  </svg>
  Hello ACT
</a>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FakehiddeninteractiveSuccess;
