import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LinkNavigationDiscernibleSuccess = () => {
  const ruleId = "link-navigation-discernible";
  const title = `Navigation links should have a descriptive label`;
  const description = `Activating navigation links enables users to navigate to a different page within the site. Links that do not contain visible text or labeled images should be assigned labels that inform screen reader users of their destination.`;
  const helpText = `If a navigation link does not contain a labeled image or visible text, assign an aria-label that describes the destination of the link.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "hidden link no content", content: `<a href="path/to/page" style="width: 100px; height: 100px" hidden></a>` },
  { filename: "invisible links with aria label", content: `<details
  is="mega-menu-disclosure"
  class="header__menu-disclosure"
  follow-summary-link=""
  trigger="hover"
  aria-expanded="false"
  style="animation-duration: 0.001s; block-size: 23.7969px; font-size: 15px; height: 23.7969px; inline-size: 61.5px; line-height: 24.75px; list-style-type: none; perspective-origin: 30.75px 11.8984px; transform-origin: 30.75px 11.8984px; width: 61.5px"
>
  <summary
    data-follow-link="https://roycechocolate.com/collections/all-products"
    class="h6"
    data-acsb-clickable="true"
    data-acsb-navigable="true"
    tabindex="0"
    data-acsb-now-navigable="true"
    style="
      animation-duration: 0.001s;
      block-size: 23.7969px;
      inset: 0px;
      font-family: Jost, sans-serif;
      font-size: 14px;
      height: 23.7969px;
      inline-size: 61.5px;
      inset-block: 0px;
      inset-inline: 0px;
      letter-spacing: 2.52px;
      line-height: 23.8px;
      list-style-position: inside;
      overflow-wrap: anywhere;
      padding-inline-end: 15px;
      padding-right: 15px;
      perspective-origin: 30.75px 11.8984px;
      position: relative;
      text-transform: uppercase;
      transform-origin: 30.75px 11.8984px;
      width: 61.5px;
    "
  >
    Shop<svg
      class=""
      role="presentation"
      viewBox="0 0 19 12"
      data-acsb-hidden="true"
      style="
        animation-duration: 0.001s;
        block-size: 6.3125px;
        inset: 7px 0px 10.4844px 51.5078px;
        cursor: pointer;
        font-family: Jost, sans-serif;
        font-size: 14px;
        height: 6.3125px;
        inline-size: 9.99219px;
        inset-block: 7px 10.4844px;
        inset-inline: 51.5078px 0px;
        letter-spacing: 2.52px;
        line-height: 23.8px;
        list-style-position: inside;
        list-style-type: none;
        max-inline-size: 10px;
        max-width: 10px;
        overflow-clip-margin: content-box;
        overflow-wrap: anywhere;
        perspective-origin: 4.99219px 3.15625px;
        position: absolute;
        text-transform: uppercase;
        transform-origin: 4.99609px 3.15625px;
        width: 9.99219px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      "
    >
      <polyline fill="none" stroke="currentColor" points="17 2 9.5 10 2 2" fill-rule="evenodd" stroke-width="2" stroke-linecap="square"></polyline>
    </svg>
  </summary>
  <div
    class="mega-menu"
    style="
      opacity: 0;
      align-items: start;
      animation-duration: 0.001s;
      background-color: rgb(255, 255, 255);
      block-size: 276px;
      border-block-end-width: 1px;
      border-bottom-width: 1px;
      inset: 0px -28.5px -276px 0px;
      column-gap: 93.75px;
      display: flex;
      font-size: 15px;
      height: 276px;
      inline-size: 90px;
      inset-block: 0px -276px;
      inset-inline: 0px -28.5px;
      justify-content: safe center;
      line-height: 24.75px;
      list-style-type: none;
      max-block-size: 276px;
      max-height: 276px;
      overflow-block: auto;
      overflow-inline: auto;
      overflow: auto;
      padding-block: 37.5px;
      padding: 37.5px 45px;
      padding-inline: 45px;
      perspective-origin: 45px 138px;
      position: absolute;
      transform-origin: 45px 138px;
      width: 90px;
    "
    data-acsb-hidden="true"
  >
    <ul
      class="mega-menu__linklist unstyled-list"
      style="
        animation-duration: 0.001s;
        block-size: 2366.61px;
        gap: 37.5px 93.75px;
        display: flex;
        flex-wrap: wrap;
        font-size: 15px;
        height: 2366.61px;
        inline-size: 0px;
        line-height: 24.75px;
        list-style-type: none;
        margin-inline-start: 0px;
        margin-left: 0px;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        perspective-origin: 0px 1183.3px;
        transform-origin: 0px 1183.3px;
        width: 0px;
      "
    >
      <li
        class="v-stack justify-items-start gap-5"
        data-acsb-hidden="true"
        style="
          opacity: 1;
          transform: translateY(0px);
          align-content: start;
          animation-duration: 0.001s;
          block-size: auto;
          gap: 18.75px;
          display: none;
          font-size: 15px;
          grid-template-columns: minmax(0px, 1fr);
          height: auto;
          inline-size: auto;
          justify-items: start;
          line-height: 24.75px;
          list-style-type: none;
          max-inline-size: 280px;
          max-width: 280px;
          perspective-origin: 50% 50%;
          transform-origin: 50% 50%;
          width: auto;
        "
      >
        <a
          class="h6 acsb-ignore"
          id="HeaderMenu-sections--16743378288847__header-1"
          href="https://roycechocolate.com/collections/all-products"
          data-acsb-ignore="true"
          data-acsb-clickable="true"
          data-acsb-navigable="true"
          tabindex="-1"
          data-acsb-now-navigable="false"
          data-custom-button-processed="true"
          style="animation-duration: 0.001s; cursor: pointer; font-family: Jost, sans-serif; font-size: 14px; letter-spacing: 2.52px; line-height: 23.8px; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%"
        >
          Shop All
        </a>
      </li>
      <li
        class="v-stack justify-items-start gap-5"
        style="
          opacity: 1;
          transform: matrix(1, 0, 0, 1, 0, 0);
          align-content: start;
          animation-duration: 0.001s;
          block-size: 842.375px;
          gap: 18.75px;
          display: grid;
          font-size: 15px;
          grid-template-columns: 0px;
          grid-template-rows: 380.75px 442.875px;
          height: 842.375px;
          inline-size: 0px;
          justify-items: start;
          line-height: 24.75px;
          list-style-type: none;
          max-inline-size: 280px;
          max-width: 280px;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          perspective-origin: 0px 421.188px;
          transform-origin: 0px 421.188px;
          width: 0px;
        "
      >
        <a
          class="h6 acsb-ignore"
          id="HeaderMenu-sections--16743378288847__header-2"
          href="/collections/best-sellers"
          data-acsb-ignore="true"
          data-acsb-clickable="true"
          data-acsb-navigable="true"
          data-acsb-now-navigable="false"
          data-custom-button-processed="true"
          tabindex="-1"
          aria-label="best sellers"
          style="
            animation-duration: 0.001s;
            block-size: 380.75px;
            cursor: pointer;
            display: block;
            font-family: Jost, sans-serif;
            font-size: 14px;
            height: 380.75px;
            inline-size: 13.5781px;
            letter-spacing: 2.52px;
            line-height: 23.8px;
            list-style-type: none;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            overflow-wrap: anywhere;
            perspective-origin: 6.78906px 190.375px;
            text-transform: uppercase;
            transform-origin: 6.78906px 190.375px;
            width: 13.5781px;
          "
        >
          Classic Favorites
        </a>
        <ul
          class="v-stack gap-2.5 unstyled-list"
          data-acsb-menu="ul"
          style="
            align-content: start;
            animation-duration: 0.001s;
            block-size: 442.875px;
            gap: 9.375px;
            display: grid;
            font-size: 15px;
            grid-template-columns: 0px;
            grid-template-rows: 49.5px 49.5px 123.75px 74.25px 24.75px 74.25px;
            height: 442.875px;
            inline-size: 0px;
            line-height: 24.75px;
            list-style-type: none;
            margin-inline-start: 0px;
            margin-left: 0px;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            perspective-origin: 0px 221.438px;
            transform-origin: 0px 221.438px;
            width: 0px;
          "
        >
          <li style="animation-duration: 0.001s; block-size: 49.5px; font-size: 15px; height: 49.5px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 24.75px; transform-origin: 0px 24.75px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-2-1"
              class="link-faded acsb-ignore"
              href="/collections/gift-set"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              tabindex="-1"
              aria-label="gift set"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Gift Sets
            </a>
          </li>
          <li style="animation-duration: 0.001s; block-size: 49.5px; font-size: 15px; height: 49.5px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 24.75px; transform-origin: 0px 24.75px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-2-2"
              class="link-faded acsb-ignore"
              href="/collections/nama"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              tabindex="-1"
              aria-label="nama"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Nama Chocolates
            </a>
          </li>
          <li style="animation-duration: 0.001s; block-size: 123.75px; font-size: 15px; height: 123.75px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 61.875px; transform-origin: 0px 61.875px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-2-3"
              class="link-faded acsb-ignore"
              href="/collections/matcha"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              tabindex="-1"
              aria-label="matcha"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Matcha - Green Tea Chocolates
            </a>
          </li>
          <li style="animation-duration: 0.001s; block-size: 74.25px; font-size: 15px; height: 74.25px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 37.125px; transform-origin: 0px 37.125px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-2-4"
              class="link-faded acsb-ignore"
              href="/collections/cookies-marshmallows"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              tabindex="-1"
              aria-label="cookies marshmallows"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Cookies &amp; Marshmallows
            </a>
          </li>
          <li style="animation-duration: 0.001s; block-size: 24.75px; font-size: 15px; height: 24.75px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 12.375px; transform-origin: 0px 12.375px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-2-5"
              class="link-faded acsb-ignore"
              href="/collections/bars"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              aria-label="bars"
              tabindex="-1"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Bars
            </a>
          </li>
          <li style="animation-duration: 0.001s; block-size: 74.25px; font-size: 15px; height: 74.25px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 37.125px; transform-origin: 0px 37.125px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-2-6"
              class="link-faded acsb-ignore"
              href="/collections/nuts-fruits"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              tabindex="-1"
              aria-label="nuts fruits"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Nuts &amp; Fruits
            </a>
          </li>
        </ul>
      </li>
      <li
        class="v-stack justify-items-start gap-5"
        style="
          opacity: 1;
          transform: matrix(1, 0, 0, 1, 0, 0);
          align-content: start;
          animation-duration: 0.001s;
          block-size: 745.273px;
          gap: 18.75px;
          display: grid;
          font-size: 15px;
          grid-template-columns: 0px;
          grid-template-rows: 333.148px 393.375px;
          height: 745.273px;
          inline-size: 0px;
          justify-items: start;
          line-height: 24.75px;
          list-style-type: none;
          max-inline-size: 280px;
          max-width: 280px;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          perspective-origin: 0px 372.633px;
          transform-origin: 0px 372.637px;
          width: 0px;
        "
      >
        <a
          class="h6 acsb-ignore"
          id="HeaderMenu-sections--16743378288847__header-3"
          href="/collections/best-sellers"
          data-acsb-ignore="true"
          data-acsb-clickable="true"
          data-acsb-navigable="true"
          data-acsb-now-navigable="false"
          data-custom-button-processed="true"
          tabindex="-1"
          aria-label="best sellers"
          style="
            animation-duration: 0.001s;
            block-size: 333.156px;
            cursor: pointer;
            display: block;
            font-family: Jost, sans-serif;
            font-size: 14px;
            height: 333.156px;
            inline-size: 13.5859px;
            letter-spacing: 2.52px;
            line-height: 23.8px;
            list-style-type: none;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            overflow-wrap: anywhere;
            perspective-origin: 6.78906px 166.578px;
            text-transform: uppercase;
            transform-origin: 6.79297px 166.578px;
            width: 13.5859px;
          "
        >
          Popular Choices
        </a>
        <ul
          class="v-stack gap-2.5 unstyled-list"
          data-acsb-menu="ul"
          style="
            align-content: start;
            animation-duration: 0.001s;
            block-size: 393.375px;
            gap: 9.375px;
            display: grid;
            font-size: 15px;
            grid-template-columns: 0px;
            grid-template-rows: 49.5px 49.5px 74.25px 49.5px 74.25px 49.5px;
            height: 393.375px;
            inline-size: 0px;
            line-height: 24.75px;
            list-style-type: none;
            margin-inline-start: 0px;
            margin-left: 0px;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            perspective-origin: 0px 196.688px;
            transform-origin: 0px 196.688px;
            width: 0px;
          "
        >
          <li style="animation-duration: 0.001s; block-size: 49.5px; font-size: 15px; height: 49.5px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 24.75px; transform-origin: 0px 24.75px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-3-1"
              class="link-faded acsb-ignore"
              href="/collections/best-sellers"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              aria-label="best sellers"
              tabindex="-1"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Best Sellers
            </a>
          </li>
          <li style="animation-duration: 0.001s; block-size: 49.5px; font-size: 15px; height: 49.5px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 24.75px; transform-origin: 0px 24.75px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-3-2"
              class="link-faded acsb-ignore"
              href="/collections/online-exclusives"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              aria-label="online exclusives"
              tabindex="-1"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Online Exclusives
            </a>
          </li>
          <li style="animation-duration: 0.001s; block-size: 74.25px; font-size: 15px; height: 74.25px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 37.125px; transform-origin: 0px 37.125px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-3-3"
              class="link-faded acsb-ignore"
              href="/collections/sweet-salty"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              tabindex="-1"
              aria-label="sweet salty"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Sweet &amp; Salty
            </a>
          </li>
          <li style="animation-duration: 0.001s; block-size: 49.5px; font-size: 15px; height: 49.5px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 24.75px; transform-origin: 0px 24.75px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-3-4"
              class="link-faded acsb-ignore"
              href="/collections/pure-chocolate"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              aria-label="pure chocolate"
              tabindex="-1"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Pure Chocolate
            </a>
          </li>
          <li style="animation-duration: 0.001s; block-size: 74.25px; font-size: 15px; height: 74.25px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 37.125px; transform-origin: 0px 37.125px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-3-5"
              class="link-faded acsb-ignore"
              href="/collections/prafeuille-praline"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              tabindex="-1"
              aria-label="prafeuille praline"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Prafeuille &amp; Praline
            </a>
          </li>
          <li style="animation-duration: 0.001s; block-size: 49.5px; font-size: 15px; height: 49.5px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 24.75px; transform-origin: 0px 24.75px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-3-6"
              class="link-faded acsb-ignore"
              href="/collections/chocolate-wafers"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              aria-label="chocolate wafers"
              tabindex="-1"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Chocolate Wafers
            </a>
          </li>
        </ul>
      </li>
      <li
        class="v-stack justify-items-start gap-5"
        style="
          opacity: 1;
          transform: matrix(1, 0, 0, 1, 0, 0);
          align-content: start;
          animation-duration: 0.001s;
          block-size: 703.969px;
          gap: 18.75px;
          display: grid;
          font-size: 15px;
          grid-template-columns: 0px;
          grid-template-rows: 428.344px 256.875px;
          height: 703.969px;
          inline-size: 0px;
          justify-items: start;
          line-height: 24.75px;
          list-style-type: none;
          max-inline-size: 280px;
          max-width: 280px;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          perspective-origin: 0px 351.984px;
          transform-origin: 0px 351.984px;
          width: 0px;
        "
      >
        <a
          class="h6 acsb-ignore"
          id="HeaderMenu-sections--16743378288847__header-4"
          href="/collections/boutique-exclusives-only-old"
          data-acsb-ignore="true"
          data-acsb-clickable="true"
          data-acsb-navigable="true"
          data-acsb-now-navigable="false"
          data-custom-button-processed="true"
          tabindex="-1"
          aria-label="boutique exclusives only old"
          style="
            animation-duration: 0.001s;
            block-size: 428.344px;
            cursor: pointer;
            display: block;
            font-family: Jost, sans-serif;
            font-size: 14px;
            height: 428.344px;
            inline-size: 13.5781px;
            letter-spacing: 2.52px;
            line-height: 23.8px;
            list-style-type: none;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            overflow-wrap: anywhere;
            perspective-origin: 6.78906px 214.172px;
            text-transform: uppercase;
            transform-origin: 6.78906px 214.172px;
            width: 13.5781px;
          "
        >
          In-Store Exclusives
        </a>
        <ul
          class="v-stack gap-2.5 unstyled-list"
          style="
            align-content: start;
            animation-duration: 0.001s;
            block-size: 256.875px;
            gap: 9.375px;
            display: grid;
            font-size: 15px;
            grid-template-columns: 0px;
            grid-template-rows: 74.25px 173.25px;
            height: 256.875px;
            inline-size: 0px;
            line-height: 24.75px;
            list-style-type: none;
            margin-inline-start: 0px;
            margin-left: 0px;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            perspective-origin: 0px 128.438px;
            transform-origin: 0px 128.438px;
            width: 0px;
          "
        >
          <li style="animation-duration: 0.001s; block-size: 74.25px; font-size: 15px; height: 74.25px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 37.125px; transform-origin: 0px 37.125px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-4-1"
              class="link-faded acsb-ignore"
              href="/collections/boutique-exclusives-only"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              aria-label="boutique exclusives only"
              tabindex="-1"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              Boutique Exclusives Only
            </a>
          </li>
          <li style="animation-duration: 0.001s; block-size: 173.25px; font-size: 15px; height: 173.25px; inline-size: 0px; line-height: 24.75px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 86.625px; transform-origin: 0px 86.625px; width: 0px">
            <a
              id="HeaderMenu-sections--16743378288847__header-4-2"
              class="link-faded acsb-ignore"
              href="/collections/royce-spring-specials"
              data-acsb-ignore="true"
              data-acsb-clickable="true"
              data-acsb-navigable="true"
              data-acsb-now-navigable="false"
              data-custom-button-processed="true"
              tabindex="-1"
              aria-label="royce spring specials"
              style="
                animation-duration: 0.001s;
                caret-color: rgba(0, 0, 0, 0.65);
                color: rgba(0, 0, 0, 0.65);
                column-rule-color: rgba(0, 0, 0, 0.65);
                cursor: pointer;
                font-size: 15px;
                line-height: 24.75px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.65);
                text-decoration-color: rgba(0, 0, 0, 0.65);
                text-emphasis-color: rgba(0, 0, 0, 0.65);
                -webkit-text-fill-color: rgba(0, 0, 0, 0.65);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);
              "
            >
              COMING SOON: ROYCE' Spring &amp; Easter Specials
            </a>
          </li>
        </ul>
      </li>
    </ul>
    <div
      class="mega-menu__promo"
      style="
        opacity: 1;
        animation-duration: 0.001s;
        block-size: 326.023px;
        column-gap: 30px;
        display: flex;
        font-size: 15px;
        height: 326.023px;
        inline-size: 0px;
        justify-content: flex-end;
        line-height: 24.75px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        perspective-origin: 0px 163.008px;
        transform-origin: 0px 163.012px;
        width: 0px;
      "
    >
      <a
        href="/collections/nama"
        class="v-stack justify-items-center gap-4 sm:gap-5 group"
        data-acsb-clickable="true"
        data-acsb-navigable="true"
        data-acsb-now-navigable="false"
        data-custom-button-processed="true"
        tabindex="-1"
        aria-label="nama"
        style="
          align-content: start;
          animation-duration: 0.001s;
          block-size: 326.031px;
          gap: 18.75px;
          cursor: pointer;
          display: grid;
          flex-basis: 315px;
          flex-grow: 1;
          font-size: 15px;
          grid-template-columns: 240px;
          grid-template-rows: 240px 67.2734px;
          height: 326.031px;
          inline-size: 240px;
          justify-items: safe center;
          line-height: 24.75px;
          list-style-type: none;
          max-inline-size: 315px;
          max-width: 315px;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: 240px;
          min-width: 240px;
          perspective-origin: 120px 163.016px;
          transform-origin: 120px 163.016px;
          width: 240px;
        "
        ><div
          class="overflow-hidden"
          data-acsb-overflower="true"
          style="
            animation-duration: 0.001s;
            block-size: 240px;
            cursor: pointer;
            font-size: 15px;
            height: 240px;
            inline-size: 240px;
            line-height: 24.75px;
            list-style-type: none;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            overflow-block: hidden;
            overflow-inline: hidden;
            overflow: hidden;
            perspective-origin: 120px 120px;
            transform-origin: 120px 120px;
            width: 240px;
          "
        >
          <img
            src="//roycechocolate.com/cdn/shop/files/Nama_Chocolates.webp?v=1769511168&amp;width=500"
            alt="Image shows blue plate with chocolate blocks."
            srcset="//roycechocolate.com/cdn/shop/files/Nama_Chocolates.webp?v=1769511168&amp;width=315 315w"
            width="500"
            height="500"
            loading="lazy"
            sizes="315px"
            class="zoom-image group-hover:zoom"
            style="animation-duration: 0.001s; block-size: 240px; cursor: pointer; font-size: 15px; height: 240px; inline-size: 240px; line-height: 24.75px; list-style-type: none; perspective-origin: 120px 120px; transform-origin: 120px 120px; width: 240px"
          />
        </div>
        <div
          class="v-stack text-center gap-2.5"
          style="
            align-content: start;
            animation-duration: 0.001s;
            block-size: 67.2812px;
            gap: 9.375px;
            cursor: pointer;
            display: grid;
            font-size: 15px;
            grid-template-columns: 170.844px;
            grid-template-rows: 37.7969px 20.1094px;
            height: 67.2812px;
            inline-size: 170.844px;
            line-height: 24.75px;
            list-style-type: none;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            perspective-origin: 85.4219px 33.6406px;
            text-align: center;
            transform-origin: 85.4219px 33.6406px;
            width: 170.844px;
          "
        >
          <p
            class="h6"
            style="
              animation-duration: 0.001s;
              block-size: 23.7969px;
              cursor: pointer;
              font-family: Jost, sans-serif;
              font-size: 14px;
              height: 23.7969px;
              inline-size: 170.844px;
              letter-spacing: 2.52px;
              line-height: 23.8px;
              list-style-type: none;
              margin-block-end: 14px;
              margin-bottom: 14px;
              min-block-size: auto;
              min-height: auto;
              min-inline-size: auto;
              min-width: auto;
              overflow-wrap: anywhere;
              perspective-origin: 85.4219px 11.8984px;
              text-align: center;
              text-transform: uppercase;
              transform-origin: 85.4219px 11.8984px;
              width: 170.844px;
            "
          >
            Nama Chocolates
          </p>
          <p
            class="smallcaps text-xs text-subdued"
            style="
              animation-duration: 0.001s;
              block-size: 20.1094px;
              cursor: pointer;
              font-size: 12.1875px;
              height: 20.1094px;
              inline-size: 170.844px;
              letter-spacing: 2.19375px;
              line-height: 20.1094px;
              list-style-type: none;
              min-block-size: auto;
              min-height: auto;
              min-inline-size: auto;
              min-width: auto;
              perspective-origin: 85.4219px 10.0547px;
              text-align: center;
              text-transform: uppercase;
              transform-origin: 85.4219px 10.0547px;
              width: 170.844px;
            "
          >
            soft and creamy
          </p>
        </div></a
      ><a
        href="/collections/gift-set"
        class="v-stack justify-items-center gap-4 sm:gap-5 group"
        data-acsb-clickable="true"
        data-acsb-navigable="true"
        data-acsb-now-navigable="false"
        data-custom-button-processed="true"
        tabindex="-1"
        aria-label="gift set"
        style="
          align-content: start;
          animation-duration: 0.001s;
          block-size: 326.023px;
          gap: 18.75px;
          cursor: pointer;
          display: grid;
          flex-basis: 315px;
          flex-grow: 1;
          font-size: 15px;
          grid-template-columns: 240px;
          grid-template-rows: 240px 67.2734px;
          height: 326.023px;
          inline-size: 240px;
          justify-items: safe center;
          line-height: 24.75px;
          list-style-type: none;
          max-inline-size: 315px;
          max-width: 315px;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: 240px;
          min-width: 240px;
          perspective-origin: 120px 163.008px;
          transform-origin: 120px 163.012px;
          width: 240px;
        "
        ><div
          class="overflow-hidden"
          data-acsb-overflower="true"
          style="
            animation-duration: 0.001s;
            block-size: 240px;
            cursor: pointer;
            font-size: 15px;
            height: 240px;
            inline-size: 240px;
            line-height: 24.75px;
            list-style-type: none;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            overflow-block: hidden;
            overflow-inline: hidden;
            overflow: hidden;
            perspective-origin: 120px 120px;
            transform-origin: 120px 120px;
            width: 240px;
          "
        >
          <img
            src="//roycechocolate.com/cdn/shop/files/2_c4e13520-5dfd-40c4-9af6-4719044c471d.webp?v=1769511168&amp;width=500"
            alt=""
            srcset="//roycechocolate.com/cdn/shop/files/2_c4e13520-5dfd-40c4-9af6-4719044c471d.webp?v=1769511168&amp;width=315 315w"
            width="500"
            height="500"
            loading="lazy"
            sizes="315px"
            class="zoom-image group-hover:zoom"
            style="animation-duration: 0.001s; block-size: 240px; cursor: pointer; font-size: 15px; height: 240px; inline-size: 240px; line-height: 24.75px; list-style-type: none; perspective-origin: 120px 120px; transform-origin: 120px 120px; width: 240px"
          />
        </div>
        <div
          class="v-stack text-center gap-2.5"
          style="
            align-content: start;
            animation-duration: 0.001s;
            block-size: 67.2812px;
            gap: 9.375px;
            cursor: pointer;
            display: grid;
            font-size: 15px;
            grid-template-columns: 160.266px;
            grid-template-rows: 37.7969px 20.1094px;
            height: 67.2812px;
            inline-size: 160.266px;
            line-height: 24.75px;
            list-style-type: none;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            perspective-origin: 80.1328px 33.6406px;
            text-align: center;
            transform-origin: 80.1328px 33.6406px;
            width: 160.266px;
          "
        >
          <p
            class="h6"
            style="
              animation-duration: 0.001s;
              block-size: 23.7969px;
              cursor: pointer;
              font-family: Jost, sans-serif;
              font-size: 14px;
              height: 23.7969px;
              inline-size: 160.266px;
              letter-spacing: 2.52px;
              line-height: 23.8px;
              list-style-type: none;
              margin-block-end: 14px;
              margin-bottom: 14px;
              min-block-size: auto;
              min-height: auto;
              min-inline-size: auto;
              min-width: auto;
              overflow-wrap: anywhere;
              perspective-origin: 80.1328px 11.8984px;
              text-align: center;
              text-transform: uppercase;
              transform-origin: 80.1328px 11.8984px;
              width: 160.266px;
            "
          >
            Gift Sets
          </p>
          <p
            class="smallcaps text-xs text-subdued"
            style="
              animation-duration: 0.001s;
              block-size: 20.1094px;
              cursor: pointer;
              font-size: 12.1875px;
              height: 20.1094px;
              inline-size: 160.266px;
              letter-spacing: 2.19375px;
              line-height: 20.1094px;
              list-style-type: none;
              min-block-size: auto;
              min-height: auto;
              min-inline-size: auto;
              min-width: auto;
              perspective-origin: 80.1328px 10.0547px;
              text-align: center;
              text-transform: uppercase;
              transform-origin: 80.1328px 10.0547px;
              width: 160.266px;
            "
          >
            luxuriously good
          </p>
        </div></a
      >
    </div>
  </div>
</details>
<style></style>` },
  { filename: "link no content with aria label", content: `<!-- Issue with @acsbe/classifier detection -->
<a href="path/to/page" style="width: 100px; height: 100px" aria-label="describe the button"></a>` },
  { filename: "link svg icon labelled", content: `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>

<a id="test-subject" href="/search">
  <svg style="width:100px;height:100px;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
  </svg>
  <span class="sr-only">Search</span>
</a>` },
  { filename: "link with content", content: `<a href="path/to/page">Some text content</a>` },
  { filename: "link with desernable content and aria label", content: `<a target="_blank" aria-label="Home" class="btn-new silent compensate-left e16fm13v0 e1of9yu15 css-6x6bk e1figufi0" href="/home"><span class="silent css-17qgsod e1of9yu11">Home</span></a>` },
  { filename: "link wtih image content and aria label", content: `<a href="path/to/page" aria-label="describe the button"><img src="path/to/graphic/cotnent" /></a>` }
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

export default LinkNavigationDiscernibleSuccess;
