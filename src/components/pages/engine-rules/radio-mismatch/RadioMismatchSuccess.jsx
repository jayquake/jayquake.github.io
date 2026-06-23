import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const RadioMismatchSuccess = () => {
  const ruleId = "radio-mismatch";
  const title = `Custom radio controls should be tagged for assistive technology`;
  const description = `Screen readers have built-in mechanisms to handle radio components. By default, assistive technology does not support custom radio controls and using them without exposing the appropriate role may prevent screen reader users from interacting as expected with the component.`;
  const helpText = `Assign role="radio" to the custom radio control.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "custom radio button rating input as next or prev sibling", content: `<!--- This test is in skip because the perceivable custom radio buttons have compliant radio button inputs as siblings, not children -->
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
  { filename: "custom radio with compliant radio button as a direct child", content: `<div class="radio-wrapper">
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
  { filename: "custom radio with role radio with input display none", content: `<div class="radio-wrapper">
  <div class="radio-inputs-19">
    <label for="example-19-1" role="radio">
      <input id="example-19-1" type="radio" name="radio-examples" />
      <span class="name">Tab 1</span>
    </label>
    <label for="example-19-2" role="radio">
      <input id="example-19-2" type="radio" name="radio-examples" />
      <span class="name">Tab 2</span>
    </label>
  </div>
</div>

<style>
  .radio-inputs-19 {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    border-radius: 0.5rem;
    background-color: #eee;
    box-sizing: border-box;
    box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
    padding: 0.25rem;
    width: 150px;
    font-size: 14px;
  }

  .radio-inputs-19 label {
    flex: 1 1 auto;
    text-align: center;
  }

  .radio-inputs-19 label input {
    display: none;
  }

  .radio-inputs-19 label .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem 0;
    color: rgba(51, 65, 85, 1);
    transition: all 0.15s ease-in-out;
  }

  .radio-inputs-19 label input:checked + .name {
    background-color: #fff;
    font-weight: 600;
  }
</style>` },
  { filename: "div as a custom radio", content: `<div class="radio-wrapper-1" tabindex="0" role="radio" aria-checked="false">
  <input id="example-1" class="substituted" type="radio" aria-hidden="true" />
  <label class="pointer" for="example-1">radio</label>
</div>
<style>
  .radio-wrapper-1 *,
  .radio-wrapper-1 ::after,
  .radio-wrapper-1 ::before {
    box-sizing: border-box;
  }
  .radio-wrapper-1 [type="radio"].substituted {
    margin: 0;
    width: 0;
    height: 0;
    display: inline;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .radio-wrapper-1 [type="radio"].substituted + label:before {
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
  .radio-wrapper-1 [type="radio"].substituted:enabled:active + label:before,
  .radio-wrapper-1 [type="radio"].substituted:enabled + label:active:before {
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset;
    background-color: #f0f0f0;
  }
  .radio-wrapper-1 [type="radio"].substituted:checked + label:before {
    background-color: #3b99fc;
    background-size: 0.75em;
    color: rgba(0, 0, 0, 0.075);
  }
  .radio-wrapper-1 [type="radio"].substituted:checked:enabled:active + label:before,
  .radio-wrapper-1 [type="radio"].substituted:checked:enabled + label:active:before {
    background-color: #0a7ffb;
    color: rgba(0, 0, 0, 0.275);
  }
  .radio-wrapper-1 [type="radio"].substituted:focus + label:before {
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset, 0 0 0 3.3px rgba(65, 159, 255, 0.55), 0 0 0 5px rgba(65, 159, 255, 0.3);
  }
  .radio-wrapper-1 [type="radio"].substituted:focus:active + label:before,
  .radio-wrapper-1 [type="radio"].substituted:focus + label:active:before {
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset, 0 0 0 3.3px rgba(65, 159, 255, 0.55), 0 0 0 5px rgba(65, 159, 255, 0.3);
  }
  .radio-wrapper-1 [type="radio"].substituted:disabled + label:before {
    opacity: 0.5;
  }

  .radio-wrapper-1 [type="radio"].substituted.dark + label:before {
    color: rgba(255, 255, 255, 0.275);
    background-color: #222;
    background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xml:space="preserve" fill="rgba(34, 34, 34, 0.999)" viewBox="0 0 9 9"><rect x="0" y="4.3" transform="matrix(-0.707 -0.7072 0.7072 -0.707 0.5891 10.4702)" width="4.3" height="1.6" /><rect x="2.2" y="2.9" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 12.1877 2.9833)" width="6.1" height="1.7" /></svg>');
  }
  .radio-wrapper-1 [type="radio"].substituted.dark:enabled:active + label:before,
  .radio-wrapper-1 [type="radio"].substituted.dark:enabled + label:active:before {
    background-color: #444;
    box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(255, 255, 255, 0.1) inset;
  }
  .radio-wrapper-1 [type="radio"].substituted.dark:checked + label:before {
    background-color: #a97035;
    color: rgba(255, 255, 255, 0.075);
  }
  .radio-wrapper-1 [type="radio"].substituted.dark:checked:enabled:active + label:before,
  .radio-wrapper-1 [type="radio"].substituted.dark:checked:enabled + label:active:before {
    background-color: #c68035;
    color: rgba(0, 0, 0, 0.275);
  }
  .radio-wrapper-1 [type="radio"].substituted + label {
    -webkit-user-select: none;
    user-select: none;
  }
  .pointer {
    cursor: pointer;
  }
</style>` },
  { filename: "label as a custom radio", content: `<div class="radio-wrapper-44">
  <label id="test-subject" class="toggleButton" role="radio" aria-checked="false" tabindex="0">
    <input type="radio" />
    <div>
      <svg viewBox="0 0 44 44">
        <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
      </svg>
    </div>
    <span class="caption"> I agree to the terms</span>
  </label>
</div>
<style>
  .radio-wrapper-44 input[type="radio"] {
    display: none;
    visibility: hidden;
  }

  .radio-wrapper-44 *,
  .radio-wrapper-44 *::before,
  .radio-wrapper-44 *::after {
    box-sizing: border-box;
  }

  .radio-wrapper-44 .toggleButton {
    cursor: pointer;
    display: flex;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;
    transition: transform 0.14s ease;
  }
  .radio-wrapper-44 .toggleButton:active {
    transform: rotateX(30deg);
  }
  .radio-wrapper-44 .toggleButton input + div {
    border: 3px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    position: relative;
    width: 44px;
    height: 44px;
  }
  .radio-wrapper-44 .toggleButton input + div svg {
    fill: none;
    stroke-width: 3.6;
    stroke: #000;
    stroke-linecap: round;
    stroke-linejoin: round;
    width: 44px;
    height: 44px;
    display: block;
    position: absolute;
    left: -3px;
    top: -3px;
    right: -3px;
    bottom: -3px;
    z-index: 1;
    stroke-dashoffset: 124.6;
    stroke-dasharray: 0 162.6 133 29.6;
    transition: all 0.4s ease 0s;
  }
  .radio-wrapper-44 .toggleButton input + div:before,
  .radio-wrapper-44 .toggleButton input + div:after {
    content: "";
    width: 3px;
    height: 16px;
    background: #000;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 5px;
  }
  .radio-wrapper-44 .toggleButton input + div:before {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    -webkit-animation: bounceInBefore-44 0.3s linear forwards 0.3s;
    animation: bounceInBefore-44 0.3s linear forwards 0.3s;
  }
  .radio-wrapper-44 .toggleButton input + div:after {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    -webkit-animation: bounceInAfter-44 0.3s linear forwards 0.3s;
    animation: bounceInAfter-44 0.3s linear forwards 0.3s;
  }
  .radio-wrapper-44 .toggleButton input:checked + div svg {
    stroke-dashoffset: 162.6;
    stroke-dasharray: 0 162.6 28 134.6;
    transition: all 0.4s ease 0.2s;
  }
  .radio-wrapper-44 .toggleButton input:checked + div:before {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    -webkit-animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
    animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
  }
  .radio-wrapper-44 .toggleButton input:checked + div:after {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    -webkit-animation: bounceInAfterDont-44 0.3s linear forwards 0s;
    animation: bounceInAfterDont-44 0.3s linear forwards 0s;
  }
  span.caption {
    padding-left: 8px;
    line-height: 44px;
    font-size: 22px;
    font-weight: 600;
  }
  @-webkit-keyframes bounceInBefore-44 {
    0% {
      opacity: 0;
      transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.1) translate(-50%, -50%) rotate(45deg);
    }
    80% {
      opacity: 1;
      transform: scale(0.89) translate(-50%, -50%) rotate(45deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(45deg);
    }
  }

  @keyframes bounceInBefore-44 {
    0% {
      opacity: 0;
      transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.1) translate(-50%, -50%) rotate(45deg);
    }
    80% {
      opacity: 1;
      transform: scale(0.89) translate(-50%, -50%) rotate(45deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(45deg);
    }
  }
  @-webkit-keyframes bounceInAfter-44 {
    0% {
      opacity: 0;
      transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.1) translate(-50%, -50%) rotate(-45deg);
    }
    80% {
      opacity: 1;
      transform: scale(0.89) translate(-50%, -50%) rotate(-45deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(-45deg);
    }
  }
  @keyframes bounceInAfter-44 {
    0% {
      opacity: 0;
      transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    }
    50% {
      opacity: 0.9;
      transform: scale(1.1) translate(-50%, -50%) rotate(-45deg);
    }
    80% {
      opacity: 1;
      transform: scale(0.89) translate(-50%, -50%) rotate(-45deg);
    }
    100% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(-45deg);
    }
  }
  @-webkit-keyframes bounceInBeforeDont-44 {
    0% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(45deg);
    }
    100% {
      opacity: 0;
      transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    }
  }
  @keyframes bounceInBeforeDont-44 {
    0% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(45deg);
    }
    100% {
      opacity: 0;
      transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    }
  }
  @-webkit-keyframes bounceInAfterDont-44 {
    0% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(-45deg);
    }
    100% {
      opacity: 0;
      transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    }
  }
  @keyframes bounceInAfterDont-44 {
    0% {
      opacity: 1;
      transform: scale(1) translate(-50%, -50%) rotate(-45deg);
    }
    100% {
      opacity: 0;
      transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    }
  }
</style>` }
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

export default RadioMismatchSuccess;
