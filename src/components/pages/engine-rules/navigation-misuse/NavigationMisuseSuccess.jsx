import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const NavigationMisuseSuccess = () => {
  const ruleId = "navigation-misuse";
  const title = `Navigation landmark does not contain key site navigation links`;
  const description = `A navigation landmark should identify a section that contains primary links for moving through the site or page. Using navigation landmarks for minor or secondary link groups makes it harder for screen reader users to locate the page’s key navigation areas.`;
  const helpText = `Use navigation landmarks only for key navigation sections, such as the main site menu, table of contents, breadcrumbs, or pagination. Avoid using them for general link lists, social links, related links, or other secondary link groups, and keep the number of navigation landmarks as limited as practical.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "accessiBe main menu nav", content: `<header class="header" data-element="header" style="align-items: center; animation-duration: 0.001s; block-size: 65px; display: flex; height: 65px; justify-content: space-between; perspective-origin: 748.5px 32.5px; transform-origin: 748.5px 32.5px">
  <div
    class="wrapper wrapper-large flex flex-nowrap"
    style="
      align-items: center;
      animation-duration: 0.001s;
      block-size: 65px;
      inset: 0px;
      display: flex;
      height: 65px;
      inset-block: 0px;
      inset-inline: 0px;
      justify-content: space-between;
      max-inline-size: 1800px;
      max-width: 1800px;
      min-block-size: auto;
      min-height: auto;
      min-inline-size: auto;
      min-width: auto;
      padding-inline: 70px;
      padding-left: 70px;
      padding-right: 70px;
      perspective-origin: 748.5px 32.5px;
      position: relative;
      transform-origin: 748.5px 32.5px;
    "
  >
    <div
      class="flex"
      style="align-items: center; animation-duration: 0.001s; block-size: 65px; display: flex; flex-wrap: wrap; height: 65px; inline-size: 1357px; justify-content: space-between; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 678.5px 32.5px; transform-origin: 678.5px 32.5px; width: 1357px"
    >
      <div
        class="start flex flex-inline flex-horizontal-start flex-nowrap"
        style="align-items: center; animation-duration: 0.001s; block-size: 65px; display: flex; height: 65px; inline-size: 866.805px; justify-content: flex-start; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 433.398px 32.5px; transform-origin: 433.402px 32.5px; width: 866.805px"
      >
        <div
          class="mobile-menu-trigger js-a11y-bound"
          data-clicker-trigger="mobile-menu"
          role="button"
          aria-hidden="true"
          data-acsb-clickable="true"
          data-acsb-navigable="true"
          data-acsb-now-navigable="false"
          data-acsb-hidden="true"
          style="animation-duration: 0.001s; cursor: pointer; inline-size: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 0px; transform-origin: 0px 0px; width: 0px"
        >
          <span
            class="sr-only"
            data-acsb-hidden="false"
            data-acsb-sr-only="true"
            data-acsb-force-visible="true"
            style="
              animation-duration: 0.001s;
              block-size: 1px;
              inset: 32.5px 1427px 32.5px 70px;
              clip: rect(0px, 0px, 0px, 0px);
              cursor: text;
              display: block;
              font-size: 15px;
              height: 1px;
              inline-size: 1px;
              inset-block: 32.5px;
              inset-inline: 70px 1427px;
              line-height: 1px;
              margin-block-start: -1px;
              margin-inline-start: -1px;
              margin-left: -1px;
              margin-top: -1px;
              overflow: hidden;
              perspective-origin: 0.5px 0.5px;
              position: absolute;
              transform-origin: 0.5px 0.5px;
              width: 1px;
            "
            >Menu</span
          ><i class="icon icon-menu" aria-hidden="true" role="presentation" style="animation-duration: 0.001s; cursor: pointer; display: none; inline-size: 22px; line-height: 16px; margin-inline-end: 15px; margin-right: 15px; perspective-origin: 50% 50%; transform-origin: 50% 50%; user-select: none; width: 22px"
            ><svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              style="animation-duration: 0.001s; block-size: auto; cursor: pointer; font-style: italic; height: auto; inline-size: 100%; line-height: 16px; max-block-size: 100%; max-height: 100%; overflow-clip-margin: content-box; overflow: hidden; perspective-origin: 50% 50%; transform-origin: 50% 50%; user-select: none; width: 100%"
            >
              <path d="M1 3h14v2h-14v-2z" style="display: block"></path>
              <path d="M1 7h14v2h-14v-2z" style="display: block"></path>
              <path d="M1 11h14v2h-14v-2z" style="display: block"></path>
            </svg>
          </i>
        </div>
        <div class="logo" style="animation-duration: 0.001s; block-size: 22.8516px; height: 22.8516px; inline-size: 160px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 80px 11.4219px; transform-origin: 80px 11.4258px; width: 160px">
          <a
            href="/"
            data-acsb-clickable="true"
            data-acsb-navigable="true"
            data-acsb-now-navigable="true"
            data-custom-button-processed="true"
            style="animation-duration: 0.001s; block-size: 22.8516px; cursor: pointer; display: block; height: 22.8516px; inline-size: 160px; perspective-origin: 80px 11.4219px; transform-origin: 80px 11.4258px; width: 160px"
            ><span
              class="acsb-sr-only"
              data-acsb-sr-only="true"
              data-acsb-force-visible="true"
              data-acsb-sr-only-position="before"
              data-acsb-hidden="false"
              style="
                animation-duration: 0.001s;
                background-color: rgb(255, 255, 255);
                block-size: 1px;
                border-block-color: rgb(0, 0, 0);
                border-color: rgb(0, 0, 0);
                border-inline-color: rgb(0, 0, 0);
                inset: 0px 1497px 65px 0px;
                caret-color: rgb(0, 0, 0);
                clip: rect(0px, 0px, 0px, 0px);
                color: rgb(0, 0, 0);
                column-rule-color: rgb(0, 0, 0);
                cursor: text;
                display: block;
                font-size: 15px;
                height: 1px;
                inline-size: 1px;
                inset-block: 0px 65px;
                inset-inline: 0px 1497px;
                line-height: 1px;
                margin-block-start: -1px;
                margin-inline-start: -1px;
                margin-left: -1px;
                margin-top: -1px;
                outline-color: rgb(0, 0, 0);
                overflow: hidden;
                perspective-origin: 0.5px 0.5px;
                position: absolute;
                text-decoration: none solid rgb(0, 0, 0);
                text-emphasis-color: rgb(0, 0, 0);
                text-transform: capitalize;
                transform-origin: 0.5px 0.5px;
                width: 1px;
                -webkit-text-fill-color: rgb(0, 0, 0);
                -webkit-text-stroke-color: rgb(0, 0, 0);
              "
              >Home</span
            ><img
              class="logo-long"
              alt="accessiBe"
              style="
                animation-duration: 0.001s;
                block-size: 22.8516px;
                border-block-color: rgb(19, 110, 248);
                border-color: rgb(19, 110, 248);
                border-inline-color: rgb(19, 110, 248);
                caret-color: rgb(19, 110, 248);
                color: rgb(19, 110, 248);
                column-rule-color: rgb(19, 110, 248);
                cursor: pointer;
                display: block;
                height: 22.8516px;
                inline-size: 160px;
                outline-color: rgb(19, 110, 248);
                perspective-origin: 80px 11.4219px;
                text-decoration: none solid rgb(19, 110, 248);
                text-emphasis-color: rgb(19, 110, 248);
                transform-origin: 80px 11.4258px;
                width: 160px;
                -webkit-text-fill-color: rgb(19, 110, 248);
                -webkit-text-stroke-color: rgb(19, 110, 248);
              " /><img
              class="logo-short"
              alt="accessiBe"
              aria-hidden="true"
              data-acsb-hidden="true"
              style="
                animation-duration: 0.001s;
                block-size: 35px;
                border-block-color: rgb(19, 110, 248);
                border-color: rgb(19, 110, 248);
                border-inline-color: rgb(19, 110, 248);
                caret-color: rgb(19, 110, 248);
                color: rgb(19, 110, 248);
                column-rule-color: rgb(19, 110, 248);
                cursor: pointer;
                display: none;
                height: 35px;
                inline-size: auto;
                outline-color: rgb(19, 110, 248);
                perspective-origin: 50% 50%;
                text-decoration: none solid rgb(19, 110, 248);
                text-emphasis-color: rgb(19, 110, 248);
                transform-origin: 50% 50%;
                width: auto;
                -webkit-text-fill-color: rgb(19, 110, 248);
                -webkit-text-stroke-color: rgb(19, 110, 248);
              "
          /></a>
        </div>
        <nav
          class="menu main-menu js-a11y-bound"
          aria-label="Main menu"
          data-a11y-landmark="menu"
          id="a11y-landmark-menu"
          style="animation-duration: 0.001s; block-size: 65px; height: 65px; inline-size: 671.805px; margin-inline-start: 35px; margin-left: 35px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 335.898px 32.5px; transform-origin: 335.902px 32.5px; width: 671.805px"
        >
          <ul data-acsb-menu="ul" role="region" data-acsb-main-menu="true" id="test" style="animation-duration: 0.001s; block-size: 65px; height: 65px; inline-size: 671.812px; perspective-origin: 335.906px 32.5px; transform-origin: 335.906px 32.5px; width: 671.812px">
            <li
              class="menu-accesswidget menu-has-dropdown a11y-dd-container"
              data-acsb-menu="li"
              data-acsb-menu-root="true"
              data-acsb-dropdown-container="true"
              data-acsb-menu-focused="true"
              style="animation-duration: 0.001s; block-size: 65px; display: inline-block; height: 65px; inline-size: 125.102px; perspective-origin: 62.5469px 32.5px; transform-origin: 62.5508px 32.5px; width: 125.102px"
            >
              <a
                class="item"
                href="/accesswidget"
                data-a11y-tooltip="Use ←/→ to navigate"
                data-acsb-clickable="true"
                data-acsb-navigable="true"
                data-acsb-now-navigable="true"
                data-custom-button-processed="true"
                data-acsb-menu="a"
                data-acsb-menu-root-link="true"
                aria-haspopup="true"
                aria-expanded="false"
                data-acsb-tooltip="Use ←/→ to navigate"
                style="
                  align-items: center;
                  animation-duration: 0.001s;
                  block-size: 65px;
                  border-block-color: rgb(10, 37, 64);
                  border-color: rgb(10, 37, 64);
                  border-inline-color: rgb(10, 37, 64);
                  inset: 0px;
                  caret-color: rgb(10, 37, 64);
                  color: rgb(10, 37, 64);
                  column-rule-color: rgb(10, 37, 64);
                  cursor: pointer;
                  display: inline-flex;
                  font-size: 14px;
                  font-weight: 600;
                  height: 65px;
                  inline-size: 110.109px;
                  inset-block: 0px;
                  inset-inline: 0px;
                  justify-content: space-between;
                  line-height: 21px;
                  margin-inline-end: 15px;
                  margin-right: 15px;
                  outline-color: rgb(10, 37, 64);
                  padding-inline: 10px;
                  padding-left: 10px;
                  padding-right: 10px;
                  perspective-origin: 55.0547px 32.5px;
                  position: relative;
                  text-decoration: none solid rgb(10, 37, 64);
                  text-emphasis-color: rgb(10, 37, 64);
                  text-transform: uppercase;
                  transform-origin: 55.0547px 32.5px;
                  width: 110.109px;
                  -webkit-text-fill-color: rgb(10, 37, 64);
                  -webkit-text-stroke-color: rgb(10, 37, 64);
                "
                data-id="0"
              >
                Products
                <i
                  class="icon icon-chevron-down"
                  role="presentation"
                  style="
                    animation-duration: 0.001s;
                    block-size: 7px;
                    border-block-color: rgb(10, 37, 64);
                    border-color: rgb(10, 37, 64);
                    border-inline-color: rgb(10, 37, 64);
                    caret-color: rgb(10, 37, 64);
                    color: rgb(10, 37, 64);
                    column-rule-color: rgb(10, 37, 64);
                    cursor: pointer;
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    height: 7px;
                    inline-size: 7px;
                    line-height: 14px;
                    margin-block-start: -1px;
                    margin-inline-start: 7px;
                    margin-left: 7px;
                    margin-top: -1px;
                    min-block-size: auto;
                    min-height: auto;
                    min-inline-size: auto;
                    min-width: auto;
                    outline-color: rgb(10, 37, 64);
                    perspective-origin: 3.5px 3.5px;
                    text-decoration: none solid rgb(10, 37, 64);
                    text-emphasis-color: rgb(10, 37, 64);
                    text-transform: uppercase;
                    transform-origin: 3.5px 3.5px;
                    user-select: none;
                    width: 7px;
                    -webkit-text-fill-color: rgb(10, 37, 64);
                    -webkit-text-stroke-color: rgb(10, 37, 64);
                  "
                  ><svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    data-acsb-hidden="true"
                    style="
                      animation-duration: 0.001s;
                      block-size: 7px;
                      border-block-color: rgb(10, 37, 64);
                      border-color: rgb(10, 37, 64);
                      border-inline-color: rgb(10, 37, 64);
                      caret-color: rgb(10, 37, 64);
                      color: rgb(10, 37, 64);
                      column-rule-color: rgb(10, 37, 64);
                      cursor: pointer;
                      font-size: 14px;
                      font-style: italic;
                      font-weight: 600;
                      height: 7px;
                      inline-size: 7px;
                      line-height: 14px;
                      max-block-size: 100%;
                      max-height: 100%;
                      outline-color: rgb(10, 37, 64);
                      overflow-clip-margin: content-box;
                      overflow: hidden;
                      perspective-origin: 3.5px 3.5px;
                      text-decoration: none solid rgb(10, 37, 64);
                      text-emphasis-color: rgb(10, 37, 64);
                      text-transform: uppercase;
                      transform-origin: 3.5px 3.5px;
                      user-select: none;
                      width: 7px;
                      -webkit-text-fill-color: rgb(10, 37, 64);
                      -webkit-text-stroke-color: rgb(10, 37, 64);
                    "
                  >
                    <path d="M16 5.5l-1.5-1.5-6.5 6.5-6.5-6.5-1.5 1.5 8 8 8-8z"></path></svg></i
              ></a>
              <div
                class="dropdown dropdown-big acsb-hidden"
                role="region"
                aria-hidden="true"
                aria-label="Sub menu"
                data-acsb-hidden="true"
                style="
                  animation-duration: 0.001s;
                  background-color: rgb(255, 255, 255);
                  border-radius: 10px;
                  border-end-end-radius: 10px;
                  border-end-start-radius: 10px;
                  border-start-end-radius: 10px;
                  border-start-start-radius: 10px;
                  box-shadow: rgba(60, 80, 170, 0.2) 0px 3px 10px 0px;
                  display: none;
                  inline-size: 1100px;
                  inset-block-start: 65px;
                  inset-inline-start: 0px;
                  left: 0px;
                  opacity: 0;
                  overflow: hidden;
                  perspective-origin: 50% 50%;
                  pointer-events: none;
                  position: absolute;
                  top: 65px;
                  transform-origin: 0% 0%;
                  visibility: hidden;
                  width: 1100px;
                  z-index: 999;
                "
                data-id="1"
              >
                <div
                  class="flex flex-vertical-stretch flex-nowrap"
                  data-acsb-possible-star="true"
                  style="align-items: stretch; animation-duration: 0.001s; block-size: auto; display: flex; height: auto; inline-size: 100%; justify-content: space-between; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                >
                  <div
                    class="part part-menu flex flex-nowrap flex-vertical-start"
                    role="region"
                    aria-label="Submenu"
                    style="align-items: flex-start; animation-duration: 0.001s; block-size: auto; display: flex; flex-direction: row-reverse; height: auto; inline-size: 100%; justify-content: space-between; overflow: hidden; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                  >
                    <div
                      class="part-category"
                      style="
                        animation-duration: 0.001s;
                        block-size: auto;
                        border-inline-start: 1px solid rgb(227, 232, 251);
                        border-left: 1px solid rgb(227, 232, 251);
                        height: auto;
                        inline-size: 50%;
                        padding-block: 30px;
                        padding: 30px;
                        padding-inline: 30px;
                        perspective-origin: 50% 50%;
                        pointer-events: none;
                        transform-origin: 50% 50%;
                        visibility: hidden;
                        width: 50%;
                      "
                    >
                      <a
                        href="/accessflow"
                        class="part-menu-head"
                        tabindex="-1"
                        data-acsb-clickable="true"
                        data-acsb-navigable="true"
                        data-acsb-now-navigable="false"
                        data-custom-button-processed="true"
                        style="
                          animation-duration: 0.001s;
                          border-block-end: 1px solid rgb(227, 232, 251);
                          border-bottom: 1px solid rgb(227, 232, 251);
                          cursor: pointer;
                          display: block;
                          margin-block-end: 15px;
                          margin-bottom: 15px;
                          padding-block-end: 20px;
                          padding-bottom: 20px;
                          padding-inline: 40px;
                          padding-left: 40px;
                          padding-right: 40px;
                          perspective-origin: 50% 50%;
                          pointer-events: none;
                          text-wrap-mode: nowrap;
                          transform-origin: 50% 50%;
                          visibility: hidden;
                        "
                        ><img
                          alt="accessFlow"
                          style="
                            animation-duration: 0.001s;
                            block-size: 33px;
                            border-block-color: rgb(19, 110, 248);
                            border-color: rgb(19, 110, 248);
                            border-inline-color: rgb(19, 110, 248);
                            caret-color: rgb(19, 110, 248);
                            color: rgb(19, 110, 248);
                            column-rule-color: rgb(19, 110, 248);
                            cursor: pointer;
                            display: block;
                            height: 33px;
                            inline-size: auto;
                            margin-inline-start: -40px;
                            margin-left: -40px;
                            outline-color: rgb(19, 110, 248);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(19, 110, 248);
                            text-emphasis-color: rgb(19, 110, 248);
                            text-wrap-mode: nowrap;
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            width: auto;
                            -webkit-text-fill-color: rgb(19, 110, 248);
                            -webkit-text-stroke-color: rgb(19, 110, 248);
                          "
                        /><span
                          class="desc"
                          style="
                            animation-duration: 0.001s;
                            border-block-color: rgb(19, 110, 248);
                            border-color: rgb(19, 110, 248);
                            border-inline-color: rgb(19, 110, 248);
                            caret-color: rgb(19, 110, 248);
                            color: rgb(19, 110, 248);
                            column-rule-color: rgb(19, 110, 248);
                            cursor: pointer;
                            display: block;
                            font-size: 15px;
                            letter-spacing: 0.3px;
                            line-height: 22.5px;
                            margin-block-start: 5px;
                            margin-top: 5px;
                            outline-color: rgb(19, 110, 248);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(19, 110, 248);
                            text-emphasis-color: rgb(19, 110, 248);
                            text-shadow: rgba(19, 110, 248, 0.8) 0px 0px 0px;
                            text-wrap-mode: nowrap;
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            -webkit-text-fill-color: rgb(19, 110, 248);
                            -webkit-text-stroke-color: rgb(19, 110, 248);
                          "
                          >Web Accessibility for Developers</span
                        ></a
                      >
                      <ul
                        class="flex"
                        data-acsb-menu="ul"
                        role="region"
                        aria-label="Submenu"
                        style="align-items: center; animation-duration: 0.001s; block-size: auto; display: flex; flex-wrap: wrap; height: auto; inline-size: 100%; justify-content: space-between; list-style-type: circle; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                      >
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessflow"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            accessFlow Overview
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessflow/workflow"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Workflow
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessflow/ai-auditing"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            AI Auditing
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessflow/monitoring"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Monitoring
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessflow/action-funnels"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Action Funnels
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessflow/integrate"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Integrate
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                      </ul>
                    </div>
                    <div class="part-category" style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 50%; padding-block: 30px; padding: 30px; padding-inline: 30px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 50%">
                      <a
                        href="/accesswidget"
                        class="part-menu-head"
                        tabindex="-1"
                        data-acsb-clickable="true"
                        data-acsb-navigable="true"
                        data-acsb-now-navigable="false"
                        data-custom-button-processed="true"
                        style="
                          animation-duration: 0.001s;
                          border-block-end: 1px solid rgb(227, 232, 251);
                          border-bottom: 1px solid rgb(227, 232, 251);
                          cursor: pointer;
                          display: block;
                          margin-block-end: 15px;
                          margin-bottom: 15px;
                          padding-block-end: 20px;
                          padding-bottom: 20px;
                          padding-inline: 40px;
                          padding-left: 40px;
                          padding-right: 40px;
                          perspective-origin: 50% 50%;
                          pointer-events: none;
                          text-wrap-mode: nowrap;
                          transform-origin: 50% 50%;
                          visibility: hidden;
                        "
                        ><img
                          alt="accessWidget"
                          style="
                            animation-duration: 0.001s;
                            block-size: 33px;
                            border-block-color: rgb(19, 110, 248);
                            border-color: rgb(19, 110, 248);
                            border-inline-color: rgb(19, 110, 248);
                            caret-color: rgb(19, 110, 248);
                            color: rgb(19, 110, 248);
                            column-rule-color: rgb(19, 110, 248);
                            cursor: pointer;
                            display: block;
                            height: 33px;
                            inline-size: auto;
                            margin-inline-start: -40px;
                            margin-left: -40px;
                            outline-color: rgb(19, 110, 248);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(19, 110, 248);
                            text-emphasis-color: rgb(19, 110, 248);
                            text-wrap-mode: nowrap;
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            width: auto;
                            -webkit-text-fill-color: rgb(19, 110, 248);
                            -webkit-text-stroke-color: rgb(19, 110, 248);
                          "
                        /><span
                          class="desc"
                          style="
                            animation-duration: 0.001s;
                            border-block-color: rgb(19, 110, 248);
                            border-color: rgb(19, 110, 248);
                            border-inline-color: rgb(19, 110, 248);
                            caret-color: rgb(19, 110, 248);
                            color: rgb(19, 110, 248);
                            column-rule-color: rgb(19, 110, 248);
                            cursor: pointer;
                            display: block;
                            font-size: 15px;
                            letter-spacing: 0.3px;
                            line-height: 22.5px;
                            margin-block-start: 5px;
                            margin-top: 5px;
                            outline-color: rgb(19, 110, 248);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(19, 110, 248);
                            text-emphasis-color: rgb(19, 110, 248);
                            text-shadow: rgba(19, 110, 248, 0.8) 0px 0px 0px;
                            text-wrap-mode: nowrap;
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            -webkit-text-fill-color: rgb(19, 110, 248);
                            -webkit-text-stroke-color: rgb(19, 110, 248);
                          "
                          >AI-Powered Web Accessibility</span
                        ></a
                      >
                      <ul
                        class="flex"
                        data-acsb-menu="ul"
                        role="region"
                        aria-label="Submenu"
                        style="align-items: center; animation-duration: 0.001s; block-size: auto; display: flex; flex-wrap: wrap; height: auto; inline-size: 100%; justify-content: space-between; list-style-type: circle; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                      >
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accesswidget"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            accessWidget Overview
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accesswidget/examples"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Examples &amp; Customers
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accesswidget/artificial-intelligence"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Artificial Intelligence
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accesswidget/interface"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Accessibility Interface
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href=""
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            accessiBe VS Competitors
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accesswidget/security"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: calc(100% - 40px);
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: calc(100% - 40px);
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Security &amp; Privacy
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="part part-card"
                    style="
                      animation-duration: 0.001s;
                      background-color: rgb(248, 249, 252);
                      block-size: auto;
                      border-bottom-right-radius: 10px;
                      border-end-end-radius: 10px;
                      border-start-end-radius: 10px;
                      border-top-right-radius: 10px;
                      height: auto;
                      inline-size: 380px;
                      min-inline-size: 380px;
                      min-width: 380px;
                      overflow: hidden;
                      padding-block: 30px;
                      padding: 30px;
                      padding-inline: 30px;
                      perspective-origin: 50% 50%;
                      pointer-events: none;
                      transform-origin: 50% 50%;
                      visibility: hidden;
                      width: 380px;
                    "
                  >
                    <a
                      class="card"
                      href="/accessscan"
                      tabindex="-1"
                      data-acsb-clickable="true"
                      data-acsb-navigable="true"
                      data-acsb-now-navigable="false"
                      data-custom-button-processed="true"
                      style="animation-duration: 0.001s; block-size: 100%; cursor: pointer; height: 100%; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden"
                      ><div
                        class="image"
                        style="
                          animation-duration: 0.001s;
                          block-size: 200px;
                          border-block-color: rgb(19, 110, 248);
                          border-color: rgb(19, 110, 248);
                          border-radius: 10px;
                          border-end-end-radius: 10px;
                          border-end-start-radius: 10px;
                          border-inline-color: rgb(19, 110, 248);
                          border-start-end-radius: 10px;
                          border-start-start-radius: 10px;
                          caret-color: rgb(19, 110, 248);
                          color: rgb(19, 110, 248);
                          column-rule-color: rgb(19, 110, 248);
                          cursor: pointer;
                          height: 200px;
                          inline-size: auto;
                          outline-color: rgb(19, 110, 248);
                          overflow: hidden;
                          perspective-origin: 50% 50%;
                          pointer-events: none;
                          text-decoration: none solid rgb(19, 110, 248);
                          text-emphasis-color: rgb(19, 110, 248);
                          transform-origin: 50% 50%;
                          visibility: hidden;
                          width: auto;
                          -webkit-text-fill-color: rgb(19, 110, 248);
                          -webkit-text-stroke-color: rgb(19, 110, 248);
                        "
                      >
                        <img
                          class="object-cover"
                          role="presentation"
                          alt="Is your website ADA compliant? Find out in seconds!"
                          style="
                            animation-duration: 0.001s;
                            block-size: 100%;
                            border-block-color: rgb(19, 110, 248);
                            border-color: rgb(19, 110, 248);
                            border-inline-color: rgb(19, 110, 248);
                            caret-color: rgb(19, 110, 248);
                            color: rgb(19, 110, 248);
                            column-rule-color: rgb(19, 110, 248);
                            cursor: pointer;
                            display: block;
                            height: 100%;
                            inline-size: 100%;
                            max-inline-size: none;
                            max-width: none;
                            object-fit: cover;
                            outline-color: rgb(19, 110, 248);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(19, 110, 248);
                            text-emphasis-color: rgb(19, 110, 248);
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(19, 110, 248);
                            -webkit-text-stroke-color: rgb(19, 110, 248);
                          "
                        />
                      </div>
                      <div
                        class="content"
                        style="
                          animation-duration: 0.001s;
                          block-size: auto;
                          border-block-color: rgb(19, 110, 248);
                          border-color: rgb(19, 110, 248);
                          border-inline-color: rgb(19, 110, 248);
                          caret-color: rgb(19, 110, 248);
                          color: rgb(19, 110, 248);
                          column-rule-color: rgb(19, 110, 248);
                          cursor: pointer;
                          height: auto;
                          inline-size: auto;
                          margin-block-start: 30px;
                          margin-top: 30px;
                          outline-color: rgb(19, 110, 248);
                          perspective-origin: 50% 50%;
                          pointer-events: none;
                          text-decoration: none solid rgb(19, 110, 248);
                          text-emphasis-color: rgb(19, 110, 248);
                          transform-origin: 50% 50%;
                          visibility: hidden;
                          width: auto;
                          -webkit-text-fill-color: rgb(19, 110, 248);
                          -webkit-text-stroke-color: rgb(19, 110, 248);
                        "
                      >
                        <span
                          class="title title-small2"
                          style="
                            animation-duration: 0.001s;
                            border-block-color: rgb(10, 37, 64);
                            border-color: rgb(10, 37, 64);
                            border-inline-color: rgb(10, 37, 64);
                            caret-color: rgb(10, 37, 64);
                            color: rgb(10, 37, 64);
                            column-rule-color: rgb(10, 37, 64);
                            cursor: pointer;
                            display: block;
                            font-size: 19px;
                            font-weight: 700;
                            inline-size: 100%;
                            letter-spacing: -0.5px;
                            line-height: 24.7px;
                            margin-block-end: 20px;
                            margin-bottom: 20px;
                            outline-color: rgb(10, 37, 64);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            position: relative;
                            text-decoration: none solid rgb(10, 37, 64);
                            text-emphasis-color: rgb(10, 37, 64);
                            text-rendering: geometricprecision;
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(10, 37, 64);
                            -webkit-text-stroke-color: rgb(10, 37, 64);
                          "
                          >Is your website ADA compliant? Find out in seconds!</span
                        >
                        <p class="text text-medium" style="animation-duration: 0.001s; block-size: auto; cursor: pointer; height: auto; inline-size: auto; margin-block: 0px; margin-bottom: 0px; margin-top: 0px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: auto">
                          Get a free, professional web accessibility audit to learn where you stand
                        </p>
                        <span
                          class="text-button text-button-nocolor text-button-small"
                          style="
                            align-items: center;
                            animation-duration: 0.001s;
                            border-block-color: rgb(10, 37, 64);
                            border-color: rgb(10, 37, 64);
                            border-inline-color: rgb(10, 37, 64);
                            caret-color: rgb(10, 37, 64);
                            color: rgb(10, 37, 64);
                            column-rule-color: rgb(10, 37, 64);
                            cursor: pointer;
                            display: block;
                            font-size: 14px;
                            font-weight: 600;
                            inline-size: 100%;
                            justify-content: center;
                            line-height: 14px;
                            margin-block-start: 25px;
                            margin-top: 25px;
                            outline-color: rgb(10, 37, 64);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(10, 37, 64);
                            text-emphasis-color: rgb(10, 37, 64);
                            text-transform: uppercase;
                            transform-origin: 50% 50%;
                            user-select: none;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(10, 37, 64);
                            -webkit-text-stroke-color: rgb(10, 37, 64);
                          "
                        >
                          Run audit now
                          <i
                            class="icon icon-chevron-right"
                            aria-hidden="true"
                            role="presentation"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-inline-color: rgb(10, 37, 64);
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: inline-block;
                              font-size: 14px;
                              font-weight: 600;
                              inline-size: 100%;
                              line-height: 14px;
                              margin-inline-start: 12px;
                              margin-left: 12px;
                              max-inline-size: 5px;
                              max-width: 5px;
                              min-inline-size: 5px;
                              min-width: 5px;
                              outline-color: rgb(10, 37, 64);
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-transform: uppercase;
                              transform-origin: 50% 50%;
                              user-select: none;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                            ><!--?xml version="1.0" encoding="utf-8"?--><svg
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 9.5 16"
                              style="
                                animation-duration: 0.001s;
                                block-size: auto;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                font-size: 14px;
                                font-style: italic;
                                font-weight: 600;
                                height: auto;
                                inline-size: 100%;
                                line-height: 14px;
                                max-block-size: 100%;
                                max-height: 100%;
                                outline-color: rgb(10, 37, 64);
                                overflow-clip-margin: content-box;
                                overflow: hidden;
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-transform: uppercase;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 100%;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              xml:space="preserve"
                            >
                              <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                        ></span></div
                    ></a>
                  </div>
                </div>
              </div>
              <div
                data-acsb-now-navigable="true"
                data-acsb-force-visible="true"
                data-acsb="true"
                data-acsb-dropdown="abixl6uh1cwj"
                style="position: fixed; outline: none !important; z-index: 2147483647; display: block !important; animation-duration: 0.001s; inset: -50px 1547px 442px -50px; inline-size: 0px; inset-block: -50px 442px; inset-inline: -50px 1547px; perspective-origin: 0px 0px; transform-origin: 0px 0px; width: 0px"
              ></div>
            </li>
            <li
              class="menu-accessservices menu-has-dropdown a11y-dd-container"
              data-acsb-menu="li"
              data-acsb-menu-root="true"
              data-acsb-dropdown-container="true"
              style="animation-duration: 0.001s; block-size: 65px; display: inline-block; height: 65px; inline-size: 114.914px; perspective-origin: 57.4531px 32.5px; transform-origin: 57.457px 32.5px; width: 114.914px"
            >
              <a
                class="item"
                href="/accessservices"
                data-acsb-clickable="true"
                data-acsb-navigable="true"
                data-acsb-now-navigable="true"
                data-custom-button-processed="true"
                data-acsb-menu="a"
                data-acsb-menu-root-link="true"
                aria-haspopup="true"
                aria-expanded="false"
                style="
                  align-items: center;
                  animation-duration: 0.001s;
                  block-size: 65px;
                  border-block-color: rgb(10, 37, 64);
                  border-color: rgb(10, 37, 64);
                  border-inline-color: rgb(10, 37, 64);
                  inset: 0px;
                  caret-color: rgb(10, 37, 64);
                  color: rgb(10, 37, 64);
                  column-rule-color: rgb(10, 37, 64);
                  cursor: pointer;
                  display: inline-flex;
                  font-size: 14px;
                  font-weight: 600;
                  height: 65px;
                  inline-size: 99.9141px;
                  inset-block: 0px;
                  inset-inline: 0px;
                  justify-content: space-between;
                  line-height: 21px;
                  margin-inline-end: 15px;
                  margin-right: 15px;
                  outline-color: rgb(10, 37, 64);
                  padding-inline: 10px;
                  padding-left: 10px;
                  padding-right: 10px;
                  perspective-origin: 49.9531px 32.5px;
                  position: relative;
                  text-decoration: none solid rgb(10, 37, 64);
                  text-emphasis-color: rgb(10, 37, 64);
                  text-transform: uppercase;
                  transform-origin: 49.957px 32.5px;
                  width: 99.9141px;
                  -webkit-text-fill-color: rgb(10, 37, 64);
                  -webkit-text-stroke-color: rgb(10, 37, 64);
                "
                data-id="2"
              >
                Services
                <i
                  class="icon icon-chevron-down"
                  role="presentation"
                  style="
                    animation-duration: 0.001s;
                    block-size: 7px;
                    border-block-color: rgb(10, 37, 64);
                    border-color: rgb(10, 37, 64);
                    border-inline-color: rgb(10, 37, 64);
                    caret-color: rgb(10, 37, 64);
                    color: rgb(10, 37, 64);
                    column-rule-color: rgb(10, 37, 64);
                    cursor: pointer;
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    height: 7px;
                    inline-size: 7px;
                    line-height: 14px;
                    margin-block-start: -1px;
                    margin-inline-start: 7px;
                    margin-left: 7px;
                    margin-top: -1px;
                    min-block-size: auto;
                    min-height: auto;
                    min-inline-size: auto;
                    min-width: auto;
                    outline-color: rgb(10, 37, 64);
                    perspective-origin: 3.5px 3.5px;
                    text-decoration: none solid rgb(10, 37, 64);
                    text-emphasis-color: rgb(10, 37, 64);
                    text-transform: uppercase;
                    transform-origin: 3.5px 3.5px;
                    user-select: none;
                    width: 7px;
                    -webkit-text-fill-color: rgb(10, 37, 64);
                    -webkit-text-stroke-color: rgb(10, 37, 64);
                  "
                  ><svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    data-acsb-hidden="true"
                    style="
                      animation-duration: 0.001s;
                      block-size: 7px;
                      border-block-color: rgb(10, 37, 64);
                      border-color: rgb(10, 37, 64);
                      border-inline-color: rgb(10, 37, 64);
                      caret-color: rgb(10, 37, 64);
                      color: rgb(10, 37, 64);
                      column-rule-color: rgb(10, 37, 64);
                      cursor: pointer;
                      font-size: 14px;
                      font-style: italic;
                      font-weight: 600;
                      height: 7px;
                      inline-size: 7px;
                      line-height: 14px;
                      max-block-size: 100%;
                      max-height: 100%;
                      outline-color: rgb(10, 37, 64);
                      overflow-clip-margin: content-box;
                      overflow: hidden;
                      perspective-origin: 3.5px 3.5px;
                      text-decoration: none solid rgb(10, 37, 64);
                      text-emphasis-color: rgb(10, 37, 64);
                      text-transform: uppercase;
                      transform-origin: 3.5px 3.5px;
                      user-select: none;
                      width: 7px;
                      -webkit-text-fill-color: rgb(10, 37, 64);
                      -webkit-text-stroke-color: rgb(10, 37, 64);
                    "
                  >
                    <path d="M16 5.5l-1.5-1.5-6.5 6.5-6.5-6.5-1.5 1.5 8 8 8-8z"></path></svg></i
              ></a>
              <div
                class="dropdown acsb-hidden"
                role="region"
                aria-hidden="true"
                aria-label="Sub menu"
                data-acsb-hidden="true"
                data-acsb-dropdown="ajwm1rdf78zd"
                style="
                  animation-duration: 0.001s;
                  background-color: rgb(255, 255, 255);
                  border-radius: 10px;
                  border-end-end-radius: 10px;
                  border-end-start-radius: 10px;
                  border-start-end-radius: 10px;
                  border-start-start-radius: 10px;
                  box-shadow: rgba(60, 80, 170, 0.2) 0px 3px 10px 0px;
                  display: none;
                  inline-size: 800px;
                  inset-block-start: 65px;
                  inset-inline-start: 0px;
                  left: 0px;
                  opacity: 0;
                  overflow: hidden;
                  perspective-origin: 50% 50%;
                  pointer-events: none;
                  position: absolute;
                  top: 65px;
                  transform-origin: 0% 0%;
                  visibility: hidden;
                  width: 800px;
                  z-index: 999;
                "
                data-id="3"
              >
                <div
                  class="flex flex-vertical-stretch flex-nowrap"
                  data-acsb-possible-star="true"
                  style="align-items: stretch; animation-duration: 0.001s; block-size: auto; display: flex; height: auto; inline-size: 100%; justify-content: space-between; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                >
                  <div
                    class="part part-menu flex flex-nowrap flex-vertical-start"
                    style="align-items: flex-start; animation-duration: 0.001s; block-size: auto; display: flex; height: auto; inline-size: 100%; justify-content: space-between; overflow: hidden; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                  >
                    <div class="part-category" style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; padding-block: 30px; padding: 30px; padding-inline: 30px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: auto">
                      <ul
                        class="flex"
                        data-acsb-menu="ul"
                        role="region"
                        aria-label="Submenu"
                        style="align-items: center; animation-duration: 0.001s; block-size: auto; display: flex; flex-wrap: wrap; height: auto; inline-size: 100%; justify-content: space-between; list-style-type: circle; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                      >
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessservices"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Services Overview
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessservices/file-accessibility"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            File Accessibility
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessservices/media-accessibility"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Media Accessibility
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessservices/expert-audit"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Expert Audit
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessservices/user-testing"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            User Testing
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessservices/vpat"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            VPAT
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessservices/inspection"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Inspection
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/accessservices/web-accessibility-litigation-support"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Litigation Support
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="part part-card"
                    style="
                      animation-duration: 0.001s;
                      background-color: rgb(248, 249, 252);
                      block-size: auto;
                      border-bottom-right-radius: 10px;
                      border-end-end-radius: 10px;
                      border-start-end-radius: 10px;
                      border-top-right-radius: 10px;
                      height: auto;
                      inline-size: 380px;
                      min-inline-size: 380px;
                      min-width: 380px;
                      overflow: hidden;
                      padding-block: 30px;
                      padding: 30px;
                      padding-inline: 30px;
                      perspective-origin: 50% 50%;
                      pointer-events: none;
                      transform-origin: 50% 50%;
                      visibility: hidden;
                      width: 380px;
                    "
                  >
                    <a
                      class="card"
                      href="https://dashboard.accessibe.com/accessservices"
                      tabindex="-1"
                      data-acsb-clickable="true"
                      data-acsb-navigable="true"
                      data-acsb-now-navigable="false"
                      data-custom-button-processed="true"
                      style="animation-duration: 0.001s; block-size: 100%; cursor: pointer; height: 100%; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden"
                      ><div
                        class="image"
                        style="
                          animation-duration: 0.001s;
                          block-size: 200px;
                          border-block-color: rgb(19, 110, 248);
                          border-color: rgb(19, 110, 248);
                          border-radius: 10px;
                          border-end-end-radius: 10px;
                          border-end-start-radius: 10px;
                          border-inline-color: rgb(19, 110, 248);
                          border-start-end-radius: 10px;
                          border-start-start-radius: 10px;
                          caret-color: rgb(19, 110, 248);
                          color: rgb(19, 110, 248);
                          column-rule-color: rgb(19, 110, 248);
                          cursor: pointer;
                          height: 200px;
                          inline-size: auto;
                          outline-color: rgb(19, 110, 248);
                          overflow: hidden;
                          perspective-origin: 50% 50%;
                          pointer-events: none;
                          text-decoration: none solid rgb(19, 110, 248);
                          text-emphasis-color: rgb(19, 110, 248);
                          transform-origin: 50% 50%;
                          visibility: hidden;
                          width: auto;
                          -webkit-text-fill-color: rgb(19, 110, 248);
                          -webkit-text-stroke-color: rgb(19, 110, 248);
                        "
                      >
                        <img
                          class="object-cover"
                          role="presentation"
                          alt="Create and manage your accessibility projects easily!"
                          style="
                            animation-duration: 0.001s;
                            block-size: 100%;
                            border-block-color: rgb(19, 110, 248);
                            border-color: rgb(19, 110, 248);
                            border-inline-color: rgb(19, 110, 248);
                            caret-color: rgb(19, 110, 248);
                            color: rgb(19, 110, 248);
                            column-rule-color: rgb(19, 110, 248);
                            cursor: pointer;
                            display: block;
                            height: 100%;
                            inline-size: 100%;
                            max-inline-size: none;
                            max-width: none;
                            object-fit: cover;
                            outline-color: rgb(19, 110, 248);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(19, 110, 248);
                            text-emphasis-color: rgb(19, 110, 248);
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(19, 110, 248);
                            -webkit-text-stroke-color: rgb(19, 110, 248);
                          "
                        />
                      </div>
                      <div
                        class="content"
                        style="
                          animation-duration: 0.001s;
                          block-size: auto;
                          border-block-color: rgb(19, 110, 248);
                          border-color: rgb(19, 110, 248);
                          border-inline-color: rgb(19, 110, 248);
                          caret-color: rgb(19, 110, 248);
                          color: rgb(19, 110, 248);
                          column-rule-color: rgb(19, 110, 248);
                          cursor: pointer;
                          height: auto;
                          inline-size: auto;
                          margin-block-start: 30px;
                          margin-top: 30px;
                          outline-color: rgb(19, 110, 248);
                          perspective-origin: 50% 50%;
                          pointer-events: none;
                          text-decoration: none solid rgb(19, 110, 248);
                          text-emphasis-color: rgb(19, 110, 248);
                          transform-origin: 50% 50%;
                          visibility: hidden;
                          width: auto;
                          -webkit-text-fill-color: rgb(19, 110, 248);
                          -webkit-text-stroke-color: rgb(19, 110, 248);
                        "
                      >
                        <span
                          class="title title-small2"
                          style="
                            animation-duration: 0.001s;
                            border-block-color: rgb(10, 37, 64);
                            border-color: rgb(10, 37, 64);
                            border-inline-color: rgb(10, 37, 64);
                            caret-color: rgb(10, 37, 64);
                            color: rgb(10, 37, 64);
                            column-rule-color: rgb(10, 37, 64);
                            cursor: pointer;
                            display: block;
                            font-size: 19px;
                            font-weight: 700;
                            inline-size: 100%;
                            letter-spacing: -0.5px;
                            line-height: 24.7px;
                            margin-block-end: 20px;
                            margin-bottom: 20px;
                            outline-color: rgb(10, 37, 64);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            position: relative;
                            text-decoration: none solid rgb(10, 37, 64);
                            text-emphasis-color: rgb(10, 37, 64);
                            text-rendering: geometricprecision;
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(10, 37, 64);
                            -webkit-text-stroke-color: rgb(10, 37, 64);
                          "
                          >Create and manage your accessibility projects easily!</span
                        >
                        <p class="text text-medium" style="animation-duration: 0.001s; block-size: auto; cursor: pointer; height: auto; inline-size: auto; margin-block: 0px; margin-bottom: 0px; margin-top: 0px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: auto">
                          Streamline accessibility projects with our Project Management Dashboard
                        </p>
                        <span
                          class="text-button text-button-nocolor text-button-small"
                          style="
                            align-items: center;
                            animation-duration: 0.001s;
                            border-block-color: rgb(10, 37, 64);
                            border-color: rgb(10, 37, 64);
                            border-inline-color: rgb(10, 37, 64);
                            caret-color: rgb(10, 37, 64);
                            color: rgb(10, 37, 64);
                            column-rule-color: rgb(10, 37, 64);
                            cursor: pointer;
                            display: block;
                            font-size: 14px;
                            font-weight: 600;
                            inline-size: 100%;
                            justify-content: center;
                            line-height: 14px;
                            margin-block-start: 25px;
                            margin-top: 25px;
                            outline-color: rgb(10, 37, 64);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(10, 37, 64);
                            text-emphasis-color: rgb(10, 37, 64);
                            text-transform: uppercase;
                            transform-origin: 50% 50%;
                            user-select: none;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(10, 37, 64);
                            -webkit-text-stroke-color: rgb(10, 37, 64);
                          "
                        >
                          Start a Project
                          <i
                            class="icon icon-chevron-right"
                            aria-hidden="true"
                            role="presentation"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-inline-color: rgb(10, 37, 64);
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: inline-block;
                              font-size: 14px;
                              font-weight: 600;
                              inline-size: 100%;
                              line-height: 14px;
                              margin-inline-start: 12px;
                              margin-left: 12px;
                              max-inline-size: 5px;
                              max-width: 5px;
                              min-inline-size: 5px;
                              min-width: 5px;
                              outline-color: rgb(10, 37, 64);
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-transform: uppercase;
                              transform-origin: 50% 50%;
                              user-select: none;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                            ><!--?xml version="1.0" encoding="utf-8"?--><svg
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 9.5 16"
                              style="
                                animation-duration: 0.001s;
                                block-size: auto;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                font-size: 14px;
                                font-style: italic;
                                font-weight: 600;
                                height: auto;
                                inline-size: 100%;
                                line-height: 14px;
                                max-block-size: 100%;
                                max-height: 100%;
                                outline-color: rgb(10, 37, 64);
                                overflow-clip-margin: content-box;
                                overflow: hidden;
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-transform: uppercase;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 100%;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              xml:space="preserve"
                            >
                              <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                        ></span></div
                    ></a>
                  </div>
                </div>
              </div>
            </li>
            <li
              class="menu-company menu-has-dropdown a11y-dd-container"
              data-acsb-menu="li"
              data-acsb-menu-root="true"
              data-acsb-dropdown-container="true"
              style="animation-duration: 0.001s; block-size: 65px; display: inline-block; height: 65px; inline-size: 121.961px; perspective-origin: 60.9766px 32.5px; transform-origin: 60.9805px 32.5px; width: 121.961px"
            >
              <a
                class="item"
                href="/company"
                data-acsb-clickable="true"
                data-acsb-navigable="true"
                data-acsb-now-navigable="true"
                data-custom-button-processed="true"
                data-acsb-menu="a"
                data-acsb-menu-root-link="true"
                aria-haspopup="true"
                aria-expanded="false"
                style="
                  align-items: center;
                  animation-duration: 0.001s;
                  block-size: 65px;
                  border-block-color: rgb(10, 37, 64);
                  border-color: rgb(10, 37, 64);
                  border-inline-color: rgb(10, 37, 64);
                  inset: 0px;
                  caret-color: rgb(10, 37, 64);
                  color: rgb(10, 37, 64);
                  column-rule-color: rgb(10, 37, 64);
                  cursor: pointer;
                  display: inline-flex;
                  font-size: 14px;
                  font-weight: 600;
                  height: 65px;
                  inline-size: 106.961px;
                  inset-block: 0px;
                  inset-inline: 0px;
                  justify-content: space-between;
                  line-height: 21px;
                  margin-inline-end: 15px;
                  margin-right: 15px;
                  outline-color: rgb(10, 37, 64);
                  padding-inline: 10px;
                  padding-left: 10px;
                  padding-right: 10px;
                  perspective-origin: 53.4766px 32.5px;
                  position: relative;
                  text-decoration: none solid rgb(10, 37, 64);
                  text-emphasis-color: rgb(10, 37, 64);
                  text-transform: uppercase;
                  transform-origin: 53.4805px 32.5px;
                  width: 106.961px;
                  -webkit-text-fill-color: rgb(10, 37, 64);
                  -webkit-text-stroke-color: rgb(10, 37, 64);
                "
                data-id="4"
              >
                Company
                <i
                  class="icon icon-chevron-down"
                  role="presentation"
                  style="
                    animation-duration: 0.001s;
                    block-size: 7px;
                    border-block-color: rgb(10, 37, 64);
                    border-color: rgb(10, 37, 64);
                    border-inline-color: rgb(10, 37, 64);
                    caret-color: rgb(10, 37, 64);
                    color: rgb(10, 37, 64);
                    column-rule-color: rgb(10, 37, 64);
                    cursor: pointer;
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    height: 7px;
                    inline-size: 7px;
                    line-height: 14px;
                    margin-block-start: -1px;
                    margin-inline-start: 7px;
                    margin-left: 7px;
                    margin-top: -1px;
                    min-block-size: auto;
                    min-height: auto;
                    min-inline-size: auto;
                    min-width: auto;
                    outline-color: rgb(10, 37, 64);
                    perspective-origin: 3.5px 3.5px;
                    text-decoration: none solid rgb(10, 37, 64);
                    text-emphasis-color: rgb(10, 37, 64);
                    text-transform: uppercase;
                    transform-origin: 3.5px 3.5px;
                    user-select: none;
                    width: 7px;
                    -webkit-text-fill-color: rgb(10, 37, 64);
                    -webkit-text-stroke-color: rgb(10, 37, 64);
                  "
                  ><svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    data-acsb-hidden="true"
                    style="
                      animation-duration: 0.001s;
                      block-size: 7px;
                      border-block-color: rgb(10, 37, 64);
                      border-color: rgb(10, 37, 64);
                      border-inline-color: rgb(10, 37, 64);
                      caret-color: rgb(10, 37, 64);
                      color: rgb(10, 37, 64);
                      column-rule-color: rgb(10, 37, 64);
                      cursor: pointer;
                      font-size: 14px;
                      font-style: italic;
                      font-weight: 600;
                      height: 7px;
                      inline-size: 7px;
                      line-height: 14px;
                      max-block-size: 100%;
                      max-height: 100%;
                      outline-color: rgb(10, 37, 64);
                      overflow-clip-margin: content-box;
                      overflow: hidden;
                      perspective-origin: 3.5px 3.5px;
                      text-decoration: none solid rgb(10, 37, 64);
                      text-emphasis-color: rgb(10, 37, 64);
                      text-transform: uppercase;
                      transform-origin: 3.5px 3.5px;
                      user-select: none;
                      width: 7px;
                      -webkit-text-fill-color: rgb(10, 37, 64);
                      -webkit-text-stroke-color: rgb(10, 37, 64);
                    "
                  >
                    <path d="M16 5.5l-1.5-1.5-6.5 6.5-6.5-6.5-1.5 1.5 8 8 8-8z"></path></svg></i
              ></a>
              <div
                class="dropdown acsb-hidden"
                role="region"
                aria-label="Sub menu"
                data-acsb-hidden="true"
                data-acsb-dropdown="akg6imv8cgf"
                aria-hidden="true"
                style="
                  animation-duration: 0.001s;
                  background-color: rgb(255, 255, 255);
                  border-radius: 10px;
                  border-end-end-radius: 10px;
                  border-end-start-radius: 10px;
                  border-start-end-radius: 10px;
                  border-start-start-radius: 10px;
                  box-shadow: rgba(60, 80, 170, 0.2) 0px 3px 10px 0px;
                  display: none;
                  inline-size: 800px;
                  inset-block-start: 65px;
                  inset-inline-start: 0px;
                  left: 0px;
                  opacity: 0;
                  overflow: hidden;
                  perspective-origin: 50% 50%;
                  pointer-events: none;
                  position: absolute;
                  top: 65px;
                  transform-origin: 0% 0%;
                  visibility: hidden;
                  width: 800px;
                  z-index: 999;
                "
                data-id="5"
              >
                <div
                  class="flex flex-vertical-stretch flex-nowrap"
                  data-acsb-possible-star="true"
                  style="align-items: stretch; animation-duration: 0.001s; block-size: auto; display: flex; height: auto; inline-size: 100%; justify-content: space-between; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                >
                  <div
                    class="part part-menu flex flex-nowrap flex-vertical-start"
                    data-acsb-overflower="true"
                    style="align-items: flex-start; animation-duration: 0.001s; block-size: auto; display: flex; height: auto; inline-size: 100%; justify-content: space-between; overflow: hidden; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                  >
                    <div class="part-category" style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; padding-block: 30px; padding: 30px; padding-inline: 30px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: auto">
                      <ul
                        class="flex"
                        data-acsb-menu="ul"
                        role="region"
                        aria-label="Submenu"
                        style="align-items: center; animation-duration: 0.001s; block-size: auto; display: flex; flex-wrap: wrap; height: auto; inline-size: 100%; justify-content: space-between; list-style-type: circle; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                      >
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/company"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            tabindex="-1"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            About accessiBe
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                                aria-hidden="true"
                                data-acsb-hidden="true"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/company/impact"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            tabindex="-1"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Our Impact
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                                aria-hidden="true"
                                data-acsb-hidden="true"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/company/careers"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            tabindex="-1"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Careers
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                                aria-hidden="true"
                                data-acsb-hidden="true"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/company/vision"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            tabindex="-1"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Our Vision
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                                aria-hidden="true"
                                data-acsb-hidden="true"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/company/accessculture"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            tabindex="-1"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            accessCulture
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                                aria-hidden="true"
                                data-acsb-hidden="true"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/glossary"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            tabindex="-1"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Glossary
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              data-acsb-hidden="true"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/blog"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            tabindex="-1"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Blog
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              data-acsb-hidden="true"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="part part-card"
                    data-acsb-overflower="true"
                    style="
                      animation-duration: 0.001s;
                      background-color: rgb(248, 249, 252);
                      block-size: auto;
                      border-bottom-right-radius: 10px;
                      border-end-end-radius: 10px;
                      border-start-end-radius: 10px;
                      border-top-right-radius: 10px;
                      height: auto;
                      inline-size: 380px;
                      min-inline-size: 380px;
                      min-width: 380px;
                      overflow: hidden;
                      padding-block: 30px;
                      padding: 30px;
                      padding-inline: 30px;
                      perspective-origin: 50% 50%;
                      pointer-events: none;
                      transform-origin: 50% 50%;
                      visibility: hidden;
                      width: 380px;
                    "
                  >
                    <a
                      class="card"
                      href="/unstoppables"
                      data-acsb-clickable="true"
                      data-acsb-navigable="true"
                      data-acsb-now-navigable="false"
                      data-custom-button-processed="true"
                      tabindex="-1"
                      style="animation-duration: 0.001s; block-size: 100%; cursor: pointer; height: 100%; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden"
                      ><div
                        class="image"
                        data-acsb-overflower="true"
                        style="
                          animation-duration: 0.001s;
                          block-size: 200px;
                          border-block-color: rgb(19, 110, 248);
                          border-color: rgb(19, 110, 248);
                          border-radius: 10px;
                          border-end-end-radius: 10px;
                          border-end-start-radius: 10px;
                          border-inline-color: rgb(19, 110, 248);
                          border-start-end-radius: 10px;
                          border-start-start-radius: 10px;
                          caret-color: rgb(19, 110, 248);
                          color: rgb(19, 110, 248);
                          column-rule-color: rgb(19, 110, 248);
                          cursor: pointer;
                          height: 200px;
                          inline-size: auto;
                          outline-color: rgb(19, 110, 248);
                          overflow: hidden;
                          perspective-origin: 50% 50%;
                          pointer-events: none;
                          text-decoration: none solid rgb(19, 110, 248);
                          text-emphasis-color: rgb(19, 110, 248);
                          transform-origin: 50% 50%;
                          visibility: hidden;
                          width: auto;
                          -webkit-text-fill-color: rgb(19, 110, 248);
                          -webkit-text-stroke-color: rgb(19, 110, 248);
                        "
                      >
                        <img
                          class="object-cover"
                          role="presentation"
                          alt="Meet our Unstoppable disability partner team"
                          style="
                            animation-duration: 0.001s;
                            block-size: 100%;
                            border-block-color: rgb(19, 110, 248);
                            border-color: rgb(19, 110, 248);
                            border-inline-color: rgb(19, 110, 248);
                            caret-color: rgb(19, 110, 248);
                            color: rgb(19, 110, 248);
                            column-rule-color: rgb(19, 110, 248);
                            cursor: pointer;
                            display: block;
                            height: 100%;
                            inline-size: 100%;
                            max-inline-size: none;
                            max-width: none;
                            object-fit: cover;
                            outline-color: rgb(19, 110, 248);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(19, 110, 248);
                            text-emphasis-color: rgb(19, 110, 248);
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(19, 110, 248);
                            -webkit-text-stroke-color: rgb(19, 110, 248);
                          "
                        />
                      </div>
                      <div
                        class="content"
                        style="
                          animation-duration: 0.001s;
                          block-size: auto;
                          border-block-color: rgb(19, 110, 248);
                          border-color: rgb(19, 110, 248);
                          border-inline-color: rgb(19, 110, 248);
                          caret-color: rgb(19, 110, 248);
                          color: rgb(19, 110, 248);
                          column-rule-color: rgb(19, 110, 248);
                          cursor: pointer;
                          height: auto;
                          inline-size: auto;
                          margin-block-start: 30px;
                          margin-top: 30px;
                          outline-color: rgb(19, 110, 248);
                          perspective-origin: 50% 50%;
                          pointer-events: none;
                          text-decoration: none solid rgb(19, 110, 248);
                          text-emphasis-color: rgb(19, 110, 248);
                          transform-origin: 50% 50%;
                          visibility: hidden;
                          width: auto;
                          -webkit-text-fill-color: rgb(19, 110, 248);
                          -webkit-text-stroke-color: rgb(19, 110, 248);
                        "
                      >
                        <span
                          class="title title-small2"
                          style="
                            animation-duration: 0.001s;
                            border-block-color: rgb(10, 37, 64);
                            border-color: rgb(10, 37, 64);
                            border-inline-color: rgb(10, 37, 64);
                            caret-color: rgb(10, 37, 64);
                            color: rgb(10, 37, 64);
                            column-rule-color: rgb(10, 37, 64);
                            cursor: pointer;
                            display: block;
                            font-size: 19px;
                            font-weight: 700;
                            inline-size: 100%;
                            letter-spacing: -0.5px;
                            line-height: 24.7px;
                            margin-block-end: 20px;
                            margin-bottom: 20px;
                            outline-color: rgb(10, 37, 64);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            position: relative;
                            text-decoration: none solid rgb(10, 37, 64);
                            text-emphasis-color: rgb(10, 37, 64);
                            text-rendering: geometricprecision;
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(10, 37, 64);
                            -webkit-text-stroke-color: rgb(10, 37, 64);
                          "
                          >Meet our Unstoppable disability partner team</span
                        >
                        <p class="text text-medium" style="animation-duration: 0.001s; block-size: auto; cursor: pointer; height: auto; inline-size: auto; margin-block: 0px; margin-bottom: 0px; margin-top: 0px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: auto">
                          accessiBe’s Unstoppable team raises awareness and promotes inclusion!
                        </p>
                        <span
                          class="text-button text-button-nocolor text-button-small"
                          style="
                            align-items: center;
                            animation-duration: 0.001s;
                            border-block-color: rgb(10, 37, 64);
                            border-color: rgb(10, 37, 64);
                            border-inline-color: rgb(10, 37, 64);
                            caret-color: rgb(10, 37, 64);
                            color: rgb(10, 37, 64);
                            column-rule-color: rgb(10, 37, 64);
                            cursor: pointer;
                            display: block;
                            font-size: 14px;
                            font-weight: 600;
                            inline-size: 100%;
                            justify-content: center;
                            line-height: 14px;
                            margin-block-start: 25px;
                            margin-top: 25px;
                            outline-color: rgb(10, 37, 64);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(10, 37, 64);
                            text-emphasis-color: rgb(10, 37, 64);
                            text-transform: uppercase;
                            transform-origin: 50% 50%;
                            user-select: none;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(10, 37, 64);
                            -webkit-text-stroke-color: rgb(10, 37, 64);
                          "
                        >
                          Meet the Unstoppables
                          <i
                            class="icon icon-chevron-right"
                            aria-hidden="true"
                            role="presentation"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-inline-color: rgb(10, 37, 64);
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: inline-block;
                              font-size: 14px;
                              font-weight: 600;
                              inline-size: 100%;
                              line-height: 14px;
                              margin-inline-start: 12px;
                              margin-left: 12px;
                              max-inline-size: 5px;
                              max-width: 5px;
                              min-inline-size: 5px;
                              min-width: 5px;
                              outline-color: rgb(10, 37, 64);
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-transform: uppercase;
                              transform-origin: 50% 50%;
                              user-select: none;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                            ><!--?xml version="1.0" encoding="utf-8"?--><svg
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 9.5 16"
                              style="
                                animation-duration: 0.001s;
                                block-size: auto;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                font-size: 14px;
                                font-style: italic;
                                font-weight: 600;
                                height: auto;
                                inline-size: 100%;
                                line-height: 14px;
                                max-block-size: 100%;
                                max-height: 100%;
                                outline-color: rgb(10, 37, 64);
                                overflow-clip-margin: content-box;
                                overflow: hidden;
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-transform: uppercase;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 100%;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              xml:space="preserve"
                              aria-hidden="true"
                              data-acsb-hidden="true"
                            >
                              <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                        ></span></div
                    ></a>
                  </div>
                </div>
              </div>
            </li>
            <li
              class="menu-partners menu-has-dropdown a11y-dd-container"
              data-acsb-menu="li"
              data-acsb-menu-root="true"
              data-acsb-dropdown-container="true"
              style="animation-duration: 0.001s; block-size: 65px; display: inline-block; height: 65px; inline-size: 120.391px; perspective-origin: 60.1953px 32.5px; transform-origin: 60.1953px 32.5px; width: 120.391px"
            >
              <a
                class="item"
                href="/partners"
                data-acsb-clickable="true"
                data-acsb-navigable="true"
                data-acsb-now-navigable="true"
                data-custom-button-processed="true"
                data-acsb-menu="a"
                data-acsb-menu-root-link="true"
                aria-haspopup="true"
                aria-expanded="false"
                style="
                  align-items: center;
                  animation-duration: 0.001s;
                  block-size: 65px;
                  border-block-color: rgb(10, 37, 64);
                  border-color: rgb(10, 37, 64);
                  border-inline-color: rgb(10, 37, 64);
                  inset: 0px;
                  caret-color: rgb(10, 37, 64);
                  color: rgb(10, 37, 64);
                  column-rule-color: rgb(10, 37, 64);
                  cursor: pointer;
                  display: inline-flex;
                  font-size: 14px;
                  font-weight: 600;
                  height: 65px;
                  inline-size: 105.391px;
                  inset-block: 0px;
                  inset-inline: 0px;
                  justify-content: space-between;
                  line-height: 21px;
                  margin-inline-end: 15px;
                  margin-right: 15px;
                  outline-color: rgb(10, 37, 64);
                  padding-inline: 10px;
                  padding-left: 10px;
                  padding-right: 10px;
                  perspective-origin: 52.6953px 32.5px;
                  position: relative;
                  text-decoration: none solid rgb(10, 37, 64);
                  text-emphasis-color: rgb(10, 37, 64);
                  text-transform: uppercase;
                  transform-origin: 52.6953px 32.5px;
                  width: 105.391px;
                  -webkit-text-fill-color: rgb(10, 37, 64);
                  -webkit-text-stroke-color: rgb(10, 37, 64);
                "
                data-id="6"
              >
                Partners
                <i
                  class="icon icon-chevron-down"
                  role="presentation"
                  style="
                    animation-duration: 0.001s;
                    block-size: 7px;
                    border-block-color: rgb(10, 37, 64);
                    border-color: rgb(10, 37, 64);
                    border-inline-color: rgb(10, 37, 64);
                    caret-color: rgb(10, 37, 64);
                    color: rgb(10, 37, 64);
                    column-rule-color: rgb(10, 37, 64);
                    cursor: pointer;
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    height: 7px;
                    inline-size: 7px;
                    line-height: 14px;
                    margin-block-start: -1px;
                    margin-inline-start: 7px;
                    margin-left: 7px;
                    margin-top: -1px;
                    min-block-size: auto;
                    min-height: auto;
                    min-inline-size: auto;
                    min-width: auto;
                    outline-color: rgb(10, 37, 64);
                    perspective-origin: 3.5px 3.5px;
                    text-decoration: none solid rgb(10, 37, 64);
                    text-emphasis-color: rgb(10, 37, 64);
                    text-transform: uppercase;
                    transform-origin: 3.5px 3.5px;
                    user-select: none;
                    width: 7px;
                    -webkit-text-fill-color: rgb(10, 37, 64);
                    -webkit-text-stroke-color: rgb(10, 37, 64);
                  "
                  ><svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    data-acsb-hidden="true"
                    style="
                      animation-duration: 0.001s;
                      block-size: 7px;
                      border-block-color: rgb(10, 37, 64);
                      border-color: rgb(10, 37, 64);
                      border-inline-color: rgb(10, 37, 64);
                      caret-color: rgb(10, 37, 64);
                      color: rgb(10, 37, 64);
                      column-rule-color: rgb(10, 37, 64);
                      cursor: pointer;
                      font-size: 14px;
                      font-style: italic;
                      font-weight: 600;
                      height: 7px;
                      inline-size: 7px;
                      line-height: 14px;
                      max-block-size: 100%;
                      max-height: 100%;
                      outline-color: rgb(10, 37, 64);
                      overflow-clip-margin: content-box;
                      overflow: hidden;
                      perspective-origin: 3.5px 3.5px;
                      text-decoration: none solid rgb(10, 37, 64);
                      text-emphasis-color: rgb(10, 37, 64);
                      text-transform: uppercase;
                      transform-origin: 3.5px 3.5px;
                      user-select: none;
                      width: 7px;
                      -webkit-text-fill-color: rgb(10, 37, 64);
                      -webkit-text-stroke-color: rgb(10, 37, 64);
                    "
                  >
                    <path d="M16 5.5l-1.5-1.5-6.5 6.5-6.5-6.5-1.5 1.5 8 8 8-8z"></path></svg></i
              ></a>
              <div
                class="dropdown acsb-hidden"
                role="region"
                aria-hidden="true"
                aria-label="Sub menu"
                data-acsb-hidden="true"
                data-acsb-dropdown="a6ay0dahua6j"
                style="
                  animation-duration: 0.001s;
                  background-color: rgb(255, 255, 255);
                  border-radius: 10px;
                  border-end-end-radius: 10px;
                  border-end-start-radius: 10px;
                  border-start-end-radius: 10px;
                  border-start-start-radius: 10px;
                  box-shadow: rgba(60, 80, 170, 0.2) 0px 3px 10px 0px;
                  display: none;
                  inline-size: 800px;
                  inset-block-start: 65px;
                  inset-inline-start: 0px;
                  left: 0px;
                  opacity: 0;
                  overflow: hidden;
                  perspective-origin: 50% 50%;
                  pointer-events: none;
                  position: absolute;
                  top: 65px;
                  transform-origin: 0% 0%;
                  visibility: hidden;
                  width: 800px;
                  z-index: 999;
                "
                data-id="7"
              >
                <div
                  class="flex flex-vertical-stretch flex-nowrap"
                  data-acsb-possible-star="true"
                  style="align-items: stretch; animation-duration: 0.001s; block-size: auto; display: flex; height: auto; inline-size: 100%; justify-content: space-between; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                >
                  <div
                    class="part part-menu flex flex-nowrap flex-vertical-start"
                    style="align-items: flex-start; animation-duration: 0.001s; block-size: auto; display: flex; height: auto; inline-size: 100%; justify-content: space-between; overflow: hidden; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                  >
                    <div class="part-category" style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: auto; padding-block: 30px; padding: 30px; padding-inline: 30px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: auto">
                      <ul
                        class="flex"
                        data-acsb-menu="ul"
                        role="region"
                        aria-label="Submenu"
                        style="align-items: center; animation-duration: 0.001s; block-size: auto; display: flex; flex-wrap: wrap; height: auto; inline-size: 100%; justify-content: space-between; list-style-type: circle; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%"
                      >
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/partners"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Agency Partner Program
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/partners/strategic"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Strategic Partnerships
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/partners/affiliates"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Affiliate Program
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/partners/nonprofit"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Nonprofit Partnerships
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="#popup-demo"
                            class="js-a11y-bound"
                            role="button"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Schedule Discovery Call
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; margin-block-end: 15px; margin-bottom: 15px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/support/partners"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Partner Support
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                        <li style="animation-duration: 0.001s; block-size: auto; height: auto; inline-size: 100%; list-style-type: circle; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: 100%">
                          <a
                            href="/support/partners/how-do-i-whitelabel-the-interface"
                            tabindex="-1"
                            data-acsb-clickable="true"
                            data-acsb-navigable="true"
                            data-acsb-now-navigable="false"
                            data-custom-button-processed="true"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-radius: 10px;
                              border-end-end-radius: 10px;
                              border-end-start-radius: 10px;
                              border-inline-color: rgb(10, 37, 64);
                              border-start-end-radius: 10px;
                              border-start-start-radius: 10px;
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: block;
                              font-size: 17px;
                              inline-size: 100%;
                              line-height: 25.5px;
                              list-style-type: circle;
                              margin-block: auto;
                              margin: auto;
                              margin-inline: auto;
                              outline-color: rgb(10, 37, 64);
                              padding-block: 10px;
                              padding: 10px 20px;
                              padding-inline: 20px;
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              position: relative;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                              transform-origin: 50% 50%;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                          >
                            Whitelabeled Guide
                            <i
                              class="icon icon-chevron-right"
                              aria-hidden="true"
                              role="presentation"
                              style="
                                animation-duration: 0.001s;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                display: block;
                                font-size: 17px;
                                inline-size: 7px;
                                inset-block-start: 50%;
                                inset-inline-end: 30px;
                                line-height: 17px;
                                list-style-type: circle;
                                opacity: 0;
                                outline-color: rgb(10, 37, 64);
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                position: absolute;
                                right: 30px;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                top: 50%;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 7px;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              ><!--?xml version="1.0" encoding="utf-8"?--><svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 9.5 16"
                                style="
                                  animation-duration: 0.001s;
                                  block-size: auto;
                                  border-block-color: rgb(10, 37, 64);
                                  border-color: rgb(10, 37, 64);
                                  border-inline-color: rgb(10, 37, 64);
                                  caret-color: rgb(10, 37, 64);
                                  color: rgb(10, 37, 64);
                                  column-rule-color: rgb(10, 37, 64);
                                  cursor: pointer;
                                  font-size: 17px;
                                  font-style: italic;
                                  height: auto;
                                  inline-size: 100%;
                                  line-height: 17px;
                                  list-style-type: circle;
                                  max-block-size: 100%;
                                  max-height: 100%;
                                  outline-color: rgb(10, 37, 64);
                                  overflow-clip-margin: content-box;
                                  overflow: hidden;
                                  perspective-origin: 50% 50%;
                                  pointer-events: none;
                                  text-decoration: none solid rgb(10, 37, 64);
                                  text-emphasis-color: rgb(10, 37, 64);
                                  text-shadow: rgba(10, 37, 64, 0.7) 0px 0px 0px;
                                  transform-origin: 50% 50%;
                                  user-select: none;
                                  visibility: hidden;
                                  width: 100%;
                                  -webkit-text-fill-color: rgb(10, 37, 64);
                                  -webkit-text-stroke-color: rgb(10, 37, 64);
                                "
                                xml:space="preserve"
                              >
                                <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                          ></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    class="part part-card"
                    style="
                      animation-duration: 0.001s;
                      background-color: rgb(248, 249, 252);
                      block-size: auto;
                      border-bottom-right-radius: 10px;
                      border-end-end-radius: 10px;
                      border-start-end-radius: 10px;
                      border-top-right-radius: 10px;
                      height: auto;
                      inline-size: 380px;
                      min-inline-size: 380px;
                      min-width: 380px;
                      overflow: hidden;
                      padding-block: 30px;
                      padding: 30px;
                      padding-inline: 30px;
                      perspective-origin: 50% 50%;
                      pointer-events: none;
                      transform-origin: 50% 50%;
                      visibility: hidden;
                      width: 380px;
                    "
                  >
                    <a
                      class="card"
                      href="/partners"
                      tabindex="-1"
                      data-acsb-clickable="true"
                      data-acsb-navigable="true"
                      data-acsb-now-navigable="false"
                      data-custom-button-processed="true"
                      style="animation-duration: 0.001s; block-size: 100%; cursor: pointer; height: 100%; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden"
                      ><div
                        class="image"
                        style="
                          animation-duration: 0.001s;
                          block-size: 200px;
                          border-block-color: rgb(19, 110, 248);
                          border-color: rgb(19, 110, 248);
                          border-radius: 10px;
                          border-end-end-radius: 10px;
                          border-end-start-radius: 10px;
                          border-inline-color: rgb(19, 110, 248);
                          border-start-end-radius: 10px;
                          border-start-start-radius: 10px;
                          caret-color: rgb(19, 110, 248);
                          color: rgb(19, 110, 248);
                          column-rule-color: rgb(19, 110, 248);
                          cursor: pointer;
                          height: 200px;
                          inline-size: auto;
                          outline-color: rgb(19, 110, 248);
                          overflow: hidden;
                          perspective-origin: 50% 50%;
                          pointer-events: none;
                          text-decoration: none solid rgb(19, 110, 248);
                          text-emphasis-color: rgb(19, 110, 248);
                          transform-origin: 50% 50%;
                          visibility: hidden;
                          width: auto;
                          -webkit-text-fill-color: rgb(19, 110, 248);
                          -webkit-text-stroke-color: rgb(19, 110, 248);
                        "
                      >
                        <img
                          class="object-cover"
                          role="presentation"
                          alt="Agency? Freelancer? Learn about our Partner Program"
                          style="
                            animation-duration: 0.001s;
                            block-size: 100%;
                            border-block-color: rgb(19, 110, 248);
                            border-color: rgb(19, 110, 248);
                            border-inline-color: rgb(19, 110, 248);
                            caret-color: rgb(19, 110, 248);
                            color: rgb(19, 110, 248);
                            column-rule-color: rgb(19, 110, 248);
                            cursor: pointer;
                            display: block;
                            height: 100%;
                            inline-size: 100%;
                            max-inline-size: none;
                            max-width: none;
                            object-fit: cover;
                            outline-color: rgb(19, 110, 248);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(19, 110, 248);
                            text-emphasis-color: rgb(19, 110, 248);
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(19, 110, 248);
                            -webkit-text-stroke-color: rgb(19, 110, 248);
                          "
                        />
                      </div>
                      <div
                        class="content"
                        style="
                          animation-duration: 0.001s;
                          block-size: auto;
                          border-block-color: rgb(19, 110, 248);
                          border-color: rgb(19, 110, 248);
                          border-inline-color: rgb(19, 110, 248);
                          caret-color: rgb(19, 110, 248);
                          color: rgb(19, 110, 248);
                          column-rule-color: rgb(19, 110, 248);
                          cursor: pointer;
                          height: auto;
                          inline-size: auto;
                          margin-block-start: 30px;
                          margin-top: 30px;
                          outline-color: rgb(19, 110, 248);
                          perspective-origin: 50% 50%;
                          pointer-events: none;
                          text-decoration: none solid rgb(19, 110, 248);
                          text-emphasis-color: rgb(19, 110, 248);
                          transform-origin: 50% 50%;
                          visibility: hidden;
                          width: auto;
                          -webkit-text-fill-color: rgb(19, 110, 248);
                          -webkit-text-stroke-color: rgb(19, 110, 248);
                        "
                      >
                        <span
                          class="title title-small2"
                          style="
                            animation-duration: 0.001s;
                            border-block-color: rgb(10, 37, 64);
                            border-color: rgb(10, 37, 64);
                            border-inline-color: rgb(10, 37, 64);
                            caret-color: rgb(10, 37, 64);
                            color: rgb(10, 37, 64);
                            column-rule-color: rgb(10, 37, 64);
                            cursor: pointer;
                            display: block;
                            font-size: 19px;
                            font-weight: 700;
                            inline-size: 100%;
                            letter-spacing: -0.5px;
                            line-height: 24.7px;
                            margin-block-end: 20px;
                            margin-bottom: 20px;
                            outline-color: rgb(10, 37, 64);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            position: relative;
                            text-decoration: none solid rgb(10, 37, 64);
                            text-emphasis-color: rgb(10, 37, 64);
                            text-rendering: geometricprecision;
                            transform-origin: 50% 50%;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(10, 37, 64);
                            -webkit-text-stroke-color: rgb(10, 37, 64);
                          "
                          >Agency? Freelancer? Learn about our Partner Program</span
                        >
                        <p class="text text-medium" style="animation-duration: 0.001s; block-size: auto; cursor: pointer; height: auto; inline-size: auto; margin-block: 0px; margin-bottom: 0px; margin-top: 0px; perspective-origin: 50% 50%; pointer-events: none; transform-origin: 50% 50%; visibility: hidden; width: auto">
                          Let’s get your clients’ websites accessible, inclusive, and compliant!
                        </p>
                        <span
                          class="text-button text-button-nocolor text-button-small"
                          style="
                            align-items: center;
                            animation-duration: 0.001s;
                            border-block-color: rgb(10, 37, 64);
                            border-color: rgb(10, 37, 64);
                            border-inline-color: rgb(10, 37, 64);
                            caret-color: rgb(10, 37, 64);
                            color: rgb(10, 37, 64);
                            column-rule-color: rgb(10, 37, 64);
                            cursor: pointer;
                            display: block;
                            font-size: 14px;
                            font-weight: 600;
                            inline-size: 100%;
                            justify-content: center;
                            line-height: 14px;
                            margin-block-start: 25px;
                            margin-top: 25px;
                            outline-color: rgb(10, 37, 64);
                            perspective-origin: 50% 50%;
                            pointer-events: none;
                            text-decoration: none solid rgb(10, 37, 64);
                            text-emphasis-color: rgb(10, 37, 64);
                            text-transform: uppercase;
                            transform-origin: 50% 50%;
                            user-select: none;
                            visibility: hidden;
                            width: 100%;
                            -webkit-text-fill-color: rgb(10, 37, 64);
                            -webkit-text-stroke-color: rgb(10, 37, 64);
                          "
                        >
                          Partner Program
                          <i
                            class="icon icon-chevron-right"
                            aria-hidden="true"
                            role="presentation"
                            style="
                              animation-duration: 0.001s;
                              border-block-color: rgb(10, 37, 64);
                              border-color: rgb(10, 37, 64);
                              border-inline-color: rgb(10, 37, 64);
                              caret-color: rgb(10, 37, 64);
                              color: rgb(10, 37, 64);
                              column-rule-color: rgb(10, 37, 64);
                              cursor: pointer;
                              display: inline-block;
                              font-size: 14px;
                              font-weight: 600;
                              inline-size: 100%;
                              line-height: 14px;
                              margin-inline-start: 12px;
                              margin-left: 12px;
                              max-inline-size: 5px;
                              max-width: 5px;
                              min-inline-size: 5px;
                              min-width: 5px;
                              outline-color: rgb(10, 37, 64);
                              perspective-origin: 50% 50%;
                              pointer-events: none;
                              text-decoration: none solid rgb(10, 37, 64);
                              text-emphasis-color: rgb(10, 37, 64);
                              text-transform: uppercase;
                              transform-origin: 50% 50%;
                              user-select: none;
                              visibility: hidden;
                              width: 100%;
                              -webkit-text-fill-color: rgb(10, 37, 64);
                              -webkit-text-stroke-color: rgb(10, 37, 64);
                            "
                            ><!--?xml version="1.0" encoding="utf-8"?--><svg
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 9.5 16"
                              style="
                                animation-duration: 0.001s;
                                block-size: auto;
                                border-block-color: rgb(10, 37, 64);
                                border-color: rgb(10, 37, 64);
                                border-inline-color: rgb(10, 37, 64);
                                caret-color: rgb(10, 37, 64);
                                color: rgb(10, 37, 64);
                                column-rule-color: rgb(10, 37, 64);
                                cursor: pointer;
                                font-size: 14px;
                                font-style: italic;
                                font-weight: 600;
                                height: auto;
                                inline-size: 100%;
                                line-height: 14px;
                                max-block-size: 100%;
                                max-height: 100%;
                                outline-color: rgb(10, 37, 64);
                                overflow-clip-margin: content-box;
                                overflow: hidden;
                                perspective-origin: 50% 50%;
                                pointer-events: none;
                                text-decoration: none solid rgb(10, 37, 64);
                                text-emphasis-color: rgb(10, 37, 64);
                                text-transform: uppercase;
                                transform-origin: 50% 50%;
                                user-select: none;
                                visibility: hidden;
                                width: 100%;
                                -webkit-text-fill-color: rgb(10, 37, 64);
                                -webkit-text-stroke-color: rgb(10, 37, 64);
                              "
                              xml:space="preserve"
                            >
                              <path d="M1.5,0L0,1.5L6.5,8L0,14.5L1.5,16l8-8L1.5,0z"></path></svg></i
                        ></span></div
                    ></a>
                  </div>
                </div>
              </div>
            </li>
            <li class="menu-reviews" data-acsb-menu="li" data-acsb-menu-root="true" style="animation-duration: 0.001s; block-size: 65px; display: inline-block; height: 65px; inline-size: 96.5625px; perspective-origin: 48.2812px 32.5px; transform-origin: 48.2812px 32.5px; width: 96.5625px">
              <a
                class="item"
                href="/reviews"
                data-acsb-clickable="true"
                data-acsb-navigable="true"
                data-acsb-now-navigable="true"
                data-custom-button-processed="true"
                data-acsb-menu="a"
                data-acsb-menu-root-link="true"
                style="
                  align-items: center;
                  animation-duration: 0.001s;
                  block-size: 65px;
                  border-block-color: rgb(10, 37, 64);
                  border-color: rgb(10, 37, 64);
                  border-inline-color: rgb(10, 37, 64);
                  inset: 0px;
                  caret-color: rgb(10, 37, 64);
                  color: rgb(10, 37, 64);
                  column-rule-color: rgb(10, 37, 64);
                  cursor: pointer;
                  display: inline-flex;
                  font-size: 14px;
                  font-weight: 600;
                  height: 65px;
                  inline-size: 81.5625px;
                  inset-block: 0px;
                  inset-inline: 0px;
                  justify-content: space-between;
                  line-height: 21px;
                  margin-inline-end: 15px;
                  margin-right: 15px;
                  outline-color: rgb(10, 37, 64);
                  padding-inline: 10px;
                  padding-left: 10px;
                  padding-right: 10px;
                  perspective-origin: 40.7812px 32.5px;
                  position: relative;
                  text-decoration: none solid rgb(10, 37, 64);
                  text-emphasis-color: rgb(10, 37, 64);
                  text-transform: uppercase;
                  transform-origin: 40.7812px 32.5px;
                  width: 81.5625px;
                  -webkit-text-fill-color: rgb(10, 37, 64);
                  -webkit-text-stroke-color: rgb(10, 37, 64);
                "
                data-id="8"
              >
                Reviews
              </a>
            </li>
            <li class="menu-pricing" data-acsb-menu="li" data-acsb-menu-root="true" style="animation-duration: 0.001s; block-size: 65px; display: inline-block; height: 65px; inline-size: 92.8984px; perspective-origin: 46.4453px 32.5px; transform-origin: 46.4492px 32.5px; width: 92.8984px">
              <a
                class="item"
                href="/pricing"
                data-acsb-clickable="true"
                data-acsb-navigable="true"
                data-acsb-now-navigable="true"
                data-custom-button-processed="true"
                data-acsb-menu="a"
                data-acsb-menu-root-link="true"
                style="
                  align-items: center;
                  animation-duration: 0.001s;
                  block-size: 65px;
                  border-block-color: rgb(10, 37, 64);
                  border-color: rgb(10, 37, 64);
                  border-inline-color: rgb(10, 37, 64);
                  inset: 0px;
                  caret-color: rgb(10, 37, 64);
                  color: rgb(10, 37, 64);
                  column-rule-color: rgb(10, 37, 64);
                  cursor: pointer;
                  display: inline-flex;
                  font-size: 14px;
                  font-weight: 600;
                  height: 65px;
                  inline-size: 77.9062px;
                  inset-block: 0px;
                  inset-inline: 0px;
                  justify-content: space-between;
                  line-height: 21px;
                  margin-inline-end: 15px;
                  margin-right: 15px;
                  outline-color: rgb(10, 37, 64);
                  padding-inline: 10px;
                  padding-left: 10px;
                  padding-right: 10px;
                  perspective-origin: 38.9531px 32.5px;
                  position: relative;
                  text-decoration: none solid rgb(10, 37, 64);
                  text-emphasis-color: rgb(10, 37, 64);
                  text-transform: uppercase;
                  transform-origin: 38.9531px 32.5px;
                  width: 77.9062px;
                  -webkit-text-fill-color: rgb(10, 37, 64);
                  -webkit-text-stroke-color: rgb(10, 37, 64);
                "
                data-id="9"
              >
                Pricing
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div
        class="end flex flex-inline flex-horizontal-end flex-nowrap"
        style="align-items: center; animation-duration: 0.001s; block-size: 40px; display: flex; height: 40px; inline-size: 328.539px; justify-content: flex-end; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 164.266px 20px; transform-origin: 164.27px 20px; width: 328.539px"
      >
        <button
          class="cta-b js-a11y-bound"
          data-clicker-trigger="popup-demo"
          data-demo-cta="Site header"
          data-acsb-clickable="true"
          data-acsb-navigable="true"
          data-acsb-now-navigable="true"
          data-custom-button-processed="true"
          style="
            align-items: center;
            animation-duration: 0.001s;
            block-size: 17px;
            display: flex;
            font-size: 15px;
            font-weight: 600;
            height: 17px;
            inline-size: 133.812px;
            justify-content: center;
            line-height: 15px;
            margin-inline-end: 30px;
            margin-right: 30px;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            perspective-origin: 66.9062px 8.5px;
            text-transform: uppercase;
            transform-origin: 66.9062px 8.5px;
            user-select: none;
            width: 133.812px;
          "
        >
          <i
            class="icon icon-play"
            role="presentation"
            style="
              align-items: center;
              animation-duration: 0.001s;
              background-color: rgb(10, 37, 64);
              block-size: 20px;
              border-block-color: rgb(0, 0, 0);
              border-color: rgb(0, 0, 0);
              border-radius: 50%;
              border-end-end-radius: 50%;
              border-end-start-radius: 50%;
              border-inline-color: rgb(0, 0, 0);
              border-start-end-radius: 50%;
              border-start-start-radius: 50%;
              caret-color: rgb(0, 0, 0);
              color: rgb(0, 0, 0);
              column-rule-color: rgb(0, 0, 0);
              cursor: pointer;
              display: flex;
              font-size: 15px;
              font-weight: 600;
              height: 20px;
              inline-size: 20px;
              justify-content: center;
              line-height: 15px;
              margin-block-start: -3px;
              margin-inline-end: 7px;
              margin-right: 7px;
              margin-top: -3px;
              min-block-size: auto;
              min-height: auto;
              min-inline-size: auto;
              min-width: auto;
              outline-color: rgb(0, 0, 0);
              perspective-origin: 10px 10px;
              text-align: center;
              text-decoration: none solid rgb(0, 0, 0);
              text-emphasis-color: rgb(0, 0, 0);
              text-transform: uppercase;
              transform-origin: 10px 10px;
              user-select: none;
              width: 20px;
              -webkit-text-fill-color: rgb(0, 0, 0);
              -webkit-text-stroke-color: rgb(0, 0, 0);
            "
            ><svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 27 30.9"
              style="
                animation-duration: 0.001s;
                block-size: 8.00781px;
                border-block-color: rgb(0, 0, 0);
                border-color: rgb(0, 0, 0);
                border-inline-color: rgb(0, 0, 0);
                caret-color: rgb(0, 0, 0);
                color: rgb(0, 0, 0);
                column-rule-color: rgb(0, 0, 0);
                cursor: pointer;
                font-size: 15px;
                font-style: italic;
                font-weight: 600;
                height: 8.00781px;
                inline-size: 7px;
                line-height: 15px;
                max-block-size: 100%;
                max-height: 100%;
                min-block-size: auto;
                min-height: auto;
                min-inline-size: auto;
                min-width: auto;
                outline-color: rgb(0, 0, 0);
                overflow-clip-margin: content-box;
                overflow: hidden;
                perspective-origin: 3.5px 4px;
                text-align: center;
                text-decoration: none solid rgb(0, 0, 0);
                text-emphasis-color: rgb(0, 0, 0);
                text-transform: uppercase;
                transform-origin: 3.5px 4.00391px;
                user-select: none;
                width: 7px;
                -webkit-text-fill-color: rgb(0, 0, 0);
                -webkit-text-stroke-color: rgb(0, 0, 0);
              "
              xml:space="preserve"
              aria-hidden="true"
              data-acsb-hidden="true"
            >
              <path d="M0,2c0-1.6,1.7-2.6,3.1-1.8l23,13.4c1.3,0.8,1.3,2.7,0,3.5l-23,13.4C1.7,31.4,0,30.5,0,28.9V2z"></path></svg></i
          ><span
            style="
              animation-duration: 0.001s;
              block-size: 15px;
              border-block-color: rgb(0, 0, 0);
              border-color: rgb(0, 0, 0);
              border-inline-color: rgb(0, 0, 0);
              caret-color: rgb(0, 0, 0);
              color: rgb(0, 0, 0);
              column-rule-color: rgb(0, 0, 0);
              cursor: pointer;
              display: block;
              font-size: 15px;
              font-weight: 600;
              height: 15px;
              inline-size: 106.82px;
              line-height: 15px;
              min-block-size: auto;
              min-height: auto;
              min-inline-size: auto;
              min-width: auto;
              outline-color: rgb(0, 0, 0);
              perspective-origin: 53.4062px 7.5px;
              text-align: center;
              text-decoration: none solid rgb(0, 0, 0);
              text-emphasis-color: rgb(0, 0, 0);
              text-transform: uppercase;
              transform-origin: 53.4102px 7.5px;
              user-select: none;
              width: 106.82px;
              -webkit-text-fill-color: rgb(0, 0, 0);
              -webkit-text-stroke-color: rgb(0, 0, 0);
            "
            >Book a Demo</span
          ></button
        ><a
          class="button cta-a"
          href="https://dashboard.accessibe.com/app/signup"
          target="_blank"
          data-acsb-tooltip="New Window"
          data-acsb-clickable="true"
          data-acsb-navigable="true"
          data-acsb-now-navigable="true"
          data-custom-button-processed="true"
          style="
            align-items: center;
            animation-duration: 0.001s;
            background-color: rgb(19, 110, 248);
            block-size: 40px;
            border-block-style: solid;
            border-block-width: 2px;
            border-radius: 50px;
            border-style: solid;
            border-width: 2px;
            border-end-end-radius: 50px;
            border-end-start-radius: 50px;
            border-inline-style: solid;
            border-inline-width: 2px;
            border-start-end-radius: 50px;
            border-start-start-radius: 50px;
            inset: 0px;
            box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px;
            caret-color: rgb(255, 255, 255);
            color: rgb(255, 255, 255);
            column-rule-color: rgb(255, 255, 255);
            cursor: pointer;
            display: flex;
            font-size: 14px;
            font-weight: 600;
            height: 40px;
            inline-size: 164.742px;
            inset-block: 0px;
            inset-inline: 0px;
            justify-content: center;
            letter-spacing: 0.3px;
            line-height: 14px;
            min-block-size: auto;
            min-height: auto;
            min-inline-size: auto;
            min-width: auto;
            outline-color: rgb(255, 255, 255);
            padding-block: 11px;
            padding: 11px 17px;
            padding-inline: 17px;
            perspective-origin: 82.3672px 20px;
            position: relative;
            text-decoration: none solid rgb(255, 255, 255);
            text-emphasis-color: rgb(255, 255, 255);
            text-transform: uppercase;
            text-wrap-mode: nowrap;
            transform-origin: 82.3711px 20px;
            user-select: none;
            width: 164.742px;
            -webkit-text-fill-color: rgb(255, 255, 255);
            -webkit-text-stroke-color: rgb(255, 255, 255);
          "
          ><span
            class="acsb-sr-only"
            data-acsb-sr-only="true"
            data-acsb-force-visible="true"
            data-acsb-sr-only-position="before"
            data-acsb-hidden="false"
            style="
              animation-duration: 0.001s;
              background-color: rgb(255, 255, 255);
              block-size: 1px;
              border-block-color: rgb(0, 0, 0);
              border-color: rgb(0, 0, 0);
              border-inline-color: rgb(0, 0, 0);
              inset: 0px 160.742px 36px 0px;
              caret-color: rgb(0, 0, 0);
              clip: rect(0px, 0px, 0px, 0px);
              color: rgb(0, 0, 0);
              column-rule-color: rgb(0, 0, 0);
              cursor: text;
              display: block;
              font-size: 15px;
              height: 1px;
              inline-size: 1px;
              inset-block: 0px 36px;
              inset-inline: 0px 160.742px;
              letter-spacing: 0.3px;
              line-height: 1px;
              margin-block-start: -1px;
              margin-inline-start: -1px;
              margin-left: -1px;
              margin-top: -1px;
              outline-color: rgb(0, 0, 0);
              overflow: hidden;
              perspective-origin: 0.5px 0.5px;
              position: absolute;
              text-decoration: none solid rgb(0, 0, 0);
              text-emphasis-color: rgb(0, 0, 0);
              text-transform: capitalize;
              text-wrap-mode: nowrap;
              transform-origin: 0.5px 0.5px;
              user-select: none;
              width: 1px;
              -webkit-text-fill-color: rgb(0, 0, 0);
              -webkit-text-stroke-color: rgb(0, 0, 0);
            "
            >account -
          </span>
          Start Free Trial
          <span
            class="acsb-sr-only"
            data-acsb-sr-only="true"
            data-acsb-force-visible="true"
            data-acsb-sr-only-position="after"
            data-acsb-hidden="false"
            style="
              animation-duration: 0.001s;
              background-color: rgb(255, 255, 255);
              block-size: 1px;
              border-block-color: rgb(0, 0, 0);
              border-color: rgb(0, 0, 0);
              border-inline-color: rgb(0, 0, 0);
              inset: 0px 160.742px 36px 0px;
              caret-color: rgb(0, 0, 0);
              clip: rect(0px, 0px, 0px, 0px);
              color: rgb(0, 0, 0);
              column-rule-color: rgb(0, 0, 0);
              cursor: text;
              display: block;
              font-size: 15px;
              height: 1px;
              inline-size: 1px;
              inset-block: 0px 36px;
              inset-inline: 0px 160.742px;
              letter-spacing: 0.3px;
              line-height: 1px;
              margin-block-start: -1px;
              margin-inline-start: -1px;
              margin-left: -1px;
              margin-top: -1px;
              outline-color: rgb(0, 0, 0);
              overflow: hidden;
              perspective-origin: 0.5px 0.5px;
              position: absolute;
              text-decoration: none solid rgb(0, 0, 0);
              text-emphasis-color: rgb(0, 0, 0);
              text-transform: capitalize;
              text-wrap-mode: nowrap;
              transform-origin: 0.5px 0.5px;
              user-select: none;
              width: 1px;
              -webkit-text-fill-color: rgb(0, 0, 0);
              -webkit-text-stroke-color: rgb(0, 0, 0);
            "
          >
            - New Window</span
          ></a
        >
      </div>
    </div>
  </div>
</header>
<style>
  [data-id="0"]::after {
    block-size: 0px;
    border-block-end-color: rgb(255, 255, 255);
    border-block-end-style: solid;
    border-block-end-width: 10px;
    border-block-start-color: rgba(0, 0, 0, 0);
    border-block-start-style: solid;
    border-bottom-color: rgb(255, 255, 255);
    border-bottom-style: solid;
    border-bottom-width: 10px;
    border-inline-end-color: rgba(0, 0, 0, 0);
    border-inline-end-style: solid;
    border-inline-end-width: 10px;
    border-inline-start-color: rgba(0, 0, 0, 0);
    border-inline-start-style: solid;
    border-inline-start-width: 10px;
    border-left-color: rgba(0, 0, 0, 0);
    border-left-style: solid;
    border-left-width: 10px;
    border-right-color: rgba(0, 0, 0, 0);
    border-right-style: solid;
    border-right-width: 10px;
    border-top-color: rgba(0, 0, 0, 0);
    border-top-style: solid;
    bottom: 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 0px;
    inline-size: 0px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 45.0547px;
    margin-inline-start: 45.0469px;
    margin-left: 45.0469px;
    margin-right: 45.0547px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 10px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 10px 5px;
    visibility: hidden;
    width: 0px;
    z-index: 999999;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
  [data-id="0"]::before {
    block-size: 10px;
    border-block-end-color: rgb(10, 37, 64);
    border-block-start-color: rgb(10, 37, 64);
    border-bottom-color: rgb(10, 37, 64);
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-end-end-radius: 50%;
    border-end-start-radius: 50%;
    border-inline-end-color: rgb(10, 37, 64);
    border-inline-start-color: rgb(10, 37, 64);
    border-left-color: rgb(10, 37, 64);
    border-right-color: rgb(10, 37, 64);
    border-start-end-radius: 50%;
    border-start-start-radius: 50%;
    border-top-color: rgb(10, 37, 64);
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 10px;
    inline-size: 10px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 50.0547px;
    margin-inline-start: 50.0469px;
    margin-left: 50.0469px;
    margin-right: 50.0547px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 5px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 5px 5px;
    visibility: hidden;
    width: 10px;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
  [data-id="1"]::before {
    block-size: 20px;
    content: "";
    display: block;
    height: 20px;
    inline-size: 100%;
    inset-block-start: -15px;
    inset-inline-start: 0px;
    left: 0px;
    pointer-events: none;
    position: absolute;
    top: -15px;
    visibility: hidden;
    width: 100%;
  }
  [data-id="2"]::after {
    block-size: 0px;
    border-block-end-color: rgb(255, 255, 255);
    border-block-end-style: solid;
    border-block-end-width: 10px;
    border-block-start-color: rgba(0, 0, 0, 0);
    border-block-start-style: solid;
    border-bottom-color: rgb(255, 255, 255);
    border-bottom-style: solid;
    border-bottom-width: 10px;
    border-inline-end-color: rgba(0, 0, 0, 0);
    border-inline-end-style: solid;
    border-inline-end-width: 10px;
    border-inline-start-color: rgba(0, 0, 0, 0);
    border-inline-start-style: solid;
    border-inline-start-width: 10px;
    border-left-color: rgba(0, 0, 0, 0);
    border-left-style: solid;
    border-left-width: 10px;
    border-right-color: rgba(0, 0, 0, 0);
    border-right-style: solid;
    border-right-width: 10px;
    border-top-color: rgba(0, 0, 0, 0);
    border-top-style: solid;
    bottom: 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 0px;
    inline-size: 0px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 39.9609px;
    margin-inline-start: 39.9531px;
    margin-left: 39.9531px;
    margin-right: 39.9609px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 10px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 10px 5px;
    visibility: hidden;
    width: 0px;
    z-index: 999999;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
  [data-id="2"]::before {
    block-size: 10px;
    border-block-end-color: rgb(10, 37, 64);
    border-block-start-color: rgb(10, 37, 64);
    border-bottom-color: rgb(10, 37, 64);
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-end-end-radius: 50%;
    border-end-start-radius: 50%;
    border-inline-end-color: rgb(10, 37, 64);
    border-inline-start-color: rgb(10, 37, 64);
    border-left-color: rgb(10, 37, 64);
    border-right-color: rgb(10, 37, 64);
    border-start-end-radius: 50%;
    border-start-start-radius: 50%;
    border-top-color: rgb(10, 37, 64);
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 10px;
    inline-size: 10px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 44.9609px;
    margin-inline-start: 44.9531px;
    margin-left: 44.9531px;
    margin-right: 44.9609px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 5px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 5px 5px;
    visibility: hidden;
    width: 10px;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
  [data-id="3"]::before {
    block-size: 20px;
    content: "";
    display: block;
    height: 20px;
    inline-size: 100%;
    inset-block-start: -15px;
    inset-inline-start: 0px;
    left: 0px;
    pointer-events: none;
    position: absolute;
    top: -15px;
    visibility: hidden;
    width: 100%;
  }
  [data-id="4"]::after {
    block-size: 0px;
    border-block-end-color: rgb(255, 255, 255);
    border-block-end-style: solid;
    border-block-end-width: 10px;
    border-block-start-color: rgba(0, 0, 0, 0);
    border-block-start-style: solid;
    border-bottom-color: rgb(255, 255, 255);
    border-bottom-style: solid;
    border-bottom-width: 10px;
    border-inline-end-color: rgba(0, 0, 0, 0);
    border-inline-end-style: solid;
    border-inline-end-width: 10px;
    border-inline-start-color: rgba(0, 0, 0, 0);
    border-inline-start-style: solid;
    border-inline-start-width: 10px;
    border-left-color: rgba(0, 0, 0, 0);
    border-left-style: solid;
    border-left-width: 10px;
    border-right-color: rgba(0, 0, 0, 0);
    border-right-style: solid;
    border-right-width: 10px;
    border-top-color: rgba(0, 0, 0, 0);
    border-top-style: solid;
    bottom: 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 0px;
    inline-size: 0px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 43.4844px;
    margin-inline-start: 43.4766px;
    margin-left: 43.4766px;
    margin-right: 43.4844px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 10px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 10px 5px;
    visibility: hidden;
    width: 0px;
    z-index: 999999;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
  [data-id="4"]::before {
    block-size: 10px;
    border-block-end-color: rgb(10, 37, 64);
    border-block-start-color: rgb(10, 37, 64);
    border-bottom-color: rgb(10, 37, 64);
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-end-end-radius: 50%;
    border-end-start-radius: 50%;
    border-inline-end-color: rgb(10, 37, 64);
    border-inline-start-color: rgb(10, 37, 64);
    border-left-color: rgb(10, 37, 64);
    border-right-color: rgb(10, 37, 64);
    border-start-end-radius: 50%;
    border-start-start-radius: 50%;
    border-top-color: rgb(10, 37, 64);
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 10px;
    inline-size: 10px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 48.4844px;
    margin-inline-start: 48.4766px;
    margin-left: 48.4766px;
    margin-right: 48.4844px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 5px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 5px 5px;
    visibility: hidden;
    width: 10px;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
  [data-id="5"]::before {
    block-size: 20px;
    content: "";
    display: block;
    height: 20px;
    inline-size: 100%;
    inset-block-start: -15px;
    inset-inline-start: 0px;
    left: 0px;
    pointer-events: none;
    position: absolute;
    top: -15px;
    visibility: hidden;
    width: 100%;
  }
  [data-id="6"]::after {
    block-size: 0px;
    border-block-end-color: rgb(255, 255, 255);
    border-block-end-style: solid;
    border-block-end-width: 10px;
    border-block-start-color: rgba(0, 0, 0, 0);
    border-block-start-style: solid;
    border-bottom-color: rgb(255, 255, 255);
    border-bottom-style: solid;
    border-bottom-width: 10px;
    border-inline-end-color: rgba(0, 0, 0, 0);
    border-inline-end-style: solid;
    border-inline-end-width: 10px;
    border-inline-start-color: rgba(0, 0, 0, 0);
    border-inline-start-style: solid;
    border-inline-start-width: 10px;
    border-left-color: rgba(0, 0, 0, 0);
    border-left-style: solid;
    border-left-width: 10px;
    border-right-color: rgba(0, 0, 0, 0);
    border-right-style: solid;
    border-right-width: 10px;
    border-top-color: rgba(0, 0, 0, 0);
    border-top-style: solid;
    bottom: 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 0px;
    inline-size: 0px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 42.6953px;
    margin-inline-start: 42.6953px;
    margin-left: 42.6953px;
    margin-right: 42.6953px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 10px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 10px 5px;
    visibility: hidden;
    width: 0px;
    z-index: 999999;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
  [data-id="6"]::before {
    block-size: 10px;
    border-block-end-color: rgb(10, 37, 64);
    border-block-start-color: rgb(10, 37, 64);
    border-bottom-color: rgb(10, 37, 64);
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-end-end-radius: 50%;
    border-end-start-radius: 50%;
    border-inline-end-color: rgb(10, 37, 64);
    border-inline-start-color: rgb(10, 37, 64);
    border-left-color: rgb(10, 37, 64);
    border-right-color: rgb(10, 37, 64);
    border-start-end-radius: 50%;
    border-start-start-radius: 50%;
    border-top-color: rgb(10, 37, 64);
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 10px;
    inline-size: 10px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 47.6953px;
    margin-inline-start: 47.6953px;
    margin-left: 47.6953px;
    margin-right: 47.6953px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 5px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 5px 5px;
    visibility: hidden;
    width: 10px;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
  [data-id="7"]::before {
    block-size: 20px;
    content: "";
    display: block;
    height: 20px;
    inline-size: 100%;
    inset-block-start: -15px;
    inset-inline-start: 0px;
    left: 0px;
    pointer-events: none;
    position: absolute;
    top: -15px;
    visibility: hidden;
    width: 100%;
  }
  [data-id="8"]::after {
    block-size: 0px;
    border-block-end-color: rgb(255, 255, 255);
    border-block-end-style: solid;
    border-block-end-width: 10px;
    border-block-start-color: rgba(0, 0, 0, 0);
    border-block-start-style: solid;
    border-bottom-color: rgb(255, 255, 255);
    border-bottom-style: solid;
    border-bottom-width: 10px;
    border-inline-end-color: rgba(0, 0, 0, 0);
    border-inline-end-style: solid;
    border-inline-end-width: 10px;
    border-inline-start-color: rgba(0, 0, 0, 0);
    border-inline-start-style: solid;
    border-inline-start-width: 10px;
    border-left-color: rgba(0, 0, 0, 0);
    border-left-style: solid;
    border-left-width: 10px;
    border-right-color: rgba(0, 0, 0, 0);
    border-right-style: solid;
    border-right-width: 10px;
    border-top-color: rgba(0, 0, 0, 0);
    border-top-style: solid;
    bottom: 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 0px;
    inline-size: 0px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 30.7812px;
    margin-inline-start: 30.7812px;
    margin-left: 30.7812px;
    margin-right: 30.7812px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 10px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 10px 5px;
    visibility: hidden;
    width: 0px;
    z-index: 999999;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
  [data-id="8"]::before {
    block-size: 10px;
    border-block-end-color: rgb(10, 37, 64);
    border-block-start-color: rgb(10, 37, 64);
    border-bottom-color: rgb(10, 37, 64);
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-end-end-radius: 50%;
    border-end-start-radius: 50%;
    border-inline-end-color: rgb(10, 37, 64);
    border-inline-start-color: rgb(10, 37, 64);
    border-left-color: rgb(10, 37, 64);
    border-right-color: rgb(10, 37, 64);
    border-start-end-radius: 50%;
    border-start-start-radius: 50%;
    border-top-color: rgb(10, 37, 64);
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 10px;
    inline-size: 10px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 35.7812px;
    margin-inline-start: 35.7812px;
    margin-left: 35.7812px;
    margin-right: 35.7812px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 5px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 5px 5px;
    visibility: hidden;
    width: 10px;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
  [data-id="9"]::after {
    block-size: 0px;
    border-block-end-color: rgb(255, 255, 255);
    border-block-end-style: solid;
    border-block-end-width: 10px;
    border-block-start-color: rgba(0, 0, 0, 0);
    border-block-start-style: solid;
    border-bottom-color: rgb(255, 255, 255);
    border-bottom-style: solid;
    border-bottom-width: 10px;
    border-inline-end-color: rgba(0, 0, 0, 0);
    border-inline-end-style: solid;
    border-inline-end-width: 10px;
    border-inline-start-color: rgba(0, 0, 0, 0);
    border-inline-start-style: solid;
    border-inline-start-width: 10px;
    border-left-color: rgba(0, 0, 0, 0);
    border-left-style: solid;
    border-left-width: 10px;
    border-right-color: rgba(0, 0, 0, 0);
    border-right-style: solid;
    border-right-width: 10px;
    border-top-color: rgba(0, 0, 0, 0);
    border-top-style: solid;
    bottom: 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 0px;
    inline-size: 0px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 28.9531px;
    margin-inline-start: 28.9453px;
    margin-left: 28.9453px;
    margin-right: 28.9531px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 10px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 10px 5px;
    visibility: hidden;
    width: 0px;
    z-index: 999999;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
  [data-id="9"]::before {
    block-size: 10px;
    border-block-end-color: rgb(10, 37, 64);
    border-block-start-color: rgb(10, 37, 64);
    border-bottom-color: rgb(10, 37, 64);
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-end-end-radius: 50%;
    border-end-start-radius: 50%;
    border-inline-end-color: rgb(10, 37, 64);
    border-inline-start-color: rgb(10, 37, 64);
    border-left-color: rgb(10, 37, 64);
    border-right-color: rgb(10, 37, 64);
    border-start-end-radius: 50%;
    border-start-start-radius: 50%;
    border-top-color: rgb(10, 37, 64);
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    bottom: 0px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 10px 0px;
    caret-color: rgb(10, 37, 64);
    color: rgb(10, 37, 64);
    column-rule-color: rgb(10, 37, 64);
    content: "";
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 600;
    height: 10px;
    inline-size: 10px;
    inset-block-end: 0px;
    inset-block-start: 65px;
    inset-inline-end: 0px;
    inset-inline-start: 0px;
    left: 0px;
    line-height: 21px;
    margin-block-start: -10px;
    margin-inline-end: 33.9531px;
    margin-inline-start: 33.9453px;
    margin-left: 33.9453px;
    margin-right: 33.9531px;
    margin-top: -10px;
    opacity: 0;
    outline-color: rgb(10, 37, 64);
    perspective-origin: 5px 5px;
    position: absolute;
    right: 0px;
    text-decoration: none solid rgb(10, 37, 64);
    text-decoration-color: rgb(10, 37, 64);
    text-emphasis-color: rgb(10, 37, 64);
    text-transform: uppercase;
    top: 65px;
    transform-origin: 5px 5px;
    visibility: hidden;
    width: 10px;
    -webkit-text-fill-color: rgb(10, 37, 64);
    -webkit-text-stroke-color: rgb(10, 37, 64);
  }
</style>` },
  { filename: "breadcrumb nav list items mixed inline displays", content: `<nav class="breadcrumbs" itemtype="https://schema.org/BreadcrumbList">
  <li itemprop="itemListElement" itemtype="http://schema.org/ListItem">
    <a itemprop="item" href="/blog/" data-wpel-link="internal">
      <span itemprop="name">Blog</span>
      <span itemprop="name">Blog</span>
    </a>
  </li>
  <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
    <a data-utm-content="breadcrumbs" itemprop="item" href="/blog/1">
      <span itemprop="name">Security</span>
      <meta itemprop="position" content="2" />
    </a>
  </li>
  <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
    <a data-utm-content="breadcrumbs" itemprop="item" href="/blog/1/2">
      <span itemprop="name">Security</span>
      <meta itemprop="position" content="2" />
    </a>
  </li>
  <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
    <a data-utm-content="breadcrumbs" itemprop="item" href="/blog/1/2/3">
      <span itemprop="name">Security</span>
      <meta itemprop="position" content="2" />
    </a>
  </li>
</nav>

<style>
  .breadcrumbs {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .breadcrumbs li {
    display: inline;
    font-family: var(--font-family-primary);
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
    color: #7c889d;
  }

  .breadcrumbs li:not(:last-child) {
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -moz-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .breadcrumbs li:not(:last-child):after {
    content: "";
    width: 12px;
    height: 16px;
    margin: 0 3px 0 8px;
    display: inline-block;
    background-image: url(./icon-slash.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .breadcrumbs li a {
    color: var(--color-green);
    font-weight: 700;
  }

  .breadcrumbs li a:hover {
    color: var(--color-green-hover);
  }
</style>` },
  { filename: "breadcrumb role navigation list items mixed inline displays", content: `<ul role="navigation" class="breadcrumbs" itemtype="https://schema.org/BreadcrumbList">
  <li itemprop="itemListElement" itemtype="http://schema.org/ListItem">
    <a itemprop="item" href="/blog/" data-wpel-link="internal">
      <span itemprop="name">Blog</span>
      <span itemprop="name">Blog</span>
    </a>
  </li>
  <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
    <a data-utm-content="breadcrumbs" itemprop="item" href="/blog/1">
      <span itemprop="name">Security</span>
      <meta itemprop="position" content="2" />
    </a>
  </li>
  <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
    <a data-utm-content="breadcrumbs" itemprop="item" href="/blog/1/2">
      <span itemprop="name">Security</span>
      <meta itemprop="position" content="2" />
    </a>
  </li>
  <li itemprop="itemListElement" itemscope="" itemtype="http://schema.org/ListItem">
    <a data-utm-content="breadcrumbs" itemprop="item" href="/blog/1/2/3">
      <span itemprop="name">Security</span>
      <meta itemprop="position" content="2" />
    </a>
  </li>
</ul>

<style>
  .breadcrumbs {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .breadcrumbs li {
    display: inline;
    font-family: var(--font-family-primary);
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
    color: #7c889d;
  }

  .breadcrumbs li:not(:last-child) {
    display: -webkit-inline-box;
    display: -webkit-inline-flex;
    display: -moz-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .breadcrumbs li:not(:last-child):after {
    content: "";
    width: 12px;
    height: 16px;
    margin: 0 3px 0 8px;
    display: inline-block;
    background-image: url(./icon-slash.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .breadcrumbs li a {
    color: var(--color-green);
    font-weight: 700;
  }

  .breadcrumbs li a:hover {
    color: var(--color-green-hover);
  }
</style>` },
  { filename: "bsnsports com main menu", content: `<div
  id="test"
  class="relative flex"
  role="navigation"
  aria-label="Page Menu"
  style="animation-duration: 0.001s; block-size: 97px; inset: 0px; display: flex; height: 97px; inline-size: 780.141px; inset-block: 0px; inset-inline: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 390.07px 48.5px; position: relative; transform-origin: 390.07px 48.5px; width: 780.141px"
>
  <ul
    class="flex preflight-list items-end gap-8 pl-5 text-center"
    data-acsb-menu="ul"
    aria-label="Main Menu"
    style="
      align-items: flex-end;
      animation-duration: 0.001s;
      block-size: 97px;
      gap: 32px;
      display: flex;
      height: 97px;
      inline-size: 780.148px;
      list-style-type: none;
      min-block-size: auto;
      min-height: auto;
      min-inline-size: auto;
      min-width: auto;
      padding-inline-start: 20px;
      padding-left: 20px;
      perspective-origin: 390.07px 48.5px;
      text-align: center;
      transform-origin: 390.074px 48.5px;
      width: 780.148px;
    "
  >
    <li
      class="mb-[9px]! flex h-22 items-end"
      style="
        align-items: flex-end;
        animation-duration: 0.001s;
        block-size: 88px;
        display: flex;
        height: 88px;
        inline-size: 90px;
        list-style-type: none;
        margin-block-end: 9px;
        margin-bottom: 9px;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        perspective-origin: 45px 44px;
        text-align: center;
        transform-origin: 45px 44px;
        width: 90px;
      "
    >
      <a
        class=""
        href="/"
        data-acsb-clickable="true"
        data-acsb-navigable="true"
        data-acsb-now-navigable="true"
        data-custom-button-processed="true"
        style="
          animation-duration: 0.001s;
          block-size: 90px;
          border-block-color: rgb(0, 0, 238);
          border-color: rgb(0, 0, 238);
          border-inline-color: rgb(0, 0, 238);
          caret-color: rgb(0, 0, 238);
          color: rgb(0, 0, 238);
          column-rule-color: rgb(0, 0, 238);
          cursor: pointer;
          display: block;
          height: 90px;
          inline-size: 90px;
          list-style-type: none;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          outline-color: rgb(0, 0, 238);
          perspective-origin: 45px 45px;
          text-align: center;
          text-decoration: underline solid rgb(0, 0, 238);
          text-emphasis-color: rgb(0, 0, 238);
          transform-origin: 45px 45px;
          width: 90px;
          -webkit-text-decorations-in-effect: underline;
          -webkit-text-fill-color: rgb(0, 0, 238);
          -webkit-text-stroke-color: rgb(0, 0, 238);
        "
        ><span
          class="sr-only acsb-sr-only"
          data-acsb-hidden="false"
          data-acsb-sr-only="true"
          data-acsb-force-visible="true"
          style="
            animation-duration: 0.001s;
            background-color: rgb(255, 255, 255);
            block-size: 1px;
            inset: 0px 780.195px 97px 0px;
            clip: rect(0px, 0px, 0px, 0px);
            cursor: text;
            display: block;
            font-size: 15px;
            height: 1px;
            inline-size: 1px;
            inset-block: 0px 97px;
            inset-inline: 0px 780.195px;
            line-height: 1px;
            list-style-type: none;
            margin-block-start: -1px;
            margin-inline-start: -1px;
            margin-left: -1px;
            margin-top: -1px;
            overflow-block: hidden;
            overflow-inline: hidden;
            overflow: hidden;
            perspective-origin: 0.5px 0.5px;
            position: absolute;
            text-align: center;
            text-transform: capitalize;
            text-wrap-mode: nowrap;
            transform-origin: 0.5px 0.5px;
            width: 1px;
          "
          >BSN SPORTS</span
        ><!--\$--><svg
          fill="currentColor"
          viewBox="0 0 90 84"
          xmlns="http://www.w3.org/2000/svg"
          class="shrink-0 h-[5.625rem] w-[5.625rem]"
          data-acsb-hidden="true"
          role="presentation"
          style="
            animation-duration: 0.001s;
            block-size: 90px;
            border-block-color: rgb(0, 0, 238);
            border-color: rgb(0, 0, 238);
            border-inline-color: rgb(0, 0, 238);
            caret-color: rgb(0, 0, 238);
            color: rgb(0, 0, 238);
            column-rule-color: rgb(0, 0, 238);
            cursor: pointer;
            fill: rgb(0, 0, 238);
            flex-shrink: 0;
            height: 90px;
            inline-size: 90px;
            list-style-type: none;
            outline-color: rgb(0, 0, 238);
            overflow-block: hidden;
            overflow-clip-margin: content-box;
            overflow-inline: hidden;
            overflow: hidden;
            perspective-origin: 45px 45px;
            text-align: center;
            text-decoration: none solid rgb(0, 0, 238);
            text-emphasis-color: rgb(0, 0, 238);
            transform-origin: 45px 45px;
            width: 90px;
            -webkit-text-fill-color: rgb(0, 0, 238);
            -webkit-text-stroke-color: rgb(0, 0, 238);
          "
        >
          <path clip-rule="evenodd" d="m51.406 2.319-31.144 58.9 51.832-15.657-11.88-7.485-30.86 17.695 26.63-29.259-4.578-24.194Z" fill="#BA172B" fill-rule="evenodd"></path>
          <path
            clip-rule="evenodd"
            d="m39.594 75.907-1.224-.718c-.557-.312-.955-.625-1.193-.906-.255-.297-.366-.594-.366-.922 0-.374.175-.671.509-.921.334-.234.763-.36 1.288-.36.588 0 1.16.157 1.701.454l.907-1.047v-.062a4.578 4.578 0 0 0-2.576-.781c-.986 0-1.781.265-2.385.812-.605.546-.923 1.25-.923 2.108 0 .578.16 1.094.493 1.531.318.438.875.89 1.638 1.36l1.224.733c.986.594 1.48 1.234 1.48 1.906 0 .406-.176.75-.494 1.03-.334.282-.747.407-1.256.407-.843 0-1.622-.297-2.321-.906l-.923 1.047c.652.515 2.163 1.234 3.26 1.234.97 0 1.75-.282 2.353-.828.605-.547.907-1.266.907-2.156-.048-1.187-.732-2.218-2.1-3.014ZM43.123 81.828V70.8h3.562c1.066 0 1.924.281 2.56.859.637.562.955 1.328.955 2.28 0 .64-.16 1.203-.493 1.703-.334.5-.78.86-1.336 1.078-.573.219-1.384.328-2.449.328H44.73v4.78h-1.606Zm3.276-9.622h-1.67v3.452h1.766c.652 0 1.16-.157 1.51-.453.35-.297.525-.734.525-1.297 0-1.14-.716-1.702-2.13-1.702ZM70.68 81.828l-2.67-5.436c.397-.219.715-.5.97-.844a2.875 2.875 0 0 0 .492-1.655c0-.938-.334-1.687-1.002-2.234-.668-.547-1.574-.828-2.703-.828h-2.814v11.012h1.606v-4.795h.334l1.16-.078.382-.094 2.449 4.967h1.797v-.015Zm-5.517-6.202h-.604v-3.483h.477c.779 0 1.351.063 1.685.172.334.11.604.312.795.594.191.28.286.593.286.937 0 .359-.079.671-.254.937a1.672 1.672 0 0 1-.7.625c-.318.156-.874.218-1.685.218ZM56.322 70.66c1.59 0 2.91.53 3.975 1.624 1.05 1.077 1.59 2.42 1.59 4.045s-.525 2.968-1.606 4.03c-1.065 1.062-2.417 1.594-4.039 1.594-1.542 0-2.846-.532-3.88-1.594-1.033-1.062-1.542-2.405-1.542-3.998 0-1.64.525-3 1.558-4.077 1.034-1.094 2.353-1.625 3.944-1.625Zm.063 1.499c-1.176 0-2.146.39-2.894 1.187-.763.796-1.145 1.796-1.145 3.014 0 1.188.382 2.172 1.145 2.968.764.781 1.718 1.187 2.846 1.187 1.145 0 2.1-.406 2.879-1.202.763-.797 1.145-1.812 1.145-3 0-1.17-.382-2.14-1.145-2.936-.78-.828-1.718-1.218-2.83-1.218ZM71.285 70.8l-1.161 1.328v.078h3.848v9.621h1.606v-9.621h3.912V70.8h-8.205ZM9.731 78.641c0 .937-.333 1.687-.985 2.25-.652.562-1.575.843-2.751.843H0V70.815h4.945c.7 0 1.304.063 1.813.204.509.124.938.312 1.24.546.318.234.557.5.716.812.159.313.238.657.238 1.016 0 .406-.08.765-.238 1.109a2.402 2.402 0 0 1-.604.828 2.343 2.343 0 0 1-.716.468c.763.297 1.336.672 1.733 1.11.414.437.604 1.03.604 1.733Zm-3.911-4.67c0-.531-.175-.875-.525-1.047-.35-.172-.906-.265-1.654-.265h-.7v4.31l1.082-1.686c.763 0 .954-.078 1.288-.25.334-.188.509-.547.509-1.062Zm.556 4.545c0-.937-.7-1.406-2.067-1.406H2.942v2.796h1.367c1.368 0 2.067-.468 2.067-1.39ZM17.746 75.939a19.2 19.2 0 0 0-2.051-1.062c-.478-.22-.811-.422-1.002-.578-.191-.157-.287-.344-.287-.563 0-.234.096-.421.287-.578.19-.156.493-.234.906-.234.636 0 1.24.125 1.797.375a.121.121 0 0 0 .063.031l1.448-1.671v-.063a5.543 5.543 0 0 0-.7-.343c-.334-.156-.78-.281-1.304-.406a8.407 8.407 0 0 0-1.717-.172c-.875 0-1.606.14-2.21.422-.605.28-1.05.656-1.352 1.14-.286.468-.445 1-.445 1.593 0 .61.143 1.14.445 1.578.286.453.668.812 1.129 1.109.46.297 1.002.578 1.606.828.556.218.97.421 1.256.624.286.203.43.453.43.75 0 .172-.08.344-.255.531-.16.188-.54.281-1.113.281-.62 0-1.209-.109-1.75-.343a7.997 7.997 0 0 1-.906-.438l-1.399 1.61c.747.577 1.829 1.093 2.385 1.233.557.125 1.002.203 1.336.234.334.032.62.047.843.047.826 0 1.558-.14 2.194-.406.636-.265 1.129-.64 1.495-1.14.35-.5.54-1.093.54-1.765 0-.61-.143-1.125-.445-1.547a4.11 4.11 0 0 0-1.224-1.077ZM31.818 81.75h-.302l-7.25-6.092v6.091h-3.324V70.815h.302l7.22 6.061v-6.06h3.354v10.933ZM84.323 75.907 83.1 75.19c-.556-.312-.954-.625-1.193-.906-.254-.297-.365-.594-.365-.922 0-.374.175-.671.509-.921.334-.234.763-.36 1.288-.36.588 0 1.16.157 1.701.454l.906-1.047v-.062a4.578 4.578 0 0 0-2.576-.781c-.986 0-1.78.265-2.385.812-.604.546-.922 1.25-.922 2.108 0 .578.159 1.094.477 1.531.318.438.875.89 1.638 1.36l1.224.733c.986.594 1.479 1.234 1.479 1.906 0 .406-.175.75-.509 1.03-.334.282-.747.407-1.256.407-.875 0-1.67-.312-2.385-.953l-.89 1.031v.047c.62.5 2.194 1.265 3.29 1.265.97 0 1.75-.28 2.354-.828.605-.546.907-1.265.907-2.155-.016-1.203-.7-2.234-2.068-3.03ZM89.73 72.08l-.048-.843c0-.11 0-.25-.016-.406h-.016c-.032.125-.08.297-.127.422l-.27.796h-.302l-.27-.812c-.032-.11-.064-.281-.096-.406h-.016c0 .125 0 .266-.016.406l-.048.844h-.27l.111-1.437h.43l.254.703c.032.109.064.218.096.359.031-.125.063-.25.095-.36l.254-.702h.414L90 72.08h-.27Zm-1.574-1.42v.234h-.462v1.202h-.286v-1.203h-.46v-.234h1.208Z"
            fill="#1D1F1F"
            fill-rule="evenodd"
          ></path>
        </svg>
        <span
          style="
            position: absolute;
            padding: 0px !important;
            clip: rect(0px, 0px, 0px, 0px);
            border: 0px !important;
            animation-duration: 0.001s;
            background-color: rgb(255, 255, 255);
            block-size: 1px;
            inset: 0px 780.195px 97px 0px;
            cursor: text;
            display: block;
            font-size: 15px;
            height: 1px;
            inline-size: 1px;
            inset-block: 0px 97px;
            inset-inline: 0px 780.195px;
            line-height: 1px;
            list-style-type: none;
            margin-block-start: -1px;
            margin-inline-start: -1px;
            margin-left: -1px;
            margin-top: -1px;
            overflow-block: hidden;
            overflow-inline: hidden;
            overflow: hidden;
            perspective-origin: 0.5px 0.5px;
            text-align: center;
            text-transform: capitalize;
            transform-origin: 0.5px 0.5px;
            width: 1px;
          "
          data-acsb-hidden="false"
          data-acsb-sr-only="true"
          class="acsb-sr-only"
          data-acsb-force-visible="true"
        >
          | Redirects to homepage</span
        ></a
      >
    </li>
    <li
      class="relative flex"
      data-acsb-menu="li"
      data-acsb-menu-root="true"
      style="
        animation-duration: 0.001s;
        block-size: 40px;
        inset: 0px;
        display: flex;
        height: 40px;
        inline-size: 120.898px;
        inset-block: 0px;
        inset-inline: 0px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        perspective-origin: 60.4453px 20px;
        position: relative;
        text-align: center;
        transform-origin: 60.4492px 20px;
        width: 120.898px;
      "
    >
      <div
        class="inline-block w-full cursor-pointer"
        style="animation-duration: 0.001s; block-size: 40px; cursor: pointer; height: 40px; inline-size: 120.906px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 60.4531px 20px; text-align: center; transform-origin: 60.4531px 20px; width: 120.906px"
      >
        <a
          data-accent="false"
          data-state="closed"
          data-text="Sports Solutions"
          class="group relative inline-block w-full preflight-button py-2 no-underline after:pointer-events-none after:invisible after:block after:h-0 after:overflow-hidden after:font-bold after:content-[attr(data-text)] after:select-none hover:font-bold"
          href="/sports/"
          data-acsb-clickable="true"
          data-acsb-navigable="true"
          data-acsb-now-navigable="true"
          data-custom-button-processed="true"
          data-acsb-menu="a"
          data-acsb-menu-root-link="true"
          data-acsb-tooltip="Use ←/→ to navigate"
          style="
            animation-duration: 0.001s;
            block-size: 40px;
            inset: 0px;
            box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
            cursor: pointer;
            display: inline-block;
            height: 40px;
            inline-size: 120.914px;
            inset-block: 0px;
            inset-inline: 0px;
            list-style-type: none;
            padding-block: 8px;
            padding-bottom: 8px;
            padding-top: 8px;
            perspective-origin: 60.4531px 20px;
            position: relative;
            text-align: center;
            transform-origin: 60.457px 20px;
            width: 120.914px;
          "
          data-id="0"
          >Sports Solutions
          <div
            class="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all group-hover:w-1/3 group-data-[state=open]:w-1/3"
            data-acsb-hidden="true"
            style="
              animation-duration: 0.001s;
              background-color: rgb(186, 23, 43);
              block-size: 4px;
              inset: 36px 120.914px 0px 0px;
              cursor: pointer;
              height: 4px;
              inline-size: 0px;
              inset-block: 36px 0px;
              inset-inline: 0px 120.914px;
              list-style-type: none;
              perspective-origin: 0px 2px;
              position: absolute;
              text-align: center;
              transform-origin: 0px 2px;
              width: 0px;
            "
          ></div
        ></a>
      </div>
    </li>
    <li
      class="relative flex"
      data-acsb-menu="li"
      data-acsb-menu-root="true"
      style="
        animation-duration: 0.001s;
        block-size: 40px;
        inset: 0px;
        display: flex;
        height: 40px;
        inline-size: 110.852px;
        inset-block: 0px;
        inset-inline: 0px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        perspective-origin: 55.4219px 20px;
        position: relative;
        text-align: center;
        transform-origin: 55.4258px 20px;
        width: 110.852px;
      "
    >
      <div
        class="inline-block w-full cursor-pointer"
        style="animation-duration: 0.001s; block-size: 40px; cursor: pointer; height: 40px; inline-size: 110.852px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 55.4219px 20px; text-align: center; transform-origin: 55.4258px 20px; width: 110.852px"
      >
        <a
          data-accent="false"
          data-state="closed"
          data-text="Team Uniforms"
          class="group relative inline-block w-full preflight-button py-2 no-underline after:pointer-events-none after:invisible after:block after:h-0 after:overflow-hidden after:font-bold after:content-[attr(data-text)] after:select-none hover:font-bold"
          href="/team-uniforms/"
          data-acsb-clickable="true"
          data-acsb-navigable="true"
          data-acsb-now-navigable="true"
          data-custom-button-processed="true"
          data-acsb-menu="a"
          data-acsb-menu-root-link="true"
          style="
            animation-duration: 0.001s;
            block-size: 40px;
            inset: 0px;
            box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
            cursor: pointer;
            display: inline-block;
            height: 40px;
            inline-size: 110.859px;
            inset-block: 0px;
            inset-inline: 0px;
            list-style-type: none;
            padding-block: 8px;
            padding-bottom: 8px;
            padding-top: 8px;
            perspective-origin: 55.4297px 20px;
            position: relative;
            text-align: center;
            transform-origin: 55.4297px 20px;
            width: 110.859px;
          "
          data-id="1"
          >Team Uniforms
          <div
            class="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all group-hover:w-1/3 group-data-[state=open]:w-1/3"
            data-acsb-hidden="true"
            style="
              animation-duration: 0.001s;
              background-color: rgb(186, 23, 43);
              block-size: 4px;
              inset: 36px 110.859px 0px 0px;
              cursor: pointer;
              height: 4px;
              inline-size: 0px;
              inset-block: 36px 0px;
              inset-inline: 0px 110.859px;
              list-style-type: none;
              perspective-origin: 0px 2px;
              position: absolute;
              text-align: center;
              transform-origin: 0px 2px;
              width: 0px;
            "
          ></div
        ></a>
      </div>
    </li>
    <li
      class="relative flex"
      data-acsb-menu="li"
      data-acsb-menu-root="true"
      style="
        animation-duration: 0.001s;
        block-size: 40px;
        inset: 0px;
        display: flex;
        height: 40px;
        inline-size: 166.469px;
        inset-block: 0px;
        inset-inline: 0px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        perspective-origin: 83.2344px 20px;
        position: relative;
        text-align: center;
        transform-origin: 83.2344px 20px;
        width: 166.469px;
      "
    >
      <div
        class="inline-block w-full cursor-pointer"
        data-acsb-clickable="true"
        data-acsb-navigable="true"
        tabindex="0"
        data-acsb-now-navigable="true"
        data-acsb-menu="a"
        data-acsb-menu-root-link="true"
        role="button"
        style="animation-duration: 0.001s; block-size: 40px; cursor: pointer; height: 40px; inline-size: 141.469px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 70.7344px 20px; text-align: center; transform-origin: 70.7344px 20px; width: 141.469px"
      >
        <div
          class="group relative inline-block w-full preflight-button py-2 no-underline after:pointer-events-none after:invisible after:block after:h-0 after:overflow-hidden after:font-bold after:content-[attr(data-text)] after:select-none hover:font-bold data-[accent=true]:rounded-lg data-[accent=true]:bg-gray-100 data-[accent=true]:px-3 data-[state=open]:font-bold data-[accent=true]:data-[state=open]:bg-primary data-[accent=true]:data-[state=open]:text-white"
          data-accent="true"
          data-state="closed"
          data-text="Coaches Toolkit"
          style="
            animation-duration: 0.001s;
            background-color: oklch(0.967 0.003 264.542);
            block-size: 40px;
            border-radius: 8px;
            border-end-end-radius: 8px;
            border-end-start-radius: 8px;
            border-start-end-radius: 8px;
            border-start-start-radius: 8px;
            inset: 0px;
            box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
            cursor: pointer;
            display: inline-block;
            height: 40px;
            inline-size: 141.469px;
            inset-block: 0px;
            inset-inline: 0px;
            list-style-type: none;
            padding-block: 8px;
            padding: 8px 12px;
            padding-inline: 12px;
            perspective-origin: 70.7344px 20px;
            position: relative;
            text-align: center;
            transform-origin: 70.7344px 20px;
            width: 141.469px;
          "
          data-id="2"
        >
          Coaches Toolkit
        </div>
      </div>
      <div
        class="ml-6!"
        data-acsb-hidden="false"
        aria-hidden="true"
        style="animation-duration: 0.001s; block-size: 40px; height: 40px; inline-size: 1px; list-style-type: none; margin-inline-start: 24px; margin-left: 24px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0.5px 20px; text-align: center; transform-origin: 0.5px 20px; width: 1px"
      >
        <div
          data-orientation="vertical"
          role="none"
          class="bg-[var(--separator-default-border-color)] h-full w-[var(--separator-default-border-width)]"
          style="animation-duration: 0.001s; background-color: rgb(184, 187, 187); block-size: 40px; height: 40px; inline-size: 1px; list-style-type: none; perspective-origin: 0.5px 20px; text-align: center; transform-origin: 0.5px 20px; width: 1px"
        ></div>
      </div>
    </li>
    <li
      class="relative flex"
      data-acsb-menu="li"
      data-acsb-menu-root="true"
      style="
        animation-duration: 0.001s;
        block-size: 40px;
        inset: 0px;
        display: flex;
        height: 40px;
        inline-size: 37.7422px;
        inset-block: 0px;
        inset-inline: 0px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        perspective-origin: 18.8672px 20px;
        position: relative;
        text-align: center;
        transform-origin: 18.8711px 20px;
        width: 37.7422px;
      "
    >
      <div
        class="inline-block w-full cursor-pointer"
        style="animation-duration: 0.001s; block-size: 40px; cursor: pointer; height: 40px; inline-size: 37.7422px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 18.8672px 20px; text-align: center; transform-origin: 18.8711px 20px; width: 37.7422px"
      >
        <a
          data-accent="false"
          data-state="closed"
          data-text="Shop"
          class="group relative inline-block w-full preflight-button py-2 no-underline after:pointer-events-none after:invisible after:block after:h-0 after:overflow-hidden after:font-bold after:content-[attr(data-text)] after:select-none hover:font-bold"
          href="/shop/"
          data-acsb-clickable="true"
          data-acsb-navigable="true"
          data-acsb-now-navigable="true"
          data-custom-button-processed="true"
          data-acsb-menu="a"
          data-acsb-menu-root-link="true"
          style="
            animation-duration: 0.001s;
            block-size: 40px;
            inset: 0px;
            box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
            cursor: pointer;
            display: inline-block;
            height: 40px;
            inline-size: 37.7422px;
            inset-block: 0px;
            inset-inline: 0px;
            list-style-type: none;
            padding-block: 8px;
            padding-bottom: 8px;
            padding-top: 8px;
            perspective-origin: 18.8672px 20px;
            position: relative;
            text-align: center;
            transform-origin: 18.8711px 20px;
            width: 37.7422px;
          "
          data-id="3"
          >Shop
          <div
            class="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all group-hover:w-1/3 group-data-[state=open]:w-1/3"
            data-acsb-hidden="true"
            style="
              animation-duration: 0.001s;
              background-color: rgb(186, 23, 43);
              block-size: 4px;
              inset: 36px 37.7422px 0px 0px;
              cursor: pointer;
              height: 4px;
              inline-size: 0px;
              inset-block: 36px 0px;
              inset-inline: 0px 37.7422px;
              list-style-type: none;
              perspective-origin: 0px 2px;
              position: absolute;
              text-align: center;
              transform-origin: 0px 2px;
              width: 0px;
            "
          ></div
        ></a>
      </div>
    </li>
    <li
      class="relative flex"
      data-acsb-menu="li"
      data-acsb-menu-root="true"
      style="
        animation-duration: 0.001s;
        block-size: 40px;
        inset: 0px;
        display: flex;
        height: 40px;
        inline-size: 74.2031px;
        inset-block: 0px;
        inset-inline: 0px;
        list-style-type: none;
        min-block-size: auto;
        min-height: auto;
        min-inline-size: auto;
        min-width: auto;
        perspective-origin: 37.1016px 20px;
        position: relative;
        text-align: center;
        transform-origin: 37.1016px 20px;
        width: 74.2031px;
      "
    >
      <a
        class="group relative inline-block w-full preflight-button py-2 no-underline hover:font-bold data-[state=open]:font-bold font-bold text-primary"
        href="/c/clearance/#accent"
        data-acsb-clickable="true"
        data-acsb-navigable="true"
        data-acsb-now-navigable="true"
        data-custom-button-processed="true"
        data-acsb-menu="a"
        data-acsb-menu-root-link="true"
        style="
          animation-duration: 0.001s;
          block-size: 40px;
          border-block-color: rgb(186, 23, 43);
          border-color: rgb(186, 23, 43);
          border-inline-color: rgb(186, 23, 43);
          inset: 0px;
          box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
          caret-color: rgb(186, 23, 43);
          color: rgb(186, 23, 43);
          column-rule-color: rgb(186, 23, 43);
          cursor: pointer;
          display: block;
          font-weight: 700;
          height: 40px;
          inline-size: 74.2109px;
          inset-block: 0px;
          inset-inline: 0px;
          list-style-type: none;
          min-block-size: auto;
          min-height: auto;
          min-inline-size: auto;
          min-width: auto;
          outline-color: rgb(186, 23, 43);
          padding-block: 8px;
          padding-bottom: 8px;
          padding-top: 8px;
          perspective-origin: 37.1016px 20px;
          position: relative;
          text-align: center;
          text-decoration: none solid rgb(186, 23, 43);
          text-emphasis-color: rgb(186, 23, 43);
          transform-origin: 37.1055px 20px;
          width: 74.2109px;
          -webkit-text-fill-color: rgb(186, 23, 43);
          -webkit-text-stroke-color: rgb(186, 23, 43);
        "
        >Clearance
        <div
          class="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all group-hover:w-1/3 group-data-[state=open]:w-1/3"
          data-acsb-hidden="true"
          style="
            animation-duration: 0.001s;
            background-color: rgb(186, 23, 43);
            block-size: 4px;
            border-block-color: rgb(186, 23, 43);
            border-color: rgb(186, 23, 43);
            border-inline-color: rgb(186, 23, 43);
            inset: 36px 74.2109px 0px 0px;
            caret-color: rgb(186, 23, 43);
            color: rgb(186, 23, 43);
            column-rule-color: rgb(186, 23, 43);
            cursor: pointer;
            font-weight: 700;
            height: 4px;
            inline-size: 0px;
            inset-block: 36px 0px;
            inset-inline: 0px 74.2109px;
            list-style-type: none;
            outline-color: rgb(186, 23, 43);
            perspective-origin: 0px 2px;
            position: absolute;
            text-align: center;
            text-decoration: none solid rgb(186, 23, 43);
            text-emphasis-color: rgb(186, 23, 43);
            transform-origin: 0px 2px;
            width: 0px;
            -webkit-text-fill-color: rgb(186, 23, 43);
            -webkit-text-stroke-color: rgb(186, 23, 43);
          "
        ></div
      ></a>
    </li>
  </ul>
</div>
<style>
  [data-id="0"]::after {
    block-size: 0px;
    content: "Sports Solutions";
    cursor: pointer;
    display: block;
    font-weight: 700;
    height: 0px;
    inline-size: 120.906px;
    list-style-type: none;
    overflow-block: hidden;
    overflow-inline: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    perspective-origin: 60.4531px 0px;
    pointer-events: none;
    text-align: center;
    transform-origin: 60.4531px 0px;
    user-select: none;
    visibility: hidden;
    width: 120.906px;
  }
  [data-id="1"]::after {
    block-size: 0px;
    content: "Team Uniforms";
    cursor: pointer;
    display: block;
    font-weight: 700;
    height: 0px;
    inline-size: 110.852px;
    list-style-type: none;
    overflow-block: hidden;
    overflow-inline: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    perspective-origin: 55.4219px 0px;
    pointer-events: none;
    text-align: center;
    transform-origin: 55.4258px 0px;
    user-select: none;
    visibility: hidden;
    width: 110.852px;
  }
  [data-id="2"]::after {
    block-size: 0px;
    content: "Coaches Toolkit";
    cursor: pointer;
    display: block;
    font-weight: 700;
    height: 0px;
    inline-size: 117.469px;
    list-style-type: none;
    overflow-block: hidden;
    overflow-inline: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    perspective-origin: 58.7344px 0px;
    pointer-events: none;
    text-align: center;
    transform-origin: 58.7344px 0px;
    user-select: none;
    visibility: hidden;
    width: 117.469px;
  }
  [data-id="3"]::after {
    block-size: 0px;
    content: "Shop";
    cursor: pointer;
    display: block;
    font-weight: 700;
    height: 0px;
    inline-size: 37.7422px;
    list-style-type: none;
    overflow-block: hidden;
    overflow-inline: hidden;
    overflow-x: hidden;
    overflow-y: hidden;
    perspective-origin: 18.8672px 0px;
    pointer-events: none;
    text-align: center;
    transform-origin: 18.8711px 0px;
    user-select: none;
    visibility: hidden;
    width: 37.7422px;
  }
</style>` },
  { filename: "nav element is container of multiple list menus nav links", content: `<div>
  <nav>
    <ul>
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </ul>
    <div>
      <h4>Contact us</h4>
      <ul>
        <li>
          <a href="/contact/info">Get info</a>
        </li>
        <li>
          <a href="/contact/ticket">Submit a ticket</a>
        </li>
      </ul>
    </div>
  </nav>
</div>` },
  { filename: "nav element is container of multiple list menus", content: `<div>
  <nav>
    <ul>
      <li>
        <a href="#main-content">Skip to main content</a>
      </li>
      <li>
        <a href="#footer">Skip to footer</a>
      </li>
    </ul>
    <ul>
      <li>
        <a href="#main-content">Skip to main content</a>
      </li>
      <li>
        <a href="#footer">Skip to footer</a>
      </li>
    </ul>
  </nav>
</div>` },
  { filename: "nav element is container of single list menu", content: `<div>
  <nav>
    <ul>
      <li>
        <a href="#main-content">Skip to main content</a>
      </li>
      <li>
        <a href="#footer">Skip to footer</a>
      </li>
    </ul>
  </nav>
</div>` },
  { filename: "nav role is container of multiple list menus nav links", content: `<div>
  <div role="navigation">
    <ul>
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </ul>
    <div>
      <h4>Contact us</h4>
      <ul>
        <li>
          <a href="/contact/info">Get info</a>
        </li>
        <li>
          <a href="/contact/ticket">Submit a ticket</a>
        </li>
      </ul>
    </div>
  </div>
</div>` },
  { filename: "nav role is container of multiple list menus", content: `<div>
  <div role="navigation">
    <ul>
      <li>
        <a href="#main-content">Skip to main content</a>
      </li>
      <li>
        <a href="#footer">Skip to footer</a>
      </li>
    </ul>
    <ul>
      <li>
        <a href="#main-content">Skip to main content</a>
      </li>
      <li>
        <a href="#footer">Skip to footer</a>
      </li>
    </ul>
  </div>
</div>` },
  { filename: "nav role is container of single list menu", content: `<div>
  <div role="navigation">
    <ul>
      <li>
        <a href="#main-content">Skip to main content</a>
      </li>
      <li>
        <a href="#footer">Skip to footer</a>
      </li>
    </ul>
  </div>
</div>` },
  { filename: "shop.qorpak.com nav has direct child breadcrumb", content: `<nav aria-label="Breadcrumb" style="perspective-origin: 718.5px 9px; transform-origin: 718.5px 9px; block-size: 18px; height: 18px; inline-size: 1437px; width: 1437px">
  <div class="berlin-breadcrumb" style="align-items: center; display: flex; font-size: 12px; font-weight: 500; line-height: 18px; perspective-origin: 718.5px 9px; transform-origin: 718.5px 9px; block-size: 18px; height: 18px; inline-size: 1437px; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; width: 1437px">
    <div style="font-size: 12px; font-weight: 500; line-height: 18px; perspective-origin: 28.6875px 9px; transform-origin: 28.6992px 9px; block-size: 18px; height: 18px; inline-size: 57.3906px; width: 57.3906px">
      <a
        class="previous-breadcrumbs"
        href="/"
        style="
          cursor: pointer;
          display: inline;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          perspective-origin: 0px 0px;
          text-decoration: underline;
          transform-origin: 0px 0px;
          -webkit-text-decorations-in-effect: underline;
          block-size: auto;
          height: auto;
          inline-size: auto;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: auto;
        "
        >Home</a
      ><img
        class="seaweed"
        rel="preload"
        data-bid="Content Assets/Qorpak/Icons/chevron-right"
        data-btype="cloudinary"
        src="../assets/chevron-right.svg"
        alt="Previous Breadcrumbs"
        style="
          display: inline-block;
          filter: invert(0.4) sepia(0.52) saturate(2.54) hue-rotate(128deg) brightness(0.95) contrast(0.93);
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          perspective-origin: 6px 6px;
          transform-origin: 6px 6px;
          block-size: 12px;
          height: 12px;
          inline-size: 12px;
          margin-inline: 4px;
          margin-left: 4px;
          margin-right: 4px;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: 12px;
        "
      />
    </div>
    <div style="font-size: 12px; font-weight: 500; line-height: 18px; perspective-origin: 52px 9px; transform-origin: 52.0078px 9px; block-size: 18px; height: 18px; inline-size: 104.016px; width: 104.016px">
      <a
        class="previous-breadcrumbs"
        href="/products/categories/index/"
        style="
          cursor: pointer;
          display: inline;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          perspective-origin: 0px 0px;
          text-decoration: underline;
          transform-origin: 0px 0px;
          -webkit-text-decorations-in-effect: underline;
          block-size: auto;
          height: auto;
          inline-size: auto;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: auto;
        "
        >All Categories</a
      ><img
        class="seaweed"
        rel="preload"
        data-bid="Content Assets/Qorpak/Icons/chevron-right"
        data-btype="cloudinary"
        src="../assets/chevron-right.svg"
        alt="Previous Breadcrumbs"
        style="
          display: inline-block;
          filter: invert(0.4) sepia(0.52) saturate(2.54) hue-rotate(128deg) brightness(0.95) contrast(0.93);
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          perspective-origin: 6px 6px;
          transform-origin: 6px 6px;
          block-size: 12px;
          height: 12px;
          inline-size: 12px;
          margin-inline: 4px;
          margin-left: 4px;
          margin-right: 4px;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: 12px;
        "
      />
    </div>
    <div style="font-size: 12px; font-weight: 500; line-height: 18px; perspective-origin: 72.8594px 9px; transform-origin: 72.8633px 9px; block-size: 18px; height: 18px; inline-size: 145.727px; width: 145.727px">
      <a
        class="previous-breadcrumbs"
        href="/products/categories/plastic-bottles--jars/index/"
        style="
          cursor: pointer;
          display: inline;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          perspective-origin: 0px 0px;
          text-decoration: underline;
          transform-origin: 0px 0px;
          -webkit-text-decorations-in-effect: underline;
          block-size: auto;
          height: auto;
          inline-size: auto;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: auto;
        "
        >Plastic Bottles &amp; Jars</a
      ><img
        class="seaweed"
        rel="preload"
        data-bid="Content Assets/Qorpak/Icons/chevron-right"
        data-btype="cloudinary"
        src="../assets/chevron-right.svg"
        alt="Previous Breadcrumbs"
        style="
          display: inline-block;
          filter: invert(0.4) sepia(0.52) saturate(2.54) hue-rotate(128deg) brightness(0.95) contrast(0.93);
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          perspective-origin: 6px 6px;
          transform-origin: 6px 6px;
          block-size: 12px;
          height: 12px;
          inline-size: 12px;
          margin-inline: 4px;
          margin-left: 4px;
          margin-right: 4px;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: 12px;
        "
      />
    </div>
    <div style="font-size: 12px; font-weight: 500; line-height: 18px; perspective-origin: 63.2578px 9px; transform-origin: 63.2695px 9px; block-size: 18px; height: 18px; inline-size: 126.531px; width: 126.531px">
      <a
        class="previous-breadcrumbs"
        href="/products/categories/plastic-bottles--jars/packo-containers/"
        style="
          cursor: pointer;
          display: inline;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          perspective-origin: 0px 0px;
          text-decoration: underline;
          transform-origin: 0px 0px;
          -webkit-text-decorations-in-effect: underline;
          block-size: auto;
          height: auto;
          inline-size: auto;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: auto;
        "
        >Packo Containers</a
      ><img
        class="seaweed"
        rel="preload"
        data-bid="Content Assets/Qorpak/Icons/chevron-right"
        data-btype="cloudinary"
        src="../assets/chevron-right.svg"
        alt="Previous Breadcrumbs"
        style="
          display: inline-block;
          filter: invert(0.4) sepia(0.52) saturate(2.54) hue-rotate(128deg) brightness(0.95) contrast(0.93);
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          perspective-origin: 6px 6px;
          transform-origin: 6px 6px;
          block-size: 12px;
          height: 12px;
          inline-size: 12px;
          margin-inline: 4px;
          margin-left: 4px;
          margin-right: 4px;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: 12px;
        "
      />
    </div>
    <div class="current-breadcrumb" aria-current="page" style="font-size: 12px; font-weight: 500; line-height: 18px; perspective-origin: 34.6484px 9px; transform-origin: 34.6602px 9px; block-size: 18px; height: 18px; inline-size: 69.3125px; width: 69.3125px">SKU:242941</div>
  </div>
</nav>
<style></style>` },
  { filename: "shopify main nav", content: `<!--
    This test covers a real bug that was found after adding the Shopify main navigation locator. (WE-3587)
    the same element was failing for navigation-misuse and navigation-mismatch in an infinite loop.
    it used to check if the current element's parent is the main-navigation, without checking if the current element is the main-navigation itself.
-->
<html>
  <head>
    <script>
      <!-- mocking shopify site  -->
      window["Shopify"] = {};
    </script>

    <style>[data-id=0]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 0px; caret-color: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0); column-rule-color: rgba(0, 0, 0, 0); content: "Featured"; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 2px; inline-size: 76.625px; inset-block-end: 0px; inset-block-start: 131.547px; inset-inline-end: 1821.55px; inset-inline-start: 609.828px; left: 609.828px; letter-spacing: 1.44px; line-height: 23.76px; list-style-type: none; outline-color: rgba(0, 0, 0, 0); perspective-origin: 38.3125px 1px; pointer-events: none; position: absolute; right: 1821.55px; text-decoration-color: rgba(0, 0, 0, 0); text-emphasis-color: rgba(0, 0, 0, 0); text-transform: uppercase; top: 131.547px; transform: matrix(0, 0, 0, 1, 0, 0); transform-origin: 0px 1px; transition-duration: 0.2s; transition-property: transform; transition-timing-function: ease-in-out; width: 76.625px; -webkit-text-fill-color: rgba(0, 0, 0, 0); -webkit-text-stroke-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=1]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 0px; caret-color: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0); column-rule-color: rgba(0, 0, 0, 0); content: "Shop by Type"; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 2px; inline-size: 110.078px; inset-block-end: 0px; inset-block-start: 131.547px; inset-inline-end: 1671.45px; inset-inline-start: 726.469px; left: 726.469px; letter-spacing: 1.44px; line-height: 23.76px; list-style-type: none; outline-color: rgba(0, 0, 0, 0); perspective-origin: 55.0312px 1px; pointer-events: none; position: absolute; right: 1671.45px; text-decoration-color: rgba(0, 0, 0, 0); text-emphasis-color: rgba(0, 0, 0, 0); text-transform: uppercase; top: 131.547px; transform: matrix(0, 0, 0, 1, 0, 0); transform-origin: 0px 1px; transition-duration: 0.2s; transition-property: transform; transition-timing-function: ease-in-out; width: 110.078px; -webkit-text-fill-color: rgba(0, 0, 0, 0); -webkit-text-stroke-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=2]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 0px; caret-color: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0); column-rule-color: rgba(0, 0, 0, 0); content: "Shop By Collection"; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 2px; inline-size: 172.016px; inset-block-end: 0px; inset-block-start: 131.547px; inset-inline-end: 1459.47px; inset-inline-start: 876.516px; left: 876.516px; letter-spacing: 1.44px; line-height: 23.76px; list-style-type: none; outline-color: rgba(0, 0, 0, 0); perspective-origin: 86px 1px; pointer-events: none; position: absolute; right: 1459.47px; text-decoration-color: rgba(0, 0, 0, 0); text-emphasis-color: rgba(0, 0, 0, 0); text-transform: uppercase; top: 131.547px; transform: matrix(0, 0, 0, 1, 0, 0); transform-origin: 0px 1px; transition-duration: 0.2s; transition-property: transform; transition-timing-function: ease-in-out; width: 172.016px; -webkit-text-fill-color: rgba(0, 0, 0, 0); -webkit-text-stroke-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=3]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 0px; caret-color: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0); column-rule-color: rgba(0, 0, 0, 0); content: "Set & Save"; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 2px; inline-size: 88.6562px; inset-block-end: 0px; inset-block-start: 131.547px; inset-inline-end: 1330.8px; inset-inline-start: 1088.55px; left: 1088.55px; letter-spacing: 1.44px; line-height: 23.76px; list-style-type: none; outline-color: rgba(0, 0, 0, 0); perspective-origin: 44.3281px 1px; pointer-events: none; position: absolute; right: 1330.8px; text-decoration-color: rgba(0, 0, 0, 0); text-emphasis-color: rgba(0, 0, 0, 0); text-transform: uppercase; top: 131.547px; transform: matrix(0, 0, 0, 1, 0, 0); transform-origin: 0px 1px; transition-duration: 0.2s; transition-property: transform; transition-timing-function: ease-in-out; width: 88.6562px; -webkit-text-fill-color: rgba(0, 0, 0, 0); -webkit-text-stroke-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=4]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 0px; caret-color: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0); column-rule-color: rgba(0, 0, 0, 0); content: "Ornaments"; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 2px; inline-size: 98.4062px; inset-block-end: 0px; inset-block-start: 131.547px; inset-inline-end: 1192.41px; inset-inline-start: 1217.19px; left: 1217.19px; letter-spacing: 1.44px; line-height: 23.76px; list-style-type: none; outline-color: rgba(0, 0, 0, 0); perspective-origin: 49.2031px 1px; pointer-events: none; position: absolute; right: 1192.41px; text-decoration-color: rgba(0, 0, 0, 0); text-emphasis-color: rgba(0, 0, 0, 0); text-transform: uppercase; top: 131.547px; transform: matrix(0, 0, 0, 1, 0, 0); transform-origin: 0px 1px; transition-duration: 0.2s; transition-property: transform; transition-timing-function: ease-in-out; width: 98.4062px; -webkit-text-fill-color: rgba(0, 0, 0, 0); -webkit-text-stroke-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=5]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 0px; caret-color: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0); column-rule-color: rgba(0, 0, 0, 0); content: "Our Services"; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 2px; inline-size: 112.641px; inset-block-end: 0px; inset-block-start: 131.547px; inset-inline-end: 1039.8px; inset-inline-start: 1355.56px; left: 1355.56px; letter-spacing: 1.44px; line-height: 23.76px; list-style-type: none; outline-color: rgba(0, 0, 0, 0); perspective-origin: 56.3125px 1px; pointer-events: none; position: absolute; right: 1039.8px; text-decoration-color: rgba(0, 0, 0, 0); text-emphasis-color: rgba(0, 0, 0, 0); text-transform: uppercase; top: 131.547px; transform: matrix(0, 0, 0, 1, 0, 0); transform-origin: 0px 1px; transition-duration: 0.2s; transition-property: transform; transition-timing-function: ease-in-out; width: 112.641px; -webkit-text-fill-color: rgba(0, 0, 0, 0); -webkit-text-stroke-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=6]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 117.375px; content: ""; display: block; height: 2px; inline-size: 207.719px; inset-block-end: 117.375px; inset-block-start: 0px; inset-inline-end: 0px; inset-inline-start: 0px; left: 0px; list-style-type: none; perspective-origin: 103.859px 1px; position: absolute; right: 0px; top: 0px; transform: matrix(0, 0, 0, 1, 0, 0); transform-origin: 0px 1px; transition-delay: 0.05s; transition-duration: 0.25s; transition-property: transform; transition-timing-function: ease-in-out; width: 207.719px; --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=7]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 0px; caret-color: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0); column-rule-color: rgba(0, 0, 0, 0); content: "About Us"; display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: 2px; inline-size: max-content; inset-block-end: 0px; letter-spacing: 1.44px; line-height: 23.76px; list-style-type: none; outline-color: rgba(0, 0, 0, 0); pointer-events: none; position: absolute; text-decoration-color: rgba(0, 0, 0, 0); text-emphasis-color: rgba(0, 0, 0, 0); text-transform: uppercase; transform-origin: 0% 50%; transition-duration: 0.2s; transition-property: transform; transition-timing-function: ease-in-out; width: max-content; -webkit-text-fill-color: rgba(0, 0, 0, 0); -webkit-text-stroke-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=8]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 0px; caret-color: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0); column-rule-color: rgba(0, 0, 0, 0); content: "Gift Registry"; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 2px; inline-size: 112.594px; inset-block-end: 0px; inset-block-start: 131.547px; inset-inline-end: 769.828px; inset-inline-start: 1625.58px; left: 1625.58px; letter-spacing: 1.44px; line-height: 23.76px; list-style-type: none; outline-color: rgba(0, 0, 0, 0); perspective-origin: 56.2969px 1px; pointer-events: none; position: absolute; right: 769.828px; text-decoration-color: rgba(0, 0, 0, 0); text-emphasis-color: rgba(0, 0, 0, 0); text-transform: uppercase; top: 131.547px; transform: matrix(0, 0, 0, 1, 0, 0); transform-origin: 0px 1px; transition-duration: 0.2s; transition-property: transform; transition-timing-function: ease-in-out; width: 112.594px; -webkit-text-fill-color: rgba(0, 0, 0, 0); -webkit-text-stroke-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=9]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 325.797px; content: ""; display: block; height: 2px; inline-size: 267.75px; inset-block-end: 325.797px; inset-block-start: 0px; inset-inline-end: 0px; inset-inline-start: 0px; left: 0px; list-style-type: none; perspective-origin: 133.875px 1px; position: absolute; right: 0px; top: 0px; transform: matrix(0, 0, 0, 1, 0, 0); transform-origin: 0px 1px; transition-delay: 0.05s; transition-duration: 0.25s; transition-property: transform; transition-timing-function: ease-in-out; width: 267.75px; --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=10]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 0px; caret-color: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0); column-rule-color: rgba(0, 0, 0, 0); content: "Blog"; display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: 2px; inline-size: max-content; inset-block-end: 0px; letter-spacing: 1.44px; line-height: 23.76px; list-style-type: none; outline-color: rgba(0, 0, 0, 0); pointer-events: none; position: absolute; text-decoration-color: rgba(0, 0, 0, 0); text-emphasis-color: rgba(0, 0, 0, 0); text-transform: uppercase; transform-origin: 0% 50%; transition-duration: 0.2s; transition-property: transform; transition-timing-function: ease-in-out; width: max-content; -webkit-text-fill-color: rgba(0, 0, 0, 0); -webkit-text-stroke-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=11]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 242.438px; content: ""; display: block; height: 2px; inline-size: 198px; inset-block-end: 242.438px; inset-block-start: 0px; inset-inline-end: 0px; inset-inline-start: 0px; left: 0px; list-style-type: none; perspective-origin: 99px 1px; position: absolute; right: 0px; top: 0px; transform: matrix(0, 0, 0, 1, 0, 0); transform-origin: 0px 1px; transition-delay: 0.05s; transition-duration: 0.25s; transition-property: transform; transition-timing-function: ease-in-out; width: 198px; --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=12]::before{background-color: rgb(0, 0, 0); block-size: 2px; bottom: 0px; caret-color: rgba(0, 0, 0, 0); color: rgba(0, 0, 0, 0); column-rule-color: rgba(0, 0, 0, 0); content: "Sale"; display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: 2px; inline-size: max-content; inset-block-end: 0px; letter-spacing: 1.44px; line-height: 23.76px; list-style-type: none; outline-color: rgba(0, 0, 0, 0); pointer-events: none; position: absolute; text-decoration-color: rgba(0, 0, 0, 0); text-emphasis-color: rgba(0, 0, 0, 0); text-transform: uppercase; transform-origin: 0% 50%; transition-duration: 0.2s; transition-property: transform; transition-timing-function: ease-in-out; width: max-content; -webkit-text-fill-color: rgba(0, 0, 0, 0); -webkit-text-stroke-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --header-transparent-header-text-color: 255 255 255; --header-padding-block: 1.2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=13]::before{background-image: linear-gradient(rgba(0, 0, 0, 0), rgb(255, 255, 255)); block-size: 40px; bottom: 100%; content: ""; display: block; height: 40px; inline-size: 100%; inset-block-end: 100%; inset-inline-start: 0px; left: 0px; position: absolute; width: 100%; --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=14]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=14]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=15]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=15]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=16]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=16]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=17]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=17]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=18]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=18]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=19]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=19]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=20]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=20]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=21]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=21]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=22]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=22]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=23]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=23]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=24]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=24]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=25]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=25]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=26]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=26]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=27]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=27]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=28]::after{background-color: rgb(0, 0, 0); block-size: 10px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 1px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}[data-id=28]::before{background-color: rgb(0, 0, 0); block-size: 1px; content: ""; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 1px; inline-size: 10px; inset-block-start: 50%; inset-inline-start: 50%; left: 50%; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; position: absolute; text-transform: uppercase; top: 50%; transition-behavior: normal, normal; transition-delay: 0s, 0s; transition-duration: 0.25s, 0.25s; transition-property: transform, opacity; transition-timing-function: ease-in-out, ease-in-out; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); --header-logo-width: 145px; --header-separation-border-color: 0 0 0 / 0; --header-show-transparent-logo: 0; --drawer-max-width: min(92vw, 25rem); --drawer-footer-padding-block: 2rem; --header-transparent-header-text-color: 255 255 255; --drawer-body-padding-block: 2rem; --drawer-header-padding-block: 1.125rem; --animated-plus-size: .625rem; --drawer-header-padding-inline: 2rem; --header-padding-block: 1.2rem; --header-linklist-padding-block: 1.25rem; --drawer-footer-padding-inline: 2rem; --distance-to-bleed: 2rem; --drawer-body-padding-inline: 2rem; --header-grid: ". logo secondary-nav" "primary-nav primary-nav primary-nav" / minmax(0, 1fr) auto minmax(0, 1fr);}</style>
  </head>
  <body>
    <height-observer variable="header" style="block-size: 133.547px; height: 133.547px; perspective-origin: 1254px 66.7656px; transform-origin: 1254px 66.7734px;">
    <x-header class="header color-scheme color-scheme--scheme-3b01d617-2208-42dc-9c68-7a045a785c84" style="align-items: center; background-color: rgb(255, 255, 255); block-size: 133.547px; inset: 0px; box-shadow: rgba(0, 0, 0, 0) 0px -1px 0px 0px inset; gap: 19.2px 40px; display: grid; grid-template: &quot;. logo secondary-nav&quot; 51.5px &quot;primary-nav primary-nav primary-nav&quot; 24.4844px / 1093.5px 145px 1093.5px; height: 133.547px; inline-size: 2508px; inset-block: 0px; inset-inline: 0px; justify-content: center; padding-block: 19.2px; padding: 19.2px 48px; padding-inline: 48px; perspective-origin: 1254px 66.7656px; position: relative; reading-flow: grid-columns; transform-origin: 1254px 66.7734px; transition: background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s, transform 0.15s ease-in-out; width: 2508px;"><h1 class="header__logo" style="block-size: 51.5px; inset: 0px; grid-area: logo; height: 51.5px; inline-size: 145px; inset-block: 0px; inset-inline: 0px; justify-self: start; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 72.5px 25.75px; position: relative; transform-origin: 72.5px 25.75px; width: 145px;">
      <a href="/" style="cursor: pointer; font-size: 36px; font-weight: 700; line-height: 59.4px;"><span class="sr-only" style="block-size: 1px; inset: 0px 146px 52.5px 0px; clip: rect(0px, 0px, 0px, 0px); cursor: pointer; display: block; font-size: 36px; font-weight: 700; height: 1px; inline-size: 1px; inset-block: 0px 52.5px; inset-inline: 0px 146px; line-height: 59.4px; margin-block: -1px; margin: -1px; margin-inline: -1px; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 0.5px 0.5px; position: absolute; text-wrap-mode: nowrap; transform-origin: 0.5px 0.5px; width: 1px;">CotFon Colors by Laura Johnson</span>
        </a>
    </h1>

      <nav class="header__primary-nav header__primary-nav--center" aria-label="Primary navigation" style="align-items: center; block-size: 24.4844px; gap: 10px 40px; display: flex; flex-wrap: wrap; grid-area: primary-nav; height: 24.4844px; inline-size: 2412px; justify-content: safe center; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1206px 12.2344px; transform-origin: 1206px 12.2422px; width: 2412px;">
        <button type="button" aria-controls="sidebar-menu" class="md:hidden" style="block-size: auto; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <span class="sr-only" style="block-size: 1px; clip: rect(0px, 0px, 0px, 0px); cursor: pointer; display: block; height: 1px; inline-size: 1px; margin-block: -1px; margin: -1px; margin-inline: -1px; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 50% 50%; position: absolute; text-align: center; text-wrap-mode: nowrap; transform-origin: 50% 50%; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Navigation menu</span><svg aria-hidden="true" fill="none" focusable="false" width="24" class="header__nav-icon icon icon-hamburger" viewBox="0 0 24 24" style="block-size: auto; cursor: pointer; fill: none; height: auto; inline-size: 24px; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow: hidden; perspective-origin: 50% 50%; text-align: center; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 24px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
          <path d="M1 19h22M1 12h22M1 5h22" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"></path>
        </svg></button><ul class="contents unstyled-list md-max:hidden" style="block-size: auto; display: contents; height: auto; inline-size: auto; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">

        <li class="header__primary-nav-item" data-title="Featured" style="block-size: 24.4844px; height: 24.4844px; inline-size: 76.625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38.3125px 12.2344px; transform-origin: 38.3125px 12.2422px; width: 76.625px;" data-id="0">
          <mega-menu-disclosure follow-summary-link="" trigger="hover" class="contents" style="display: contents; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;"><details class="header__menu-disclosure" aria-expanded="false" style="block-size: 24.4844px; height: 24.4844px; inline-size: 76.625px; list-style-type: none; perspective-origin: 38.3125px 12.2344px; transform-origin: 38.3125px 12.2422px; width: 76.625px;">
            <summary data-follow-link="#" class="h6" style="block-size: 24.4844px; display: list-item; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 76.625px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; perspective-origin: 38.3125px 12.2344px; text-transform: uppercase; transform-origin: 38.3125px 12.2422px; width: 76.625px;">Featured</summary><div class="mega-menu " style="align-items: start; background-color: rgb(255, 255, 255); block-size: 1158.3px; border-block-end-width: 1px; border-bottom-width: 1px; inset: 0px -19.375px -1158.3px 0px; column-gap: 100px; display: flex; height: 1158.3px; inline-size: 96px; inset-block: 0px -1158.3px; inset-inline: 0px -19.375px; justify-content: safe center; list-style-type: none; max-block-size: 1158.31px; max-height: 1158.31px; overflow-block: auto; overflow-inline: auto; overflow: auto; padding-block: 40px; padding: 40px 48px; padding-inline: 48px; perspective-origin: 48px 579.141px; position: absolute; transform-origin: 48px 579.148px; width: 96px;"><ul class="mega-menu__linklist unstyled-list" style="block-size: 6200.22px; gap: 40px 100px; display: flex; flex-wrap: wrap; height: 6200.22px; inline-size: 0px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 3100.11px; transform-origin: 0px 3100.11px; width: 0px;"><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 630.266px; gap: 20px; display: grid; grid-template-columns: 0px; grid-template-rows: 342.766px 267.5px; height: 630.266px; inline-size: 0px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 315.125px; transform-origin: 0px 315.133px; width: 0px;">
            <a href="/collections/new-arrivals" class="h6" style="block-size: 342.781px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 342.781px; inline-size: 15.6875px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 7.84375px 171.391px; text-transform: uppercase; transform-origin: 7.84375px 171.391px; width: 15.6875px;">New &amp; Noteworthy</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 267.5px; gap: 10px; display: grid; grid-template-columns: 0px; grid-template-rows: 59.375px 29.6875px 89.0625px 59.375px; height: 267.5px; inline-size: 0px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 133.75px; transform-origin: 0px 133.75px; width: 0px;"><li style="block-size: 59.375px; height: 59.375px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 29.6875px; transform-origin: 0px 29.6875px; width: 0px;">
            <a href="/collections/new-arrivals" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">New Arrivals</a>
          </li><li style="inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 14.8438px; transform-origin: 0px 14.8438px; width: 0px;">
            <a href="/collections/retiring" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Retiring</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/pages/table-settings" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Set Your Table</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 29.6875px; transform-origin: 0px 29.6875px; width: 0px;">
            <a href="/collections/all" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Shop Everything</a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 2942.95px; gap: 20px; display: grid; grid-template-columns: 0px; grid-template-rows: 734.516px 2188.44px; height: 2942.95px; inline-size: 0px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 1471.47px; transform-origin: 0px 1471.48px; width: 0px;">
            <a href="/pages/all-curated-gatherings" class="h6" style="block-size: 734.531px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 734.531px; inline-size: 13.1094px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 6.54688px 367.266px; text-transform: uppercase; transform-origin: 6.55469px 367.266px; width: 13.1094px;">Spring &amp; Summer Curated Gatherings</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 2188.44px; gap: 10px; display: grid; grid-template-columns: 0px; grid-template-rows: 118.75px 89.0625px 118.75px 237.5px 178.125px 237.5px 89.0625px 89.0625px 118.75px 148.438px 89.0625px 89.0625px 178.125px 148.438px 118.75px; height: 2188.44px; inline-size: 0px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 1094.22px; transform-origin: 0px 1094.22px; width: 0px;"><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/pages/easter-in-bloom-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Easter in Bloom Gathering</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/pages/spring-awakening-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Spring Awakening Gathering</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/pages/for-baby-smith-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">For Baby Smith Gathering</a>
          </li><li style="block-size: 237.5px; height: 237.5px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 118.75px; transform-origin: 0px 118.75px; width: 0px;">
            <a href="/pages/blooming-bridal-party-luncheon-curated-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Bright {White} and Blooming Bridal Party Luncheon Gathering</a>
          </li><li style="block-size: 178.125px; height: 178.125px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 89.0625px; transform-origin: 0px 89.0625px; width: 0px;">
            <a href="/pages/a-something-blue-bridal-shower-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">A Something Blue Bridal Shower Gathering</a>
          </li><li style="block-size: 237.5px; height: 237.5px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 118.75px; transform-origin: 0px 118.75px; width: 0px;">
            <a href="/pages/a-miss-to-mrs-merriment-gathering-for-logan" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">A Miss to Mrs. Merriment Gathering for Logan</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/pages/spontaneous-salud-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Spontaneous ¡Salud! Gathering</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/pages/havana-nights-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Havana Nights Gathering</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/pages/by-the-bay-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">By The Bay Gathering</a>
          </li><li style="block-size: 148.438px; height: 148.438px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 74.2188px; transform-origin: 0px 74.2188px; width: 0px;">
            <a href="/pages/tapas-and-a-toast-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Tapas and a Toast Gathering</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/pages/spring-citrus-celebration" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Citrus Celebration Gathering</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/pages/frond-fete-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Frond Fête Gathering</a>
          </li><li style="block-size: 178.125px; height: 178.125px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 89.0625px; transform-origin: 0px 89.0625px; width: 0px;">
            <a href="/pages/how-does-your-garden-grow-curated-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">How Does Your Garden Grow? Gathering</a>
          </li><li style="block-size: 148.438px; height: 148.438px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 74.2188px; transform-origin: 0px 74.2188px; width: 0px;">
            <a href="/pages/winning-night-of-cards-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Winning Night of Cards Gathering</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/pages/all-curated-gatherings" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Explore All Curated Gatherings</a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 2547.02px; gap: 20px; display: grid; grid-template-columns: 0px; grid-template-rows: 734.516px 1792.5px; height: 2547.02px; inline-size: 0px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 1273.5px; transform-origin: 0px 1273.51px; width: 0px;">
            <a href="/pages/all-curated-gatherings" class="h6" style="block-size: 734.531px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 734.531px; inline-size: 13.0938px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 6.54688px 367.266px; text-transform: uppercase; transform-origin: 6.54688px 367.266px; width: 13.0938px;">Autumn &amp; Holiday Curated Gatherings</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 1792.5px; gap: 10px; display: grid; grid-template-columns: 0px; grid-template-rows: 89.0625px 118.75px 118.75px 148.438px 118.75px 118.75px 148.438px 148.438px 89.0625px 89.0625px 118.75px 89.0625px 148.438px 118.75px; height: 1792.5px; inline-size: 0px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 896.25px; transform-origin: 0px 896.25px; width: 0px;"><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/pages/chop-night-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Chop Night Gathering</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/pages/for-baby-firth-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">For Baby Firth Gathering</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/pages/festa-della-pizza-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Festa Della Pizza Gathering</a>
          </li><li style="block-size: 148.438px; height: 148.438px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 74.2188px; transform-origin: 0px 74.2188px; width: 0px;">
            <a href="/pages/gumbo-and-the-game-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Gumbo and The Game Gathering</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/pages/fondue-of-you-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Fondue of You Gathering</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/pages/lunar-new-year-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Lunar New Year Gathering</a>
          </li><li style="block-size: 148.438px; height: 148.438px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 74.2188px; transform-origin: 0px 74.2188px; width: 0px;">
            <a href="/pages/a-berry-christmas-morning-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">A Berry Christmas Morning Gathering</a>
          </li><li style="block-size: 148.438px; height: 148.438px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 74.2188px; transform-origin: 0px 74.2188px; width: 0px;">
            <a href="/pages/christmas-eve-by-candlelight-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Christmas Eve by Candlelight Gathering</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/pages/christmas-cheer-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Christmas Cheer Gathering</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/pages/give-thanks-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Give Thanks Gathering</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/pages/charbooterie-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Char-BOO-terie Gathering</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/pages/cozy-coquette-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Cozy Coquette Gathering</a>
          </li><li style="block-size: 148.438px; height: 148.438px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 74.2188px; transform-origin: 0px 74.2188px; width: 0px;">
            <a href="/pages/sit-for-a-spell-gathering" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Sit for a Spell Gathering</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/pages/all-curated-gatherings" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Explore All Curated Gatherings</a>
          </li></ul></li></ul><div class="mega-menu__promo" style="block-size: 426.422px; column-gap: 32px; display: flex; height: 426.422px; inline-size: 240px; justify-content: flex-end; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 120px 213.203px; transform-origin: 120px 213.211px; width: 240px;"><a href="/pages/table-settings" class="v-stack justify-items-center gap-4 sm:gap-5 group" style="align-content: start; block-size: 426.422px; gap: 20px; cursor: pointer; display: grid; flex-basis: 315px; flex-grow: 1; grid-template-columns: 240px; grid-template-rows: 240px 166.422px; height: 426.422px; inline-size: 240px; justify-items: safe center; list-style-type: none; max-inline-size: 315px; max-width: 315px; min-block-size: auto; min-height: auto; min-inline-size: 240px; min-width: 240px; perspective-origin: 120px 213.203px; transform-origin: 120px 213.211px; width: 240px;"><div class="overflow-hidden" style="block-size: 240px; cursor: pointer; height: 240px; inline-size: 240px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 120px 120px; transform-origin: 120px 120px; width: 240px;">
            </div><div class="v-stack text-center gap-2.5" style="align-content: start; block-size: 166.422px; gap: 10px; cursor: pointer; display: grid; grid-template-columns: 240px; grid-template-rows: 24.4844px 131.938px; height: 166.422px; inline-size: 240px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 120px 83.2031px; text-align: center; transform-origin: 120px 83.2109px; width: 240px;"><p class="h6" style="block-size: 24.4844px; cursor: pointer; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 240px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 120px 12.2344px; text-align: center; text-transform: uppercase; transform-origin: 120px 12.2422px; width: 240px;">'Set Your Table' Gallery</p><p class="smallcaps text-xs text-subdued" style="block-size: 131.953px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; font-size: 16px; height: 131.953px; inline-size: 240px; letter-spacing: 1.6px; line-height: 26.4px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; outline-color: rgba(0, 0, 0, 0.65); perspective-origin: 120px 65.9688px; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 120px 65.9766px; width: 240px; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Discover dozens of curated table setting looks to shop directly or make your own.</p></div></a></div></div></details></mega-menu-disclosure></li>

        <li class="header__primary-nav-item" data-title="Shop by Type" style="block-size: 24.4844px; height: 24.4844px; inline-size: 110.047px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 55.0156px 12.2344px; transform-origin: 55.0234px 12.2422px; width: 110.047px;" data-id="1">
          <mega-menu-disclosure follow-summary-link="" trigger="hover" class="contents" style="display: contents; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;"><details class="header__menu-disclosure" aria-expanded="false" style="block-size: 24.4844px; height: 24.4844px; inline-size: 110.062px; list-style-type: none; perspective-origin: 55.0312px 12.2344px; transform-origin: 55.0312px 12.2422px; width: 110.062px;">
            <summary data-follow-link="#" class="h6" style="block-size: 24.4844px; display: list-item; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 110.078px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; perspective-origin: 55.0312px 12.2344px; text-transform: uppercase; transform-origin: 55.0391px 12.2422px; width: 110.078px;">Shop by Type</summary><div class="mega-menu " style="align-items: start; background-color: rgb(255, 255, 255); block-size: 1158.3px; border-block-end-width: 1px; border-bottom-width: 1px; inset: 0px 0px -1158.3px; column-gap: 100px; display: flex; height: 1158.3px; inline-size: 110.062px; inset-block: 0px -1158.3px; inset-inline: 0px; justify-content: safe center; list-style-type: none; max-block-size: 1158.31px; max-height: 1158.31px; overflow-block: auto; overflow-inline: auto; overflow: auto; padding-block: 40px; padding: 40px 48px; padding-inline: 48px; perspective-origin: 55.0312px 579.141px; position: absolute; transform-origin: 55.0312px 579.148px; width: 110.062px;"><ul class="mega-menu__linklist unstyled-list" style="block-size: 3293.28px; gap: 40px 100px; display: flex; flex-wrap: wrap; height: 3293.28px; inline-size: 14.0625px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 1646.64px; transform-origin: 7.03125px 1646.64px; width: 14.0625px;"><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 632.125px; gap: 20px; display: grid; grid-template-columns: 14.0625px; grid-template-rows: 195.875px 416.25px; height: 632.125px; inline-size: 14.0625px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 316.062px; transform-origin: 7.03125px 316.062px; width: 14.0625px;">
            <a href="/collections/tabletop" class="h6" style="block-size: 195.875px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 195.875px; inline-size: 14.0625px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 7.03125px 97.9375px; text-transform: uppercase; transform-origin: 7.03125px 97.9375px; width: 14.0625px;">Tabletop</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 416.25px; gap: 10px; display: grid; grid-template-columns: 14.0625px; grid-template-rows: 59.375px 59.375px 29.6875px 29.6875px 59.375px 29.6875px 89.0625px; height: 416.25px; inline-size: 14.0625px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 208.125px; transform-origin: 7.03125px 208.125px; width: 14.0625px;"><li style="block-size: 59.375px; height: 59.375px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 29.6875px; transform-origin: 7.03125px 29.6875px; width: 14.0625px;">
            <a href="/collections/dinner-plates" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Dinner Plates</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 29.6875px; transform-origin: 7.03125px 29.6875px; width: 14.0625px;">
            <a href="/collections/salad-plates" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Salad Plates</a>
          </li><li style="inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 14.8438px; transform-origin: 7.03125px 14.8438px; width: 14.0625px;">
            <a href="/collections/bowls" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Bowls</a>
          </li><li style="inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 14.8438px; transform-origin: 7.03125px 14.8438px; width: 14.0625px;">
            <a href="/collections/mugs" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Mugs</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 29.6875px; transform-origin: 7.03125px 29.6875px; width: 14.0625px;">
            <a href="/collections/table-linens" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Table Linens</a>
          </li><li style="inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 14.8438px; transform-origin: 7.03125px 14.8438px; width: 14.0625px;">
            <a href="/collections/dish-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Sets</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 44.5312px; transform-origin: 7.03125px 44.5312px; width: 14.0625px;">
            <a href="/collections/dinnerware" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Shop All Dinnerware</a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 1007.23px; gap: 20px; display: grid; grid-template-columns: 14.0625px; grid-template-rows: 293.797px 693.438px; height: 1007.23px; inline-size: 14.0625px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 503.609px; transform-origin: 7.03125px 503.617px; width: 14.0625px;">
            <a href="#" class="h6" style="block-size: 293.812px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 293.812px; inline-size: 14.0625px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 7.03125px 146.906px; text-transform: uppercase; transform-origin: 7.03125px 146.906px; width: 14.0625px;">Entertaining</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 693.438px; gap: 10px; display: grid; grid-template-columns: 14.0625px; grid-template-rows: 59.375px 59.375px 59.375px 29.6875px 89.0625px 59.375px 118.75px 148.438px; height: 693.438px; inline-size: 14.0625px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 346.719px; transform-origin: 7.03125px 346.719px; width: 14.0625px;"><li style="block-size: 59.375px; height: 59.375px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 29.6875px; transform-origin: 7.03125px 29.6875px; width: 14.0625px;">
            <a href="/collections/serving-platters" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Serving Platters</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 29.6875px; transform-origin: 7.03125px 29.6875px; width: 14.0625px;">
            <a href="/collections/serving-bowls" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Serving Bowls</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 29.6875px; transform-origin: 7.03125px 29.6875px; width: 14.0625px;">
            <a href="/collections/table-accessories" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Table Accessories</a>
          </li><li style="inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 14.8438px; transform-origin: 7.03125px 14.8438px; width: 14.0625px;">
            <a href="/collections/utensils" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Utensils</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 44.5312px; transform-origin: 7.03125px 44.5312px; width: 14.0625px;">
            <a href="/collections/cookware-bakeware" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Cookware &amp; Bakeware</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 29.6875px; transform-origin: 7.03125px 29.6875px; width: 14.0625px;">
            <a href="/collections/cocktail-napkins" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Cocktail Napkins</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 59.375px; transform-origin: 7.03125px 59.375px; width: 14.0625px;">
            <a href="/pages/build-your-own-board" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Build Your Own Board</a>
          </li><li style="block-size: 148.438px; height: 148.438px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 74.2188px; transform-origin: 7.03125px 74.2188px; width: 14.0625px;">
            <a href="/collections/serving-entertaining" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Shop All Serveware &amp; Entertaining </a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 494.484px; gap: 20px; display: grid; grid-template-columns: 14.0625px; grid-template-rows: 97.9375px 376.547px; height: 494.484px; inline-size: 14.0625px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 247.234px; transform-origin: 7.03125px 247.242px; width: 14.0625px;">
            <a href="/collections/shop-all-home" class="h6" style="block-size: 97.9375px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 97.9375px; inline-size: 14.0625px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 7.03125px 48.9688px; text-transform: uppercase; transform-origin: 7.03125px 48.9688px; width: 14.0625px;">Home</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 376.562px; gap: 10px; display: grid; grid-template-columns: 14.0625px; grid-template-rows: 29.6875px 29.6875px 59.375px 59.375px 59.375px 89.0625px; height: 376.562px; inline-size: 14.0625px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 188.281px; transform-origin: 7.03125px 188.281px; width: 14.0625px;"><li style="inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 14.8438px; transform-origin: 7.03125px 14.8438px; width: 14.0625px;">
            <a href="/collections/vases" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Vases</a>
          </li><li style="inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 14.8438px; transform-origin: 7.03125px 14.8438px; width: 14.0625px;">
            <a href="/collections/frames" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Frames</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 29.6875px; transform-origin: 7.03125px 29.6875px; width: 14.0625px;">
            <a href="/collections/hand-towels" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Hand Towels</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 29.6875px; transform-origin: 7.03125px 29.6875px; width: 14.0625px;">
            <a href="/collections/christmas-decor" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Seasonal Decor</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 29.6875px; transform-origin: 7.03125px 29.6875px; width: 14.0625px;">
            <a href="/collections/plate-stands" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Plate Stands</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 44.5312px; transform-origin: 7.03125px 44.5312px; width: 14.0625px;">
            <a href="/collections/shop-all-home" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Shop All Home</a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 1039.47px; gap: 20px; display: grid; grid-template-columns: 14.0625px; grid-template-rows: 514.172px 505.297px; height: 1039.47px; inline-size: 14.0625px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 519.734px; transform-origin: 7.03125px 519.734px; width: 14.0625px;">
            <a href="#" class="h6" style="block-size: 514.172px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 514.172px; inline-size: 14.0625px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 7.03125px 257.078px; text-transform: uppercase; transform-origin: 7.03125px 257.086px; width: 14.0625px;">Commemorative Keepsakes</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 505.312px; gap: 10px; display: grid; grid-template-columns: 14.0625px; grid-template-rows: 89.0625px 29.6875px 29.6875px 29.6875px 59.375px 118.75px 89.0625px; height: 505.312px; inline-size: 14.0625px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 252.656px; transform-origin: 7.03125px 252.656px; width: 14.0625px;"><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 44.5312px; transform-origin: 7.03125px 44.5312px; width: 14.0625px;">
            <a href="/collections/shop-all-babies-children" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Babies &amp; Children</a>
          </li><li style="inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 14.8438px; transform-origin: 7.03125px 14.8438px; width: 14.0625px;">
            <a href="/collections/wedding" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Wedding</a>
          </li><li style="inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 14.8438px; transform-origin: 7.03125px 14.8438px; width: 14.0625px;">
            <a href="/collections/birthday" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Birthday</a>
          </li><li style="inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 14.8438px; transform-origin: 7.03125px 14.8438px; width: 14.0625px;">
            <a href="/collections/pet" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Pet</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 29.6875px; transform-origin: 7.03125px 29.6875px; width: 14.0625px;">
            <a href="/collections/shop-all-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Commemorative Ornaments</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 59.375px; transform-origin: 7.03125px 59.375px; width: 14.0625px;">
            <a href="/collections/ornaments-accessories" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Ornament Stands &amp; Storage</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 14.0625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 7.03125px 44.5312px; transform-origin: 7.03125px 44.5312px; width: 14.0625px;">
            <a href="/collections/shop-all-celebrations" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Shop All Celebrations</a>
          </li></ul></li></ul></div></details></mega-menu-disclosure></li>

        <li class="header__primary-nav-item" data-title="Shop By Collection" style="block-size: 24.4844px; height: 24.4844px; inline-size: 172.016px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 86px 12.2344px; transform-origin: 86.0078px 12.2422px; width: 172.016px;" data-id="2">
          <mega-menu-disclosure follow-summary-link="" trigger="hover" class="contents" style="display: contents; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;"><details class="header__menu-disclosure" aria-expanded="false" style="block-size: 24.4844px; height: 24.4844px; inline-size: 172.016px; list-style-type: none; perspective-origin: 86px 12.2344px; transform-origin: 86.0078px 12.2422px; width: 172.016px;">
            <summary data-follow-link="#" class="h6" style="block-size: 24.4844px; display: list-item; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 172.016px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; perspective-origin: 86px 12.2344px; text-transform: uppercase; transform-origin: 86.0078px 12.2422px; width: 172.016px;">Shop By Collection</summary><div class="mega-menu " style="align-items: start; background-color: rgb(255, 255, 255); block-size: 1158.3px; border-block-end-width: 1px; border-bottom-width: 1px; inset: 0px 0px -1158.3px; column-gap: 100px; display: flex; height: 1158.3px; inline-size: 172.016px; inset-block: 0px -1158.3px; inset-inline: 0px; justify-content: safe center; list-style-type: none; max-block-size: 1158.31px; max-height: 1158.31px; overflow-block: auto; overflow-inline: auto; overflow: auto; padding-block: 40px; padding: 40px 48px; padding-inline: 48px; perspective-origin: 86px 579.141px; position: absolute; transform-origin: 86.0078px 579.148px; width: 172.016px;"><ul class="mega-menu__linklist unstyled-list" style="block-size: 1336.5px; gap: 40px 100px; display: flex; flex-wrap: wrap; height: 1336.5px; inline-size: 76.0156px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 668.25px; transform-origin: 38.0078px 668.25px; width: 76.0156px;"><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 603.875px; gap: 20px; display: grid; grid-template-columns: 76px; grid-template-rows: 97.9375px 485.938px; height: 603.875px; inline-size: 76px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 301.938px; transform-origin: 38px 301.938px; width: 76px;">
            <a href="#" class="h6" style="block-size: 97.9375px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 97.9375px; inline-size: 76.0156px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 38px 48.9688px; text-transform: uppercase; transform-origin: 38.0078px 48.9688px; width: 76.0156px;">Everyday Collections</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 485.938px; gap: 10px; display: grid; grid-template-columns: 76px; grid-template-rows: 59.375px 29.6875px 29.6875px 29.6875px 29.6875px 29.6875px 29.6875px 29.6875px 29.6875px 29.6875px 59.375px; height: 485.938px; inline-size: 76px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 242.969px; transform-origin: 38px 242.969px; width: 76px;"><li style="block-size: 59.375px; height: 59.375px; inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 29.6875px; transform-origin: 38.0078px 29.6875px; width: 76.0156px;">
            <a href="/collections/signature-white" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Signature White</a>
          </li><li style="inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 14.8438px; transform-origin: 38.0078px 14.8438px; width: 76.0156px;">
            <a href="/collections/deco" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Deco</a>
          </li><li style="inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 14.8438px; transform-origin: 38.0078px 14.8438px; width: 76.0156px;">
            <a href="/collections/iris-blue" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Iris Blue</a>
          </li><li style="inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 14.8438px; transform-origin: 38.0078px 14.8438px; width: 76.0156px;">
            <a href="/collections/crew" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Crew</a>
          </li><li style="inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 14.8438px; transform-origin: 38.0078px 14.8438px; width: 76.0156px;">
            <a href="/collections/fundamentals" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Fundamentals</a>
          </li><li style="inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 14.8438px; transform-origin: 38.0078px 14.8438px; width: 76.0156px;">
            <a href="/collections/strata" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Strata</a>
          </li><li style="inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 14.8438px; transform-origin: 38.0078px 14.8438px; width: 76.0156px;">
            <a href="/collections/buffalo" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Buffalo</a>
          </li><li style="inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 14.8438px; transform-origin: 38.0078px 14.8438px; width: 76.0156px;">
            <a href="/collections/citrus" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Citrus</a>
          </li><li style="inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 14.8438px; transform-origin: 38.0078px 14.8438px; width: 76.0156px;">
            <a href="/collections/oyster" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Oyster</a>
          </li><li style="inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 14.8438px; transform-origin: 38.0078px 14.8438px; width: 76.0156px;">
            <a href="/collections/palm-collection" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Palm</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 29.6875px; transform-origin: 38.0078px 29.6875px; width: 76.0156px;">
            <a href="/collections/pastel-petite" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Pastel Petite</a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 692.625px; gap: 20px; display: grid; grid-template-columns: 76px; grid-template-rows: 97.9375px 574.688px; height: 692.625px; inline-size: 76px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 346.312px; transform-origin: 38px 346.312px; width: 76px;">
            <a href="/collections/shop-all-seasonal" class="h6" style="block-size: 97.9375px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 97.9375px; inline-size: 76.0156px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 38px 48.9688px; text-transform: uppercase; transform-origin: 38.0078px 48.9688px; width: 76.0156px;">Seasonal Collections</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 574.688px; gap: 10px; display: grid; grid-template-columns: 76px; grid-template-rows: 29.6875px 29.6875px 89.0625px 89.0625px 59.375px 59.375px 59.375px 89.0625px; height: 574.688px; inline-size: 76px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 287.344px; transform-origin: 38px 287.344px; width: 76px;"><li style="inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 14.8438px; transform-origin: 38.0078px 14.8438px; width: 76.0156px;">
            <a href="/collections/speckled-rabbit-collection" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Easter</a>
          </li><li style="inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 14.8438px; transform-origin: 38.0078px 14.8438px; width: 76.0156px;">
            <a href="/collections/thanksgiving" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Thanksgiving</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 44.5312px; transform-origin: 38.0078px 44.5312px; width: 76.0156px;">
            <a href="/collections/balsam-and-berry" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Balsam and Berry</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 44.5312px; transform-origin: 38.0078px 44.5312px; width: 76.0156px;">
            <a href="/collections/christmas-in-the-village" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Christmas in the Village</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 29.6875px; transform-origin: 38.0078px 29.6875px; width: 76.0156px;">
            <a href="/collections/o-holy-night" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">O Holy Night</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 29.6875px; transform-origin: 38.0078px 29.6875px; width: 76.0156px;">
            <a href="/collections/north-pole" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">North Pole</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 29.6875px; transform-origin: 38.0078px 29.6875px; width: 76.0156px;">
            <a href="/collections/valentines-day" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Valentine's Day</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 76.0156px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38px 44.5312px; transform-origin: 38.0078px 44.5312px; width: 76.0156px;">
            <a href="/collections/shop-all-seasonal" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Shop All Seasonal Collections</a>
          </li></ul></li></ul></div></details></mega-menu-disclosure></li>

        <li class="header__primary-nav-item" data-title="Set &amp; Save" style="block-size: 24.4844px; height: 24.4844px; inline-size: 88.625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 44.3125px 12.2344px; transform-origin: 44.3125px 12.2422px; width: 88.625px;" data-id="3">
          <mega-menu-disclosure follow-summary-link="" trigger="hover" class="contents" style="display: contents; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;"><details class="header__menu-disclosure" aria-expanded="false" style="block-size: 24.4844px; height: 24.4844px; inline-size: 88.6406px; list-style-type: none; perspective-origin: 44.3125px 12.2344px; transform-origin: 44.3203px 12.2422px; width: 88.6406px;">
            <summary data-follow-link="/collections/set-and-save" class="h6" style="block-size: 24.4844px; display: list-item; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 88.6562px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; perspective-origin: 44.3281px 12.2344px; text-transform: uppercase; transform-origin: 44.3281px 12.2422px; width: 88.6562px;">Set &amp; Save</summary><div class="mega-menu " style="align-items: start; background-color: rgb(255, 255, 255); block-size: 1158.3px; border-block-end-width: 1px; border-bottom-width: 1px; inset: 0px -7.35938px -1158.3px 0px; column-gap: 100px; display: flex; height: 1158.3px; inline-size: 96px; inset-block: 0px -1158.3px; inset-inline: 0px -7.35938px; justify-content: safe center; list-style-type: none; max-block-size: 1158.31px; max-height: 1158.31px; overflow-block: auto; overflow-inline: auto; overflow: auto; padding-block: 40px; padding: 40px 48px; padding-inline: 48px; perspective-origin: 48px 579.141px; position: absolute; transform-origin: 48px 579.148px; width: 96px;"><ul class="mega-menu__linklist unstyled-list" style="block-size: 2995.47px; gap: 40px 100px; display: flex; flex-wrap: wrap; height: 2995.47px; inline-size: 0px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 1497.73px; transform-origin: 0px 1497.73px; width: 0px;"><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 1414.19px; gap: 20px; display: grid; grid-template-columns: 0px; grid-template-rows: 661.062px 733.125px; height: 1414.19px; inline-size: 0px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 707.094px; transform-origin: 0px 707.094px; width: 0px;">
            <a href="/collections/tabletop-entertaining-sets" class="h6" style="block-size: 661.078px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 661.078px; inline-size: 12.8281px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 6.40625px 330.531px; text-transform: uppercase; transform-origin: 6.41406px 330.539px; width: 12.8281px;">Tabletop and Entertaining Sets</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 733.125px; gap: 10px; display: grid; grid-template-columns: 0px; grid-template-rows: 59.375px 59.375px 89.0625px 89.0625px 59.375px 89.0625px 59.375px 59.375px 89.0625px; height: 733.125px; inline-size: 0px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 366.562px; transform-origin: 0px 366.562px; width: 0px;"><li style="block-size: 59.375px; height: 59.375px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 29.6875px; transform-origin: 0px 29.6875px; width: 0px;">
            <a href="/collections/dinnerware-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Dinnerware Sets</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 29.6875px; transform-origin: 0px 29.6875px; width: 0px;">
            <a href="/collections/drinkware-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Drinkware Sets</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/collections/table-linens" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Table Linens Sets</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/collections/table-decor-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Table Decor Sets</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 29.6875px; transform-origin: 0px 29.6875px; width: 0px;">
            <a href="/collections/serveware-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Serveware Sets</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/collections/home-decor-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Home Decor Sets</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 29.6875px; transform-origin: 0px 29.6875px; width: 0px;">
            <a href="/collections/kitchen-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Kitchen Sets</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 29.6875px; transform-origin: 0px 29.6875px; width: 0px;">
            <a href="/collections/bakeware-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Bakeware Sets</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/collections/tabletop-entertaining-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Shop All Sets</a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 550.891px; gap: 20px; display: grid; grid-template-columns: 0px; grid-template-rows: 342.766px 188.125px; height: 550.891px; inline-size: 0px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 275.438px; transform-origin: 0px 275.445px; width: 0px;">
            <a href="#" class="h6" style="block-size: 342.781px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 342.781px; inline-size: 12.8125px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 6.40625px 171.391px; text-transform: uppercase; transform-origin: 6.40625px 171.391px; width: 12.8125px;">Sets by Occasion</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 188.125px; gap: 10px; display: grid; grid-template-columns: 0px; grid-template-rows: 89.0625px 89.0625px; height: 188.125px; inline-size: 0px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 94.0625px; transform-origin: 0px 94.0625px; width: 0px;"><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/collections/everyday-tabletop-entertaining-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">All Everyday Sets</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 44.5312px; transform-origin: 0px 44.5312px; width: 0px;">
            <a href="/collections/seasonal-tabletop-entertaining-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">All Holiday Sets</a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 641.094px; gap: 20px; display: grid; grid-template-columns: 0px; grid-template-rows: 244.844px 376.25px; height: 641.094px; inline-size: 0px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 320.547px; transform-origin: 0px 320.547px; width: 0px;">
            <a href="#" class="h6" style="block-size: 244.844px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 244.844px; inline-size: 9.51562px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 4.75px 122.422px; text-transform: uppercase; transform-origin: 4.75781px 122.422px; width: 9.51562px;">Sets by Type</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 376.25px; gap: 10px; display: grid; grid-template-columns: 0px; grid-template-rows: 118.75px 118.75px 118.75px; height: 376.25px; inline-size: 0px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 188.125px; transform-origin: 0px 188.125px; width: 0px;"><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/collections/12-piece-dinnerware-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">12 Piece Dinnerware Sets</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/collections/4-piece-dinnerware-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">4 Piece Dinnerware Sets</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/collections/drinkware-sets" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Drinkware Sets of 4</a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 269.312px; gap: 20px; display: grid; grid-template-columns: 0px; grid-template-rows: 269.312px; height: 269.312px; inline-size: 0px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 134.656px; transform-origin: 0px 134.656px; width: 0px;">
            <a href="/collections/set-and-save" class="h6" style="block-size: 269.328px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 269.328px; inline-size: 12.8125px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 6.40625px 134.656px; text-transform: uppercase; transform-origin: 6.40625px 134.664px; width: 12.8125px;">Shop All Sets</a></li></ul><div class="mega-menu__promo" style="block-size: 293.297px; column-gap: 32px; display: flex; height: 293.297px; inline-size: 240px; justify-content: flex-end; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 120px 146.641px; transform-origin: 120px 146.648px; width: 240px;"><a href="/collections/set-and-save" class="v-stack justify-items-center gap-4 sm:gap-5 group" style="align-content: start; block-size: 293.312px; gap: 20px; cursor: pointer; display: grid; flex-basis: 315px; flex-grow: 1; grid-template-columns: 240px; grid-template-rows: 133.297px 140.016px; height: 293.312px; inline-size: 240px; justify-items: safe center; list-style-type: none; max-inline-size: 315px; max-width: 315px; min-block-size: auto; min-height: auto; min-inline-size: 240px; min-width: 240px; perspective-origin: 120px 146.656px; transform-origin: 120px 146.656px; width: 240px;"><div class="overflow-hidden" style="block-size: 133.312px; cursor: pointer; height: 133.312px; inline-size: 240px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 120px 66.6562px; transform-origin: 120px 66.6562px; width: 240px;">
            </div><div class="v-stack text-center gap-2.5" style="align-content: start; block-size: 140.031px; gap: 10px; cursor: pointer; display: grid; grid-template-columns: 240px; grid-template-rows: 24.4844px 105.547px; height: 140.031px; inline-size: 240px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 120px 70.0156px; text-align: center; transform-origin: 120px 70.0156px; width: 240px;"><p class="h6" style="block-size: 24.4844px; cursor: pointer; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 240px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 120px 12.2344px; text-align: center; text-transform: uppercase; transform-origin: 120px 12.2422px; width: 240px;">SET &amp; SAVE 15%</p><p class="smallcaps text-xs text-subdued" style="block-size: 105.562px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; font-size: 16px; height: 105.562px; inline-size: 240px; letter-spacing: 1.6px; line-height: 26.4px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; outline-color: rgba(0, 0, 0, 0.65); perspective-origin: 120px 52.7812px; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 120px 52.7812px; width: 240px; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Transform your table with perfectly curated sets, and save 15%!</p></div></a></div></div></details></mega-menu-disclosure></li>

        <li class="header__primary-nav-item" data-title="Ornaments" style="block-size: 24.4844px; height: 24.4844px; inline-size: 98.375px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 49.1875px 12.2344px; transform-origin: 49.1875px 12.2422px; width: 98.375px;" data-id="4">
          <mega-menu-disclosure follow-summary-link="" trigger="hover" class="contents" style="display: contents; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;"><details class="header__menu-disclosure" aria-expanded="false" style="block-size: 24.4844px; height: 24.4844px; inline-size: 98.3906px; list-style-type: none; perspective-origin: 49.1875px 12.2344px; transform-origin: 49.1953px 12.2422px; width: 98.3906px;">
            <summary data-follow-link="/pages/our-ornaments" class="h6" style="block-size: 24.4844px; display: list-item; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 98.4062px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; perspective-origin: 49.2031px 12.2344px; text-transform: uppercase; transform-origin: 49.2031px 12.2422px; width: 98.4062px;">Ornaments</summary><div class="mega-menu " style="align-items: start; background-color: rgb(255, 255, 255); block-size: 1158.3px; border-block-end-width: 1px; border-bottom-width: 1px; inset: 0px 0px -1158.3px; column-gap: 100px; display: flex; height: 1158.3px; inline-size: 98.3906px; inset-block: 0px -1158.3px; inset-inline: 0px; justify-content: safe center; list-style-type: none; max-block-size: 1158.31px; max-height: 1158.31px; overflow-block: auto; overflow-inline: auto; overflow: auto; padding-block: 40px; padding: 40px 48px; padding-inline: 48px; perspective-origin: 49.1875px 579.141px; position: absolute; transform-origin: 49.1953px 579.148px; width: 98.3906px;"><ul class="mega-menu__linklist unstyled-list" style="block-size: 2717.55px; gap: 40px 100px; display: flex; flex-wrap: wrap; height: 2717.55px; inline-size: 2.39062px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 1358.77px; transform-origin: 1.19531px 1358.77px; width: 2.39062px;"><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 1070.27px; gap: 20px; display: grid; grid-template-columns: 2.39062px; grid-template-rows: 416.219px 634.047px; height: 1070.27px; inline-size: 2.39062px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 535.125px; transform-origin: 1.19531px 535.133px; width: 2.39062px;">
            <a href="/collections/everyday-ornaments" class="h6" style="block-size: 416.234px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 416.234px; inline-size: 13.0938px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 6.54688px 208.109px; text-transform: uppercase; transform-origin: 6.54688px 208.117px; width: 13.0938px;">Everyday Ornaments</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 634.062px; gap: 10px; display: grid; grid-template-columns: 2.375px; grid-template-rows: 89.0625px 89.0625px 29.6875px 29.6875px 89.0625px 89.0625px 118.75px 29.6875px; height: 634.062px; inline-size: 2.375px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 317.031px; transform-origin: 1.1875px 317.031px; width: 2.375px;"><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 44.5312px; transform-origin: 1.19531px 44.5312px; width: 2.39062px;">
            <a href="/collections/wedding-anniversary-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Wedding &amp; Anniversary</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 44.5312px; transform-origin: 1.19531px 44.5312px; width: 2.39062px;">
            <a href="/collections/babies-children-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Babies &amp; Children</a>
          </li><li style="inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 14.8438px; transform-origin: 1.19531px 14.8438px; width: 2.39062px;">
            <a href="/collections/religious-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Religious</a>
          </li><li style="inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 14.8438px; transform-origin: 1.19531px 14.8438px; width: 2.39062px;">
            <a href="/collections/pets-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Pets</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 44.5312px; transform-origin: 1.19531px 44.5312px; width: 2.39062px;">
            <a href="/collections/family-friends-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Family &amp; Friends</a>
          </li><li style="block-size: 89.0625px; height: 89.0625px; inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 44.5312px; transform-origin: 1.19531px 44.5312px; width: 2.39062px;">
            <a href="/collections/home-travel-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Home &amp; Travel</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 59.375px; transform-origin: 1.19531px 59.375px; width: 2.39062px;">
            <a href="/collections/professions-hobbies-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Professions, Sports, &amp; Hobbies</a>
          </li><li style="inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 14.8438px; transform-origin: 1.19531px 14.8438px; width: 2.39062px;">
            <a href="/collections/collegiate" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Collegiate</a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 743.812px; gap: 20px; display: grid; grid-template-columns: 2.39062px; grid-template-rows: 367.266px 356.547px; height: 743.812px; inline-size: 2.39062px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 371.906px; transform-origin: 1.19531px 371.906px; width: 2.39062px;">
            <a href="/collections/holiday-ornaments" class="h6" style="block-size: 367.266px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 367.266px; inline-size: 13.1094px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 6.54688px 183.625px; text-transform: uppercase; transform-origin: 6.55469px 183.633px; width: 13.1094px;">Holiday Ornaments</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 356.562px; gap: 10px; display: grid; grid-template-columns: 2.375px; grid-template-rows: 118.75px 118.75px 59.375px 29.6875px; height: 356.562px; inline-size: 2.375px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 178.281px; transform-origin: 1.1875px 178.281px; width: 2.375px;"><li style="block-size: 118.75px; height: 118.75px; inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 59.375px; transform-origin: 1.19531px 59.375px; width: 2.39062px;">
            <a href="/collections/wedding-anniversary-holiday-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Wedding &amp; Anniversary Holiday</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 59.375px; transform-origin: 1.19531px 59.375px; width: 2.39062px;">
            <a href="/collections/babies-children-holiday-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Babies &amp; Children Holiday</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 29.6875px; transform-origin: 1.19531px 29.6875px; width: 2.39062px;">
            <a href="/collections/religious-holiday-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Religious Holiday</a>
          </li><li style="inline-size: 2.39062px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 14.8438px; transform-origin: 1.19531px 14.8438px; width: 2.39062px;">
            <a href="/collections/christmas-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Christmas</a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 293.797px; gap: 20px; display: grid; grid-template-columns: 2.39062px; grid-template-rows: 293.797px; height: 293.797px; inline-size: 2.39062px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 146.891px; transform-origin: 1.19531px 146.898px; width: 2.39062px;">
            <a href="/collections/shop-all-ornaments" class="h6" style="block-size: 293.812px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 293.812px; inline-size: 13.0938px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 6.54688px 146.906px; text-transform: uppercase; transform-origin: 6.54688px 146.906px; width: 13.0938px;">All Ornaments</a></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 489.688px; gap: 20px; display: grid; grid-template-columns: 2.39062px; grid-template-rows: 489.688px; height: 489.688px; inline-size: 2.39062px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 1.1875px 244.844px; transform-origin: 1.19531px 244.844px; width: 2.39062px;">
            <a href="/collections/ornaments-accessories" class="h6" style="block-size: 489.688px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 489.688px; inline-size: 13.0938px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 6.54688px 244.844px; text-transform: uppercase; transform-origin: 6.54688px 244.844px; width: 13.0938px;">Ornaments Accessories</a></li></ul></div></details></mega-menu-disclosure></li>

        <li class="header__primary-nav-item" data-title="Our Services" style="block-size: 24.4844px; height: 24.4844px; inline-size: 112.641px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 56.3125px 12.2344px; transform-origin: 56.3203px 12.2422px; width: 112.641px;" data-id="5">
          <mega-menu-disclosure follow-summary-link="" trigger="hover" class="contents" style="display: contents; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;"><details class="header__menu-disclosure" aria-expanded="false" style="block-size: 24.4844px; height: 24.4844px; inline-size: 112.641px; list-style-type: none; perspective-origin: 56.3125px 12.2344px; transform-origin: 56.3203px 12.2422px; width: 112.641px;">
            <summary data-follow-link="#" class="h6" style="block-size: 24.4844px; display: list-item; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 112.641px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; perspective-origin: 56.3125px 12.2344px; text-transform: uppercase; transform-origin: 56.3203px 12.2422px; width: 112.641px;">Our Services</summary><div class="mega-menu " style="align-items: start; background-color: rgb(255, 255, 255); block-size: 1100.38px; border-block-end-width: 1px; border-bottom-width: 1px; inset: 0px 0px -1100.38px; column-gap: 100px; display: flex; height: 1100.38px; inline-size: 112.641px; inset-block: 0px -1100.38px; inset-inline: 0px; justify-content: safe center; list-style-type: none; max-block-size: 1158.31px; max-height: 1158.31px; overflow-block: auto; overflow-inline: auto; overflow: auto; padding-block: 40px; padding: 40px 48px; padding-inline: 48px; perspective-origin: 56.3125px 550.188px; position: absolute; transform-origin: 56.3203px 550.188px; width: 112.641px;"><ul class="mega-menu__linklist unstyled-list" style="block-size: 1019.39px; gap: 40px 100px; display: flex; flex-wrap: wrap; height: 1019.39px; inline-size: 0px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 509.688px; transform-origin: 0px 509.695px; width: 0px;"><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 783.516px; gap: 20px; display: grid; grid-template-columns: 0px; grid-template-rows: 367.266px 396.25px; height: 783.516px; inline-size: 0px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 391.75px; transform-origin: 0px 391.758px; width: 0px;">
            <a href="#" class="h6" style="block-size: 367.266px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 367.266px; inline-size: 12.8125px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 6.40625px 183.625px; text-transform: uppercase; transform-origin: 6.40625px 183.633px; width: 12.8125px;">Personalization</a><ul class="v-stack gap-2.5 unstyled-list" style="align-content: start; block-size: 396.25px; gap: 10px; display: grid; grid-template-columns: 0px; grid-template-rows: 59.375px 59.375px 118.75px 59.375px 59.375px; height: 396.25px; inline-size: 0px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 198.125px; transform-origin: 0px 198.125px; width: 0px;"><li style="block-size: 59.375px; height: 59.375px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 29.6875px; transform-origin: 0px 29.6875px; width: 0px;">
            <a href="/collections/personalized-pottery" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Personalized Pottery</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 29.6875px; transform-origin: 0px 29.6875px; width: 0px;">
            <a href="/collections/personalized-ornaments" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Personalized Ornaments</a>
          </li><li style="block-size: 118.75px; height: 118.75px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 59.375px; transform-origin: 0px 59.375px; width: 0px;">
            <a href="/collections/personalized-gifts" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Shop All Personalized Gifts</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 29.6875px; transform-origin: 0px 29.6875px; width: 0px;">
            <a href="/pages/personalization-guide" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Personalization Guide</a>
          </li><li style="block-size: 59.375px; height: 59.375px; inline-size: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 29.6875px; transform-origin: 0px 29.6875px; width: 0px;">
            <a href="/pages/faq" class="link-faded" style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; list-style-type: none; outline-color: rgba(0, 0, 0, 0.65); text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Personalization FAQ</a>
          </li></ul></li><li class="v-stack justify-items-start gap-5" style="align-content: start; block-size: 195.875px; gap: 20px; display: grid; grid-template-columns: 0px; grid-template-rows: 195.875px; height: 195.875px; inline-size: 0px; justify-items: start; list-style-type: none; max-inline-size: 280px; max-width: 280px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 0px 97.9375px; transform-origin: 0px 97.9375px; width: 0px;">
            <a href="/pages/gift-registry" class="h6" style="block-size: 195.875px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 195.875px; inline-size: 12.5938px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 6.29688px 97.9375px; text-transform: uppercase; transform-origin: 6.29688px 97.9375px; width: 12.5938px;">Registry</a></li></ul><div class="mega-menu__promo" style="block-size: 479.188px; column-gap: 32px; display: flex; height: 479.188px; inline-size: 512px; justify-content: flex-end; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 256px 239.594px; transform-origin: 256px 239.594px; width: 512px;"><a href="/collections/personalized-gifts" class="v-stack justify-items-center gap-4 sm:gap-5 group" style="align-content: start; block-size: 479.188px; gap: 20px; cursor: pointer; display: grid; flex-basis: 315px; flex-grow: 1; grid-template-columns: 240px; grid-template-rows: 240px 219.188px; height: 479.188px; inline-size: 240px; justify-items: safe center; list-style-type: none; max-inline-size: 315px; max-width: 315px; min-block-size: auto; min-height: auto; min-inline-size: 240px; min-width: 240px; perspective-origin: 120px 239.594px; transform-origin: 120px 239.594px; width: 240px;"><div class="overflow-hidden" style="block-size: 240px; cursor: pointer; height: 240px; inline-size: 240px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 120px 120px; transform-origin: 120px 120px; width: 240px;">
            </div><div class="v-stack text-center gap-2.5" style="align-content: start; block-size: 219.203px; gap: 10px; cursor: pointer; display: grid; grid-template-columns: 240px; grid-template-rows: 24.4844px 184.719px; height: 219.203px; inline-size: 240px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 120px 109.594px; text-align: center; transform-origin: 120px 109.602px; width: 240px;"><p class="h6" style="block-size: 24.4844px; cursor: pointer; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 240px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 120px 12.2344px; text-align: center; text-transform: uppercase; transform-origin: 120px 12.2422px; width: 240px;">Let's Get Personal</p><p class="smallcaps text-xs text-subdued" style="block-size: 184.734px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; font-size: 16px; height: 184.734px; inline-size: 240px; letter-spacing: 1.6px; line-height: 26.4px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; outline-color: rgba(0, 0, 0, 0.65); perspective-origin: 120px 92.3594px; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 120px 92.3672px; width: 240px; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Shop all personalized gifts, each hand-personalized by our artists to create a one-of-a-kind keepsake.</p></div></a><div class="v-stack justify-items-center gap-4 sm:gap-5 group" style="align-content: start; block-size: 479.188px; gap: 20px; display: grid; flex-basis: 315px; flex-grow: 1; grid-template-columns: 240px; grid-template-rows: 133.297px 219.188px; height: 479.188px; inline-size: 240px; justify-items: safe center; list-style-type: none; max-inline-size: 315px; max-width: 315px; min-block-size: auto; min-height: auto; min-inline-size: 240px; min-width: 240px; perspective-origin: 120px 239.594px; transform-origin: 120px 239.594px; width: 240px;"><div class="overflow-hidden" style="block-size: 133.312px; height: 133.312px; inline-size: 240px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 120px 66.6562px; transform-origin: 120px 66.6562px; width: 240px;"></div><div class="v-stack text-center gap-2.5" style="align-content: start; block-size: 219.203px; gap: 10px; display: grid; grid-template-columns: 240px; grid-template-rows: 24.4844px 184.719px; height: 219.203px; inline-size: 240px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 120px 109.594px; text-align: center; transform-origin: 120px 109.602px; width: 240px;"><p class="h6" style="block-size: 24.4844px; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 240px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; overflow-wrap: anywhere; perspective-origin: 120px 12.2344px; text-align: center; text-transform: uppercase; transform-origin: 120px 12.2422px; width: 240px;">REGISTER WITH US</p><p class="smallcaps text-xs text-subdued" style="block-size: 184.734px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); font-size: 16px; height: 184.734px; inline-size: 240px; letter-spacing: 1.6px; line-height: 26.4px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; outline-color: rgba(0, 0, 0, 0.65); perspective-origin: 120px 92.3594px; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 120px 92.3672px; width: 240px; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Create a registry filled with pieces you’ll love and use for years, curated by you to match your style and the way you gather.</p></div></div></div></div></details></mega-menu-disclosure></li>

        <li class="header__primary-nav-item" data-title="About Us" style="block-size: 24.4844px; height: 24.4844px; inline-size: 77.375px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 38.6875px 12.2344px; transform-origin: 38.6875px 12.2422px; width: 77.375px;" data-id="7"><dropdown-menu-disclosure follow-summary-link="" trigger="hover" style="list-style-type: none;"><details class="header__menu-disclosure" aria-expanded="false" style="block-size: 24.4844px; height: 24.4844px; inline-size: 77.375px; list-style-type: none; perspective-origin: 38.6875px 12.2344px; transform-origin: 38.6875px 12.2422px; width: 77.375px;">
          <summary data-follow-link="#" class="h6" style="block-size: 24.4844px; display: list-item; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 77.375px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; perspective-origin: 38.6875px 12.2344px; text-transform: uppercase; transform-origin: 38.6875px 12.2422px; width: 77.375px;">About Us</summary><ul class="header__dropdown-menu header__dropdown-menu--restrictable unstyled-list" role="list" style="background-color: rgb(255, 255, 255); block-size: 120.375px; border-block-end-width: 1px; border-bottom-width: 1px; border-inline-width: 1px; border-left-width: 1px; border-right-width: 1px; inset: -2px -132.344px -118.375px 0px; box-shadow: rgba(0, 0, 0, 0.05) 2px 2px 6px 0px; height: 120.375px; inline-size: 209.719px; inset-block: -2px -118.375px; inset-inline: 0px -132.344px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; max-block-size: 1158.31px; max-height: 1158.31px; max-inline-size: 280px; max-width: 280px; min-inline-size: 200px; min-width: 200px; overflow-block: auto; overflow-inline: auto; overflow: auto; padding-block: 18px; padding-bottom: 18px; padding-top: 18px; perspective-origin: 104.859px 60.1875px; position: absolute; transform-origin: 104.859px 60.1875px; width: 209.719px;" data-id="6"><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 207.734px; list-style-type: none; perspective-origin: 103.859px 20.8438px; transform-origin: 103.867px 20.8438px; width: 207.734px;"><a href="/pages/our-story" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 207.734px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 103.859px 20.8438px; transform-origin: 103.867px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 207.734px;">Our Story</a></li><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 207.719px; list-style-type: none; perspective-origin: 103.859px 20.8438px; transform-origin: 103.859px 20.8438px; width: 207.719px;"><a href="/pages/flagship-stores" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 207.734px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 103.859px 20.8438px; transform-origin: 103.867px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 207.734px;">Our Flagship Stores</a></li></ul></details></dropdown-menu-disclosure></li>

        <li class="header__primary-nav-item" data-title="Gift Registry" style="block-size: 24.4844px; height: 24.4844px; inline-size: 112.594px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 56.2969px 12.2344px; transform-origin: 56.2969px 12.2422px; width: 112.594px;" data-id="8"><a href="/pages/gift-registry" class="block h6" style="block-size: 24.4844px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 112.594px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 56.2969px 12.2344px; text-transform: uppercase; transform-origin: 56.2969px 12.2422px; width: 112.594px;">Gift Registry</a></li>

        <li class="header__primary-nav-item" data-title="Blog" style="block-size: 24.4844px; height: 24.4844px; inline-size: 42.375px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 21.1875px 12.2344px; transform-origin: 21.1875px 12.2422px; width: 42.375px;" data-id="10"><dropdown-menu-disclosure follow-summary-link="" trigger="hover" style="list-style-type: none;"><details class="header__menu-disclosure" aria-expanded="false" style="block-size: 24.4844px; height: 24.4844px; inline-size: 42.375px; list-style-type: none; perspective-origin: 21.1875px 12.2344px; transform-origin: 21.1875px 12.2422px; width: 42.375px;">
          <summary data-follow-link="/blogs/toast-the-blog" class="h6" style="block-size: 24.4844px; display: list-item; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 42.3906px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; perspective-origin: 21.1875px 12.2344px; text-transform: uppercase; transform-origin: 21.1953px 12.2422px; width: 42.3906px;">Blog</summary><ul class="header__dropdown-menu header__dropdown-menu--restrictable unstyled-list" role="list" style="background-color: rgb(255, 255, 255); block-size: 328.812px; border-block-end-width: 1px; border-bottom-width: 1px; border-inline-width: 1px; border-left-width: 1px; border-right-width: 1px; inset: -2px -227.375px -326.812px 0px; box-shadow: rgba(0, 0, 0, 0.05) 2px 2px 6px 0px; height: 328.812px; inline-size: 269.75px; inset-block: -2px -326.812px; inset-inline: 0px -227.375px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; max-block-size: 1158.31px; max-height: 1158.31px; max-inline-size: 280px; max-width: 280px; min-inline-size: 200px; min-width: 200px; overflow-block: auto; overflow-inline: auto; overflow: auto; padding-block: 18px; padding-bottom: 18px; padding-top: 18px; perspective-origin: 134.875px 164.406px; position: absolute; transform-origin: 134.875px 164.406px; width: 269.75px;" data-id="9"><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 267.75px; list-style-type: none; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; width: 267.75px;"><a href="/blogs/toast-the-blog" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 267.75px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 267.75px;">Visit Toast, The Blog</a></li><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 267.75px; list-style-type: none; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; width: 267.75px;"><a href="https://manage.kmail-lists.com/subscriptions/subscribe?a=VghVT8&amp;g=Xecejq" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 267.75px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 267.75px;">Subscribe to Toast, the Blog</a></li><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 267.75px; list-style-type: none; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; width: 267.75px;"><a href="https://coton-colors.com/blogs/toast-the-blog/tagged/entertaining" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 267.75px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 267.75px;">Entertaining Posts</a></li><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 267.75px; list-style-type: none; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; width: 267.75px;"><a href="https://coton-colors.com/blogs/toast-the-blog/tagged/recipe" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 267.75px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 267.75px;">Recipe Posts</a></li><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 267.75px; list-style-type: none; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; width: 267.75px;"><a href="https://coton-colors.com/blogs/toast-the-blog/tagged/menus" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 267.75px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 267.75px;">Menu Posts</a></li><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 267.75px; list-style-type: none; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; width: 267.75px;"><a href="https://coton-colors.com/blogs/toast-the-blog/tagged/how-to-guide" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 267.75px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 267.75px;">How-To Guide Posts</a></li><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 267.75px; list-style-type: none; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; width: 267.75px;"><a href="https://coton-colors.com/blogs/toast-the-blog/tagged/about" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 267.75px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 133.875px 20.8438px; transform-origin: 133.875px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 267.75px;">Features Posts</a></li></ul></details></dropdown-menu-disclosure></li>

        <li class="header__primary-nav-item" data-title="Sale" style="block-size: 24.4844px; height: 24.4844px; inline-size: 37.5625px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 18.7812px 12.2344px; transform-origin: 18.7812px 12.2422px; width: 37.5625px;" data-id="12"><dropdown-menu-disclosure follow-summary-link="" trigger="hover" style="list-style-type: none;"><details class="header__menu-disclosure" aria-expanded="false" style="block-size: 24.4844px; height: 24.4844px; inline-size: 37.5625px; list-style-type: none; perspective-origin: 18.7812px 12.2344px; transform-origin: 18.7812px 12.2422px; width: 37.5625px;">
          <summary data-follow-link="/collections/sale" class="h6" style="block-size: 24.4844px; display: list-item; font-family: Jost, sans-serif; font-size: 14.4px; height: 24.4844px; inline-size: 37.5625px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; perspective-origin: 18.7812px 12.2344px; text-transform: uppercase; transform-origin: 18.7812px 12.2422px; width: 37.5625px;">Sale</summary><ul class="header__dropdown-menu header__dropdown-menu--restrictable unstyled-list" role="list" style="background-color: rgb(255, 255, 255); block-size: 245.438px; border-block-end-width: 1px; border-bottom-width: 1px; border-inline-width: 1px; border-left-width: 1px; border-right-width: 1px; inset: -2px -162.438px -243.438px 0px; box-shadow: rgba(0, 0, 0, 0.05) 2px 2px 6px 0px; height: 245.438px; inline-size: 200px; inset-block: -2px -243.438px; inset-inline: 0px -162.438px; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; max-block-size: 1158.31px; max-height: 1158.31px; max-inline-size: 280px; max-width: 280px; min-inline-size: 200px; min-width: 200px; overflow-block: auto; overflow-inline: auto; overflow: auto; padding-block: 18px; padding-bottom: 18px; padding-top: 18px; perspective-origin: 100px 122.719px; position: absolute; transform-origin: 100px 122.719px; width: 200px;" data-id="11"><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 198px; list-style-type: none; perspective-origin: 99px 20.8438px; transform-origin: 99px 20.8438px; width: 198px;"><a href="/collections/60-off" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 198px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 99px 20.8438px; transform-origin: 99px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 198px;">Up to 60% Off</a></li><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 198px; list-style-type: none; perspective-origin: 99px 20.8438px; transform-origin: 99px 20.8438px; width: 198px;"><a href="/collections/50-off" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 198px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 99px 20.8438px; transform-origin: 99px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 198px;">Up to 50% Off</a></li><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 198px; list-style-type: none; perspective-origin: 99px 20.8438px; transform-origin: 99px 20.8438px; width: 198px;"><a href="/collections/40-off" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 198px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 99px 20.8438px; transform-origin: 99px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 198px;">Up to 40% Off</a></li><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 198px; list-style-type: none; perspective-origin: 99px 20.8438px; transform-origin: 99px 20.8438px; width: 198px;"><a href="/collections/30-off" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 198px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 99px 20.8438px; transform-origin: 99px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 198px;">Up to 30% Off</a></li><li style="block-size: 41.6875px; height: 41.6875px; inline-size: 198px; list-style-type: none; perspective-origin: 99px 20.8438px; transform-origin: 99px 20.8438px; width: 198px;"><a href="/collections/sale" class="link-faded-reverse" style="block-size: 41.6875px; cursor: pointer; display: block; height: 41.6875px; inline-size: 198px; list-style-type: none; padding-block: 6px; padding: 6px 25px; padding-inline: 25px; perspective-origin: 99px 20.8438px; transform-origin: 99px 20.8438px; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 198px;">Shop All Sale</a></li></ul></details></dropdown-menu-disclosure></li></ul></nav>

        <a href="/account/login" style="cursor: pointer; list-style-type: none;">
          <span class="sr-only" style="block-size: 1px; inset: 32.9375px 161px 101.609px 2348px; clip: rect(0px, 0px, 0px, 0px); cursor: pointer; display: block; height: 1px; inline-size: 1px; inset-block: 32.9375px 101.609px; inset-inline: 2348px 161px; list-style-type: none; margin-block: -1px; margin: -1px; margin-inline: -1px; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 0.5px 0.5px; position: absolute; text-wrap-mode: nowrap; transform-origin: 0.5px 0.5px; width: 1px;">Login</span><svg aria-hidden="true" fill="none" focusable="false" width="24" class="header__nav-icon icon icon-account" viewBox="0 0 24 24" style="block-size: 24px; cursor: pointer; fill: none; height: 24px; inline-size: 24px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow: hidden; perspective-origin: 12px 12px; transform-origin: 12px 12px; transition-duration: 0.2s; transition-property: transform; width: 24px;">
          <path d="M16.125 8.75c-.184 2.478-2.063 4.5-4.125 4.5s-3.944-2.021-4.125-4.5c-.187-2.578 1.64-4.5 4.125-4.5 2.484 0 4.313 1.969 4.125 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M3.017 20.747C3.783 16.5 7.922 14.25 12 14.25s8.217 2.25 8.984 6.497" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></path>
        </svg></a>
      </li><li class="header__search-link" style="block-size: 24px; height: 24px; inline-size: 24px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 12px 12px; transform-origin: 12px 12px; width: 24px;">
        <a href="/search" aria-controls="header-search-sections--20200139423899__header" style="cursor: pointer; list-style-type: none;">
          <span class="sr-only" style="block-size: 1px; inset: 32.9375px 117px 101.609px 2392px; clip: rect(0px, 0px, 0px, 0px); cursor: pointer; display: block; height: 1px; inline-size: 1px; inset-block: 32.9375px 101.609px; inset-inline: 2392px 117px; list-style-type: none; margin-block: -1px; margin: -1px; margin-inline: -1px; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 0.5px 0.5px; position: absolute; text-wrap-mode: nowrap; transform-origin: 0.5px 0.5px; width: 1px;">Search</span><svg aria-hidden="true" fill="none" focusable="false" width="24" class="header__nav-icon icon icon-search" viewBox="0 0 24 24" style="block-size: 24px; cursor: pointer; fill: none; height: 24px; inline-size: 24px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow: hidden; perspective-origin: 12px 12px; transform-origin: 12px 12px; transition-duration: 0.2s; transition-property: transform; width: 24px;">
          <path d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></path>
          <path d="M15.857 15.858 21 21.001" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"></path>
        </svg></a>
      </li><li class="relative header__cart-link" style="block-size: 24px; inset: 0px; height: 24px; inline-size: 24px; inset-block: 0px; inset-inline: 0px; list-style-type: none; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 12px 12px; position: relative; transform-origin: 12px 12px; width: 24px;">
        <a href="/cart" aria-controls="cart-drawer" data-no-instant="" style="cursor: pointer; list-style-type: none;">
          <span class="sr-only" style="block-size: 1px; inset: 0px 25px 25px 0px; clip: rect(0px, 0px, 0px, 0px); cursor: pointer; display: block; height: 1px; inline-size: 1px; inset-block: 0px 25px; inset-inline: 0px 25px; list-style-type: none; margin-block: -1px; margin: -1px; margin-inline: -1px; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 0.5px 0.5px; position: absolute; text-wrap-mode: nowrap; transform-origin: 0.5px 0.5px; width: 1px;">Cart</span><svg aria-hidden="true" fill="none" focusable="false" width="24" class="header__nav-icon icon icon-cart" viewBox="0 0 24 24" style="block-size: 24px; cursor: pointer; fill: none; height: 24px; inline-size: 24px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow: hidden; perspective-origin: 12px 12px; transform-origin: 12px 12px; transition-duration: 0.2s; transition-property: transform; width: 24px;"><path d="M2 10h20l-4 11H6L2 10Zm14-3a4 4 0 0 0-8 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg><cart-dot class="header__cart-dot  " style="background-color: rgb(0, 0, 0); block-size: 8px; border-radius: 100%; border-end-end-radius: 100%; border-end-start-radius: 100%; border-start-end-radius: 100%; border-start-start-radius: 100%; inset: 0px -2px 16px 18px; box-shadow: rgb(255, 255, 255) 0px 0px 0px 2px; cursor: pointer; display: block; height: 8px; inline-size: 8px; inset-block: 0px 16px; inset-inline: 18px -2px; list-style-type: none; perspective-origin: 4px 4px; position: absolute; transform: matrix(0, 0, 0, 0, 0, 0); transform-origin: 4px 4px; transition-duration: 0.2s; transition-property: transform; transition-timing-function: ease-in-out; width: 8px;"></cart-dot>
        </a>
      </li>
      </ul>
      </nav><header-search id="header-search-sections--20200139423899__header" class="header-search" role="dialog" style="display: none; inline-size: 100%; inset-block-start: 100%; inset-inline-start: 0px; left: 0px; perspective-origin: 50% 50%; position: absolute; top: 100%; transform-origin: 50% 50%; width: 100%; z-index: -1;">
        <div class="container" style="block-size: auto; height: auto; inline-size: auto; margin-inline: calc(48px); margin-left: calc(48px); margin-right: calc(48px); perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <form id="predictive-search-form" action="/search" method="GET" aria-owns="header-predictive-search" class="header-search__form" role="search" style="block-size: auto; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
            <div class="header-search__form-control" style="align-items: center; block-size: auto; column-gap: 20px; display: grid; grid-template-columns: auto minmax(0px, 1fr) auto; height: auto; inline-size: auto; padding-block: 24px; padding-bottom: 24px; padding-top: 24px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><svg aria-hidden="true" fill="none" focusable="false" width="20" class="icon icon-search" viewBox="0 0 24 24" style="block-size: auto; fill: none; height: auto; inline-size: 20px; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow: hidden; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 20px;">
              <path d="M10.364 3a7.364 7.364 0 1 0 0 14.727 7.364 7.364 0 0 0 0-14.727Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></path>
              <path d="M15.857 15.858 21 21.001" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"></path>
            </svg><input type="search" name="q" spellcheck="false" class="header-search__input h5 sm:h4" aria-label="Search" placeholder="Search for..." style="appearance: none; background-color: rgba(0, 0, 0, 0); block-size: auto; display: block; font-family: Jost, sans-serif; font-size: 21.6px; height: auto; inline-size: auto; letter-spacing: 2.16px; line-height: 34.56px; outline-offset: -2px; overflow-wrap: anywhere; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; width: auto;">

              <dialog-close-button class="contents" style="display: contents; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
                <button type="button" style="block-size: auto; display: block; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
                  <span class="sr-only" style="block-size: 1px; clip: rect(0px, 0px, 0px, 0px); cursor: pointer; display: block; height: 1px; inline-size: 1px; margin-block: -1px; margin: -1px; margin-inline: -1px; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 50% 50%; position: absolute; text-align: center; text-wrap-mode: nowrap; transform-origin: 50% 50%; width: 1px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">Close</span><svg aria-hidden="true" focusable="false" fill="none" width="16" class="icon icon-close" viewBox="0 0 16 16" style="block-size: auto; cursor: pointer; fill: none; height: auto; inline-size: 16px; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow: hidden; perspective-origin: 50% 50%; text-align: center; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 16px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
                  <path d="m1 1 14 14M1 15 15 1" stroke="currentColor" stroke-width="1.5"></path>
                </svg>

                </button>
              </dialog-close-button>
            </div>
          </form>

          <predictive-search id="header-predictive-search" class="predictive-search" style="display: block; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <div class="predictive-search__content" slot="results" style="block-size: auto; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"></div>
          </predictive-search>
        </div>
      </header-search><template id="header-sidebar-template">
        <div part="base">
          <div part="overlay"></div>

          <div part="content">
            <header part="header">
              <dialog-close-button class="contents">
                <button type="button" part="close-button tap-area" aria-label="Close"><svg aria-hidden="true" focusable="false" fill="none" width="16" class="icon icon-close" viewBox="0 0 16 16">
                  <path d="m1 1 14 14M1 15 15 1" stroke="currentColor" stroke-width="1.5"></path>
                </svg>

                </button>
              </dialog-close-button>
            </header>

            <div part="panel-list">
              <slot name="main-panel"></slot><slot name="collapsible-panel"></slot></div>
          </div>
        </div>
      </template>

      <header-sidebar id="sidebar-menu" class="header-sidebar drawer drawer--sm color-scheme color-scheme--scheme-3b01d617-2208-42dc-9c68-7a045a785c84" template="header-sidebar-template" open-from="left" role="dialog" aria-modal="true" style="background-color: rgb(255, 255, 255); display: none; perspective-origin: 50% 50%; position: relative; transform-origin: 50% 50%; z-index: 999;"><div class="header-sidebar__main-panel" slot="main-panel" style="background-color: rgb(255, 255, 255); block-size: 100%; display: grid; grid-auto-columns: max-content; grid-template-columns: minmax(0px, 1fr); grid-template-rows: minmax(0px, 1fr); height: 100%; inline-size: auto; perspective-origin: 50% 50%; position: relative; transform-origin: 50% 50%; width: auto; z-index: 1;">
        <div class="header-sidebar__scroller" style="block-size: auto; height: auto; inline-size: auto; overflow-block: auto; overflow-inline: auto; overflow: auto; padding-block-end: 32px; padding-bottom: 32px; padding-inline: 32px; padding-left: 32px; padding-right: 32px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <ul class="header-sidebar__linklist  unstyled-list" role="list" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-1" aria-expanded="false" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-align: start; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Featured<svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-right  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; cursor: pointer; fill: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <path d="m3 9 4-4-4-4" stroke="currentColor" stroke-linecap="square"></path>
          </svg></button></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-2" aria-expanded="false" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-align: start; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Shop by Type<svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-right  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; cursor: pointer; fill: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <path d="m3 9 4-4-4-4" stroke="currentColor" stroke-linecap="square"></path>
          </svg></button></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-3" aria-expanded="false" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-align: start; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Shop By Collection<svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-right  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; cursor: pointer; fill: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <path d="m3 9 4-4-4-4" stroke="currentColor" stroke-linecap="square"></path>
          </svg></button></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-4" aria-expanded="false" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-align: start; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Set &amp; Save<svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-right  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; cursor: pointer; fill: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <path d="m3 9 4-4-4-4" stroke="currentColor" stroke-linecap="square"></path>
          </svg></button></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-5" aria-expanded="false" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-align: start; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Ornaments<svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-right  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; cursor: pointer; fill: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <path d="m3 9 4-4-4-4" stroke="currentColor" stroke-linecap="square"></path>
          </svg></button></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-6" aria-expanded="false" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-align: start; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Our Services<svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-right  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; cursor: pointer; fill: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <path d="m3 9 4-4-4-4" stroke="currentColor" stroke-linecap="square"></path>
          </svg></button></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-7" aria-expanded="false" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-align: start; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">About Us<svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-right  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; cursor: pointer; fill: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <path d="m3 9 4-4-4-4" stroke="currentColor" stroke-linecap="square"></path>
          </svg></button></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/pages/gift-registry" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Gift Registry</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-9" aria-expanded="false" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-align: start; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Blog<svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-right  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; cursor: pointer; fill: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <path d="m3 9 4-4-4-4" stroke="currentColor" stroke-linecap="square"></path>
          </svg></button></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><button type="button" class="header-sidebar__linklist-button h6" aria-controls="header-panel-10" aria-expanded="false" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-align: start; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Sale<svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-right  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; cursor: pointer; fill: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <path d="m3 9 4-4-4-4" stroke="currentColor" stroke-linecap="square"></path>
          </svg></button></li></ul>
        </div><div class="header-sidebar__footer" style="block-size: auto; height: auto; inline-size: auto; perspective-origin: 50% 50%; position: relative; transform-origin: 50% 50%; width: auto;" data-id="13"><a href="/account/login" class="text-with-icon smallcaps sm:hidden" style="align-items: center; gap: 10px; cursor: pointer; display: none; font-size: 10px; letter-spacing: 1px; line-height: 16.5px; padding-block: 20px; padding: 20px 32px; padding-inline: 32px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%;"><svg aria-hidden="true" fill="none" focusable="false" width="20" class="icon icon-account" viewBox="0 0 24 24" style="block-size: auto; cursor: pointer; fill: none; flex-shrink: 0; font-size: 10px; height: auto; inline-size: 20px; letter-spacing: 1px; line-height: 16.5px; overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow: hidden; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 20px;">
        <path d="M16.125 8.75c-.184 2.478-2.063 4.5-4.125 4.5s-3.944-2.021-4.125-4.5c-.187-2.578 1.64-4.5 4.125-4.5 2.484 0 4.313 1.969 4.125 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M3.017 20.747C3.783 16.5 7.922 14.25 12 14.25s8.217 2.25 8.984 6.497" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></path>
      </svg>Login</a><div class="localization-selectors" style="align-items: center; block-size: auto; border-block-start-width: 1px; border-top-width: 1px; gap: 12px 20px; display: flex; flex-wrap: wrap; height: auto; inline-size: auto; justify-content: flex-start; padding-block: 20px; padding: 20px 32px; padding-inline: 32px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><div class="relative" style="block-size: auto; height: auto; inline-size: auto; perspective-origin: 50% 50%; position: relative; transform-origin: 50% 50%; width: auto;">
        <button type="button" class="localization-toggle heading text-xxs link-faded" aria-controls="popover-localization-header-sidebar-sections--20200139423899__header-country" aria-label="Change country or currency" aria-expanded="false" aria-haspopup="dialog" style="align-items: center; block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-gap: 10px; column-rule-color: rgba(0, 0, 0, 0.65); display: flex; font-family: Jost, sans-serif; font-size: 11px; height: auto; inline-size: auto; letter-spacing: 1.1px; line-height: 18.15px; outline-color: rgba(0, 0, 0, 0.65); overflow-wrap: anywhere; perspective-origin: 50% 50%; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: auto; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);"><span style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 11px; letter-spacing: 1.1px; line-height: 18.15px; outline-color: rgba(0, 0, 0, 0.65); overflow-wrap: anywhere; perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">USD \$</span><svg aria-hidden="true" focusable="false" fill="none" width="10" class="icon icon-chevron-down" viewBox="0 0 10 10" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; fill: none; font-family: Jost, sans-serif; font-size: 11px; height: auto; inline-size: 10px; letter-spacing: 1.1px; line-height: 18.15px; outline-color: rgba(0, 0, 0, 0.65); overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">
          <path d="m1 3 4 4 4-4" stroke="currentColor" stroke-linecap="square"></path>
        </svg></button>

        <x-popover id="popover-localization-header-sidebar-sections--20200139423899__header-country" initial-focus="[aria-selected='true']" class="popover popover--top-start color-scheme color-scheme--dialog" role="dialog" style="background-color: rgb(255, 255, 255); bottom: calc(100% + 12px); display: none; inset-block-end: calc(100% + 12px); inset-inline-start: 0px; left: 0px; perspective-origin: 50% 50%; position: absolute; transform-origin: 50% 50%; z-index: 999;">
          <p class="h4" slot="header" style="block-size: auto; font-family: Jost, sans-serif; font-size: 21.6px; height: auto; inline-size: auto; letter-spacing: 2.16px; line-height: 34.56px; overflow-wrap: anywhere; perspective-origin: 50% 50%; text-align: center; text-transform: uppercase; transform-origin: 50% 50%; width: auto;">Country</p><form method="post" action="/localization" id="localization-form-header-sidebar-sections--20200139423899__header-country" accept-charset="UTF-8" class="shopify-localization-form" enctype="multipart/form-data" style="block-size: auto; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><input type="hidden" name="form_type" value="localization" style="appearance: none; background-color: rgba(0, 0, 0, 0); block-size: auto; cursor: default; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><input type="hidden" name="utf8" value="✓" style="appearance: none; background-color: rgba(0, 0, 0, 0); block-size: auto; cursor: default; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><input type="hidden" name="_method" value="put" style="appearance: none; background-color: rgba(0, 0, 0, 0); block-size: auto; cursor: default; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><input type="hidden" name="return_to" value="/" style="appearance: none; background-color: rgba(0, 0, 0, 0); block-size: auto; cursor: default; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><x-listbox class="popover__value-list" role="listbox" aria-activedescendant="option-9341059a-fe76-4e77-8cbe-e2a406a283f3" style="gap: 12px; display: grid; justify-items: start; perspective-origin: 50% 50%; position: relative; transform-origin: 50% 50%;"><button type="submit" name="country_code" class="popover__value-option h-stack gap-2.5" role="option" value="CA" aria-selected="false" id="option-712033ac-caa4-4891-a49c-4d27b3073988" style="align-items: center; block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); gap: 10px; column-rule-color: rgba(0, 0, 0, 0.65); display: flex; height: auto; inline-size: 100%; outline-color: rgba(0, 0, 0, 0.65); perspective-origin: 50% 50%; text-align: start; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 100%; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);"><span style="caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; display: block; outline-color: rgba(0, 0, 0, 0.65); perspective-origin: 50% 50%; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); transform-origin: 50% 50%; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Canada (USD \$)</span>
        </button><button type="submit" name="country_code" class="popover__value-option h-stack gap-2.5" role="option" value="US" aria-selected="true" id="option-9341059a-fe76-4e77-8cbe-e2a406a283f3" style="align-items: center; block-size: auto; gap: 10px; display: flex; height: auto; inline-size: 100%; perspective-origin: 50% 50%; text-align: start; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 100%;">
          <span style="cursor: pointer; display: block; perspective-origin: 50% 50%; transform-origin: 50% 50%; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);">United States (USD \$)</span>
        </button></x-listbox></form></x-popover>
      </div></div></div></div><header-sidebar-collapsible-panel class="header-sidebar__collapsible-panel" slot="collapsible-panel" role="dialog" style="background-color: rgb(255, 255, 255); block-size: 100%; display: none; height: 100%; inline-size: 400px; inset-block-start: 0px; perspective-origin: 50% 50%; position: absolute; top: 0px; transform-origin: 50% 50%; width: 400px;">
        <div class="header-sidebar__scroller" style="block-size: auto; bottom: 0px; height: auto; inline-size: 100%; inset-block: 80px 0px; overflow-block: auto; overflow-inline: auto; overflow: auto; padding-block-end: 32px; padding-bottom: 32px; padding-inline: 32px; padding-left: 32px; padding-right: 32px; perspective-origin: 50% 50%; position: absolute; top: 80px; transform-origin: 50% 50%; width: 100%;"><div id="header-panel-1" class="header-sidebar__sub-panel" hidden="" style="block-size: auto; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <button type="button" class="header-sidebar__back-button link-faded  text-with-icon h6 md:hidden" data-action="close-panel" style="align-items: center; block-size: auto; border-block-end-width: 1px; border-bottom-width: 1px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); gap: 10px; column-rule-color: rgba(0, 0, 0, 0.65); display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; letter-spacing: 1.44px; line-height: 24.48px; margin-block-end: 16px; margin-bottom: 16px; outline-color: rgba(0, 0, 0, 0.65); overflow-wrap: anywhere; padding-block: 20px 16px; padding-bottom: 16px; padding-top: 20px; perspective-origin: 50% 50%; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 100%; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);"><svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-left  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; fill: none; flex-shrink: 0; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; outline-color: rgba(0, 0, 0, 0.65); overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">
            <path d="M7 1 3 5l4 4" stroke="currentColor" stroke-linecap="square"></path>
          </svg>Featured</button>

          <ul class="header-sidebar__linklist  unstyled-list" role="list" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">New &amp; Noteworthy<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="14"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a
                ="/collections/new-arrivals" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">New Arrivals</a><a href="/collections/retiring" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Retiring</a><a href="/pages/table-settings" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Set Your Table</a><a href="/collections/all" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Shop Everything</a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Spring &amp; Summer Curated Gatherings<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="15"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/pages/easter-in-bloom-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Easter in Bloom Gathering</a><a href="/pages/spring-awakening-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Spring Awakening Gathering</a><a href="/pages/for-baby-smith-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">For Baby Smith Gathering</a><a href="/pages/blooming-bridal-party-luncheon-curated-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Bright {White} and Blooming Bridal Party Luncheon Gathering</a><a href="/pages/a-something-blue-bridal-shower-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">A Something Blue Bridal Shower Gathering</a><a href="/pages/a-miss-to-mrs-merriment-gathering-for-logan" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">A Miss to Mrs. Merriment Gathering for Logan</a><a href="/pages/spontaneous-salud-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Spontaneous ¡Salud! Gathering</a><a href="/pages/havana-nights-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Havana Nights Gathering</a><a href="/pages/by-the-bay-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">By The Bay Gathering</a><a href="/pages/tapas-and-a-toast-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Tapas and a Toast Gathering</a><a href="/pages/spring-citrus-celebration" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Citrus Celebration Gathering</a><a href="/pages/frond-fete-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Frond Fête Gathering</a><a href="/pages/how-does-your-garden-grow-curated-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">How Does Your Garden Grow? Gathering</a><a href="/pages/winning-night-of-cards-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Winning Night of Cards Gathering</a><a href="/pages/all-curated-gatherings" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Explore All Curated Gatherings</a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Autumn &amp; Holiday Curated Gatherings<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="16"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/pages/chop-night-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Chop Night Gathering</a><a href="/pages/for-baby-firth-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">For Baby Firth Gathering</a><a href="/pages/festa-della-pizza-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Festa Della Pizza Gathering</a><a href="/pages/gumbo-and-the-game-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Gumbo and The Game Gathering</a><a href="/pages/fondue-of-you-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Fondue of You Gathering</a><a href="/pages/lunar-new-year-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Lunar New Year Gathering</a><a href="/pages/a-berry-christmas-morning-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">A Berry Christmas Morning Gathering</a><a href="/pages/christmas-eve-by-candlelight-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Christmas Eve by Candlelight Gathering</a><a href="/pages/christmas-cheer-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Christmas Cheer Gathering</a><a href="/pages/give-thanks-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Give Thanks Gathering</a><a href="/pages/charbooterie-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Char-BOO-terie Gathering</a><a href="/pages/cozy-coquette-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Cozy Coquette Gathering</a><a href="/pages/sit-for-a-spell-gathering" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Sit for a Spell Gathering</a><a href="/pages/all-curated-gatherings" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Explore All Curated Gatherings</a></div>
            </details>
          </accordion-disclosure></li></ul><div class="header-sidebar__promo scroll-area bleed md:unbleed" style="block-size: auto; gap: 32px 20px; display: flex; flex-direction: column; grid-auto-flow: column; height: auto; inline-size: auto; margin-block-start: 20px; margin-top: 20px; overflow-block: hidden; overflow-inline: auto; overflow: auto hidden; overscroll-behavior-inline: contain; perspective-origin: 50% 50%; scroll-padding-inline: 0px; scrollbar-width: none; transform-origin: 50% 50%; width: auto;"><a href="/pages/table-settings" class="v-stack justify-items-center gap-4 sm:gap-5 group" style="align-content: start; gap: 20px; cursor: pointer; display: grid; grid-template-columns: minmax(0px, 1fr); justify-items: safe center; min-inline-size: 100%; min-width: 100%; perspective-origin: 50% 50%; transform-origin: 50% 50%;"><div class="overflow-hidden" style="block-size: auto; cursor: pointer; height: auto; inline-size: auto; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"></div><div class="v-stack text-center gap-0.5" style="align-content: start; block-size: auto; gap: 2px; cursor: pointer; display: grid; grid-template-columns: minmax(0px, 1fr); height: auto; inline-size: auto; perspective-origin: 50% 50%; text-align: center; transform-origin: 50% 50%; width: auto;"><p class="h6" style="block-size: auto; cursor: pointer; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: auto; letter-spacing: 1.44px; line-height: 24.48px; overflow-wrap: anywhere; perspective-origin: 50% 50%; text-align: center; text-transform: uppercase; transform-origin: 50% 50%; width: auto;">'Set Your Table' Gallery</p><p class="smallcaps text-xs text-subdued" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; font-size: 16px; height: auto; inline-size: auto; letter-spacing: 1.6px; line-height: 26.4px; outline-color: rgba(0, 0, 0, 0.65); perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; width: auto; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Discover dozens of curated table setting looks to shop directly or make your own.</p></div></a></div></div><div id="header-panel-2" class="header-sidebar__sub-panel" hidden="" style="block-size: auto; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <button type="button" class="header-sidebar__back-button link-faded  text-with-icon h6 md:hidden" data-action="close-panel" style="align-items: center; block-size: auto; border-block-end-width: 1px; border-bottom-width: 1px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); gap: 10px; column-rule-color: rgba(0, 0, 0, 0.65); display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; letter-spacing: 1.44px; line-height: 24.48px; margin-block-end: 16px; margin-bottom: 16px; outline-color: rgba(0, 0, 0, 0.65); overflow-wrap: anywhere; padding-block: 20px 16px; padding-bottom: 16px; padding-top: 20px; perspective-origin: 50% 50%; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 100%; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);"><svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-left  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; fill: none; flex-shrink: 0; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; outline-color: rgba(0, 0, 0, 0.65); overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">
            <path d="M7 1 3 5l4 4" stroke="currentColor" stroke-linecap="square"></path>
          </svg>Shop by Type</button>

          <ul class="header-sidebar__linklist  unstyled-list" role="list" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Tabletop<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="17"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/dinner-plates" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Dinner Plates</a><a href="/collections/salad-plates" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Salad Plates</a><a href="/collections/bowls" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Bowls</a><a href="/collections/mugs" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Mugs</a><a href="/collections/table-linens" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Table Linens</a><a href="/collections/dish-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Sets</a><a href="/collections/dinnerware" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Shop All Dinnerware</a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Entertaining<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="18"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/serving-platters" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Serving Platters</a><a href="/collections/serving-bowls" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Serving Bowls</a><a href="/collections/table-accessories" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Table Accessories</a><a href="/collections/utensils" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Utensils</a><a href="/collections/cookware-bakeware" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Cookware &amp; Bakeware</a><a href="/collections/cocktail-napkins" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Cocktail Napkins</a><a href="/pages/build-your-own-board" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Build Your Own Board</a><a href="/collections/serving-entertaining" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Shop All Serveware &amp; Entertaining </a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Home<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="19"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/vases" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Vases</a><a href="/collections/frames" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Frames</a><a href="/collections/hand-towels" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Hand Towels</a><a href="/collections/christmas-decor" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Seasonal Decor</a><a href="/collections/plate-stands" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Plate Stands</a><a href="/collections/shop-all-home" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Shop All Home</a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Commemorative Keepsakes<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="20"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/shop-all-babies-children" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Babies &amp; Children</a><a href="/collections/wedding" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Wedding</a><a href="/collections/birthday" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Birthday</a><a href="/collections/pet" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Pet</a><a href="/collections/shop-all-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Commemorative Ornaments</a><a href="/collections/ornaments-accessories" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Ornament Stands &amp; Storage</a><a href="/collections/shop-all-celebrations" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Shop All Celebrations</a></div>
            </details>
          </accordion-disclosure></li></ul></div><div id="header-panel-3" class="header-sidebar__sub-panel" hidden="" style="block-size: auto; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <button type="button" class="header-sidebar__back-button link-faded  text-with-icon h6 md:hidden" data-action="close-panel" style="align-items: center; block-size: auto; border-block-end-width: 1px; border-bottom-width: 1px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); gap: 10px; column-rule-color: rgba(0, 0, 0, 0.65); display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; letter-spacing: 1.44px; line-height: 24.48px; margin-block-end: 16px; margin-bottom: 16px; outline-color: rgba(0, 0, 0, 0.65); overflow-wrap: anywhere; padding-block: 20px 16px; padding-bottom: 16px; padding-top: 20px; perspective-origin: 50% 50%; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 100%; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);"><svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-left  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; fill: none; flex-shrink: 0; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; outline-color: rgba(0, 0, 0, 0.65); overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">
            <path d="M7 1 3 5l4 4" stroke="currentColor" stroke-linecap="square"></path>
          </svg>Shop By Collection</button>

          <ul class="header-sidebar__linklist  unstyled-list" role="list" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Everyday Collections<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="21"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/signature-white" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Signature White</a><a href="/collections/deco" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Deco</a><a href="/collections/iris-blue" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Iris Blue</a><a href="/collections/crew" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Crew</a><a href="/collections/fundamentals" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Fundamentals</a><a href="/collections/strata" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Strata</a><a href="/collections/buffalo" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Buffalo</a><a href="/collections/citrus" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Citrus</a><a href="/collections/oyster" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Oyster</a><a href="/collections/palm-collection" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Palm</a><a href="/collections/pastel-petite" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Pastel Petite</a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Seasonal Collections<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="22"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/speckled-rabbit-collection" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Easter</a><a href="/collections/thanksgiving" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Thanksgiving</a><a href="/collections/balsam-and-berry" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Balsam and Berry</a><a href="/collections/christmas-in-the-village" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Christmas in the Village</a><a href="/collections/o-holy-night" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">O Holy Night</a><a href="/collections/north-pole" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">North Pole</a><a href="/collections/valentines-day" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Valentine's Day</a><a href="/collections/shop-all-seasonal" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Shop All Seasonal Collections</a></div>
            </details>
          </accordion-disclosure></li></ul></div><div id="header-panel-4" class="header-sidebar__sub-panel" hidden="" style="block-size: auto; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <button type="button" class="header-sidebar__back-button link-faded  text-with-icon h6 md:hidden" data-action="close-panel" style="align-items: center; block-size: auto; border-block-end-width: 1px; border-bottom-width: 1px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); gap: 10px; column-rule-color: rgba(0, 0, 0, 0.65); display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; letter-spacing: 1.44px; line-height: 24.48px; margin-block-end: 16px; margin-bottom: 16px; outline-color: rgba(0, 0, 0, 0.65); overflow-wrap: anywhere; padding-block: 20px 16px; padding-bottom: 16px; padding-top: 20px; perspective-origin: 50% 50%; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 100%; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);"><svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-left  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; fill: none; flex-shrink: 0; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; outline-color: rgba(0, 0, 0, 0.65); overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">
            <path d="M7 1 3 5l4 4" stroke="currentColor" stroke-linecap="square"></path>
          </svg>Set &amp; Save</button>

          <ul class="header-sidebar__linklist  unstyled-list" role="list" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Tabletop and Entertaining Sets<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="23"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/dinnerware-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Dinnerware Sets</a><a href="/collections/drinkware-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Drinkware Sets</a><a href="/collections/table-linens" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Table Linens Sets</a><a href="/collections/table-decor-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Table Decor Sets</a><a href="/collections/serveware-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Serveware Sets</a><a href="/collections/home-decor-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Home Decor Sets</a><a href="/collections/kitchen-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Kitchen Sets</a><a href="/collections/bakeware-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Bakeware Sets</a><a href="/collections/tabletop-entertaining-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Shop All Sets</a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Sets by Occasion<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="24"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/everyday-tabletop-entertaining-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">All Everyday Sets</a><a href="/collections/seasonal-tabletop-entertaining-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">All Holiday Sets</a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Sets by Type<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="25"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/12-piece-dinnerware-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">12 Piece Dinnerware Sets</a><a href="/collections/4-piece-dinnerware-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">4 Piece Dinnerware Sets</a><a href="/collections/drinkware-sets" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Drinkware Sets of 4</a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/collections/set-and-save" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Shop All Sets</a></li></ul><div class="header-sidebar__promo scroll-area bleed md:unbleed" style="block-size: auto; gap: 32px 20px; display: flex; flex-direction: column; grid-auto-flow: column; height: auto; inline-size: auto; margin-block-start: 20px; margin-top: 20px; overflow-block: hidden; overflow-inline: auto; overflow: auto hidden; overscroll-behavior-inline: contain; perspective-origin: 50% 50%; scroll-padding-inline: 0px; scrollbar-width: none; transform-origin: 50% 50%; width: auto;"><a href="/collections/set-and-save" class="v-stack justify-items-center gap-4 sm:gap-5 group" style="align-content: start; gap: 20px; cursor: pointer; display: grid; grid-template-columns: minmax(0px, 1fr); justify-items: safe center; min-inline-size: 100%; min-width: 100%; perspective-origin: 50% 50%; transform-origin: 50% 50%;"><div class="overflow-hidden" style="block-size: auto; cursor: pointer; height: auto; inline-size: auto; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"></div><div class="v-stack text-center gap-0.5" style="align-content: start; block-size: auto; gap: 2px; cursor: pointer; display: grid; grid-template-columns: minmax(0px, 1fr); height: auto; inline-size: auto; perspective-origin: 50% 50%; text-align: center; transform-origin: 50% 50%; width: auto;"><p class="h6" style="block-size: auto; cursor: pointer; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: auto; letter-spacing: 1.44px; line-height: 24.48px; overflow-wrap: anywhere; perspective-origin: 50% 50%; text-align: center; text-transform: uppercase; transform-origin: 50% 50%; width: auto;">SET &amp; SAVE 15%</p><p class="smallcaps text-xs text-subdued" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; font-size: 16px; height: auto; inline-size: auto; letter-spacing: 1.6px; line-height: 26.4px; outline-color: rgba(0, 0, 0, 0.65); perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; width: auto; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Transform your table with perfectly curated sets, and save 15%!</p></div></a></div></div><div id="header-panel-5" class="header-sidebar__sub-panel" hidden="" style="block-size: auto; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <button type="button" class="header-sidebar__back-button link-faded  text-with-icon h6 md:hidden" data-action="close-panel" style="align-items: center; block-size: auto; border-block-end-width: 1px; border-bottom-width: 1px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); gap: 10px; column-rule-color: rgba(0, 0, 0, 0.65); display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; letter-spacing: 1.44px; line-height: 24.48px; margin-block-end: 16px; margin-bottom: 16px; outline-color: rgba(0, 0, 0, 0.65); overflow-wrap: anywhere; padding-block: 20px 16px; padding-bottom: 16px; padding-top: 20px; perspective-origin: 50% 50%; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 100%; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);"><svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-left  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; fill: none; flex-shrink: 0; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; outline-color: rgba(0, 0, 0, 0.65); overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">
            <path d="M7 1 3 5l4 4" stroke="currentColor" stroke-linecap="square"></path>
          </svg>Ornaments</button>

          <ul class="header-sidebar__linklist  unstyled-list" role="list" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Everyday Ornaments<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="26"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/wedding-anniversary-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Wedding &amp; Anniversary</a><a href="/collections/babies-children-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Babies &amp; Children</a><a href="/collections/religious-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Religious</a><a href="/collections/pets-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Pets</a><a href="/collections/family-friends-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Family &amp; Friends</a><a href="/collections/home-travel-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Home &amp; Travel</a><a href="/collections/professions-hobbies-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Professions, Sports, &amp; Hobbies</a><a href="/collections/collegiate" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Collegiate</a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Holiday Ornaments<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="27"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/wedding-anniversary-holiday-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Wedding &amp; Anniversary Holiday</a><a href="/collections/babies-children-holiday-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Babies &amp; Children Holiday</a><a href="/collections/religious-holiday-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Religious Holiday</a><a href="/collections/christmas-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Christmas</a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/collections/shop-all-ornaments" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">All Ornaments</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/collections/ornaments-accessories" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Ornaments Accessories</a></li></ul></div><div id="header-panel-6" class="header-sidebar__sub-panel" hidden="" style="block-size: auto; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <button type="button" class="header-sidebar__back-button link-faded  text-with-icon h6 md:hidden" data-action="close-panel" style="align-items: center; block-size: auto; border-block-end-width: 1px; border-bottom-width: 1px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); gap: 10px; column-rule-color: rgba(0, 0, 0, 0.65); display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; letter-spacing: 1.44px; line-height: 24.48px; margin-block-end: 16px; margin-bottom: 16px; outline-color: rgba(0, 0, 0, 0.65); overflow-wrap: anywhere; padding-block: 20px 16px; padding-bottom: 16px; padding-top: 20px; perspective-origin: 50% 50%; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 100%; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);"><svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-left  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; fill: none; flex-shrink: 0; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; outline-color: rgba(0, 0, 0, 0.65); overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">
            <path d="M7 1 3 5l4 4" stroke="currentColor" stroke-linecap="square"></path>
          </svg>Our Services</button>

          <ul class="header-sidebar__linklist  unstyled-list" role="list" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><accordion-disclosure style="list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%;">
            <details class="accordion__disclosure group" aria-expanded="false" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
              <summary class="header-sidebar__linklist-button h6" style="align-items: center; block-size: auto; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Personalization<span class="animated-plus group-expanded:rotate" aria-hidden="true" style="block-size: 10px; cursor: pointer; display: block; font-family: Jost, sans-serif; font-size: 14.4px; height: 10px; inline-size: 10px; letter-spacing: 1.44px; line-height: 24.48px; list-style-position: inside; list-style-type: none; overflow-wrap: anywhere; perspective-origin: 50% 50%; position: relative; text-transform: uppercase; transform-origin: 50% 50%; width: 10px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0);" data-id="28"></span>
              </summary>

              <div class="header-sidebar__nested-linklist" style="block-size: auto; border-inline-start-width: 1px; border-left-width: 1px; display: grid; height: auto; inline-size: auto; list-style-type: none; margin-block: 2px 18px; margin-bottom: 18px; margin-inline-start: 8px; margin-left: 8px; margin-top: 2px; padding-inline-start: 24px; padding-left: 24px; perspective-origin: 50% 50%; row-gap: 12px; transform-origin: 50% 50%; width: auto;"><a href="/collections/personalized-pottery" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Personalized Pottery</a><a href="/collections/personalized-ornaments" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Personalized Ornaments</a><a href="/collections/personalized-gifts" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Shop All Personalized Gifts</a><a href="/pages/personalization-guide" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Personalization Guide</a><a href="/pages/faq" class="link-faded-reverse" style="cursor: pointer; display: block; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out;">Personalization FAQ</a></div>
            </details>
          </accordion-disclosure></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/pages/gift-registry" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Registry</a></li></ul><div class="header-sidebar__promo scroll-area bleed md:unbleed" style="block-size: auto; gap: 32px 20px; display: flex; flex-direction: column; grid-auto-flow: column; height: auto; inline-size: auto; margin-block-start: 20px; margin-top: 20px; overflow-block: hidden; overflow-inline: auto; overflow: auto hidden; overscroll-behavior-inline: contain; perspective-origin: 50% 50%; scroll-padding-inline: 0px; scrollbar-width: none; transform-origin: 50% 50%; width: auto;"><a href="/collections/personalized-gifts" class="v-stack justify-items-center gap-4 sm:gap-5 group" style="align-content: start; gap: 20px; cursor: pointer; display: grid; grid-template-columns: minmax(0px, 1fr); justify-items: safe center; min-inline-size: 100%; min-width: 100%; perspective-origin: 50% 50%; transform-origin: 50% 50%;"><div class="overflow-hidden" style="block-size: auto; cursor: pointer; height: auto; inline-size: auto; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"></div><div class="v-stack text-center gap-0.5" style="align-content: start; block-size: auto; gap: 2px; cursor: pointer; display: grid; grid-template-columns: minmax(0px, 1fr); height: auto; inline-size: auto; perspective-origin: 50% 50%; text-align: center; transform-origin: 50% 50%; width: auto;"><p class="h6" style="block-size: auto; cursor: pointer; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: auto; letter-spacing: 1.44px; line-height: 24.48px; overflow-wrap: anywhere; perspective-origin: 50% 50%; text-align: center; text-transform: uppercase; transform-origin: 50% 50%; width: auto;">Let's Get Personal</p><p class="smallcaps text-xs text-subdued" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; font-size: 16px; height: auto; inline-size: auto; letter-spacing: 1.6px; line-height: 26.4px; outline-color: rgba(0, 0, 0, 0.65); perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; width: auto; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Shop all personalized gifts, each hand-personalized by our artists to create a one-of-a-kind keepsake.</p></div></a><div class="v-stack justify-items-center gap-4 sm:gap-5 group" style="align-content: start; block-size: auto; gap: 20px; display: grid; grid-template-columns: minmax(0px, 1fr); height: auto; inline-size: auto; justify-items: safe center; min-inline-size: 100%; min-width: 100%; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><div class="overflow-hidden" style="block-size: auto; height: auto; inline-size: auto; overflow-block: hidden; overflow-inline: hidden; overflow: hidden; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"></div><div class="v-stack text-center gap-0.5" style="align-content: start; block-size: auto; gap: 2px; display: grid; grid-template-columns: minmax(0px, 1fr); height: auto; inline-size: auto; perspective-origin: 50% 50%; text-align: center; transform-origin: 50% 50%; width: auto;"><p class="h6" style="block-size: auto; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: auto; letter-spacing: 1.44px; line-height: 24.48px; overflow-wrap: anywhere; perspective-origin: 50% 50%; text-align: center; text-transform: uppercase; transform-origin: 50% 50%; width: auto;">REGISTER WITH US</p><p class="smallcaps text-xs text-subdued" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); font-size: 16px; height: auto; inline-size: auto; letter-spacing: 1.6px; line-height: 26.4px; outline-color: rgba(0, 0, 0, 0.65); perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; width: auto; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">Create a registry filled with pieces you’ll love and use for years, curated by you to match your style and the way you gather.</p></div></div></div></div><div id="header-panel-7" class="header-sidebar__sub-panel" hidden="" style="block-size: auto; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <button type="button" class="header-sidebar__back-button link-faded  text-with-icon h6 md:hidden" data-action="close-panel" style="align-items: center; block-size: auto; border-block-end-width: 1px; border-bottom-width: 1px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); gap: 10px; column-rule-color: rgba(0, 0, 0, 0.65); display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; letter-spacing: 1.44px; line-height: 24.48px; margin-block-end: 16px; margin-bottom: 16px; outline-color: rgba(0, 0, 0, 0.65); overflow-wrap: anywhere; padding-block: 20px 16px; padding-bottom: 16px; padding-top: 20px; perspective-origin: 50% 50%; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 100%; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);"><svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-left  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; fill: none; flex-shrink: 0; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; outline-color: rgba(0, 0, 0, 0.65); overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">
            <path d="M7 1 3 5l4 4" stroke="currentColor" stroke-linecap="square"></path>
          </svg>About Us</button>

          <ul class="header-sidebar__linklist  unstyled-list" role="list" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/pages/our-story" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Our Story</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/pages/flagship-stores" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Our Flagship Stores</a></li></ul></div><div id="header-panel-9" class="header-sidebar__sub-panel" hidden="" style="block-size: auto; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <button type="button" class="header-sidebar__back-button link-faded  text-with-icon h6 md:hidden" data-action="close-panel" style="align-items: center; block-size: auto; border-block-end-width: 1px; border-bottom-width: 1px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); gap: 10px; column-rule-color: rgba(0, 0, 0, 0.65); display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; letter-spacing: 1.44px; line-height: 24.48px; margin-block-end: 16px; margin-bottom: 16px; outline-color: rgba(0, 0, 0, 0.65); overflow-wrap: anywhere; padding-block: 20px 16px; padding-bottom: 16px; padding-top: 20px; perspective-origin: 50% 50%; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 100%; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);"><svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-left  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; fill: none; flex-shrink: 0; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; outline-color: rgba(0, 0, 0, 0.65); overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">
            <path d="M7 1 3 5l4 4" stroke="currentColor" stroke-linecap="square"></path>
          </svg>Blog</button>

          <ul class="header-sidebar__linklist  unstyled-list" role="list" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/blogs/toast-the-blog" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Visit Toast, The Blog</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="https://manage.kmail-lists.com/subscriptions/subscribe?a=VghVT8&amp;g=Xecejq" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Subscribe to Toast, the Blog</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="https://coton-colors.com/blogs/toast-the-blog/tagged/entertaining" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Entertaining Posts</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="https://coton-colors.com/blogs/toast-the-blog/tagged/recipe" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Recipe Posts</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="https://coton-colors.com/blogs/toast-the-blog/tagged/menus" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Menu Posts</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="https://coton-colors.com/blogs/toast-the-blog/tagged/how-to-guide" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">How-To Guide Posts</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="https://coton-colors.com/blogs/toast-the-blog/tagged/about" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Features Posts</a></li></ul></div><div id="header-panel-10" class="header-sidebar__sub-panel" hidden="" style="block-size: auto; display: none; height: auto; inline-size: auto; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;">
          <button type="button" class="header-sidebar__back-button link-faded  text-with-icon h6 md:hidden" data-action="close-panel" style="align-items: center; block-size: auto; border-block-end-width: 1px; border-bottom-width: 1px; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); gap: 10px; column-rule-color: rgba(0, 0, 0, 0.65); display: none; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 100%; letter-spacing: 1.44px; line-height: 24.48px; margin-block-end: 16px; margin-bottom: 16px; outline-color: rgba(0, 0, 0, 0.65); overflow-wrap: anywhere; padding-block: 20px 16px; padding-bottom: 16px; padding-top: 20px; perspective-origin: 50% 50%; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; transition-timing-function: ease-in-out; width: 100%; -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);"><svg aria-hidden="true" focusable="false" fill="none" width="12" class="icon icon-chevron-left  icon--direction-aware" viewBox="0 0 10 10" style="block-size: auto; caret-color: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); column-rule-color: rgba(0, 0, 0, 0.65); cursor: pointer; fill: none; flex-shrink: 0; font-family: Jost, sans-serif; font-size: 14.4px; height: auto; inline-size: 12px; letter-spacing: 1.44px; line-height: 24.48px; outline-color: rgba(0, 0, 0, 0.65); overflow-block: hidden; overflow-clip-margin: content-box; overflow-inline: hidden; overflow-wrap: anywhere; overflow: hidden; perspective-origin: 50% 50%; text-align: center; text-decoration-color: rgba(0, 0, 0, 0.65); text-emphasis-color: rgba(0, 0, 0, 0.65); text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: transform; width: 12px; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); -webkit-text-fill-color: rgba(0, 0, 0, 0.65); -webkit-text-stroke-color: rgba(0, 0, 0, 0.65);">
            <path d="M7 1 3 5l4 4" stroke="currentColor" stroke-linecap="square"></path>
          </svg>Sale</button>

          <ul class="header-sidebar__linklist  unstyled-list" role="list" style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; margin-inline-start: 0px; margin-left: 0px; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/collections/60-off" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Up to 60% Off</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/collections/50-off" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Up to 50% Off</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/collections/40-off" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Up to 40% Off</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/collections/30-off" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Up to 30% Off</a></li><li style="block-size: auto; height: auto; inline-size: auto; list-style-type: none; perspective-origin: 50% 50%; transform-origin: 50% 50%; width: auto;"><a href="/collections/sale" class="header-sidebar__linklist-button h6" style="align-items: center; cursor: pointer; display: flex; font-family: Jost, sans-serif; font-size: 14.4px; inline-size: 100%; justify-content: space-between; letter-spacing: 1.44px; line-height: 24.48px; list-style-type: none; overflow-wrap: anywhere; padding-block: 10px; padding-bottom: 10px; padding-top: 10px; perspective-origin: 50% 50%; text-transform: uppercase; transform-origin: 50% 50%; transition-duration: 0.2s; transition-property: color; width: 100%;">Shop All Sale</a></li></ul></div></div>
      </header-sidebar-collapsible-panel></header-sidebar></x-header>
  </height-observer>
  </body>
</html>` }
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

export default NavigationMisuseSuccess;
