import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const CheckboxMismatchSuccess = () => {
  const ruleId = "checkbox-mismatch";
  const title = `Custom checkbox controls should be tagged for assistive technology`;
  const description = `Screen readers have built-in mechanisms to handle checkbox components. By default, screen readers don't support custom checkboxes and using them without exposing the appropriate role may prevent screen reader users from interacting as expected with the component.`;
  const helpText = `Assign role="checkbox" to the custom checkbox element.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "custom checkbox with compliant checkbox as a direct child", content: `<div class="checkbox-wrapper-44">
  <label id="test-subject" class="toggleButton">
    <input type="checkbox" />
    <div>
      <svg viewBox="0 0 44 44">
        <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
      </svg>
    </div>
  </label>
</div>

<style>
  .checkbox-wrapper-44 input[type="checkbox"] {
    display: block;
    visibility: visible;
    opacity: 1;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .checkbox-wrapper-44 *,
  .checkbox-wrapper-44 *::before,
  .checkbox-wrapper-44 *::after {
    box-sizing: border-box;
  }

  .checkbox-wrapper-44 .toggleButton {
    cursor: pointer;
    display: block;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;
    transition: transform 0.14s ease;
  }
  .checkbox-wrapper-44 .toggleButton:active {
    transform: rotateX(30deg);
  }
  .checkbox-wrapper-44 .toggleButton input + div {
    border: 3px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    position: relative;
    width: 44px;
    height: 44px;
  }
  .checkbox-wrapper-44 .toggleButton input + div svg {
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
  .checkbox-wrapper-44 .toggleButton input + div:before,
  .checkbox-wrapper-44 .toggleButton input + div:after {
    content: "";
    width: 3px;
    height: 16px;
    background: #000;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 5px;
  }
  .checkbox-wrapper-44 .toggleButton input + div:before {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    -webkit-animation: bounceInBefore-44 0.3s linear forwards 0.3s;
    animation: bounceInBefore-44 0.3s linear forwards 0.3s;
  }
  .checkbox-wrapper-44 .toggleButton input + div:after {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    -webkit-animation: bounceInAfter-44 0.3s linear forwards 0.3s;
    animation: bounceInAfter-44 0.3s linear forwards 0.3s;
  }
  .checkbox-wrapper-44 .toggleButton input:checked + div svg {
    stroke-dashoffset: 162.6;
    stroke-dasharray: 0 162.6 28 134.6;
    transition: all 0.4s ease 0.2s;
  }
  .checkbox-wrapper-44 .toggleButton input:checked + div:before {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    -webkit-animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
    animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
  }
  .checkbox-wrapper-44 .toggleButton input:checked + div:after {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    -webkit-animation: bounceInAfterDont-44 0.3s linear forwards 0s;
    animation: bounceInAfterDont-44 0.3s linear forwards 0s;
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
</style>` },
  { filename: "custom checkbox with role checkbox input visibility hidden", content: `<div class="checkbox-wrapper-44">
  <label id="test-subject" class="toggleButton" role="checkbox">
    <input type="checkbox" />
    <div>
      <svg viewBox="0 0 44 44">
        <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
      </svg>
    </div>
  </label>
</div>

<style>
  .checkbox-wrapper-44 input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }

  .checkbox-wrapper-44 *,
  .checkbox-wrapper-44 *::before,
  .checkbox-wrapper-44 *::after {
    box-sizing: border-box;
  }

  .checkbox-wrapper-44 .toggleButton {
    cursor: pointer;
    display: block;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;
    transition: transform 0.14s ease;
  }
  .checkbox-wrapper-44 .toggleButton:active {
    transform: rotateX(30deg);
  }
  .checkbox-wrapper-44 .toggleButton input + div {
    border: 3px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    position: relative;
    width: 44px;
    height: 44px;
  }
  .checkbox-wrapper-44 .toggleButton input + div svg {
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
  .checkbox-wrapper-44 .toggleButton input + div:before,
  .checkbox-wrapper-44 .toggleButton input + div:after {
    content: "";
    width: 3px;
    height: 16px;
    background: #000;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 5px;
  }
  .checkbox-wrapper-44 .toggleButton input + div:before {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    -webkit-animation: bounceInBefore-44 0.3s linear forwards 0.3s;
    animation: bounceInBefore-44 0.3s linear forwards 0.3s;
  }
  .checkbox-wrapper-44 .toggleButton input + div:after {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    -webkit-animation: bounceInAfter-44 0.3s linear forwards 0.3s;
    animation: bounceInAfter-44 0.3s linear forwards 0.3s;
  }
  .checkbox-wrapper-44 .toggleButton input:checked + div svg {
    stroke-dashoffset: 162.6;
    stroke-dasharray: 0 162.6 28 134.6;
    transition: all 0.4s ease 0.2s;
  }
  .checkbox-wrapper-44 .toggleButton input:checked + div:before {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    -webkit-animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
    animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
  }
  .checkbox-wrapper-44 .toggleButton input:checked + div:after {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    -webkit-animation: bounceInAfterDont-44 0.3s linear forwards 0s;
    animation: bounceInAfterDont-44 0.3s linear forwards 0s;
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
</style>` },
  { filename: "div as a custom checkbox", content: `<div class="checkbox-wrapper-1" tabindex="0" role="checkbox" aria-checked="false">
  <input id="example-1" class="substituted" type="checkbox" aria-hidden="true" />
  <label class="pointer" for="example-1">Checkbox</label>
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
</style>` },
  { filename: "label as a custom checkbox", content: `<div class="checkbox-wrapper-44">
  <label id="test-subject" class="toggleButton" role="checkbox" aria-checked="false" tabindex="0">
    <input type="checkbox" />
    <div>
      <svg viewBox="0 0 44 44">
        <path d="M14,24 L21,31 L39.7428882,11.5937758 C35.2809627,6.53125861 30.0333333,4 24,4 C12.95,4 4,12.95 4,24 C4,35.05 12.95,44 24,44 C35.05,44 44,35.05 44,24 C44,19.3 42.5809627,15.1645919 39.7428882,11.5937758" transform="translate(-2.000000, -2.000000)"></path>
      </svg>
    </div>
    <span class="caption"> I agree to the terms</span>
  </label>
</div>
<style>
  .checkbox-wrapper-44 input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }

  .checkbox-wrapper-44 *,
  .checkbox-wrapper-44 *::before,
  .checkbox-wrapper-44 *::after {
    box-sizing: border-box;
  }

  .checkbox-wrapper-44 .toggleButton {
    cursor: pointer;
    display: flex;
    transform-origin: 50% 50%;
    transform-style: preserve-3d;
    transition: transform 0.14s ease;
  }
  .checkbox-wrapper-44 .toggleButton:active {
    transform: rotateX(30deg);
  }
  .checkbox-wrapper-44 .toggleButton input + div {
    border: 3px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    position: relative;
    width: 44px;
    height: 44px;
  }
  .checkbox-wrapper-44 .toggleButton input + div svg {
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
  .checkbox-wrapper-44 .toggleButton input + div:before,
  .checkbox-wrapper-44 .toggleButton input + div:after {
    content: "";
    width: 3px;
    height: 16px;
    background: #000;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 5px;
  }
  .checkbox-wrapper-44 .toggleButton input + div:before {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    -webkit-animation: bounceInBefore-44 0.3s linear forwards 0.3s;
    animation: bounceInBefore-44 0.3s linear forwards 0.3s;
  }
  .checkbox-wrapper-44 .toggleButton input + div:after {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(-45deg);
    -webkit-animation: bounceInAfter-44 0.3s linear forwards 0.3s;
    animation: bounceInAfter-44 0.3s linear forwards 0.3s;
  }
  .checkbox-wrapper-44 .toggleButton input:checked + div svg {
    stroke-dashoffset: 162.6;
    stroke-dasharray: 0 162.6 28 134.6;
    transition: all 0.4s ease 0.2s;
  }
  .checkbox-wrapper-44 .toggleButton input:checked + div:before {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%) rotate(45deg);
    -webkit-animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
    animation: bounceInBeforeDont-44 0.3s linear forwards 0s;
  }
  .checkbox-wrapper-44 .toggleButton input:checked + div:after {
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
</style>` },
  { filename: "material ui custom checkbox label span input", content: `<label
  class="MuiFormControlLabel-root MuiFormControlLabel-labelPlacementEnd css-1f50zqm"
  style="
    align-items: center;
    block-size: 42px;
    cursor: pointer;
    display: flex;
    font-family: Arial;
    height: 42px;
    inline-size: 115.562px;
    margin-inline: -11px 16px;
    margin-left: -11px;
    margin-right: 16px;
    min-block-size: auto;
    min-height: auto;
    min-inline-size: auto;
    min-width: auto;
    perspective-origin: 57.7812px 21px;
    transform-origin: 57.7812px 21px;
    vertical-align: middle;
    width: 115.562px;
    -webkit-box-align: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  "
  ><span
    class="MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium Mui-checked MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium css-1mhhq07"
    style="
      align-items: center;
      block-size: 42px;
      border-block-color: rgb(25, 118, 210);
      border-color: rgb(25, 118, 210);
      border-radius: 50%;
      border-end-end-radius: 50%;
      border-end-start-radius: 50%;
      border-inline-color: rgb(25, 118, 210);
      border-start-end-radius: 50%;
      border-start-start-radius: 50%;
      inset: 0px;
      caret-color: rgb(25, 118, 210);
      color: rgb(25, 118, 210);
      column-rule-color: rgb(25, 118, 210);
      cursor: pointer;
      display: flex;
      font-family: Arial;
      height: 42px;
      inline-size: 42px;
      inset-block: 0px;
      inset-inline: 0px;
      justify-content: center;
      min-block-size: auto;
      min-height: auto;
      min-inline-size: auto;
      min-width: auto;
      outline-color: rgb(25, 118, 210);
      outline-width: 0px;
      padding-block: 9px;
      padding: 9px;
      padding-inline: 9px;
      perspective-origin: 21px 21px;
      position: relative;
      text-decoration-color: rgb(25, 118, 210);
      text-emphasis-color: rgb(25, 118, 210);
      transform-origin: 21px 21px;
      user-select: none;
      vertical-align: middle;
      width: 42px;
      -webkit-box-align: center;
      -webkit-box-pack: center;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-text-fill-color: rgb(25, 118, 210);
      -webkit-text-stroke-color: rgb(25, 118, 210);
    "
    ><input
      type="checkbox"
      data-indeterminate="false"
      class="PrivateSwitchBase-input css-j8yymo"
      checked=""
      style="
        background-color: rgba(0, 0, 0, 0);
        block-size: 42px;
        border-block: 0px rgb(0, 0, 0);
        border-color: rgb(0, 0, 0);
        border-style: none;
        border-width: 0px;
        border-inline: 0px rgb(0, 0, 0);
        inset: 0px;
        cursor: pointer;
        display: block;
        height: 42px;
        inline-size: 42px;
        inset-block: 0px;
        inset-inline: 0px;
        opacity: 0;
        overflow-block: visible;
        overflow-inline: visible;
        overflow: visible;
        padding-block: 0px;
        padding: 0px;
        padding-inline: 0px;
        perspective-origin: 21px 21px;
        position: absolute;
        transform-origin: 21px 21px;
        user-select: none;
        width: 42px;
        z-index: 1;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      " /><svg
      class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-iguwhy"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      style="
        block-size: 24px;
        border-block-color: rgb(25, 118, 210);
        border-color: rgb(25, 118, 210);
        border-inline-color: rgb(25, 118, 210);
        caret-color: rgb(25, 118, 210);
        color: rgb(25, 118, 210);
        column-rule-color: rgb(25, 118, 210);
        cursor: pointer;
        display: block;
        fill: rgb(25, 118, 210);
        flex-shrink: 0;
        font-family: Arial;
        font-size: 24px;
        height: 24px;
        inline-size: 24px;
        line-height: 36px;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        outline-color: rgb(25, 118, 210);
        overflow-block: hidden;
        overflow-clip-margin: content-box;
        overflow-inline: hidden;
        overflow: hidden;
        perspective-origin: 12px 12px;
        text-decoration-color: rgb(25, 118, 210);
        text-emphasis-color: rgb(25, 118, 210);
        transform-origin: 12px 12px;
        transition-duration: 0.3s;
        transition-property: fill;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        user-select: none;
        width: 24px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-text-fill-color: rgb(25, 118, 210);
        -webkit-text-stroke-color: rgb(25, 118, 210);
      "
    >
      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg
    ><span
      class="MuiTouchRipple-root css-4mb1j7"
      style="
        block-size: 42px;
        border-block-color: rgb(25, 118, 210);
        border-color: rgb(25, 118, 210);
        border-radius: 50%;
        border-end-end-radius: 50%;
        border-end-start-radius: 50%;
        border-inline-color: rgb(25, 118, 210);
        border-start-end-radius: 50%;
        border-start-start-radius: 50%;
        inset: 0px;
        caret-color: rgb(25, 118, 210);
        color: rgb(25, 118, 210);
        column-rule-color: rgb(25, 118, 210);
        cursor: pointer;
        display: block;
        font-family: Arial;
        height: 42px;
        inline-size: 42px;
        inset-block: 0px;
        inset-inline: 0px;
        outline-color: rgb(25, 118, 210);
        overflow-block: hidden;
        overflow-inline: hidden;
        overflow: hidden;
        perspective-origin: 21px 21px;
        pointer-events: none;
        position: absolute;
        text-decoration-color: rgb(25, 118, 210);
        text-emphasis-color: rgb(25, 118, 210);
        transform-origin: 21px 21px;
        user-select: none;
        width: 42px;
        z-index: 0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-text-fill-color: rgb(25, 118, 210);
        -webkit-text-stroke-color: rgb(25, 118, 210);
      "
    ></span></span
  ><span
    class="MuiTypography-root MuiTypography-body1 MuiFormControlLabel-label css-fyswvn"
    style="
      block-size: 24px;
      cursor: pointer;
      display: block;
      font-family: Roboto, Helvetica, Arial, sans-serif;
      height: 24px;
      inline-size: 39.4375px;
      letter-spacing: 0.15008px;
      min-block-size: auto;
      min-height: auto;
      min-inline-size: auto;
      min-width: auto;
      perspective-origin: 19.7188px 12px;
      transform-origin: 19.7188px 12px;
      width: 39.4375px;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    "
    >Label</span
  ></label
>
<style></style>` },
  { filename: "material ui custom checkbox span", content: `<span
  class="MuiButtonBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium PrivateSwitchBase-root MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium Mui-checked MuiCheckbox-root MuiCheckbox-colorPrimary MuiCheckbox-sizeMedium css-1mhhq07"
  style="
    align-items: center;
    block-size: 42px;
    border-block-color: rgb(25, 118, 210);
    border-color: rgb(25, 118, 210);
    border-radius: 50%;
    border-end-end-radius: 50%;
    border-end-start-radius: 50%;
    border-inline-color: rgb(25, 118, 210);
    border-start-end-radius: 50%;
    border-start-start-radius: 50%;
    inset: 0px;
    caret-color: rgb(25, 118, 210);
    color: rgb(25, 118, 210);
    column-rule-color: rgb(25, 118, 210);
    cursor: pointer;
    display: inline-flex;
    font-family: Arial;
    height: 42px;
    inline-size: 42px;
    inset-block: 0px;
    inset-inline: 0px;
    justify-content: center;
    outline-color: rgb(25, 118, 210);
    outline-width: 0px;
    padding-block: 9px;
    padding: 9px;
    padding-inline: 9px;
    perspective-origin: 21px 21px;
    position: relative;
    text-decoration-color: rgb(25, 118, 210);
    text-emphasis-color: rgb(25, 118, 210);
    transform-origin: 21px 21px;
    user-select: none;
    vertical-align: middle;
    width: 42px;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-text-fill-color: rgb(25, 118, 210);
    -webkit-text-stroke-color: rgb(25, 118, 210);
  "
  ><input
    data-indeterminate="false"
    aria-label="Checkbox demo"
    class="PrivateSwitchBase-input css-j8yymo"
    type="checkbox"
    checked=""
    style="
      background-color: rgba(0, 0, 0, 0);
      block-size: 42px;
      border-block: 0px rgb(0, 0, 0);
      border-color: rgb(0, 0, 0);
      border-style: none;
      border-width: 0px;
      border-inline: 0px rgb(0, 0, 0);
      inset: 0px;
      cursor: pointer;
      display: block;
      height: 42px;
      inline-size: 42px;
      inset-block: 0px;
      inset-inline: 0px;
      opacity: 0;
      overflow-block: visible;
      overflow-inline: visible;
      overflow: visible;
      padding-block: 0px;
      padding: 0px;
      padding-inline: 0px;
      perspective-origin: 21px 21px;
      position: absolute;
      transform-origin: 21px 21px;
      user-select: none;
      width: 42px;
      z-index: 1;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    " /><svg
    class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-iguwhy"
    focusable="false"
    aria-hidden="true"
    viewBox="0 0 24 24"
    style="
      block-size: 24px;
      border-block-color: rgb(25, 118, 210);
      border-color: rgb(25, 118, 210);
      border-inline-color: rgb(25, 118, 210);
      caret-color: rgb(25, 118, 210);
      color: rgb(25, 118, 210);
      column-rule-color: rgb(25, 118, 210);
      cursor: pointer;
      display: block;
      fill: rgb(25, 118, 210);
      flex-shrink: 0;
      font-family: Arial;
      font-size: 24px;
      height: 24px;
      inline-size: 24px;
      line-height: 36px;
      min-block-size: auto;
      min-height: auto;
      min-inline-size: auto;
      min-width: auto;
      outline-color: rgb(25, 118, 210);
      overflow-block: hidden;
      overflow-clip-margin: content-box;
      overflow-inline: hidden;
      overflow: hidden;
      perspective-origin: 12px 12px;
      text-decoration-color: rgb(25, 118, 210);
      text-emphasis-color: rgb(25, 118, 210);
      transform-origin: 12px 12px;
      transition-duration: 0.3s;
      transition-property: fill;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      width: 24px;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-text-fill-color: rgb(25, 118, 210);
      -webkit-text-stroke-color: rgb(25, 118, 210);
    "
  >
    <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg
></span>
<style></style>` },
  { filename: "radix ui custom checkbox without input", content: `<div
  role="group"
  data-slot="field"
  data-orientation="horizontal"
  class="group/field flex w-full gap-2 data-[invalid=true]:text-destructive flex-row items-center has-[&gt;[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[&gt;[data-slot=field-content]]:[&amp;&gt;[role=checkbox],[role=radio]]:mt-px"
  style="
    align-items: center;
    block-size: 16px;
    caret-color: lab(15.204 0 -0.00000596046);
    color: lab(15.204 0 -0.00000596046);
    gap: 8px;
    column-rule-color: lab(15.204 0 -0.00000596046);
    display: flex;
    font-size: 15px;
    height: 16px;
    inline-size: 384px;
    line-height: 22.5px;
    min-block-size: auto;
    min-height: auto;
    min-inline-size: auto;
    min-width: auto;
    perspective-origin: 192px 8px;
    text-decoration-color: lab(15.204 0 -0.00000596046);
    text-emphasis-color: lab(15.204 0 -0.00000596046);
    transform-origin: 192px 8px;
    width: 384px;
    -webkit-text-fill-color: lab(15.204 0 -0.00000596046);
    -webkit-text-stroke-color: lab(15.204 0 -0.00000596046);
  "
>
  <button
    type="button"
    role="checkbox"
    aria-checked="false"
    data-state="unchecked"
    value="on"
    data-slot="checkbox"
    class="peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary"
    id="terms-checkbox"
    style="
      align-items: center;
      block-size: 16px;
      border-block-width: 1px;
      border-radius: 4px;
      border-width: 1px;
      border-end-end-radius: 4px;
      border-end-start-radius: 4px;
      border-inline-width: 1px;
      border-start-end-radius: 4px;
      border-start-start-radius: 4px;
      inset: 0px;
      caret-color: lab(15.204 0 -0.00000596046);
      color: lab(15.204 0 -0.00000596046);
      column-rule-color: lab(15.204 0 -0.00000596046);
      display: flex;
      flex-shrink: 0;
      font-size: 15px;
      height: 16px;
      inline-size: 16px;
      inset-block: 0px;
      inset-inline: 0px;
      justify-content: center;
      line-height: 22.5px;
      min-block-size: auto;
      min-height: auto;
      min-inline-size: auto;
      min-width: auto;
      perspective-origin: 8px 8px;
      position: relative;
      text-decoration-color: lab(15.204 0 -0.00000596046);
      text-emphasis-color: lab(15.204 0 -0.00000596046);
      transform-origin: 8px 8px;
      transition-duration: 0.15s;
      transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      width: 16px;
      -webkit-text-fill-color: lab(15.204 0 -0.00000596046);
      -webkit-text-stroke-color: lab(15.204 0 -0.00000596046);
    "
    data-id="0"
  ></button
  ><label
    data-slot="label"
    class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
    for="terms-checkbox"
    style="
      align-items: center;
      block-size: 14px;
      caret-color: lab(15.204 0 -0.00000596046);
      color: lab(15.204 0 -0.00000596046);
      gap: 8px;
      column-rule-color: lab(15.204 0 -0.00000596046);
      display: flex;
      font-size: 14px;
      font-weight: 500;
      height: 14px;
      inline-size: 187.656px;
      line-height: 14px;
      min-block-size: auto;
      min-height: auto;
      min-inline-size: auto;
      min-width: auto;
      perspective-origin: 93.8281px 7px;
      text-decoration-color: lab(15.204 0 -0.00000596046);
      text-emphasis-color: lab(15.204 0 -0.00000596046);
      transform-origin: 93.8281px 7px;
      user-select: none;
      width: 187.656px;
      -webkit-text-fill-color: lab(15.204 0 -0.00000596046);
      -webkit-text-stroke-color: lab(15.204 0 -0.00000596046);
    "
    >Accept terms and conditions</label
  >
</div>
<style>
  [data-id="0"]::after {
    block-size: 30px;
    border-block-end-color: lab(15.204 0 -0.00000596046);
    border-block-start-color: lab(15.204 0 -0.00000596046);
    border-bottom-color: lab(15.204 0 -0.00000596046);
    border-inline-end-color: lab(15.204 0 -0.00000596046);
    border-inline-start-color: lab(15.204 0 -0.00000596046);
    border-left-color: lab(15.204 0 -0.00000596046);
    border-right-color: lab(15.204 0 -0.00000596046);
    border-top-color: lab(15.204 0 -0.00000596046);
    bottom: -8px;
    caret-color: lab(15.204 0 -0.00000596046);
    color: lab(15.204 0 -0.00000596046);
    column-rule-color: lab(15.204 0 -0.00000596046);
    content: "";
    display: block;
    font-size: 15px;
    height: 30px;
    inline-size: 38px;
    inset-block-end: -8px;
    inset-block-start: -8px;
    inset-inline-end: -12px;
    inset-inline-start: -12px;
    left: -12px;
    line-height: 22.5px;
    outline-color: lab(15.204 0 -0.00000596046);
    perspective-origin: 19px 15px;
    position: absolute;
    right: -12px;
    text-decoration-color: lab(15.204 0 -0.00000596046);
    text-emphasis-color: lab(15.204 0 -0.00000596046);
    top: -8px;
    transform-origin: 19px 15px;
    width: 38px;
    -webkit-text-fill-color: lab(15.204 0 -0.00000596046);
    -webkit-text-stroke-color: lab(15.204 0 -0.00000596046);
    --top-spacing: calc(0.25rem * 4);
    --sidebar-width: calc(0.25rem * 72);
    --sidebar-width-icon: 3rem;
  }
</style>` },
  { filename: "radix ui custom checkbox", content: `<div
  style="
    display: flex;
    align-items: center;
    block-size: 25px;
    border-block-color: color(display-p3 0.113 0.125 0.14);
    border-color: color(display-p3 0.113 0.125 0.14);
    border-inline-color: color(display-p3 0.113 0.125 0.14);
    caret-color: color(display-p3 0.113 0.125 0.14);
    color: color(display-p3 0.113 0.125 0.14);
    column-rule-color: color(display-p3 0.113 0.125 0.14);
    height: 25px;
    inline-size: 245.273px;
    line-height: 24px;
    outline-color: color(display-p3 0.113 0.125 0.14);
    overflow-wrap: break-word;
    perspective-origin: 122.633px 12.5px;
    text-decoration-color: color(display-p3 0.113 0.125 0.14);
    text-emphasis-color: color(display-p3 0.113 0.125 0.14);
    transform-origin: 122.637px 12.5px;
    width: 245.273px;
    -webkit-font-smoothing: antialiased;
    -webkit-text-fill-color: color(display-p3 0.113 0.125 0.14);
    -webkit-text-stroke-color: color(display-p3 0.113 0.125 0.14);
  "
>
  <button
    type="button"
    role="checkbox"
    aria-checked="true"
    data-state="checked"
    value="on"
    class="styles_Root__9VXoD"
    id="c1"
    style="
      align-items: center;
      appearance: none;
      background-color: rgb(255, 255, 255);
      block-size: 25px;
      border-block: 0px color(display-p3 0.113 0.125 0.14);
      border-color: color(display-p3 0.113 0.125 0.14);
      border-radius: 4px;
      border-style: none;
      border-width: 0px;
      border-end-end-radius: 4px;
      border-end-start-radius: 4px;
      border-inline: 0px color(display-p3 0.113 0.125 0.14);
      border-start-end-radius: 4px;
      border-start-start-radius: 4px;
      box-shadow: color(display-p3 0 0 0 / 0.5) 0px 2px 10px 0px;
      box-sizing: content-box;
      caret-color: color(display-p3 0.113 0.125 0.14);
      color: color(display-p3 0.113 0.125 0.14);
      column-rule-color: color(display-p3 0.113 0.125 0.14);
      cursor: auto;
      display: flex;
      font-family: 'Untitled Sans', -apple-system, 'system-ui', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
      font-size: 16px;
      height: 25px;
      inline-size: 25px;
      justify-content: center;
      line-height: 24px;
      min-block-size: auto;
      min-height: auto;
      min-inline-size: auto;
      min-width: auto;
      outline-color: color(display-p3 0.113 0.125 0.14);
      outline-width: 3px;
      overflow-wrap: break-word;
      padding-block: 0px;
      padding: 0px;
      padding-inline: 0px;
      perspective-origin: 12.5px 12.5px;
      text-align: start;
      text-decoration-color: color(display-p3 0.113 0.125 0.14);
      text-emphasis-color: color(display-p3 0.113 0.125 0.14);
      transform-origin: 12.5px 12.5px;
      width: 25px;
      -webkit-font-smoothing: antialiased;
      -webkit-text-fill-color: color(display-p3 0.113 0.125 0.14);
      -webkit-text-stroke-color: color(display-p3 0.113 0.125 0.14);
    "
  >
    <span
      data-state="checked"
      class="styles_Indicator__ZxH2r"
      style="
        pointer-events: none;
        block-size: 15px;
        border-block-color: color(display-p3 0.383 0.317 0.702);
        border-color: color(display-p3 0.383 0.317 0.702);
        border-inline-color: color(display-p3 0.383 0.317 0.702);
        caret-color: color(display-p3 0.383 0.317 0.702);
        color: color(display-p3 0.383 0.317 0.702);
        column-rule-color: color(display-p3 0.383 0.317 0.702);
        display: block;
        height: 15px;
        inline-size: 15px;
        line-height: 24px;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        outline-color: color(display-p3 0.383 0.317 0.702);
        overflow-wrap: break-word;
        perspective-origin: 7.5px 7.5px;
        text-decoration-color: color(display-p3 0.383 0.317 0.702);
        text-emphasis-color: color(display-p3 0.383 0.317 0.702);
        transform-origin: 7.5px 7.5px;
        width: 15px;
        -webkit-font-smoothing: antialiased;
        -webkit-text-fill-color: color(display-p3 0.383 0.317 0.702);
        -webkit-text-stroke-color: color(display-p3 0.383 0.317 0.702);
      "
      ><svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="
          block-size: 15px;
          border-block-color: color(display-p3 0.383 0.317 0.702);
          border-color: color(display-p3 0.383 0.317 0.702);
          border-inline-color: color(display-p3 0.383 0.317 0.702);
          caret-color: color(display-p3 0.383 0.317 0.702);
          color: color(display-p3 0.383 0.317 0.702);
          column-rule-color: color(display-p3 0.383 0.317 0.702);
          fill: none;
          height: 15px;
          inline-size: 15px;
          line-height: 24px;
          outline-color: color(display-p3 0.383 0.317 0.702);
          overflow-clip-margin: content-box;
          overflow-wrap: break-word;
          perspective-origin: 7.5px 7.5px;
          pointer-events: none;
          text-decoration-color: color(display-p3 0.383 0.317 0.702);
          text-emphasis-color: color(display-p3 0.383 0.317 0.702);
          transform-origin: 7.5px 7.5px;
          width: 15px;
          -webkit-font-smoothing: antialiased;
          -webkit-text-fill-color: color(display-p3 0.383 0.317 0.702);
          -webkit-text-stroke-color: color(display-p3 0.383 0.317 0.702);
        "
      >
        <path
          d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
          fill="currentColor"
          fill-rule="evenodd"
          clip-rule="evenodd"
        ></path>
      </svg>
    </span></button
  ><input
    type="checkbox"
    aria-hidden="true"
    tabindex="-1"
    style="
      position: absolute;
      pointer-events: none;
      opacity: 0;
      margin: 0px;
      transform: matrix(1, 0, 0, 1, -25, 0);
      background-color: rgba(0, 0, 0, 0);
      block-size: 25px;
      border-block: 0px rgb(0, 0, 0);
      border-color: rgb(0, 0, 0);
      border-style: none;
      border-width: 0px;
      border-inline: 0px rgb(0, 0, 0);
      inset: 100px 502.641px 100px 282.359px;
      cursor: default;
      display: block;
      height: 25px;
      inline-size: 25px;
      inset-block: 100px;
      inset-inline: 282.359px 502.641px;
      overflow-block: visible;
      overflow-inline: visible;
      overflow-wrap: break-word;
      overflow: visible;
      padding-block: 0px;
      padding: 0px;
      padding-inline: 0px;
      perspective-origin: 12.5px 12.5px;
      transform-origin: 12.5px 12.5px;
      width: 25px;
      -webkit-font-smoothing: antialiased;
    "
    checked=""
    value="on"
    data-1p-ignore="true"
    data-lpignore="true"
    data-protonpass-ignore="true"
    data-bwignore="true"
  /><label
    class="styles_Label__TqhLI"
    for="c1"
    style="
      block-size: 15px;
      border-block-color: rgb(255, 255, 255);
      border-color: rgb(255, 255, 255);
      border-inline-color: rgb(255, 255, 255);
      caret-color: rgb(255, 255, 255);
      color: rgb(255, 255, 255);
      column-rule-color: rgb(255, 255, 255);
      display: block;
      font-size: 15px;
      height: 15px;
      inline-size: 220.281px;
      line-height: 15px;
      min-block-size: auto;
      min-height: auto;
      min-inline-size: auto;
      min-width: auto;
      outline-color: rgb(255, 255, 255);
      overflow-wrap: break-word;
      padding-inline-start: 15px;
      padding-left: 15px;
      perspective-origin: 110.141px 7.5px;
      text-decoration-color: rgb(255, 255, 255);
      text-emphasis-color: rgb(255, 255, 255);
      transform-origin: 110.141px 7.5px;
      width: 220.281px;
      -webkit-font-smoothing: antialiased;
      -webkit-text-fill-color: rgb(255, 255, 255);
      -webkit-text-stroke-color: rgb(255, 255, 255);
      background-color: rgb(0, 0, 0);
    "
    >Accept terms and conditions.</label
  >
</div>
<style></style>` },
  { filename: "sentry custom checkbox", content: `<label
  id="subscribe-label"
  class="_checkboxInput_1evyh_64"
  style="
    block-size: 32px;
    caret-color: rgb(54, 45, 89);
    color: rgb(54, 45, 89);
    column-rule-color: rgb(54, 45, 89);
    cursor: pointer;
    font-family: Rubik, sans-serif;
    height: 32px;
    inline-size: 560px;
    min-block-size: 0px;
    min-height: 0px;
    min-inline-size: 0px;
    min-width: 0px;
    outline-color: rgb(54, 45, 89);
    perspective-origin: 280px 16px;
    text-decoration-color: rgb(54, 45, 89);
    text-emphasis-color: rgb(54, 45, 89);
    transform-origin: 280px 16px;
    width: 560px;
    -webkit-text-fill-color: rgb(54, 45, 89);
    -webkit-text-stroke-color: rgb(54, 45, 89);
  "
  ><input
    name="subscribe"
    type="checkbox"
    aria-labelledby="subscribe-label"
    tabindex="0"
    style="
      background-color: rgba(0, 0, 0, 0);
      block-size: 0px;
      border-block-color: rgb(54, 45, 89);
      border-block-style: none;
      border-color: rgb(54, 45, 89);
      border-style: none;
      border-inline-color: rgb(54, 45, 89);
      border-inline-style: none;
      inset: 428px 584px 316.797px 24px;
      caret-color: rgb(54, 45, 89);
      color: rgb(54, 45, 89);
      column-rule-color: rgb(54, 45, 89);
      cursor: pointer;
      font-family: Rubik, sans-serif;
      height: 0px;
      inline-size: 0px;
      inset-block: 428px 316.797px;
      inset-inline: 24px 584px;
      min-block-size: 0px;
      min-height: 0px;
      min-inline-size: 0px;
      min-width: 0px;
      opacity: 0;
      outline-color: rgb(54, 45, 89);
      overflow-block: visible;
      overflow-inline: visible;
      overflow: visible;
      perspective-origin: 0px 0px;
      position: absolute;
      text-decoration-color: rgb(54, 45, 89);
      text-emphasis-color: rgb(54, 45, 89);
      transform-origin: 0px 0px;
      width: 0px;
      -webkit-text-fill-color: rgb(54, 45, 89);
      -webkit-text-stroke-color: rgb(54, 45, 89);
    "
  /><span
    style="
      block-size: 21px;
      inset: 0px;
      caret-color: rgb(54, 45, 89);
      color: rgb(54, 45, 89);
      column-rule-color: rgb(54, 45, 89);
      cursor: pointer;
      display: inline-block;
      font-family: Rubik, sans-serif;
      font-size: 14px;
      height: 21px;
      inline-size: 282.836px;
      inset-block: 0px;
      inset-inline: 0px;
      line-height: 21px;
      min-block-size: 0px;
      min-height: 0px;
      min-inline-size: 0px;
      min-width: 0px;
      outline-color: rgb(54, 45, 89);
      padding-inline-start: 24px;
      padding-left: 24px;
      perspective-origin: 141.414px 10.5px;
      position: relative;
      text-decoration-color: rgb(54, 45, 89);
      text-emphasis-color: rgb(54, 45, 89);
      transform-origin: 141.418px 10.5px;
      user-select: none;
      width: 282.836px;
      -webkit-text-fill-color: rgb(54, 45, 89);
      -webkit-text-stroke-color: rgb(54, 45, 89);
    "
    data-id="0"
    >I would like to receive updates via email.</span
  ></label
>
<style>
  [data-id="0"]::before {
    background-color: rgb(255, 255, 255);
    block-size: 18px;
    border-block-end-color: rgb(207, 207, 219);
    border-block-end-width: 1px;
    border-block-start-color: rgb(207, 207, 219);
    border-block-start-width: 1px;
    border-bottom-color: rgb(207, 207, 219);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-width: 1px;
    border-end-end-radius: 3px;
    border-end-start-radius: 3px;
    border-inline-end-color: rgb(207, 207, 219);
    border-inline-end-width: 1px;
    border-inline-start-color: rgb(207, 207, 219);
    border-inline-start-width: 1px;
    border-left-color: rgb(207, 207, 219);
    border-left-width: 1px;
    border-right-color: rgb(207, 207, 219);
    border-right-width: 1px;
    border-start-end-radius: 3px;
    border-start-start-radius: 3px;
    border-top-color: rgb(207, 207, 219);
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-top-width: 1px;
    bottom: 3px;
    caret-color: rgb(54, 45, 89);
    color: rgb(54, 45, 89);
    column-rule-color: rgb(54, 45, 89);
    content: "";
    cursor: pointer;
    display: block;
    font-family: Rubik, sans-serif;
    font-size: 14px;
    height: 18px;
    inline-size: 18px;
    inset-block-end: 3px;
    inset-block-start: 0px;
    inset-inline-end: 264.836px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    outline-color: rgb(54, 45, 89);
    perspective-origin: 9px 9px;
    position: absolute;
    right: 264.836px;
    text-decoration-color: rgb(54, 45, 89);
    text-emphasis-color: rgb(54, 45, 89);
    top: 0px;
    transform-origin: 9px 9px;
    user-select: none;
    width: 18px;
    -webkit-text-fill-color: rgb(54, 45, 89);
    -webkit-text-stroke-color: rgb(54, 45, 89);
    --base-width: 100%;
    --xl-width: 58.333333333333336%;
    --xl: 1152px;
    --sm: 576px;
    --lg: 992px;
    --lg-width: 50%;
    --md: 768px;
    --xs: 0%;
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

export default CheckboxMismatchSuccess;
