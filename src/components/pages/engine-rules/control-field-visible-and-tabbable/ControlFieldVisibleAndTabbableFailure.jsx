import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ControlFieldVisibleAndTabbableFailure = () => {
  const ruleId = "control-field-visible-and-tabbable";
  const title = `Custom checkboxes, radio buttons and file upload fields should be accessible to assistive technology`;
  const description = `Screen readers have built-in mechanisms to handle checkboxes, radio buttons, and file upload fields. By default, assistive technology does not support custom checkboxes, radio buttons, and file upload fields, and using those may prevent screen reader users from interacting with the fields and keyboard users from tabbing to the fields.`;
  const helpText = `If using standard LABEL and INPUT fields with custom CSS styling, ensure the checkbox, radio button, or file input is fully visible to assistive technology but visually hidden using opacity, width, height, and positioning (never use display:none or visibility:hidden). Alternatively, create a standard checkbox, radio button, or file input field available only for screen readers using the screen reader only technique, and hide the custom checkbox, radio button, or file input from screen readers using aria-hidden="true".`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "custom checkbox 1", content: `<style>
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
</style>
<div id="test-subject" class="checkbox-wrapper-1 pointer">
  <input id="example-1" class="substituted" type="checkbox" aria-hidden="true" />
  <label for="example-1">Checkbox</label>
</div>` },
  { filename: "custom checkbox 2", content: `<div id="test-subject" class="checkbox-wrapper-4">
  <input class="inp-cbx" id="morning" type="checkbox" />
  <label class="cbx" for="morning"
    ><span>
      <svg width="12px" height="10px">
        <use xlink:href="#check-4"></use></svg></span
    ><span>Morning</span></label
  >
  <svg class="inline-svg">
    <symbol id="check-4" viewbox="0 0 12 10">
      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
    </symbol>
  </svg>
</div>

<style>
  .checkbox-wrapper-4 * {
    box-sizing: border-box;
  }
  .checkbox-wrapper-4 .cbx {
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    padding: 6px 8px;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.2s ease;
    display: inline-block;
  }
  .checkbox-wrapper-4 .cbx:not(:last-child) {
    margin-right: 6px;
  }
  .checkbox-wrapper-4 .cbx:hover {
    background: rgba(0, 119, 255, 0.06);
  }
  .checkbox-wrapper-4 .cbx span {
    float: left;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
  }
  .checkbox-wrapper-4 .cbx span:first-child {
    position: relative;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    transform: scale(1);
    border: 1px solid #cccfdb;
    transition: all 0.2s ease;
    box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05);
  }
  .checkbox-wrapper-4 .cbx span:first-child svg {
    position: absolute;
    top: 3px;
    left: 2px;
    fill: none;
    stroke: #fff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }
  .checkbox-wrapper-4 .cbx span:last-child {
    padding-left: 8px;
    line-height: 18px;
  }
  .checkbox-wrapper-4 .cbx:hover span:first-child {
    border-color: #07f;
  }
  .checkbox-wrapper-4 .inp-cbx {
    position: absolute;
    visibility: hidden;
  }
  .checkbox-wrapper-4 .inp-cbx:checked + .cbx span:first-child {
    background: #07f;
    border-color: #07f;
    animation: wave-4 0.4s ease;
  }
  .checkbox-wrapper-4 .inp-cbx:checked + .cbx span:first-child svg {
    stroke-dashoffset: 0;
  }
  .checkbox-wrapper-4 .inline-svg {
    position: absolute;
    width: 0;
    height: 0;
    pointer-events: none;
    user-select: none;
  }
  @media screen and (max-width: 640px) {
    .checkbox-wrapper-4 .cbx {
      width: 100%;
      display: inline-block;
    }
  }
  @-moz-keyframes wave-4 {
    50% {
      transform: scale(0.9);
    }
  }
  @-webkit-keyframes wave-4 {
    50% {
      transform: scale(0.9);
    }
  }
  @-o-keyframes wave-4 {
    50% {
      transform: scale(0.9);
    }
  }
  @keyframes wave-4 {
    50% {
      transform: scale(0.9);
    }
  }
</style>` },
  { filename: "custom checkbox 3", content: `<div class="checkbox-wrapper-44">
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
  { filename: "custom checkbox switch", content: `<div id="test-subject" class="checkbox-wrapper-10">
  <input class="tgl tgl-flip" id="cb5" type="checkbox" checked />
  <label class="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" for="cb5"></label>
</div>

<style>
  .checkbox-wrapper-10 .tgl {
    display: none;
  }
  .checkbox-wrapper-10 .tgl,
  .checkbox-wrapper-10 .tgl:after,
  .checkbox-wrapper-10 .tgl:before,
  .checkbox-wrapper-10 .tgl *,
  .checkbox-wrapper-10 .tgl *:after,
  .checkbox-wrapper-10 .tgl *:before,
  .checkbox-wrapper-10 .tgl + .tgl-btn {
    box-sizing: border-box;
  }
  .checkbox-wrapper-10 .tgl::-moz-selection,
  .checkbox-wrapper-10 .tgl:after::-moz-selection,
  .checkbox-wrapper-10 .tgl:before::-moz-selection,
  .checkbox-wrapper-10 .tgl *::-moz-selection,
  .checkbox-wrapper-10 .tgl *:after::-moz-selection,
  .checkbox-wrapper-10 .tgl *:before::-moz-selection,
  .checkbox-wrapper-10 .tgl + .tgl-btn::-moz-selection,
  .checkbox-wrapper-10 .tgl::selection,
  .checkbox-wrapper-10 .tgl:after::selection,
  .checkbox-wrapper-10 .tgl:before::selection,
  .checkbox-wrapper-10 .tgl *::selection,
  .checkbox-wrapper-10 .tgl *:after::selection,
  .checkbox-wrapper-10 .tgl *:before::selection,
  .checkbox-wrapper-10 .tgl + .tgl-btn::selection {
    background: none;
  }
  .checkbox-wrapper-10 .tgl + .tgl-btn {
    outline: 0;
    display: block;
    width: 4em;
    height: 2em;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .checkbox-wrapper-10 .tgl + .tgl-btn:after,
  .checkbox-wrapper-10 .tgl + .tgl-btn:before {
    position: relative;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
  }
  .checkbox-wrapper-10 .tgl + .tgl-btn:after {
    left: 0;
  }
  .checkbox-wrapper-10 .tgl + .tgl-btn:before {
    display: none;
  }
  .checkbox-wrapper-10 .tgl:checked + .tgl-btn:after {
    left: 50%;
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn {
    padding: 2px;
    transition: all 0.2s ease;
    font-family: sans-serif;
    perspective: 100px;
  }
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:after,
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:before {
    display: inline-block;
    transition: all 0.4s ease;
    width: 100%;
    text-align: center;
    position: absolute;
    line-height: 2em;
    font-weight: bold;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 4px;
  }
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:after {
    content: attr(data-tg-on);
    background: #02c66f;
    transform: rotateY(-180deg);
  }
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:before {
    background: #ff3a19;
    content: attr(data-tg-off);
  }
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:active:before {
    transform: rotateY(-20deg);
  }
  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:before {
    transform: rotateY(180deg);
  }
  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:after {
    transform: rotateY(0);
    left: 0;
    background: #7fc6a6;
  }
  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:active:after {
    transform: rotateY(20deg);
  }
</style>` },
  { filename: "custom checkbox toggle 1", content: `<div class="checkbox-wrapper-20">
  <div id="test-subject" class="switch">
    <input id="one-20" class="input" type="checkbox" />
    <label for="one-20" class="slider"></label>
  </div>
</div>

<style>
  .checkbox-wrapper-20 {
    --slider-height: 8px;
    --slider-width: calc(var(--slider-height) * 4);
    --switch-height: calc(var(--slider-height) * 3);
    --switch-width: var(--switch-height);
    --switch-shift: var(--slider-height);
    --transition: all 0.2s ease;

    --switch-on-color: #ef0460;
    --slider-on-color: #fc5d9b;

    --switch-off-color: #eeeeee;
    --slider-off-color: #c5c5c5;
  }

  .checkbox-wrapper-20 .switch {
    display: block;
  }

  .checkbox-wrapper-20 .switch .slider {
    position: relative;
    display: inline-block;
    height: var(--slider-height);
    width: var(--slider-width);
    border-radius: var(--slider-height);
    cursor: pointer;
    background: var(--slider-off-color);
    transition: var(--transition);
  }

  .checkbox-wrapper-20 .switch .slider:after {
    background: var(--switch-off-color);
    position: absolute;
    left: calc(-1 * var(--switch-shift));
    top: calc((var(--slider-height) - var(--switch-height)) / 2);
    display: block;
    width: var(--switch-height);
    height: var(--switch-width);
    border-radius: 50%;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
    content: "";
    transition: var(--transition);
  }

  .checkbox-wrapper-20 .switch label {
    margin-right: 7px;
  }

  .checkbox-wrapper-20 .switch .input {
    display: none;
  }

  .checkbox-wrapper-20 .switch .input ~ .label {
    margin-left: var(--slider-height);
  }

  .checkbox-wrapper-20 .switch .input:checked ~ .slider:after {
    left: calc(var(--slider-width) - var(--switch-width) + var(--switch-shift));
  }

  .checkbox-wrapper-20 .switch .input:checked ~ .slider {
    background: var(--slider-on-color);
  }

  .checkbox-wrapper-20 .switch .input:checked ~ .slider:after {
    background: var(--switch-on-color);
  }
</style>` },
  { filename: "custom checkbox toggle 2", content: `<div class="checkbox-wrapper-55">
  <label id="test-subject" class="rocker rocker-small">
    <input type="checkbox" />
    <span class="switch-left">Yes</span>
    <span class="switch-right">No</span>
  </label>
</div>

<style>
  .checkbox-wrapper-55 input[type="checkbox"] {
    visibility: hidden;
    display: none;
  }

  .checkbox-wrapper-55 *,
  .checkbox-wrapper-55 ::after,
  .checkbox-wrapper-55 ::before {
    box-sizing: border-box;
  }

  .checkbox-wrapper-55 .rocker {
    display: inline-block;
    position: relative;
    /*
    SIZE OF SWITCH
    ==============
    All sizes are in em - therefore
    changing the font-size here
    will change the size of the switch.
    See .rocker-small below as example.
    */
    font-size: 2em;
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
    color: #888;
    width: 7em;
    height: 4em;
    overflow: hidden;
    border-bottom: 0.5em solid #eee;
  }

  .checkbox-wrapper-55 .rocker-small {
    font-size: 0.75em;
  }

  .checkbox-wrapper-55 .rocker::before {
    content: "";
    position: absolute;
    top: 0.5em;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #999;
    border: 0.5em solid #eee;
    border-bottom: 0;
  }

  .checkbox-wrapper-55 .switch-left,
  .checkbox-wrapper-55 .switch-right {
    cursor: pointer;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5em;
    width: 3em;
    transition: 0.2s;
    user-select: none;
  }

  .checkbox-wrapper-55 .switch-left {
    height: 2.4em;
    width: 2.75em;
    left: 0.85em;
    bottom: 0.4em;
    background-color: #ddd;
    transform: rotate(15deg) skewX(15deg);
  }

  .checkbox-wrapper-55 .switch-right {
    right: 0.5em;
    bottom: 0;
    background-color: #bd5757;
    color: #fff;
  }

  .checkbox-wrapper-55 .switch-left::before,
  .checkbox-wrapper-55 .switch-right::before {
    content: "";
    position: absolute;
    width: 0.4em;
    height: 2.45em;
    bottom: -0.45em;
    background-color: #ccc;
    transform: skewY(-65deg);
  }

  .checkbox-wrapper-55 .switch-left::before {
    left: -0.4em;
  }

  .checkbox-wrapper-55 .switch-right::before {
    right: -0.375em;
    background-color: transparent;
    transform: skewY(65deg);
  }

  .checkbox-wrapper-55 input:checked + .switch-left {
    background-color: #0084d0;
    color: #fff;
    bottom: 0px;
    left: 0.5em;
    height: 2.5em;
    width: 3em;
    transform: rotate(0deg) skewX(0deg);
  }

  .checkbox-wrapper-55 input:checked + .switch-left::before {
    background-color: transparent;
    width: 3.0833em;
  }

  .checkbox-wrapper-55 input:checked + .switch-left + .switch-right {
    background-color: #ddd;
    color: #888;
    bottom: 0.4em;
    right: 0.8em;
    height: 2.4em;
    width: 2.75em;
    transform: rotate(-15deg) skewX(-15deg);
  }

  .checkbox-wrapper-55 input:checked + .switch-left + .switch-right::before {
    background-color: #ccc;
  }

  /* Keyboard Users */
  .checkbox-wrapper-55 input:focus + .switch-left {
    color: #333;
  }

  .checkbox-wrapper-55 input:checked:focus + .switch-left {
    color: #fff;
  }

  .checkbox-wrapper-55 input:focus + .switch-left + .switch-right {
    color: #fff;
  }

  .checkbox-wrapper-55 input:checked:focus + .switch-left + .switch-right {
    color: #333;
  }
</style>` },
  { filename: "custom radio button range", content: `<div class="radio-wrapper">
  <input id="example-29-1" type="radio" name="radio-examples" />
  <label for="example-29-1" data-amount="\$50k-\$100k"></label>
  <input id="example-29-2" type="radio" name="radio-examples" />
  <label for="example-29-2" data-amount="\$100k+"></label>
  <div class="amount-pos"></div>
</div>

<style>
  .radio-wrapper {
    display: flex;
    flex-direction: row;
    align-content: stretch;
    position: relative;
    width: 100%;
    height: 50px;
    --number-of-options: 2;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-bottom: 1.2em;
  }
  .radio-wrapper::before {
    content: " ";
    position: absolute;
    height: 2px;
    width: 100%;
    width: calc(100% * (calc(var(--number-of-options) - 1) / var(--number-of-options)));
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #000;
  }
  .radio-wrapper input,
  .radio-wrapper label {
    box-sizing: border-box;
    flex: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
  }
  .radio-wrapper label {
    display: inline-block;
    position: relative;
    width: 20%;
    height: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .radio-wrapper label::before {
    content: attr(data-amount);
    position: absolute;
    left: 50%;
    padding-top: 10px;
    transform: translate(-50%, 45px);
    font-size: 14px;
    letter-spacing: 0.4px;
    font-weight: 400;
    white-space: nowrap;
    opacity: 0.85;
    transition: all 0.15s ease-in-out;
  }
  .radio-wrapper label::after {
    content: " ";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    border: 2px solid #000;
    background: #fff;
    border-radius: 50%;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 1;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
  }
  .radio-wrapper label:hover::after {
    transform: translate(-50%, -50%) scale(1.25);
  }
  .radio-wrapper input {
    display: none;
  }
  .radio-wrapper input:checked + label::before {
    font-weight: 800;
    opacity: 1;
  }
  .radio-wrapper input:checked + label::after {
    border-width: 4px;
    transform: translate(-50%, -50%) scale(0.75);
  }
  .radio-wrapper input:checked ~ .amount-pos {
    opacity: 1;
  }
  .radio-wrapper input:checked:nth-child(1) ~ .amount-pos {
    left: 25%;
  }
  .radio-wrapper input:checked:nth-child(3) ~ .amount-pos {
    left: 75%;
  }
  .radio-wrapper .amount-pos {
    display: block;
    position: absolute;
    top: 50%;
    width: 12px;
    height: 12px;
    background: #000;
    border-radius: 50%;
    transition: all 0.15s ease-in-out;
    transform: translate(-50%, -50%);
    border: 2px solid #fff;
    opacity: 0;
    z-index: 2;
    left: 25%;
    pointer-events: none;
  }
  .radio-wrapper input + label::before {
    transform: translate(-50%, 45px) scale(0.9);
    transition: all 0.15s linear;
  }
  .radio-wrapper input:checked + label::before {
    transform: translate(-50%, 45px) scale(1.1);
    transition: all 0.15s linear;
  }
</style>` },
  { filename: "custom radio button tab", content: `<div class="radio-wrapper">
  <div class="radio-inputs-19">
    <label for="example-19-1">
      <input id="example-19-1" type="radio" name="radio-examples" />
      <span class="name">Tab 1</span>
    </label>
    <label for="example-19-2">
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
  { filename: "drag and drop with hidden input", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Drag and Drop Image Upload</title>
    <style>
      .drop-zone {
        width: 100%;
        padding: 20px;
        border: 2px dashed #ccc;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
      }
      .drop-zone.dragover {
        background-color: #f0f0f0;
      }
      .image-preview {
        margin-top: 10px;
        max-width: 100%;
        height: auto;
        display: none;
      }
      input[type="file"] {
        display: none;
      }
    </style>
  </head>
  <body>
    <form method="post" enctype="multipart/form-data">
      <div class="drop-zone" id="drop-zone">
        <p>Drag & Drop an image here or <span style="color: blue; text-decoration: underline">Browse</span></p>
        <input type="file" id="image" name="image" accept="image/*" />
      </div>
      <img id="image-preview" class="image-preview" alt="Image Preview" />
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>

    <script>
      const dropZone = document.getElementById("drop-zone");
      const fileInput = document.getElementById("image");
      const imagePreview = document.getElementById("image-preview");

      dropZone.addEventListener("click", () => fileInput.click());

      dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
      });

      dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));

      dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        const file = e.dataTransfer.files[0];
        handleFile(file);
      });

      fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        handleFile(file);
      });

      function handleFile(file) {
        if (file && file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block";
          };
          reader.readAsDataURL(file);
        }
      }
    </script>
  </body>
</html>` }
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

export default ControlFieldVisibleAndTabbableFailure;
