import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ControlFieldVisibleAndTabbableSuccess = () => {
  const ruleId = "control-field-visible-and-tabbable";
  const title = `Custom checkboxes, radio buttons and file upload fields should be accessible to assistive technology`;
  const description = `Screen readers have built-in mechanisms to handle checkboxes, radio buttons, and file upload fields. By default, assistive technology does not support custom checkboxes, radio buttons, and file upload fields, and using those may prevent screen reader users from interacting with the fields and keyboard users from tabbing to the fields.`;
  const helpText = `If using standard LABEL and INPUT fields with custom CSS styling, ensure the checkbox, radio button, or file input is fully visible to assistive technology but visually hidden using opacity, width, height, and positioning (never use display:none or visibility:hidden). Alternatively, create a standard checkbox, radio button, or file input field available only for screen readers using the screen reader only technique, and hide the custom checkbox, radio button, or file input from screen readers using aria-hidden="true".`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "custom radio button 1", content: `<div class="radio-wrapper">
  <input id="example-1" type="radio" name="radio-examples" />
  <label for="example-1">
    Option 1
    <span class="emoji">🔥</span>
  </label>
</div>
<div class="radio-wrapper">
  <input id="example-2" type="radio" name="radio-examples" />
  <label for="example-2">
    Option 2
    <span class="emoji">🔥</span>
  </label>
</div>

<style>
  .radio-wrapper {
    margin-bottom: 10px;
  }
  .radio-wrapper label {
    background: #fff;
    padding: 0.75rem 1rem;
    border: 2px solid #e5e5e5;
    border-radius: 0.25rem;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    font-weight: 500;
    position: relative;
    min-width: 140px;
    text-align: left;
  }
  .radio-wrapper input {
    clip: rect(0, 0, 0, 0);
    border-width: 0;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  .radio-wrapper input:checked ~ label {
    box-shadow: rgb(220 38 38) 0 0 0 2px;
    color: rgb(220 38 38);
    background: rgb(254 242 242);
    border-color: transparent;
  }

  .radio-wrapper label .emoji {
    position: absolute;
    right: 1rem;
    top: auto;
    bottom: auto;
    margin: auto;
    display: none;
  }

  .radio-wrapper input:checked ~ label .emoji {
    display: initial;
  }
</style>` },
  { filename: "custom radio button 2", content: `<div class="radio-wrapper">
  <label for="example-1">
    <input id="example-1" type="radio" name="radio-examples" />
    <span class="inner-label">Radio 1</span>
  </label>
</div>
<div class="radio-wrapper">
  <label for="example-2">
    <input id="example-2" type="radio" name="radio-examples" />
    <span class="inner-label">Radio 2</span>
  </label>
</div>

<style>
  .radio-wrapper {
    display: flex;
    font-family: "Courier New", monospace;
    font-weight: bold;
  }
  @media (max-width: 48em) {
    .radio-wrapper {
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
    }
  }

  .radio-wrapper label {
    position: relative;
    display: inline-block;
    margin: 10px;
  }
  @media (max-width: 48em) {
    .radio-wrapper label {
      display: block;
      margin: 10px 0;
    }
  }
  .radio-wrapper label input {
    opacity: 0;
    position: absolute;
  }
  .radio-wrapper label .inner-label {
    position: relative;
    display: inline-block;
    padding-left: 40px;
  }
  .radio-wrapper label .inner-label:before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.25);
    width: 30px;
    transition: border-bottom 0.5s ease;
  }
  .radio-wrapper label input:focus ~ .inner-label:before {
    border-bottom: 1px solid rgba(0, 0, 0, 0.75);
  }
  .radio-wrapper label input:checked ~ .inner-label:after {
    content: "✓";
    color: #000;
    position: absolute;
    font-size: 1em;
    left: 12px;
    top: 1px;
  }
</style>` },
  { filename: "custom radio button rating", content: `<!--- This test is in skip because the perceivable custom radio buttons have compliant radio button inputs as siblings, not children -->
<div class="radio-wrapper-18">
  <input id="rating-18-5" type="radio" name="radio-examples" />
  <label for="rating-18-5" title="text">
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input id="rating-18-4" type="radio" name="radio-examples" />
  <label for="rating-18-4" title="text">
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input id="rating-18-3" type="radio" name="radio-examples" />
  <label for="rating-18-3" title="text">
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input id="rating-18-2" type="radio" name="radio-examples" />
  <label for="rating-18-2" title="text">
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input id="rating-18-1" type="radio" name="radio-examples" />
  <label for="rating-18-1" title="text">
    <svg viewBox="0 0 576 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
</div>
<style>
  .radio-wrapper-18 {
    width: 200px;
    height: 30px;
  }
  .radio-wrapper-18 > input {
    position: absolute;
    appearance: none;
  }

  .radio-wrapper-18 > label {
    float: right;
    cursor: pointer;
    font-size: 30px;
    fill: #666;
  }

  .radio-wrapper-18 > label > svg {
    fill: #666; /* Set default color for SVG */
    transition: fill 0.3s ease; /* Add a transition effect */
  }

  .radio-wrapper-18 > input:checked + label:hover,
  .radio-wrapper-18 > input:checked + label:hover ~ label,
  .radio-wrapper-18 > input:checked ~ label:hover,
  .radio-wrapper-18 > input:checked ~ label:hover ~ label,
  .radio-wrapper-18 > label:hover ~ input:checked ~ label {
    fill: #e58e09;
  }

  .radio-wrapper-18 > label:hover,
  .radio-wrapper-18 > label:hover ~ label {
    fill: #ff9e0b;
  }

  .radio-wrapper-18 > input:checked ~ label > svg {
    fill: #ffa723; /* Set color for selected stars */
  }
</style>` },
  { filename: "custom radio button sketch", content: `<div class="radio-wrapper">
  <label class="radio-wrapper" for="example-1">
    <input type="radio" class="radio-input" name="radio-examples" id="example-1" />
    <span class="radio-tile">
      <span class="radio-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none"></rect>
          <polygon points="72 40 184 40 240 104 128 224 16 104 72 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></polygon>
          <polygon points="177.091 104 128 224 78.909 104 128 40 177.091 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></polygon>
          <line x1="16" y1="104" x2="240" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line>
        </svg>
      </span>
      <span class="radio-label">Sketch #1</span>
    </span>
  </label>

  <label class="radio-wrapper" for="example-2">
    <input type="radio" class="radio-input" name="radio-examples" id="example-2" />
    <span class="radio-tile">
      <span class="radio-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="currentColor" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none"></rect>
          <polygon points="72 40 184 40 240 104 128 224 16 104 72 40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></polygon>
          <polygon points="177.091 104 128 224 78.909 104 128 40 177.091 104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></polygon>
          <line x1="16" y1="104" x2="240" y2="104" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="12"></line>
        </svg>
      </span>
      <span class="radio-label">Sketch #2</span>
    </span>
  </label>
</div>

<style>
  .radio-wrapper {
    display: flex;
    gap: 5px;
  }
  .radio-wrapper *,
  .radio-wrapper *:after,
  .radio-wrapper *:before {
    box-sizing: border-box;
  }

  .radio-wrapper .radio-input {
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(100%);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  .radio-wrapper .radio-input:checked + .radio-tile {
    border-color: #2260ff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    color: #2260ff;
  }
  .radio-wrapper .radio-input:checked + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
    background-color: #2260ff;
    border-color: #2260ff;
  }
  .radio-wrapper .radio-input:checked + .radio-tile .radio-icon,
  .radio-wrapper .radio-input:checked + .radio-tile .radio-label {
    color: #2260ff;
  }
  .radio-wrapper .radio-input:focus + .radio-tile {
    border-color: #2260ff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
  }
  .radio-wrapper .radio-input:focus + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
  }

  .radio-wrapper .radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 7rem;
    min-height: 7rem;
    border-radius: 0.5rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: 0.15s ease;
    cursor: pointer;
    position: relative;
  }
  .radio-wrapper .radio-tile:before {
    content: "";
    position: absolute;
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    border-radius: 50%;
    top: 0.25rem;
    left: 0.25rem;
    opacity: 0;
    transform: scale(0);
    transition: 0.25s ease;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
  }
  .radio-wrapper .radio-tile:hover {
    border-color: #2260ff;
  }
  .radio-wrapper .radio-tile:hover:before {
    transform: scale(1);
    opacity: 1;
  }

  .radio-wrapper .radio-icon {
    transition: 0.375s ease;
    color: #494949;
  }
  .radio-wrapper .radio-icon svg {
    width: 3rem;
    height: 3rem;
  }

  .radio-wrapper .radio-label {
    color: #707070;
    transition: 0.375s ease;
    text-align: center;
  }
</style>` },
  { filename: "filepond library", content: `<div
  class="filepond--root filepond filepond--hopper"
  data-style-button-remove-item-position="left"
  data-style-button-process-item-position="right"
  data-style-load-indicator-position="right"
  data-style-progress-indicator-position="right"
  data-style-button-remove-item-align="false"
  data-style-image-editor-button-edit-item-position="bottom center"
  style="block-size: 76px; inset: 0px; box-sizing: border-box; contain: size layout style; font-weight: 450; height: 76px; inline-size: 320px; inset-block: 0px; inset-inline: 0px; line-height: normal; perspective-origin: 160px 38px; position: relative; text-align: left; text-rendering: optimizelegibility; transform-origin: 160px 38px; width: 320px"
>
  <input
    class="filepond--browser"
    type="file"
    id="filepond--browser-izjp30z2t"
    name="filepond"
    aria-controls="filepond--assistant-izjp30z2t"
    aria-labelledby="filepond--drop-label-izjp30z2t"
    accept=""
    multiple=""
    style="
      align-items: baseline;
      appearance: none;
      background-color: rgba(0, 0, 0, 0);
      block-size: 6px;
      border-block: 0px rgb(76, 78, 83);
      border-color: rgb(76, 78, 83);
      border-style: none;
      border-width: 0px;
      border-inline: 0px rgb(76, 78, 83);
      inset: 0px 0px 70px;
      box-sizing: border-box;
      caret-color: rgb(76, 78, 83);
      color: rgb(76, 78, 83);
      column-rule-color: rgb(76, 78, 83);
      cursor: default;
      display: block;
      font-size: 0px;
      height: 6px;
      inline-size: 320px;
      inset-block: 0px 70px;
      inset-inline: 0px;
      line-height: normal;
      min-inline-size: 0px;
      min-width: 0px;
      opacity: 0;
      outline-color: rgb(76, 78, 83);
      perspective-origin: 160px 3px;
      position: absolute;
      text-decoration-color: rgb(76, 78, 83);
      text-emphasis-color: rgb(76, 78, 83);
      text-overflow: ellipsis;
      white-space: pre;
      transform-origin: 160px 3px;
      width: 320px;
      z-index: 1;
      -webkit-text-fill-color: rgb(76, 78, 83);
      -webkit-text-stroke-color: rgb(76, 78, 83);
    "
  />
  <div
    class="filepond--drop-label"
    style="
      transform: matrix(1, 0, 0, 1, 0, 0);
      opacity: 1;
      align-items: center;
      block-size: 76px;
      inset: 0px;
      box-sizing: border-box;
      display: flex;
      font-weight: 450;
      height: 76px;
      inline-size: 320px;
      inset-block: 0px;
      inset-inline: 0px;
      justify-content: center;
      line-height: normal;
      min-block-size: 76px;
      min-height: 76px;
      perspective-origin: 160px 38px;
      position: absolute;
      text-align: left;
      text-rendering: optimizelegibility;
      transform-origin: 160px 38px;
      user-select: none;
      width: 320px;
      will-change: transform, opacity;
      z-index: 5;
    "
  >
    <label
      for="filepond--browser-izjp30z2t"
      id="filepond--drop-label-izjp30z2t"
      aria-hidden="true"
      style="
        block-size: 40px;
        box-sizing: border-box;
        cursor: default;
        display: block;
        font-weight: 400;
        height: 40px;
        inline-size: 268.68px;
        margin-block-end: 0px;
        margin-bottom: 0px;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        padding-block: 8px;
        padding: 8px 16px;
        padding-inline: 16px;
        perspective-origin: 134.336px 20px;
        text-align: center;
        text-rendering: optimizelegibility;
        transform-origin: 134.34px 20px;
        user-select: none;
        width: 268.68px;
      "
      >Drag &amp; Drop your files or <span class="filepond--label-action" tabindex="0" style="box-sizing: border-box; cursor: pointer; font-weight: 400; text-align: center; text-decoration: underline rgb(186, 189, 192); text-rendering: optimizelegibility; user-select: none; -webkit-text-decorations-in-effect: underline">Browse</span></label
    >
  </div>
  <div
    class="filepond--list-scroller"
    style="
      transform: matrix(1, 0, 0, 1, 0, 60);
      inset: 0px 0px 44px;
      box-sizing: border-box;
      font-weight: 450;
      inline-size: 320px;
      inset-block: 0px 44px;
      inset-inline: 0px;
      line-height: normal;
      margin-block: 16px;
      margin-bottom: 16px;
      margin-top: 16px;
      perspective-origin: 160px 0px;
      position: absolute;
      text-align: left;
      text-rendering: optimizelegibility;
      transform-origin: 160px 0px;
      width: 320px;
      will-change: transform;
      z-index: 6;
    "
  >
    <ul
      class="filepond--list"
      role="list"
      style="
        inset: 0px 12px;
        box-sizing: border-box;
        font-weight: 450;
        inline-size: 296px;
        inset-block: 0px;
        inset-inline: 12px;
        line-height: normal;
        list-style-type: none;
        margin-block: 0px;
        margin-bottom: 0px;
        margin-top: 0px;
        padding-inline-start: 0px;
        padding-left: 0px;
        perspective-origin: 148px 0px;
        position: absolute;
        text-align: left;
        text-rendering: optimizelegibility;
        transform-origin: 148px 0px;
        width: 296px;
        will-change: transform;
      "
    ></ul>
  </div>
  <div
    class="filepond--panel filepond--panel-root"
    data-scalable="true"
    style="
      block-size: 76px;
      border-radius: 16px;
      border-end-end-radius: 16px;
      border-end-start-radius: 16px;
      border-start-end-radius: 16px;
      border-start-start-radius: 16px;
      inset: 0px;
      box-sizing: border-box;
      font-weight: 450;
      height: 76px;
      inline-size: 320px;
      inset-block: 0px;
      inset-inline: 0px;
      line-height: normal;
      perspective-origin: 160px 38px;
      pointer-events: none;
      position: absolute;
      text-align: left;
      text-rendering: optimizelegibility;
      transform-origin: 160px 38px;
      transform-style: preserve-3d;
      width: 320px;
      z-index: 2;
    "
  >
    <div
      class="filepond--panel-top filepond--panel-root"
      style="
        background-color: rgb(237, 240, 244);
        block-size: 16px;
        border-start-end-radius: 16px;
        border-start-start-radius: 16px;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        inset: 0px 0px 60px;
        box-sizing: border-box;
        font-weight: 450;
        height: 16px;
        inline-size: 320px;
        inset-block: 0px 60px;
        inset-inline: 0px;
        line-height: normal;
        perspective-origin: 160px 8px;
        pointer-events: none;
        position: absolute;
        text-align: left;
        text-rendering: optimizelegibility;
        transform-origin: 160px 8px;
        width: 320px;
      "
      data-id="0"
    ></div>
    <div
      class="filepond--panel-center filepond--panel-root"
      style="
        transform: matrix(1, 0, 0, 0.44, 0, 16);
        backface-visibility: hidden;
        background-color: rgb(237, 240, 244);
        block-size: 100px;
        inset: 0px 0px -24px;
        box-sizing: border-box;
        font-weight: 450;
        height: 100px;
        inline-size: 320px;
        inset-block: 0px -24px;
        inset-inline: 0px;
        line-height: normal;
        perspective-origin: 160px 50px;
        pointer-events: none;
        position: absolute;
        text-align: left;
        text-rendering: optimizelegibility;
        transform-origin: 0px 0px;
        width: 320px;
        will-change: transform;
      "
    ></div>
    <div
      class="filepond--panel-bottom filepond--panel-root"
      style="
        transform: matrix(1, 0, 0, 1, 0, 60);
        backface-visibility: hidden;
        background-color: rgb(237, 240, 244);
        block-size: 16px;
        border-bottom-left-radius: 16px;
        border-bottom-right-radius: 16px;
        border-end-end-radius: 16px;
        border-end-start-radius: 16px;
        inset: 0px 0px 60px;
        box-sizing: border-box;
        font-weight: 450;
        height: 16px;
        inline-size: 320px;
        inset-block: 0px 60px;
        inset-inline: 0px;
        line-height: normal;
        perspective-origin: 160px 8px;
        pointer-events: none;
        position: absolute;
        text-align: left;
        text-rendering: optimizelegibility;
        transform-origin: 0px 0px;
        width: 320px;
        will-change: transform;
      "
      data-id="1"
    ></div>
  </div>
  <span
    class="filepond--assistant"
    id="filepond--assistant-izjp30z2t"
    role="status"
    aria-live="polite"
    aria-relevant="additions"
    style="
      block-size: 1px;
      inset: 0px 319px 75px 0px;
      box-sizing: border-box;
      clip: rect(1px, 1px, 1px, 1px);
      clip-path: inset(50%);
      display: block;
      font-weight: 450;
      height: 1px;
      inline-size: 1px;
      inset-block: 0px 75px;
      inset-inline: 0px 319px;
      line-height: normal;
      overflow-block: hidden;
      overflow-inline: hidden;
      overflow: hidden;
      perspective-origin: 0.5px 0.5px;
      position: absolute;
      text-align: left;
      text-rendering: optimizelegibility;
      text-wrap-mode: nowrap;
      transform-origin: 0.5px 0.5px;
      width: 1px;
    "
  ></span>
  <fieldset
    class="filepond--data"
    style="
      border-block: 0px rgb(76, 78, 83);
      border-color: rgb(76, 78, 83);
      border-style: none;
      border-width: 0px;
      border-inline: 0px rgb(76, 78, 83);
      inset: 0px 320px 76px 0px;
      box-sizing: border-box;
      contain: strict;
      font-weight: 450;
      inline-size: 0px;
      inset-block: 0px 76px;
      inset-inline: 0px 320px;
      line-height: normal;
      margin-inline: 0px;
      margin-left: 0px;
      margin-right: 0px;
      padding-block: 0px;
      padding: 0px;
      padding-inline: 0px;
      perspective-origin: 0px 0px;
      pointer-events: none;
      position: absolute;
      text-align: left;
      text-rendering: optimizelegibility;
      transform-origin: 0px 0px;
      visibility: hidden;
      width: 0px;
    "
  ></fieldset>
  <div
    class="filepond--drip"
    style="
      background-color: rgba(0, 0, 0, 0.01);
      block-size: 76px;
      border-radius: 16px;
      border-end-end-radius: 16px;
      border-end-start-radius: 16px;
      border-start-end-radius: 16px;
      border-start-start-radius: 16px;
      inset: 0px;
      box-sizing: border-box;
      font-weight: 450;
      height: 76px;
      inline-size: 320px;
      inset-block: 0px;
      inset-inline: 0px;
      line-height: normal;
      opacity: 0.1;
      overflow-block: hidden;
      overflow-inline: hidden;
      overflow: hidden;
      perspective-origin: 160px 38px;
      pointer-events: none;
      position: absolute;
      text-align: left;
      text-rendering: optimizelegibility;
      transform-origin: 160px 38px;
      width: 320px;
      z-index: 3;
    "
  ></div>
</div>
<style>
  [data-id="0"]::after {
    background-color: rgb(237, 240, 244);
    block-size: 2px;
    bottom: -1px;
    content: "";
    display: block;
    font-weight: 450;
    height: 2px;
    inline-size: 320px;
    inset-block-end: -1px;
    inset-block-start: 15px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: normal;
    perspective-origin: 160px 1px;
    pointer-events: none;
    position: absolute;
    right: 0px;
    text-align: left;
    text-rendering: optimizelegibility;
    top: 15px;
    transform-origin: 160px 1px;
    width: 320px;
  }
  [data-id="1"]::before {
    background-color: rgb(237, 240, 244);
    block-size: 2px;
    bottom: 15px;
    content: "";
    display: block;
    font-weight: 450;
    height: 2px;
    inline-size: 320px;
    inset-block-end: 15px;
    inset-block-start: -1px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: normal;
    perspective-origin: 160px 1px;
    pointer-events: none;
    position: absolute;
    right: 0px;
    text-align: left;
    text-rendering: optimizelegibility;
    top: -1px;
    transform-origin: 160px 1px;
    width: 320px;
  }
</style>` },
  { filename: "next ui checkbox", content: `<div class="live-preview flex h-full w-full not-prose" style="block-size: 24px; display: flex; height: 24px; inline-size: 790px; line-height: 28px; perspective-origin: 395px 12px; transform-origin: 395px 12px; width: 790px">
  <label
    id="test-subject"
    class="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2"
    data-selected="true"
    style="
      align-items: center;
      block-size: 40px;
      inset: 0px;
      cursor: pointer;
      display: flex;
      height: 40px;
      inline-size: 94.4688px;
      inset-block: 0px;
      inset-inline: 0px;
      justify-content: flex-start;
      line-height: 28px;
      margin-block: -8px;
      margin: -8px;
      margin-inline: -8px;
      max-inline-size: fit-content;
      max-width: fit-content;
      min-block-size: auto;
      min-height: auto;
      min-inline-size: auto;
      min-width: auto;
      padding-block: 8px;
      padding: 8px;
      padding-inline: 8px;
      perspective-origin: 47.2344px 20px;
      position: relative;
      transform-origin: 47.2344px 20px;
      width: 94.4688px;
    "
    ><span
      style="
        border: 0 none rgb(236, 237, 238);
        clip: rect(0px, 0px, 0px, 0px);
        clip-path: inset(50%);
        overflow: hidden;
        padding: 0px;
        position: absolute;
        white-space: nowrap;
        block-size: 1px;
        border-block-color: rgb(236, 237, 238);
        border-block-style: none;
        border-inline-color: rgb(236, 237, 238);
        border-inline-style: none;
        inset: 20.5px 87.4688px 20.5px 8px;
        cursor: pointer;
        display: block;
        height: 1px;
        inline-size: 1px;
        inset-block: 20.5px;
        inset-inline: 8px 87.4688px;
        line-height: 28px;
        margin-block: -1px;
        margin: -1px;
        margin-inline: -1px;
        perspective-origin: 0.5px 0.5px;
        transform-origin: 0.5px 0.5px;
        width: 1px;
      "
      ><input
        aria-label="Option"
        aria-labelledby=":r4:"
        type="checkbox"
        value=""
        checked=""
        style="
          background-color: rgba(0, 0, 0, 0);
          block-size: 13px;
          border-block-color: rgb(236, 237, 238);
          border-block-style: none;
          border-color: rgb(236, 237, 238);
          border-style: none;
          border-inline-color: rgb(236, 237, 238);
          border-inline-style: none;
          cursor: default;
          height: 13px;
          inline-size: 13px;
          line-height: 28px;
          perspective-origin: 6.5px 6.5px;
          text-wrap: nowrap;
          transform-origin: 6.5px 6.5px;
          width: 13px;
        " /></span
    ><span
      aria-hidden="true"
      class="relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden before:content-[''] before:absolute before:inset-0 before:border-solid before:border-2 before:box-border before:border-default after:content-[''] after:absolute after:inset-0 after:scale-50 after:opacity-0 after:origin-center group-data-[selected=true]:after:scale-100 group-data-[selected=true]:after:opacity-100 group-data-[hover=true]:before:bg-default-100 outline-none group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background after:bg-primary after:text-primary-foreground text-primary-foreground w-5 h-5 mr-2 rtl:ml-2 rtl:mr-[unset] rounded-[calc(theme(borderRadius.medium)*0.6)] before:rounded-[calc(theme(borderRadius.medium)*0.6)] after:rounded-[calc(theme(borderRadius.medium)*0.6)] before:transition-colors group-data-[pressed=true]:scale-95 transition-transform after:transition-transform-opacity after:!ease-linear after:!duration-200 motion-reduce:transition-none"
      data-id="0"
      style="
        align-items: center;
        block-size: 20px;
        border-radius: 7.2px;
        border-end-end-radius: 7.2px;
        border-end-start-radius: 7.2px;
        border-start-end-radius: 7.2px;
        border-start-start-radius: 7.2px;
        inset: 0px;
        caret-color: rgb(255, 255, 255);
        color: rgb(255, 255, 255);
        column-rule-color: rgb(255, 255, 255);
        cursor: pointer;
        display: flex;
        flex-shrink: 0;
        height: 20px;
        inline-size: 20px;
        inset-block: 0px;
        inset-inline: 0px;
        justify-content: center;
        line-height: 28px;
        margin-inline-end: 8px;
        margin-right: 8px;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        outline: rgba(0, 0, 0, 0) solid 2px;
        outline-offset: 2px;
        overflow: hidden;
        perspective-origin: 10px 10px;
        position: relative;
        text-decoration: none solid rgb(255, 255, 255);
        text-emphasis-color: rgb(255, 255, 255);
        transform-origin: 10px 10px;
        transition-duration: 0.25s;
        transition-property: transform;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        width: 20px;
        -webkit-text-fill-color: rgb(255, 255, 255);
        -webkit-text-stroke-color: rgb(255, 255, 255);
      "
      ><svg
        aria-hidden="true"
        role="presentation"
        viewBox="0 0 17 18"
        class="z-10 opacity-0 group-data-[selected=true]:opacity-100 w-4 h-3 transition-opacity motion-reduce:transition-none"
        style="
          block-size: 12px;
          caret-color: rgb(255, 255, 255);
          color: rgb(255, 255, 255);
          column-rule-color: rgb(255, 255, 255);
          cursor: pointer;
          height: 12px;
          inline-size: 16px;
          line-height: 28px;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          outline-color: rgb(255, 255, 255);
          overflow-clip-margin: content-box;
          overflow: hidden;
          perspective-origin: 8px 6px;
          text-decoration: none solid rgb(255, 255, 255);
          text-emphasis-color: rgb(255, 255, 255);
          transform-origin: 8px 6px;
          transition-duration: 0.25s;
          transition-property: opacity;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          width: 16px;
          z-index: 10;
          -webkit-text-fill-color: rgb(255, 255, 255);
          -webkit-text-stroke-color: rgb(255, 255, 255);
        "
      >
        <polyline fill="none" points="1 9 7 14 15 4" stroke="currentColor" stroke-dasharray="22" stroke-dashoffset="44" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" style="transition: stroke-dashoffset 250ms linear 0.2s"></polyline></svg></span
    ><span
      id=":r4:"
      class="relative text-foreground select-none text-medium transition-colors-opacity before:transition-width motion-reduce:transition-none"
      data-id="1"
      style="
        block-size: 24px;
        inset: 0px;
        cursor: pointer;
        display: block;
        height: 24px;
        inline-size: 50.4688px;
        inset-block: 0px;
        inset-inline: 0px;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        perspective-origin: 25.2344px 12px;
        position: relative;
        transform-origin: 25.2344px 12px;
        transition-duration: 0.25s;
        transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity;
        user-select: none;
        width: 50.4688px;
      "
      >Option</span
    ></label
  >
</div>
<style>
  [data-id="0"]::after {
    background-color: rgb(0, 111, 238);
    block-size: 20px;
    border-bottom-left-radius: 7.2px;
    border-bottom-right-radius: 7.2px;
    border-end-end-radius: 7.2px;
    border-end-start-radius: 7.2px;
    border-start-end-radius: 7.2px;
    border-start-start-radius: 7.2px;
    border-top-left-radius: 7.2px;
    border-top-right-radius: 7.2px;
    bottom: 0px;
    caret-color: rgb(255, 255, 255);
    color: rgb(255, 255, 255);
    column-rule-color: rgb(255, 255, 255);
    content: "";
    cursor: pointer;
    display: block;
    height: 20px;
    inline-size: 20px;
    inset-block-end: 0px;
    inset-block-start: 0px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 28px;
    outline-color: rgb(255, 255, 255);
    perspective-origin: 10px 10px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(255, 255, 255);
    text-decoration-color: rgb(255, 255, 255);
    text-emphasis-color: rgb(255, 255, 255);
    top: 0px;
    transform: matrix(1, 0, 0, 1, 0, 0);
    transform-origin: 10px 10px;
    transition-duration: 0.2s;
    transition-property: transform, opacity;
    transition-timing-function: linear;
    width: 20px;
    -webkit-text-fill-color: rgb(255, 255, 255);
    -webkit-text-stroke-color: rgb(255, 255, 255);
  }
  [data-id="0"]::before {
    block-size: 20px;
    border-block-end-color: rgb(63, 63, 70);
    border-block-end-width: 2px;
    border-block-start-color: rgb(63, 63, 70);
    border-block-start-width: 2px;
    border-bottom-color: rgb(63, 63, 70);
    border-bottom-left-radius: 7.2px;
    border-bottom-right-radius: 7.2px;
    border-bottom-width: 2px;
    border-end-end-radius: 7.2px;
    border-end-start-radius: 7.2px;
    border-inline-end-color: rgb(63, 63, 70);
    border-inline-end-width: 2px;
    border-inline-start-color: rgb(63, 63, 70);
    border-inline-start-width: 2px;
    border-left-color: rgb(63, 63, 70);
    border-left-width: 2px;
    border-right-color: rgb(63, 63, 70);
    border-right-width: 2px;
    border-start-end-radius: 7.2px;
    border-start-start-radius: 7.2px;
    border-top-color: rgb(63, 63, 70);
    border-top-left-radius: 7.2px;
    border-top-right-radius: 7.2px;
    border-top-width: 2px;
    bottom: 0px;
    caret-color: rgb(255, 255, 255);
    color: rgb(255, 255, 255);
    column-rule-color: rgb(255, 255, 255);
    content: "";
    cursor: pointer;
    display: block;
    height: 20px;
    inline-size: 20px;
    inset-block-end: 0px;
    inset-block-start: 0px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 28px;
    outline-color: rgb(255, 255, 255);
    perspective-origin: 10px 10px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(255, 255, 255);
    text-decoration-color: rgb(255, 255, 255);
    text-emphasis-color: rgb(255, 255, 255);
    top: 0px;
    transform-origin: 10px 10px;
    transition-duration: 0.25s;
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    width: 20px;
    -webkit-text-fill-color: rgb(255, 255, 255);
    -webkit-text-stroke-color: rgb(255, 255, 255);
  }
  [data-id="1"]::before {
    content: "";
    cursor: pointer;
    perspective-origin: 0px 0px;
    transform-origin: 0px 0px;
    transition-duration: 0.25s;
    transition-property: width;
    user-select: none;
  }
</style>` },
  { filename: "regular input checkbox", content: `<div class="wrapper">
  <div>
    <label for="example-1">
      <input id="example-1" type="checkbox" name="radio-examples" />
      <span class="inner-label">Item 1</span>
    </label>
  </div>
  <div>
    <label for="example-2">
      <input id="example-2" type="checkbox" name="radio-examples" />
      <span class="inner-label">Item 2</span>
    </label>
  </div>
</div>` },
  { filename: "regular input radio button", content: `<div class="wrapper">
  <div>
    <label for="example-1">
      <input id="example-1" type="radio" name="radio-examples" />
      <span class="inner-label">Radio 1</span>
    </label>
  </div>
  <div>
    <label for="example-2">
      <input id="example-2" type="radio" name="radio-examples" />
      <span class="inner-label">Radio 2</span>
    </label>
  </div>
</div>` }
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

export default ControlFieldVisibleAndTabbableSuccess;
