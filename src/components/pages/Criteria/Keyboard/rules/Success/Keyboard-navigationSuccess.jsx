/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): tabbable-mismatch
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Keyboard: Keyboard Navigation - Success";

const KeyboardnavigationSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="keyboard-keyboard-navigation-success-success-1"
          data-atomic-source="tabbable-mismatch/div-as-a-custom-checkbox"
          dangerouslySetInnerHTML={{
            __html: `<div class="checkbox-wrapper-1" tabindex="0" role="checkbox" aria-checked="false">
  <input id="example-1" class="substituted" type="checkbox" aria-hidden="true" />
  <label class="pointer" for="example-1" tabindex="0">Checkbox</label>
</div>
<style>
  .checkbox-wrapper-1 *,
  .checkbox-wrapper-1 ::after,
  .checkbox-wrapper-1 ::before {
    box-sizing: border-box;
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted {
    margin: 0;
    width: 0;
    height: 0;
    display: inline;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted + label:before {
    content: "";
    display: inline-block;
    vertical-align: top;
    height: 1.15em;
    width: 1.15em;
    margin-right: 0.6em;
    color: rgba(0, 0, 0, 0.275);
    border: solid 0.06em;
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em inset, 0 0 0 0.07em transparent inset;
    border-radius: 0.2em;
    background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xml:space="preserve" fill="white" viewBox="0 0 9 9"><rect x="0" y="4.3" transform="matrix(-0.707 -0.7072 0.7072 -0.707 0.5891 10.4702)" width="4.3" height="1.6" /><rect x="2.2" y="2.9" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 12.1877 2.9833)" width="6.1" height="1.7" /></svg>')
        no-repeat center,
      white;
    background-size: 0;
    will-change: color, border, background, background-size, box-shadow;
    transform: translate3d(0, 0, 0);
    transition: color 0.1s, border 0.1s, background 0.15s, box-shadow 0.1s;
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:enabled:active + label:before,
  .checkbox-wrapper-1 [type="checkbox"].substituted:enabled + label:active:before {
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset;
    background-color: #f0f0f0;
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:checked + label:before {
    background-color: #3b99fc;
    background-size: 0.75em;
    color: rgba(0, 0, 0, 0.075);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:checked:enabled:active + label:before,
  .checkbox-wrapper-1 [type="checkbox"].substituted:checked:enabled + label:active:before {
    background-color: #0a7ffb;
    color: rgba(0, 0, 0, 0.275);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:focus + label:before {
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset, 0 0 0 3.3px rgba(65, 159, 255, 0.55), 0 0 0 5px rgba(65, 159, 255, 0.3);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:focus:active + label:before,
  .checkbox-wrapper-1 [type="checkbox"].substituted:focus + label:active:before {
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset, 0 0 0 3.3px rgba(65, 159, 255, 0.55), 0 0 0 5px rgba(65, 159, 255, 0.3);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:disabled + label:before {
    opacity: 0.5;
  }

  .checkbox-wrapper-1 [type="checkbox"].substituted.dark + label:before {
    color: rgba(255, 255, 255, 0.275);
    background-color: #222;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xml:space="preserve" fill="rgba(34, 34, 34, 0.999)" viewBox="0 0 9 9"><rect x="0" y="4.3" transform="matrix(-0.707 -0.7072 0.7072 -0.707 0.5891 10.4702)" width="4.3" height="1.6" /><rect x="2.2" y="2.9" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 12.1877 2.9833)" width="6.1" height="1.7" /></svg>');
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted.dark:enabled:active + label:before,
  .checkbox-wrapper-1 [type="checkbox"].substituted.dark:enabled + label:active:before {
    background-color: #444;
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(255, 255, 255, 0.1) inset;
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted.dark:checked + label:before {
    background-color: #a97035;
    color: rgba(255, 255, 255, 0.075);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted.dark:checked:enabled:active + label:before,
  .checkbox-wrapper-1 [type="checkbox"].substituted.dark:checked:enabled + label:active:before {
    background-color: #c68035;
    color: rgba(0, 0, 0, 0.275);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted + label {
    -webkit-user-select: none;
    user-select: none;
  }
  .pointer {
    cursor: pointer;
  }
</style>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-keyboard-navigation-success-success-2"
          data-atomic-source="tabbable-mismatch/input-checkbox"
          dangerouslySetInnerHTML={{
            __html: `<div class="checkbox-wrapper-1">
  <input id="example-1" class="substituted" type="checkbox" />
  <label class="pointer" for="example-1" tabindex="0">I agree to the terms</label>
</div>
<style>
  .checkbox-wrapper-1 *,
  .checkbox-wrapper-1 ::after,
  .checkbox-wrapper-1 ::before {
    box-sizing: border-box;
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:enabled:active + label:before,
  .checkbox-wrapper-1 [type="checkbox"].substituted:enabled + label:active:before {
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset;
    background-color: #f0f0f0;
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:checked + label:before {
    background-color: #3b99fc;
    background-size: 0.75em;
    color: rgba(0, 0, 0, 0.075);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:checked:enabled:active + label:before,
  .checkbox-wrapper-1 [type="checkbox"].substituted:checked:enabled + label:active:before {
    background-color: #0a7ffb;
    color: rgba(0, 0, 0, 0.275);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:focus + label:before {
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset, 0 0 0 3.3px rgba(65, 159, 255, 0.55), 0 0 0 5px rgba(65, 159, 255, 0.3);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:focus:active + label:before,
  .checkbox-wrapper-1 [type="checkbox"].substituted:focus + label:active:before {
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset, 0 0 0 3.3px rgba(65, 159, 255, 0.55), 0 0 0 5px rgba(65, 159, 255, 0.3);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted:disabled + label:before {
    opacity: 0.5;
  }

  .checkbox-wrapper-1 [type="checkbox"].substituted.dark + label:before {
    color: rgba(255, 255, 255, 0.275);
    background-color: #222;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xml:space="preserve" fill="rgba(34, 34, 34, 0.999)" viewBox="0 0 9 9"><rect x="0" y="4.3" transform="matrix(-0.707 -0.7072 0.7072 -0.707 0.5891 10.4702)" width="4.3" height="1.6" /><rect x="2.2" y="2.9" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 12.1877 2.9833)" width="6.1" height="1.7" /></svg>');
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted.dark:enabled:active + label:before,
  .checkbox-wrapper-1 [type="checkbox"].substituted.dark:enabled + label:active:before {
    background-color: #444;
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(255, 255, 255, 0.1) inset;
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted.dark:checked + label:before {
    background-color: #a97035;
    color: rgba(255, 255, 255, 0.075);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted.dark:checked:enabled:active + label:before,
  .checkbox-wrapper-1 [type="checkbox"].substituted.dark:checked:enabled + label:active:before {
    background-color: #c68035;
    color: rgba(0, 0, 0, 0.275);
  }
  .checkbox-wrapper-1 [type="checkbox"].substituted + label {
    -webkit-user-select: none;
    user-select: none;
  }
  .pointer {
    cursor: pointer;
  }
</style>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-keyboard-navigation-success-success-3"
          data-atomic-source="tabbable-mismatch/input-element-without-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<body style="height: 100vh; width: 100vw">
  <input style="width: 150px; height: 100px" type="text" placeholder="enter your name" />
</body>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-keyboard-navigation-success-success-4"
          data-atomic-source="tabbable-mismatch/interactive-element-with-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<button>Click here</button>
<div role="button" onclick="alert('Hello, user!')" tabindex="0">or here</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-keyboard-navigation-success-success-5"
          data-atomic-source="tabbable-mismatch/label-wrapping-tabbable-checkbox"
          dangerouslySetInnerHTML={{
            __html: `<label class="toggleButton" role="checkbox" aria-checked="false" style="cursor: pointer">
  <input type="checkbox" tabindex="0" />
  <span>Accept terms and conditions</span>
</label>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-keyboard-navigation-success-success-6"
          data-atomic-source="tabbable-mismatch/non-visible-text-area-element-without-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<textarea placeholder="comment.." style="opacity: 0;" tabindex="-1"></textarea>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-keyboard-navigation-success-success-7"
          data-atomic-source="tabbable-mismatch/role-link"
          dangerouslySetInnerHTML={{
            __html: `<div role="link" tabindex="0" aria-label="Go to next page" onclick="location.href='next.html'">Next Page</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-keyboard-navigation-success-success-8"
          data-atomic-source="tabbable-mismatch/select-element-without-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<select>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-keyboard-navigation-success-success-9"
          data-atomic-source="tabbable-mismatch/text-area-element-without-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<textarea placeholder="comment.."></textarea>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default KeyboardnavigationSuccess;
