import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ButtonMismatchSuccess = () => {
  const ruleId = "button-mismatch";
  const title = `Buttons should be tagged for assistive technology`;
  const description = `If interactive elements cannot be identified as buttons, screen reader users may not realize the element is actionable, which can stop them from submitting forms, opening dialogs, or performing other intended actions.`;
  const helpText = `Add role="button" to the custom interactive element, or use a HTML <button> element.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "button as menu item", content: `<!-- Example taken from https://www.erstegroup.com/de/karriere/schuelerinnen -->
<nav
  role="navigation"
  aria-label="Site menu"
  class="css-179t5g5 evdsvoy7"
  style="
    block-size: 32px;
    border-block-color: rgb(255, 255, 255);
    border-color: rgb(255, 255, 255);
    border-inline-color: rgb(255, 255, 255);
    inset: 0px;
    caret-color: rgb(255, 255, 255);
    color: rgb(255, 255, 255);
    column-rule-color: rgb(255, 255, 255);
    height: 32px;
    inline-size: 1039px;
    inset-block: 0px;
    inset-inline: 0px;
    outline-color: rgb(255, 255, 255);
    perspective-origin: 519.5px 16px;
    position: relative;
    text-decoration: none solid rgb(255, 255, 255);
    text-emphasis-color: rgb(255, 255, 255);
    transform-origin: 519.5px 16px;
    width: 1039px;
    z-index: 1;
    -webkit-text-fill-color: rgb(255, 255, 255);
    -webkit-text-stroke-color: rgb(255, 255, 255);
  "
>
  <ul
    role="menubar"
    class="css-fm73dp evdsvoy6"
    style="
      block-size: 32px;
      border-block-color: rgb(255, 255, 255);
      border-color: rgb(255, 255, 255);
      border-inline-color: rgb(255, 255, 255);
      caret-color: rgb(255, 255, 255);
      color: rgb(255, 255, 255);
      column-rule-color: rgb(255, 255, 255);
      display: flex;
      height: 32px;
      inline-size: 1039px;
      outline-color: rgb(255, 255, 255);
      perspective-origin: 519.5px 16px;
      text-decoration: none solid rgb(255, 255, 255);
      text-emphasis-color: rgb(255, 255, 255);
      transform: matrix(1, 0, 0, 1, 0, 0);
      transform-origin: 519.5px 16px;
      transition-duration: 0.25s;
      transition-property: transform;
      transition-timing-function: ease-out;
      width: 1039px;
      -webkit-text-fill-color: rgb(255, 255, 255);
      -webkit-text-stroke-color: rgb(255, 255, 255);
    "
  >
    <li
      role="none"
      data-testid="nav-tab"
      style="
        block-size: 32px;
        border-block-color: rgb(255, 255, 255);
        border-color: rgb(255, 255, 255);
        border-inline-color: rgb(255, 255, 255);
        caret-color: rgb(255, 255, 255);
        color: rgb(255, 255, 255);
        column-rule-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        height: 32px;
        inline-size: 105.969px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        outline-color: rgb(255, 255, 255);
        perspective-origin: 52.9844px 16px;
        text-decoration: none solid rgb(255, 255, 255);
        text-emphasis-color: rgb(255, 255, 255);
        transform-origin: 52.9844px 16px;
        width: 105.969px;
        -webkit-text-fill-color: rgb(255, 255, 255);
        -webkit-text-stroke-color: rgb(255, 255, 255);
      "
    >
      <button
        aria-haspopup="true"
        aria-expanded="false"
        role="menuitem"
        tabindex="0"
        data-gem-id="header-nav-1"
        class="css-nj6hzh evdsvoy5 btn--unstyled"
        type="button"
        style="
          block-size: 32px;
          border-block: 0px none rgb(255, 255, 255);
          border-color: rgb(255, 255, 255);
          border-style: none;
          border-width: 0px;
          border-inline: 0px none rgb(255, 255, 255);
          caret-color: rgb(255, 255, 255);
          color: rgb(255, 255, 255);
          column-rule-color: rgb(255, 255, 255);
          display: block;
          font-weight: 600;
          height: 32px;
          inline-size: 105.969px;
          list-style-type: none;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          outline-color: rgb(255, 255, 255);
          padding-block: 4px;
          padding: 4px 12px;
          padding-inline: 12px;
          perspective-origin: 52.9844px 16px;
          text-decoration: none solid rgb(255, 255, 255);
          text-emphasis-color: rgb(255, 255, 255);
          text-wrap-mode: nowrap;
          transform-origin: 52.9844px 16px;
          transition-duration: 0.25s;
          transition-property: background-color;
          width: 105.969px;
          -webkit-text-fill-color: rgb(255, 255, 255);
          -webkit-text-stroke-color: rgb(255, 255, 255);
        "
      >
        <span
          class="wb"
          style="
            border-block-color: rgb(255, 255, 255);
            border-color: rgb(255, 255, 255);
            border-inline-color: rgb(255, 255, 255);
            caret-color: rgb(255, 255, 255);
            color: rgb(255, 255, 255);
            column-rule-color: rgb(255, 255, 255);
            cursor: pointer;
            font-weight: 600;
            list-style-type: none;
            outline-color: rgb(255, 255, 255);
            text-align: center;
            text-decoration: none solid rgb(255, 255, 255);
            text-emphasis-color: rgb(255, 255, 255);
            text-wrap-mode: nowrap;
            word-break: break-word;
            -webkit-text-fill-color: rgb(255, 255, 255);
            -webkit-text-stroke-color: rgb(255, 255, 255);
          "
          >Investoren</span
        >
      </button>
    </li>
    <li
      role="none"
      data-testid="nav-tab"
      style="
        block-size: 32px;
        border-block-color: rgb(255, 255, 255);
        border-color: rgb(255, 255, 255);
        border-inline-color: rgb(255, 255, 255);
        caret-color: rgb(255, 255, 255);
        color: rgb(255, 255, 255);
        column-rule-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        height: 32px;
        inline-size: 133.438px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        outline-color: rgb(255, 255, 255);
        perspective-origin: 66.7188px 16px;
        text-decoration: none solid rgb(255, 255, 255);
        text-emphasis-color: rgb(255, 255, 255);
        transform-origin: 66.7188px 16px;
        width: 133.438px;
        -webkit-text-fill-color: rgb(255, 255, 255);
        -webkit-text-stroke-color: rgb(255, 255, 255);
      "
    >
      <button
        aria-haspopup="true"
        aria-expanded="false"
        role="menuitem"
        tabindex="-1"
        data-gem-id="header-nav-2"
        class="css-nj6hzh evdsvoy5 btn--unstyled"
        type="button"
        style="
          block-size: 32px;
          border-block: 0px none rgb(255, 255, 255);
          border-color: rgb(255, 255, 255);
          border-style: none;
          border-width: 0px;
          border-inline: 0px none rgb(255, 255, 255);
          caret-color: rgb(255, 255, 255);
          color: rgb(255, 255, 255);
          column-rule-color: rgb(255, 255, 255);
          display: block;
          font-weight: 600;
          height: 32px;
          inline-size: 133.453px;
          list-style-type: none;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          outline-color: rgb(255, 255, 255);
          padding-block: 4px;
          padding: 4px 12px;
          padding-inline: 12px;
          perspective-origin: 66.7188px 16px;
          text-decoration: none solid rgb(255, 255, 255);
          text-emphasis-color: rgb(255, 255, 255);
          text-wrap-mode: nowrap;
          transform-origin: 66.7266px 16px;
          transition-duration: 0.25s;
          transition-property: background-color;
          width: 133.453px;
          -webkit-text-fill-color: rgb(255, 255, 255);
          -webkit-text-stroke-color: rgb(255, 255, 255);
        "
      >
        <span
          class="wb"
          style="
            border-block-color: rgb(255, 255, 255);
            border-color: rgb(255, 255, 255);
            border-inline-color: rgb(255, 255, 255);
            caret-color: rgb(255, 255, 255);
            color: rgb(255, 255, 255);
            column-rule-color: rgb(255, 255, 255);
            cursor: pointer;
            font-weight: 600;
            list-style-type: none;
            outline-color: rgb(255, 255, 255);
            text-align: center;
            text-decoration: none solid rgb(255, 255, 255);
            text-emphasis-color: rgb(255, 255, 255);
            text-wrap-mode: nowrap;
            word-break: break-word;
            -webkit-text-fill-color: rgb(255, 255, 255);
            -webkit-text-stroke-color: rgb(255, 255, 255);
          "
          >News &amp; Media</span
        >
      </button>
    </li>
    <li
      role="none"
      data-testid="nav-tab"
      style="
        block-size: 32px;
        border-block-color: rgb(255, 255, 255);
        border-color: rgb(255, 255, 255);
        border-inline-color: rgb(255, 255, 255);
        caret-color: rgb(255, 255, 255);
        color: rgb(255, 255, 255);
        column-rule-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        height: 32px;
        inline-size: 135.391px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        outline-color: rgb(255, 255, 255);
        perspective-origin: 67.6875px 16px;
        text-decoration: none solid rgb(255, 255, 255);
        text-emphasis-color: rgb(255, 255, 255);
        transform-origin: 67.6953px 16px;
        width: 135.391px;
        -webkit-text-fill-color: rgb(255, 255, 255);
        -webkit-text-stroke-color: rgb(255, 255, 255);
      "
    >
      <button
        aria-haspopup="true"
        aria-expanded="false"
        role="menuitem"
        tabindex="-1"
        data-gem-id="header-nav-3"
        class="css-nj6hzh evdsvoy5 btn--unstyled"
        type="button"
        style="
          block-size: 32px;
          border-block: 0px none rgb(255, 255, 255);
          border-color: rgb(255, 255, 255);
          border-style: none;
          border-width: 0px;
          border-inline: 0px none rgb(255, 255, 255);
          caret-color: rgb(255, 255, 255);
          color: rgb(255, 255, 255);
          column-rule-color: rgb(255, 255, 255);
          display: block;
          font-weight: 600;
          height: 32px;
          inline-size: 135.406px;
          list-style-type: none;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          outline-color: rgb(255, 255, 255);
          padding-block: 4px;
          padding: 4px 12px;
          padding-inline: 12px;
          perspective-origin: 67.7031px 16px;
          text-decoration: none solid rgb(255, 255, 255);
          text-emphasis-color: rgb(255, 255, 255);
          text-wrap-mode: nowrap;
          transform-origin: 67.7031px 16px;
          transition-duration: 0.25s;
          transition-property: background-color;
          width: 135.406px;
          -webkit-text-fill-color: rgb(255, 255, 255);
          -webkit-text-stroke-color: rgb(255, 255, 255);
        "
      >
        <span
          class="wb"
          style="
            border-block-color: rgb(255, 255, 255);
            border-color: rgb(255, 255, 255);
            border-inline-color: rgb(255, 255, 255);
            caret-color: rgb(255, 255, 255);
            color: rgb(255, 255, 255);
            column-rule-color: rgb(255, 255, 255);
            cursor: pointer;
            font-weight: 600;
            list-style-type: none;
            outline-color: rgb(255, 255, 255);
            text-align: center;
            text-decoration: none solid rgb(255, 255, 255);
            text-emphasis-color: rgb(255, 255, 255);
            text-wrap-mode: nowrap;
            word-break: break-word;
            -webkit-text-fill-color: rgb(255, 255, 255);
            -webkit-text-stroke-color: rgb(255, 255, 255);
          "
          >Firmenkunden</span
        >
      </button>
    </li>
    <li
      role="none"
      data-testid="nav-tab"
      style="
        block-size: 32px;
        border-block-color: rgb(255, 255, 255);
        border-color: rgb(255, 255, 255);
        border-inline-color: rgb(255, 255, 255);
        caret-color: rgb(255, 255, 255);
        color: rgb(255, 255, 255);
        column-rule-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        height: 32px;
        inline-size: 127.141px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        outline-color: rgb(255, 255, 255);
        perspective-origin: 63.5625px 16px;
        text-decoration: none solid rgb(255, 255, 255);
        text-emphasis-color: rgb(255, 255, 255);
        transform-origin: 63.5703px 16px;
        width: 127.141px;
        -webkit-text-fill-color: rgb(255, 255, 255);
        -webkit-text-stroke-color: rgb(255, 255, 255);
      "
    >
      <a
        href="/de/privatkunden"
        role="menuitem"
        target="_self"
        tabindex="-1"
        data-gem-id="header-nav-4"
        class="wb css-1s3xdw2 evdsvoy4"
        style="
          block-size: 32px;
          border-block-color: rgb(255, 255, 255);
          border-color: rgb(255, 255, 255);
          border-inline-color: rgb(255, 255, 255);
          caret-color: rgb(255, 255, 255);
          color: rgb(255, 255, 255);
          column-rule-color: rgb(255, 255, 255);
          cursor: pointer;
          display: block;
          font-weight: 600;
          height: 32px;
          inline-size: 127.156px;
          list-style-type: none;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          outline-color: rgb(255, 255, 255);
          padding-block: 4px;
          padding: 4px 12px;
          padding-inline: 12px;
          perspective-origin: 63.5781px 16px;
          text-align: left;
          text-decoration: none solid rgb(255, 255, 255);
          text-emphasis-color: rgb(255, 255, 255);
          text-wrap-mode: nowrap;
          transform-origin: 63.5781px 16px;
          transition-duration: 0.25s;
          transition-property: background-color;
          width: 127.156px;
          word-break: break-word;
          -webkit-text-fill-color: rgb(255, 255, 255);
          -webkit-text-stroke-color: rgb(255, 255, 255);
        "
        >Privatkunden</a
      >
    </li>
    <li
      role="none"
      data-testid="nav-tab"
      style="
        block-size: 32px;
        border-block-color: rgb(255, 255, 255);
        border-color: rgb(255, 255, 255);
        border-inline-color: rgb(255, 255, 255);
        caret-color: rgb(255, 255, 255);
        color: rgb(255, 255, 255);
        column-rule-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        height: 32px;
        inline-size: 139.469px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        outline-color: rgb(255, 255, 255);
        perspective-origin: 69.7344px 16px;
        text-decoration: none solid rgb(255, 255, 255);
        text-emphasis-color: rgb(255, 255, 255);
        transform-origin: 69.7344px 16px;
        width: 139.469px;
        -webkit-text-fill-color: rgb(255, 255, 255);
        -webkit-text-stroke-color: rgb(255, 255, 255);
      "
    >
      <button
        aria-haspopup="true"
        aria-expanded="false"
        role="menuitem"
        tabindex="-1"
        data-gem-id="header-nav-5"
        class="css-nj6hzh evdsvoy5 btn--unstyled"
        type="button"
        style="
          block-size: 32px;
          border-block: 0px none rgb(255, 255, 255);
          border-color: rgb(255, 255, 255);
          border-style: none;
          border-width: 0px;
          border-inline: 0px none rgb(255, 255, 255);
          caret-color: rgb(255, 255, 255);
          color: rgb(255, 255, 255);
          column-rule-color: rgb(255, 255, 255);
          display: block;
          font-weight: 600;
          height: 32px;
          inline-size: 139.469px;
          list-style-type: none;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          outline-color: rgb(255, 255, 255);
          padding-block: 4px;
          padding: 4px 12px;
          padding-inline: 12px;
          perspective-origin: 69.7344px 16px;
          text-decoration: none solid rgb(255, 255, 255);
          text-emphasis-color: rgb(255, 255, 255);
          text-wrap-mode: nowrap;
          transform-origin: 69.7344px 16px;
          transition-duration: 0.25s;
          transition-property: background-color;
          width: 139.469px;
          -webkit-text-fill-color: rgb(255, 255, 255);
          -webkit-text-stroke-color: rgb(255, 255, 255);
        "
      >
        <span
          class="wb"
          style="
            border-block-color: rgb(255, 255, 255);
            border-color: rgb(255, 255, 255);
            border-inline-color: rgb(255, 255, 255);
            caret-color: rgb(255, 255, 255);
            color: rgb(255, 255, 255);
            column-rule-color: rgb(255, 255, 255);
            cursor: pointer;
            font-weight: 600;
            list-style-type: none;
            outline-color: rgb(255, 255, 255);
            text-align: center;
            text-decoration: none solid rgb(255, 255, 255);
            text-emphasis-color: rgb(255, 255, 255);
            text-wrap-mode: nowrap;
            word-break: break-word;
            -webkit-text-fill-color: rgb(255, 255, 255);
            -webkit-text-stroke-color: rgb(255, 255, 255);
          "
          >Finanzinstitute</span
        >
      </button>
    </li>
    <li
      role="none"
      data-testid="nav-tab"
      style="
        block-size: 32px;
        border-block-color: rgb(255, 255, 255);
        border-color: rgb(255, 255, 255);
        border-inline-color: rgb(255, 255, 255);
        caret-color: rgb(255, 255, 255);
        color: rgb(255, 255, 255);
        column-rule-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        height: 32px;
        inline-size: 144.922px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        outline-color: rgb(255, 255, 255);
        perspective-origin: 72.4531px 16px;
        text-decoration: none solid rgb(255, 255, 255);
        text-emphasis-color: rgb(255, 255, 255);
        transform-origin: 72.4609px 16px;
        width: 144.922px;
        -webkit-text-fill-color: rgb(255, 255, 255);
        -webkit-text-stroke-color: rgb(255, 255, 255);
      "
    >
      <a
        href="https://www.ersteprivatebanking.com/de/home"
        role="menuitem"
        target="_self"
        tabindex="-1"
        data-gem-id="header-nav-6"
        class="wb css-1s3xdw2 evdsvoy4"
        style="
          block-size: 32px;
          border-block-color: rgb(255, 255, 255);
          border-color: rgb(255, 255, 255);
          border-inline-color: rgb(255, 255, 255);
          caret-color: rgb(255, 255, 255);
          color: rgb(255, 255, 255);
          column-rule-color: rgb(255, 255, 255);
          cursor: pointer;
          display: block;
          font-weight: 600;
          height: 32px;
          inline-size: 144.922px;
          list-style-type: none;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          outline-color: rgb(255, 255, 255);
          padding-block: 4px;
          padding: 4px 12px;
          padding-inline: 12px;
          perspective-origin: 72.4531px 16px;
          text-align: left;
          text-decoration: none solid rgb(255, 255, 255);
          text-emphasis-color: rgb(255, 255, 255);
          text-wrap-mode: nowrap;
          transform-origin: 72.4609px 16px;
          transition-duration: 0.25s;
          transition-property: background-color;
          width: 144.922px;
          word-break: break-word;
          -webkit-text-fill-color: rgb(255, 255, 255);
          -webkit-text-stroke-color: rgb(255, 255, 255);
        "
        >Private Banking</a
      >
    </li>
  </ul>
</nav>` },
  { filename: "button hidden", content: `<a href="#anchor" hidden></a>` },
  { filename: "button like link href hash role button", content: `<a href="#" role="button"></a>` },
  { filename: "button like link href javascript role button", content: `<a href="javascript: console.log()" role="button"></a>` },
  { filename: "button not compliant trait exposed", content: `<details id="Details-HeaderMenu-2" class="mega-menu" style="animation-duration: 0.001s; block-size: 47px; height: 47px; inline-size: 110.633px; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 55.3125px 23.5px; transform-origin: 55.3164px 23.5px; width: 110.633px">
  <summary
    class="header__menu-item list-menu__item link focus-inset"
    role="button"
    data-acsb-clickable="true"
    data-acsb-navigable="true"
    tabindex="0"
    data-acsb-now-navigable="true"
    data-acsb-menu="a"
    data-acsb-menu-root-link="true"
    aria-expanded="false"
    style="
      align-items: center;
      animation-duration: 0.001s;
      block-size: 47px;
      border-block-color: rgb(0, 0, 0);
      border-color: rgb(0, 0, 0);
      border-inline-color: rgb(0, 0, 0);
      caret-color: rgb(0, 0, 0);
      color: rgb(0, 0, 0);
      column-rule-color: rgb(0, 0, 0);
      display: flex;
      font-weight: 700;
      height: 47px;
      inline-size: 110.633px;
      line-height: 27px;
      min-block-size: 0px;
      min-height: 0px;
      min-inline-size: 0px;
      min-width: 0px;
      outline-color: rgb(0, 0, 0);
      padding-block: 10px;
      padding: 10px 15px;
      padding-inline: 15px;
      perspective-origin: 55.3125px 23.5px;
      text-decoration-color: rgb(0, 0, 0);
      text-emphasis-color: rgb(0, 0, 0);
      transform-origin: 55.3164px 23.5px;
      width: 110.633px;
      -webkit-text-fill-color: rgb(0, 0, 0);
      -webkit-text-stroke-color: rgb(0, 0, 0);
    "
  >
    <span
      style="
        animation-duration: 0.001s;
        block-size: 27px;
        border-block-color: rgb(0, 0, 0);
        border-color: rgb(0, 0, 0);
        border-inline-color: rgb(0, 0, 0);
        caret-color: rgb(0, 0, 0);
        color: rgb(0, 0, 0);
        column-rule-color: rgb(0, 0, 0);
        cursor: pointer;
        font-weight: 700;
        height: 27px;
        inline-size: 80.6406px;
        line-height: 27px;
        list-style-type: none;
        outline-color: rgb(0, 0, 0);
        perspective-origin: 40.3203px 13.5px;
        text-decoration-color: rgb(0, 0, 0);
        text-emphasis-color: rgb(0, 0, 0);
        transform-origin: 40.3203px 13.5px;
        width: 80.6406px;
        -webkit-text-fill-color: rgb(0, 0, 0);
        -webkit-text-stroke-color: rgb(0, 0, 0);
      "
      >Furniture</span
    >
  </summary>
  <div
    class="mega-menu__close"
    data-acsb-clickable="true"
    data-acsb-navigable="true"
    data-acsb-now-navigable="false"
    data-acsb-hidden="true"
    data-acsb-force-hidden="true"
    data-acsb-force-unnavigable="true"
    role="button"
    style="animation-duration: 0.001s; block-size: 22px; inset: 40px 25px -62px 67.6328px; cursor: pointer; display: block; height: 22px; inline-size: 18px; inset-block: 40px -62px; inset-inline: 67.6328px 25px; list-style-type: none; perspective-origin: 9px 11px; position: absolute; transform-origin: 9px 11px; width: 18px; z-index: 999"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      role="presentation"
      class="icon icon-close"
      fill="none"
      viewBox="0 0 18 17"
      data-acsb-hidden="true"
      style="
        animation-duration: 0.001s;
        block-size: 17px;
        cursor: pointer;
        display: inline;
        fill: none;
        height: 17px;
        inline-size: 18px;
        list-style-type: none;
        min-block-size: 0px;
        min-height: 0px;
        min-inline-size: 0px;
        min-width: 0px;
        overflow-block: hidden;
        overflow-clip-margin: content-box;
        overflow-inline: hidden;
        overflow: hidden;
        perspective-origin: 9px 8.5px;
        transform-origin: 9px 8.5px;
        width: 18px;
      "
    >
      <path d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z" fill="currentColor"></path>
    </svg>
  </div>
  <div
    id="MegaMenu-Content-2"
    class="mega-menu__content gradient motion-reduce global-settings-popup acsb-hidden"
    data-acsb-hidden="true"
    style="
      animation-duration: 0.001s;
      background-color: rgb(240, 231, 222);
      block-size: 0px;
      box-shadow: rgba(0, 0, 0, 0) 0px 4px 5px 0px;
      height: 0px;
      inset-block-start: 100%;
      inset-inline: 0px;
      left: 0px;
      list-style-type: none;
      opacity: 0;
      overflow-block: hidden;
      overflow-inline: hidden;
      overflow: hidden;
      position: absolute;
      right: 0px;
      top: 100%;
      visibility: hidden;
      z-index: 9;
    "
  >
    <div class="mega-menu__promo promo" style="animation-duration: 0.001s; display: block; inline-size: 33%; list-style-type: none; visibility: hidden; width: 33%">
      <div class="promo__picture" style="animation-duration: 0.001s; block-size: 100%; display: block; height: 100%; list-style-type: none; position: relative; visibility: hidden">
        <img
          class="promo__image"
          alt=""
          src="//wovenshop.com/cdn/shop/files/COPYSS23_HealdsburgDiningChair_vrt_193_2.jpg?v=1762782180"
          loading="lazy"
          style="
            animation-duration: 0.001s;
            block-size: 100%;
            height: 100%;
            inline-size: 100%;
            inset-block-start: 0px;
            inset-inline-start: 0px;
            left: 0px;
            list-style-type: none;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            object-fit: cover;
            perspective-origin: 50% 50%;
            position: absolute;
            top: 0px;
            transform-origin: 50% 50%;
            visibility: hidden;
            width: 100%;
          "
        />
      </div>
    </div>

    <div class="mega-menu__wrapper-menu-block" style="animation-duration: 0.001s; display: flex; flex-direction: column; inline-size: 66%; list-style-type: none; visibility: hidden; width: 66%">
      <ul
        class="mega-menu__list page-width"
        role="list"
        data-acsb-menu="ul"
        style="
          place-content: flex-start;
          align-items: stretch;
          animation-duration: 0.001s;
          display: flex;
          flex-wrap: wrap;
          grid-template-columns: repeat(6, minmax(0px, 1fr));
          inline-size: 100%;
          list-style-type: none;
          margin-inline: auto;
          margin-left: auto;
          margin-right: auto;
          max-inline-size: 2688px;
          max-width: 2688px;
          padding-block: 40px;
          padding: 40px 26px;
          padding-inline: 26px;
          visibility: hidden;
          width: 100%;
        "
      >
        <li
          role="listitem"
          class="mega-menu__item mega-menu__item--level-2"
          style="
            animation-duration: 0.001s;
            block-size: auto;
            height: auto;
            inline-size: 25%;
            list-style-type: none;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            padding-block-end: 30px;
            padding-bottom: 30px;
            padding-inline: 10px;
            padding-left: 10px;
            padding-right: 10px;
            perspective-origin: 50% 50%;
            transform-origin: 50% 50%;
            visibility: hidden;
            width: 25%;
          "
        >
          <a
            href="#"
            aria-label="Open Living Room"
            class="mega-menu__link mega-menu__link--level-2 link mega-menu__link--no-link"
            data-acsb-clickable="true"
            data-acsb-navigable="true"
            tabindex="-1"
            data-acsb-now-navigable="false"
            data-custom-button-processed="true"
            role="button"
            style="
              animation-duration: 0.001s;
              border-block-color: rgb(20, 20, 20);
              border-color: rgb(20, 20, 20);
              border-inline-color: rgb(20, 20, 20);
              caret-color: rgb(20, 20, 20);
              color: rgb(20, 20, 20);
              column-rule-color: rgb(20, 20, 20);
              cursor: pointer;
              display: block;
              font-weight: 700;
              line-height: 27px;
              list-style-type: none;
              margin-block-end: 13px;
              margin-bottom: 13px;
              outline-color: rgb(20, 20, 20);
              overflow-wrap: break-word;
              text-decoration-color: rgb(20, 20, 20);
              text-emphasis-color: rgb(20, 20, 20);
              visibility: hidden;
              -webkit-text-fill-color: rgb(20, 20, 20);
              -webkit-text-stroke-color: rgb(20, 20, 20);
            "
          >
            Living Room
          </a>
          <div class="mega-menu__level-3" style="animation-duration: 0.001s; display: block; list-style-type: none; visibility: hidden">
            <ul class="list-unstyled" role="list" data-acsb-menu="ul" style="animation-duration: 0.001s; display: block; list-style-type: none; visibility: hidden">
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/living-room"
                  aria-label="Living room – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  All
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/lounge-chairs"
                  aria-label="Lounge chairs – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Lounge Chairs
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/daybeds-chaises"
                  aria-label="Daybeds &amp; chaises – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Daybeds &amp; Chaises
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/benches-stools"
                  aria-label="Benches &amp; stools – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Benches &amp; Stools
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/coffee-tables"
                  aria-label="Coffee tables – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Coffee Tables
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/side-tables"
                  aria-label="Side tables – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Side Tables
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/credenzas-storage"
                  aria-label="Credenzas &amp; storage – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Credenzas &amp; Storage
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li
          role="listitem"
          class="mega-menu__item mega-menu__item--level-2"
          style="
            animation-duration: 0.001s;
            block-size: auto;
            height: auto;
            inline-size: 25%;
            list-style-type: none;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            padding-block-end: 30px;
            padding-bottom: 30px;
            padding-inline: 10px;
            padding-left: 10px;
            padding-right: 10px;
            perspective-origin: 50% 50%;
            transform-origin: 50% 50%;
            visibility: hidden;
            width: 25%;
          "
        >
          <a
            href="#"
            aria-label="Open Kitchen &amp; Dining"
            class="mega-menu__link mega-menu__link--level-2 link mega-menu__link--no-link"
            data-acsb-clickable="true"
            data-acsb-navigable="true"
            tabindex="-1"
            data-acsb-now-navigable="false"
            data-custom-button-processed="true"
            role="button"
            style="
              animation-duration: 0.001s;
              border-block-color: rgb(20, 20, 20);
              border-color: rgb(20, 20, 20);
              border-inline-color: rgb(20, 20, 20);
              caret-color: rgb(20, 20, 20);
              color: rgb(20, 20, 20);
              column-rule-color: rgb(20, 20, 20);
              cursor: pointer;
              display: block;
              font-weight: 700;
              line-height: 27px;
              list-style-type: none;
              margin-block-end: 13px;
              margin-bottom: 13px;
              outline-color: rgb(20, 20, 20);
              overflow-wrap: break-word;
              text-decoration-color: rgb(20, 20, 20);
              text-emphasis-color: rgb(20, 20, 20);
              visibility: hidden;
              -webkit-text-fill-color: rgb(20, 20, 20);
              -webkit-text-stroke-color: rgb(20, 20, 20);
            "
          >
            Kitchen &amp; Dining
          </a>
          <div class="mega-menu__level-3" style="animation-duration: 0.001s; display: block; list-style-type: none; visibility: hidden">
            <ul class="list-unstyled" role="list" data-acsb-menu="ul" style="animation-duration: 0.001s; display: block; list-style-type: none; visibility: hidden">
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/kitchen-dining"
                  aria-label="Kitchen &amp; dining – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  All
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/bar-counter-stools"
                  aria-label="Bar &amp; counter stools – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Bar &amp; Counter Stools
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/dining-chairs"
                  aria-label="Dining chairs – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Dining Chairs
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/dining-tables"
                  aria-label="Dining tables – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Dining Tables
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/dining-benches"
                  aria-label="Dining benches – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Dining Benches
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/bar-carts-butler-trays"
                  aria-label="Bar carts &amp; butler trays – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Bar Carts &amp; Butler Trays
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li
          role="listitem"
          class="mega-menu__item mega-menu__item--level-2"
          style="
            animation-duration: 0.001s;
            block-size: auto;
            height: auto;
            inline-size: 25%;
            list-style-type: none;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            padding-block-end: 30px;
            padding-bottom: 30px;
            padding-inline: 10px;
            padding-left: 10px;
            padding-right: 10px;
            perspective-origin: 50% 50%;
            transform-origin: 50% 50%;
            visibility: hidden;
            width: 25%;
          "
        >
          <a
            href="#"
            aria-label="Open Bedroom"
            class="mega-menu__link mega-menu__link--level-2 link mega-menu__link--no-link"
            data-acsb-clickable="true"
            data-acsb-navigable="true"
            tabindex="-1"
            data-acsb-now-navigable="false"
            data-custom-button-processed="true"
            role="button"
            style="
              animation-duration: 0.001s;
              border-block-color: rgb(20, 20, 20);
              border-color: rgb(20, 20, 20);
              border-inline-color: rgb(20, 20, 20);
              caret-color: rgb(20, 20, 20);
              color: rgb(20, 20, 20);
              column-rule-color: rgb(20, 20, 20);
              cursor: pointer;
              display: block;
              font-weight: 700;
              line-height: 27px;
              list-style-type: none;
              margin-block-end: 13px;
              margin-bottom: 13px;
              outline-color: rgb(20, 20, 20);
              overflow-wrap: break-word;
              text-decoration-color: rgb(20, 20, 20);
              text-emphasis-color: rgb(20, 20, 20);
              visibility: hidden;
              -webkit-text-fill-color: rgb(20, 20, 20);
              -webkit-text-stroke-color: rgb(20, 20, 20);
            "
          >
            Bedroom
          </a>
          <div class="mega-menu__level-3" style="animation-duration: 0.001s; display: block; list-style-type: none; visibility: hidden">
            <ul class="list-unstyled" role="list" data-acsb-menu="ul" style="animation-duration: 0.001s; display: block; list-style-type: none; visibility: hidden">
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/bedroom"
                  aria-label="Bedroom – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  All
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/beds-daybed-chaises"
                  aria-label="Beds, daybed &amp; chaises – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Beds, Daybeds &amp; Chaises
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/benches-stools"
                  aria-label="Benches &amp; stools – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Benches &amp; Stools
                </a>
              </li>
            </ul>
            <a
              href="#"
              aria-label="Open Outdoor"
              class="mega-menu__link mega-menu__link--sub-menu mega-menu__link--level-2 link mega-menu__link--no-link"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              tabindex="-1"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              role="button"
              style="
                animation-duration: 0.001s;
                border-block-color: rgb(20, 20, 20);
                border-color: rgb(20, 20, 20);
                border-inline-color: rgb(20, 20, 20);
                caret-color: rgb(20, 20, 20);
                color: rgb(20, 20, 20);
                column-rule-color: rgb(20, 20, 20);
                cursor: pointer;
                display: block;
                font-weight: 700;
                line-height: 27px;
                list-style-type: none;
                margin-block: 30px 13px;
                margin-bottom: 13px;
                margin-top: 30px;
                outline-color: rgb(20, 20, 20);
                overflow-wrap: break-word;
                text-decoration-color: rgb(20, 20, 20);
                text-emphasis-color: rgb(20, 20, 20);
                visibility: hidden;
                -webkit-text-fill-color: rgb(20, 20, 20);
                -webkit-text-stroke-color: rgb(20, 20, 20);
              "
            >
              Outdoor
            </a>
            <ul class="list-unstyled" role="list" data-acsb-menu="ul" style="animation-duration: 0.001s; display: block; list-style-type: none; visibility: hidden">
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/outdoor"
                  aria-label="Outdoor – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  All
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/outdoor-living"
                  aria-label="Outdoor living – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Outdoor Living
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/protective-covers-care"
                  aria-label="Protective covers &amp; care – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Protective Covers &amp; Care
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li
          role="listitem"
          class="mega-menu__item mega-menu__item--level-2"
          style="
            animation-duration: 0.001s;
            block-size: auto;
            height: auto;
            inline-size: 25%;
            list-style-type: none;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            padding-block-end: 30px;
            padding-bottom: 30px;
            padding-inline: 10px;
            padding-left: 10px;
            padding-right: 10px;
            perspective-origin: 50% 50%;
            transform-origin: 50% 50%;
            visibility: hidden;
            width: 25%;
          "
        >
          <a
            href="/collections/bestsellers"
            aria-label="Bestsellers – woven shop"
            class="mega-menu__link mega-menu__link--level-2 link"
            data-acsb-clickable="true"
            data-acsb-navigable="true"
            tabindex="-1"
            data-acsb-now-navigable="false"
            data-custom-button-processed="true"
            style="
              animation-duration: 0.001s;
              border-block-color: rgb(20, 20, 20);
              border-color: rgb(20, 20, 20);
              border-inline-color: rgb(20, 20, 20);
              caret-color: rgb(20, 20, 20);
              color: rgb(20, 20, 20);
              column-rule-color: rgb(20, 20, 20);
              cursor: pointer;
              display: block;
              font-weight: 700;
              line-height: 27px;
              list-style-type: none;
              margin-block-end: 13px;
              margin-bottom: 13px;
              outline-color: rgb(20, 20, 20);
              overflow-wrap: break-word;
              text-decoration-color: rgb(20, 20, 20);
              text-emphasis-color: rgb(20, 20, 20);
              visibility: hidden;
              -webkit-text-fill-color: rgb(20, 20, 20);
              -webkit-text-stroke-color: rgb(20, 20, 20);
            "
          >
            Bestsellers
          </a>
          <div class="mega-menu__level-3" style="animation-duration: 0.001s; display: block; list-style-type: none; visibility: hidden">
            <ul class="list-unstyled" role="list" data-acsb-menu="ul" style="animation-duration: 0.001s; display: block; list-style-type: none; visibility: hidden"></ul>
            <a
              href="#"
              aria-label="Open Vintage"
              class="mega-menu__link mega-menu__link--sub-menu mega-menu__link--level-2 link mega-menu__link--no-link"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              tabindex="-1"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              role="button"
              style="
                animation-duration: 0.001s;
                border-block-color: rgb(20, 20, 20);
                border-color: rgb(20, 20, 20);
                border-inline-color: rgb(20, 20, 20);
                caret-color: rgb(20, 20, 20);
                color: rgb(20, 20, 20);
                column-rule-color: rgb(20, 20, 20);
                cursor: pointer;
                display: block;
                font-weight: 700;
                line-height: 27px;
                list-style-type: none;
                margin-block: 30px 13px;
                margin-bottom: 13px;
                margin-top: 30px;
                outline-color: rgb(20, 20, 20);
                overflow-wrap: break-word;
                text-decoration-color: rgb(20, 20, 20);
                text-emphasis-color: rgb(20, 20, 20);
                visibility: hidden;
                -webkit-text-fill-color: rgb(20, 20, 20);
                -webkit-text-stroke-color: rgb(20, 20, 20);
              "
            >
              Vintage
            </a>
            <ul class="list-unstyled" role="list" data-acsb-menu="ul" style="animation-duration: 0.001s; display: block; list-style-type: none; visibility: hidden">
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/vintage"
                  aria-label="Vintage – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  All
                </a>
              </li>
            </ul>
            <a
              href="#"
              aria-label="Open Sale"
              class="mega-menu__link mega-menu__link--sub-menu mega-menu__link--level-2 link mega-menu__link--no-link"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              tabindex="-1"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              role="button"
              style="
                animation-duration: 0.001s;
                border-block-color: rgb(20, 20, 20);
                border-color: rgb(20, 20, 20);
                border-inline-color: rgb(20, 20, 20);
                caret-color: rgb(20, 20, 20);
                color: rgb(20, 20, 20);
                column-rule-color: rgb(20, 20, 20);
                cursor: pointer;
                display: block;
                font-weight: 700;
                line-height: 27px;
                list-style-type: none;
                margin-block: 30px 13px;
                margin-bottom: 13px;
                margin-top: 30px;
                outline-color: rgb(20, 20, 20);
                overflow-wrap: break-word;
                text-decoration-color: rgb(20, 20, 20);
                text-emphasis-color: rgb(20, 20, 20);
                visibility: hidden;
                -webkit-text-fill-color: rgb(20, 20, 20);
                -webkit-text-stroke-color: rgb(20, 20, 20);
              "
            >
              Sale
            </a>
            <ul class="list-unstyled" role="list" data-acsb-menu="ul" style="animation-duration: 0.001s; display: block; list-style-type: none; visibility: hidden">
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/sale"
                  aria-label="Sale – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  All
                </a>
              </li>
              <li
                role="listitem"
                class="mega-menu__item mega-menu__item--level-3"
                style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; list-style-type: none; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; visibility: hidden; width: auto"
              >
                <a
                  href="/collections/seconds-collection"
                  aria-label="Seconds collection – woven shop"
                  class="mega-menu__link link"
                  data-acsb-clickable="true"
                  data-acsb-navigable="true"
                  tabindex="-1"
                  data-acsb-now-navigable="false"
                  data-custom-button-processed="true"
                  style="
                    animation-duration: 0.001s;
                    border-block-color: rgb(20, 20, 20);
                    border-color: rgb(20, 20, 20);
                    border-inline-color: rgb(20, 20, 20);
                    caret-color: rgb(20, 20, 20);
                    color: rgb(20, 20, 20);
                    column-rule-color: rgb(20, 20, 20);
                    cursor: pointer;
                    display: block;
                    line-height: 27px;
                    list-style-type: none;
                    outline-color: rgb(20, 20, 20);
                    overflow-wrap: break-word;
                    text-decoration-color: rgb(20, 20, 20);
                    text-emphasis-color: rgb(20, 20, 20);
                    visibility: hidden;
                    -webkit-text-fill-color: rgb(20, 20, 20);
                    -webkit-text-stroke-color: rgb(20, 20, 20);
                  "
                >
                  Seconds
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <div
        class="mega-menu__text-below"
        style="
          animation-duration: 0.001s;
          border-block-color: rgb(20, 20, 20);
          border-color: rgb(20, 20, 20);
          border-inline-color: rgb(20, 20, 20);
          caret-color: rgb(20, 20, 20);
          color: rgb(20, 20, 20);
          column-rule-color: rgb(20, 20, 20);
          display: block;
          font-family: 'Epicene Display', Arial, serif;
          font-size: 18px;
          line-height: 27px;
          list-style-type: none;
          margin-block-start: auto;
          margin-top: auto;
          outline-color: rgb(20, 20, 20);
          padding-block: 20px 40px;
          padding: 20px 40px 40px;
          padding-inline: 40px;
          text-decoration-color: rgb(20, 20, 20);
          text-emphasis-color: rgb(20, 20, 20);
          visibility: hidden;
          -webkit-text-fill-color: rgb(20, 20, 20);
          -webkit-text-stroke-color: rgb(20, 20, 20);
        "
      >
        <p
          style="
            animation-duration: 0.001s;
            border-block-color: rgb(20, 20, 20);
            border-color: rgb(20, 20, 20);
            border-inline-color: rgb(20, 20, 20);
            caret-color: rgb(20, 20, 20);
            color: rgb(20, 20, 20);
            column-rule-color: rgb(20, 20, 20);
            display: block;
            font-family: 'Epicene Display', Arial, serif;
            font-size: 18px;
            line-height: 27px;
            list-style-type: none;
            outline-color: rgb(20, 20, 20);
            text-decoration-color: rgb(20, 20, 20);
            text-emphasis-color: rgb(20, 20, 20);
            visibility: hidden;
            -webkit-text-fill-color: rgb(20, 20, 20);
            -webkit-text-stroke-color: rgb(20, 20, 20);
          "
        >
          your story, your meaning, your journey– your home
        </p>
      </div>
    </div>
  </div>
</details>
<style></style>` },
  { filename: "button role button", content: `<button role="button">Click me!</button>` },
  { filename: "button role presentation", content: `<button role="presentation">Click me!</button>` },
  { filename: "button role switch", content: `<button role="switch" aria-checked="false">Sound - Off</button>` },
  { filename: "button", content: `<button>Click me!</button>` },
  { filename: "heading clickable no role button", content: `<style>
  .heading {
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
  }
</style>

<span class="heading" role="heading" aria-level=" " tabindex="0">Atomic test</span>` },
  { filename: "link href hash", content: `<a href="#anchor"></a>` }
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

export default ButtonMismatchSuccess;
