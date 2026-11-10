import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const MainNavigationDiscernibleSuccess = () => {
  const ruleId = "main-navigation-discernible";
  const title = `Main navigation should be labelled properly`;
  const description = `Main navigation elements should have text available for screen readers explaining that it is the main navigation.`;
  const helpText = `Add an aria-label to the main navigation elements`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "accessiBe main menu nav with aria label", content: `<header class="header" data-element="header" style="align-items: center; animation-duration: 0.001s; block-size: 65px; display: flex; height: 65px; justify-content: space-between; perspective-origin: 748.5px 32.5px; transform-origin: 748.5px 32.5px">
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
          role="navigation"
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
  { filename: "accessiBe main menu with aria label", content: `<header class="header" data-element="header" style="align-items: center; animation-duration: 0.001s; block-size: 65px; display: flex; height: 65px; justify-content: space-between; perspective-origin: 748.5px 32.5px; transform-origin: 748.5px 32.5px">
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
          role="navigation"
          style="animation-duration: 0.001s; block-size: 65px; height: 65px; inline-size: 671.805px; margin-inline-start: 35px; margin-left: 35px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 335.898px 32.5px; transform-origin: 335.902px 32.5px; width: 671.805px"
        >
          <ul data-acsb-menu="ul" role="region" aria-label="Submenu" data-acsb-main-menu="true" id="test" style="animation-duration: 0.001s; block-size: 65px; height: 65px; inline-size: 671.812px; perspective-origin: 335.906px 32.5px; transform-origin: 335.906px 32.5px; width: 671.812px">
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
  { filename: "eulesstx main menu", content: `<nav aria-label="Main Navigation" class="regularmegamenu mainnav" id="menuContainer_1_0_1001">
  <ul class="dropdownmenu clearfix">
    <li class="megamenu_first" id="dropdownrootitem1"><a class="dropdownrootitem1" href="/home" aria-label="Home" data-navid="1" target="_self" style="overflow: visible">Home</a></li>
    <li class="megamenu_first" id="dropdownrootitem2">
      <a class="dropdownrootitem2" href="/community" aria-label="Community" data-navid="2" target="_self" style="overflow: visible">Community</a>
      <div class="megamenu_container widthcontainer4col" style="display: none; max-height: 26px">
        <div class="inner_container">
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/community/city-information" aria-label="City Information" data-navid="766" target="_self">City Information</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/accessibility" aria-label="Accessibility" data-navid="784" target="_self">Accessibility</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/betterment-fund" aria-label="Betterment Fund" data-navid="803" target="_self">Betterment Fund</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/city-hall-campus" aria-label="City Hall Campus" data-navid="524" target="_self">City Hall Campus</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/community-powered-revitalization" aria-label="Community Powered Revitalization" data-navid="265" target="_self">Community Powered Revitalization</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/elected-officials" aria-label="Elected Officials" data-navid="242" target="_self">Elected Officials</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/euless-facts" aria-label="Euless Facts" data-navid="225" target="_self">Euless Facts</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/euless-maps" aria-label="Euless Maps" data-navid="266" target="_self">Euless Maps</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/facility-directory" aria-label="Facility Directory" data-navid="34" target="_self">Facility Directory</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/local-attractions" aria-label="Local Attractions" data-navid="666" target="_self">Local Attractions</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/public-art" aria-label="Public Art" data-navid="298" target="_self">Public Art</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/retire-in-euless" aria-label="Retire in Euless" data-navid="267" target="_self">Retire in Euless</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/transportation-services" aria-label="Transportation Services" data-navid="201" target="_self">Transportation Services</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/utilities" aria-label="Utilities" data-navid="632" target="_self">Utilities</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/city-information/where-to-stay" aria-label="Where to Stay" data-navid="633" target="_self">Where to Stay</a></li>
              </ul>
            </li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/community/environment" aria-label="Environment" data-navid="192" target="_self">Environment</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/environment/air-quality" aria-label="Air Quality" data-navid="268" target="_self">Air Quality</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/environment/cease-the-grease" aria-label="Cease the Grease" data-navid="269" target="_self">Cease the Grease</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/environment/garbage-and-recycling" aria-label="Garbage and Recycling" data-navid="270" target="_self">Garbage and Recycling</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/environment/mosquito-spraying" aria-label="Mosquito Spraying" data-navid="278" target="_self">Mosquito Spraying</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/environment/sprinkler-evaluation" aria-label="Sprinkler Evaluation" data-navid="276" target="_self">Sprinkler Evaluation</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/environment/storm-drains" aria-label="Storm Drains" data-navid="279" target="_self">Storm Drains</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/environment/tree-city-usa" aria-label="Tree City USA" data-navid="280" target="_self">Tree City USA</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/environment/water-conservation" aria-label="Water Conservation" data-navid="281" target="_self">Water Conservation</a></li>
              </ul>
            </li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/community/history" aria-label="History" data-navid="196" target="_self">History</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/history/historic-places" aria-label="Historic Places" data-navid="767" target="_self">Historic Places</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/history/historical-preservation-committee" aria-label="Historical Preservation Committee" data-navid="300" target="_self">Historical Preservation Committee</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/history/leaders-past-and-present" aria-label="Leaders Past and Present" data-navid="285" target="_self">Leaders Past and Present</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/history/oral-history-narratives" aria-label="Oral History Narratives" data-navid="301" target="_self">Oral History Narratives</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/history/volunteering-and-donations" aria-label="Volunteering and Donations" data-navid="303" target="_self">Volunteering and Donations</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/history/weldon-g-cannon-history-files" aria-label="Weldon G. Cannon History Files" data-navid="764" target="_self">Weldon G. Cannon History Files</a></li>
              </ul>
            </li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/community/stay-connected" aria-label="Stay Connected" data-navid="200" target="_self">Stay Connected</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/access-euless" aria-label="Access Euless" data-navid="321" target="_self">Access Euless</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/calendar-of-events" aria-label="Calendar of Events" data-navid="17" target="_self">Calendar of Events</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/codered" aria-label="Emergency Notifications" data-navid="878" target="_self">Emergency Notifications</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/contact-us" aria-label="Contact Us" data-navid="743" target="_self">Contact Us</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/construction-updates" aria-label="Construction Updates" data-navid="771" target="_self">Construction Updates</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/enotification" aria-label="eNotification" data-navid="41" target="_self">eNotification</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/euless-today-newsletter" aria-label="Euless Today Newsletter" data-navid="322" target="_self">Euless Today Newsletter</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/government-access-channel" aria-label="Euless Cable Channel" data-navid="323" target="_self">Euless Cable Channel</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/news-list" aria-label="News List" data-navid="16" target="_self">News List</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/public-meetings" aria-label="Public Meetings" data-navid="520" target="_self">Public Meetings</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/public-notices" aria-label="Public Notices" data-navid="528" target="_self">Public Notices</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/social-media" aria-label="Social Media" data-navid="710" target="_self">Social Media</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/the-playbook" aria-label="The Playbook" data-navid="881" target="_self">The Playbook</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/volunteer-opportunities" aria-label="Volunteer Opportunities" data-navid="862" target="_blank" rel="noopener">Volunteer Opportunities</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/stay-connected/weather-preparedness" aria-label="Weather Preparedness" data-navid="877" target="_self">Weather Preparedness</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li class="megamenu_first" id="dropdownrootitem3">
      <a class="dropdownrootitem3" href="/departments" aria-label="Departments" data-navid="3" target="_self" style="overflow: visible">Departments</a>
      <div class="megamenu_container widthcontainer4col" style="display: none; max-height: 26px">
        <div class="inner_container">
          <ul class="megamenu_column">
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/animal-services" aria-label="Animal Services" data-navid="794" target="_self">Animal Services</a></li>
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/finance" aria-label="Finance" data-navid="431" target="_self">Finance</a></li>
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/fire-department" aria-label="Fire Department" data-navid="550" target="_self">Fire Department</a></li>
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/fleet-and-facility-operations" aria-label="Fleet and Facility Operations" data-navid="554" target="_self">Fleet and Facility Operations</a></li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/human-resources" aria-label="Human Resources" data-navid="499" target="_self">Human Resources</a></li>
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/library" aria-label="Library" data-navid="197" target="_self">Library</a></li>
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/municipal-court" aria-label="Municipal Court" data-navid="584" target="_self">Municipal Court</a></li>
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/parks-and-community-services" aria-label="Parks and Community Services" data-navid="198" target="_self">Parks and Community Services</a></li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/planning-and-economic-development" aria-label="Planning and Economic Development" data-navid="610" target="_self">Planning and Economic Development</a></li>
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/police-department" aria-label="Police Department" data-navid="745" target="_self">Police Department</a></li>
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/public-works-and-engineering" aria-label="Public Works and Engineering" data-navid="605" target="_self">Public Works and Engineering</a></li>
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/purchasing-office" aria-label="Purchasing Office" data-navid="638" target="_self">Purchasing Office</a></li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/water-utilities" aria-label="Water Utilities" data-navid="583" target="_self">Water Utilities</a></li>
          </ul>
        </div>
      </div>
    </li>
    <li class="megamenu_first active _visionMenuSelected" id="dropdownrootitem4">
      <a class="dropdownrootitem4" href="/city-hall" aria-label="City Hall" data-navid="4" target="_self" style="overflow: visible">City Hall</a>
      <div class="megamenu_container widthcontainer4col" style="display: none; max-height: 26px">
        <div class="inner_container">
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/city-hall/euless-city-council" aria-label="Euless City Council" data-navid="512" target="_self">Euless City Council</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/euless-city-council/city-council-meeting-documents" aria-label="Agendas and Minutes" data-navid="634" target="_self">Agendas and Minutes</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/euless-city-council/mayor" aria-label="Mayor" data-navid="511" target="_self">Mayor</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/euless-city-council/place-1" aria-label="Place 1" data-navid="513" target="_self">Place 1</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/euless-city-council/place-2" aria-label="Place 2" data-navid="514" target="_self">Place 2</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/euless-city-council/place-3" aria-label="Place 3" data-navid="515" target="_self">Place 3</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/euless-city-council/place-4" aria-label="Place 4" data-navid="516" target="_self">Place 4</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/euless-city-council/place-5" aria-label="Place 5" data-navid="517" target="_self">Place 5</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/euless-city-council/place-6" aria-label="Place 6" data-navid="518" target="_self">Place 6</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/euless-city-council/streaming-video" aria-label="Streaming Video" data-navid="519" target="_self">Streaming Video</a></li>
              </ul>
            </li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/city-hall/boards-and-commissions" aria-label="Boards and Commissions" data-navid="521" target="_self">Boards and Commissions</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/animal-shelter-advisory-board" aria-label="Animal Shelter Advisory Board" data-navid="529" target="_self">Animal Shelter Advisory Board</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/capital-improvements-advisory-committee" aria-label="Capital Improvements Advisory Committee" data-navid="530" target="_self">Capital Improvements Advisory Committee</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/civil-service-commission" aria-label="Civil Service Commission" data-navid="505" target="_self">Civil Service Commission</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/crime-control-and-prevention-district-board" aria-label="Crime Control and Prevention District Board" data-navid="531" target="_self">Crime Control and Prevention District Board</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/euless-development-corporation" aria-label="Euless Development Corporation" data-navid="532" target="_self">Euless Development Corporation</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/euless-police-training-and-advisory-board" aria-label="Euless Police Training and Advisory Board" data-navid="836" target="_self">Euless Police Training and Advisory Board</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/historical-preservation-committee" aria-label="Historical Preservation Committee" data-navid="534" target="_self">Historical Preservation Committee</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/housing-and-structure-board" aria-label="Housing and Structure Board" data-navid="535" target="_self">Housing and Structure Board</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/library-board" aria-label="Library Board" data-navid="437" target="_self">Library Board</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/parks-and-leisure-services-board" aria-label="Parks and Leisure Services Board" data-navid="497" target="_self">Parks and Leisure Services Board</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/planning-and-zoning-commission" aria-label="Planning and Zoning Commission" data-navid="537" target="_self">Planning and Zoning Commission</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/tax-increment-reinvestment-zone-3" aria-label="Tax Increment Reinvestment Zone #3" data-navid="538" target="_self">Tax Increment Reinvestment Zone #3</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/tax-increment-reinvestment-zone-4" aria-label="Tax Increment Reinvestment Zone #4" data-navid="539" target="_self">Tax Increment Reinvestment Zone #4</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/boards-and-commissions/zoning-board-of-adjustment" aria-label="Zoning Board of Adjustment" data-navid="540" target="_self">Zoning Board of Adjustment</a></li>
              </ul>
            </li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/city-hall/city-manager-s-office" aria-label="City Manager's Office" data-navid="419" target="_self">City Manager's Office</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/community/history/leaders-past-and-present/history-of-the-cmo" aria-label="History of the CMO" data-navid="886" target="_self">History of the CMO</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/city-manager-s-office/public-meetings" aria-label="Public Meetings" data-navid="769" target="_self">Public Meetings</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/city-manager-s-office/staff-directory" aria-label="Staff Directory" data-navid="558" target="_self">Staff Directory</a></li>
              </ul>
            </li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/city-hall/city-secretary-s-office" aria-label="City Secretary's Office" data-navid="522" target="_self">City Secretary's Office</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/city-secretary-s-office/electronic-document-repository" aria-label="City Records Search" data-navid="709" target="_blank" rel="noopener">City Records Search</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/city-secretary-s-office/elections" aria-label="Elections" data-navid="526" target="_self">Elections</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/city-secretary-s-office/history-of-the-cso" aria-label="History of the CSO" data-navid="299" target="_self">History of the CSO</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/city-secretary-s-office/open-records-request" aria-label="Open Records Request" data-navid="527" target="_self">Open Records Request</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/city-secretary-s-office/ordinances" aria-label="Ordinances" data-navid="523" target="_self">Ordinances</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/city-secretary-s-office/public-notices" aria-label="Public Notices" data-navid="770" target="_self">Public Notices</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/city-hall/city-secretary-s-office/special-recognition-and-presentations" aria-label="Special Recognition and Presentations" data-navid="773" target="_self">Special Recognition and Presentations</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </li>
    <li class="megamenu_first" id="dropdownrootitem5">
      <a class="dropdownrootitem5" href="/employment" aria-label="Employment" data-navid="5" target="_self" style="overflow: visible">Employment</a>
      <div class="megamenu_container widthcontainer4col" style="display: none; max-height: 26px">
        <div class="inner_container">
          <ul class="megamenu_column">
            <li class="megamenu_level1"><a class="megamenu_level1" href="/employment/current-job-opportunities" aria-label="Current Job Opportunities" data-navid="500" target="_self">Current Job Opportunities</a></li>
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/human-resources/benefits-summary" aria-label="Benefits Summary" data-navid="562" target="_self">Benefits Summary</a></li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/human-resources/how-to-apply" aria-label="How to Apply" data-navid="560" target="_self">How to Apply</a></li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/fire-department/firefighter-recruitment" aria-label="Firefighter Recruitment" data-navid="706" target="_self">Firefighter Recruitment</a></li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1"><a class="megamenu_level1" href="/departments/police-department/police-officer-recruitment" aria-label="Police Officer Recruitment" data-navid="701" target="_self">Police Officer Recruitment</a></li>
          </ul>
        </div>
      </div>
    </li>
    <li class="megamenu_first" id="dropdownrootitem6">
      <a class="dropdownrootitem6" href="/recreation" aria-label="Recreation" data-navid="6" target="_self" style="overflow: visible">Recreation</a>
      <div class="megamenu_container widthcontainer4col" style="display: none; max-height: 26px">
        <div class="inner_container">
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/recreation/euless-family-life-center-740" aria-label="Euless Family Life Center" data-navid="740" target="_self">Euless Family Life Center</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/euless-family-life-center/aquatic-park" aria-label="Aquatic Park" data-navid="782" target="_self">Aquatic Park</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/euless-family-life-center/fitness-center" aria-label="Fitness Center" data-navid="870" target="_self">Fitness Center</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/euless-family-life-center/natatorium" aria-label="Natatorium" data-navid="783" target="_self">Natatorium</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/euless-family-life-center/recreation-center" aria-label="Recreation Center" data-navid="872" target="_self">Recreation Center</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/euless-family-life-center/senior-center" aria-label="Senior Center" data-navid="871" target="_self">Senior Center</a></li>
              </ul>
            </li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/recreation/parks-and-community-services" aria-label="Parks and Community Services" data-navid="738" target="_self">Parks and Community Services</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/parks-and-community-services/aquatics" aria-label="Aquatics" data-navid="780" target="_self">Aquatics</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/parks-and-community-services/parks" aria-label="City Parks" data-navid="781" target="_self">City Parks</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/euless-family-life-center/recreation-registration" aria-label="Recreation Registration" data-navid="843" target="_blank" rel="noopener">Recreation Registration</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/parks-and-community-services/rental-information" aria-label="Rental Information" data-navid="883" target="_self">Rental Information</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/parks-and-community-services/trails-of-euless" aria-label="Trails of Euless" data-navid="880" target="_self">Trails of Euless</a></li>
              </ul>
            </li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/recreation/parks-at-texas-star" aria-label="Parks at Texas Star" data-navid="739" target="_blank" rel="noopener">Parks at Texas Star</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/parks-at-texas-star/children-s-health-starcenter" aria-label="Children's Health StarCenter" data-navid="735" target="_blank" rel="noopener">Children's Health StarCenter</a></li>
              </ul>
            </li>
          </ul>
          <ul class="megamenu_column">
            <li class="megamenu_level1">
              <a class="megamenu_level1" href="/recreation/texas-star-golf-course" aria-label="Texas Star Golf Course" data-navid="736" target="_blank" rel="noopener">Texas Star Golf Course</a>
              <ul class="megamenu_level1">
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/texas-star-golf-course/conference-centre" aria-label="Conference Centre" data-navid="777" target="_blank" rel="noopener">Conference Centre</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/texas-star-golf-course/golf-course" aria-label="Golf Course" data-navid="776" target="_blank" rel="noopener">Golf Course</a></li>
                <li class="megamenu_level2"><a class="megamenu_level2" href="/recreation/texas-star-golf-course/raven-s-grille" aria-label="Raven's Grille" data-navid="778" target="_blank" rel="noopener">Raven's Grille</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </li>
  </ul>
  <a id="pagebody"></a>
</nav>

<style>
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 10px;
  }
</style>` },
  { filename: "fountain hire product menu", content: `<nav id="header" role="navigation" aria-label="header" class="navbar navbar-expand">
  <div class="large-container">
    <div class="headwrapper">
      <a class="navbar-brand" href="/" title="Fountain" rel="home">
        <img src="https://www.fountain.com/wp-content/themes/fountainv2/images/fountain-logo-product.svg" class="skip-lazy" alt="Fountain" />
      </a>
      <div class="collapse navbar-collapse" id="mobile_nav">
        <ul class="navbar-nav navbar-light primary-nav" id="primary-nav">
          <li class="nav-item megamenu-li full-width column product-width menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor menu-item-has-children">
            <a id="menu-1476" class="nav-link dropdown-toggle" aria-controls="submenu-1476" role="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" target="_self" tabindex="0">Solutions</a>
            <div class="dropdown-menu megamenu sm-menu" aria-labelledby="submenu-1476">
              <div class="row">
                <div class="listview mb-9">
                  <div class="products-across">
                    <div class="items-for-menu">
                      <span class="menu-with-children">
                        <span class="dropdown-header menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children">Products</span>
                        <div class="menu-child-child-wrapper">
                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/source" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/App-icon-sourcing.png" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/App-icon-sourcing.png" decoding="async" class="lazyloaded" data-eio-rwidth="116" data-eio-rheight="116" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/App-icon-sourcing.png" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">Source</span>
                              <span class="sub-item-description">24/7 agentic sourcing</span>
                            </span>
                          </a>

                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/pool" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/line-crm.png" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/line-crm.png" decoding="async" class="lazyloaded" data-eio-rwidth="116" data-eio-rheight="116" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/line-crm.png" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">CRM</span>
                              <span class="sub-item-description">Rehire who you already know</span>
                            </span>
                          </a>

                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-1425 current_page_item" href="https://www.fountain.com/hire" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/line-ats.png" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/line-ats.png" decoding="async" class="lazyloaded" data-eio-rwidth="116" data-eio-rheight="116" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/line-ats.png" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">ATS</span>
                              <span class="sub-item-description">Apply to offer, automated</span>
                            </span>
                          </a>

                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/onboard" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/App-icon-onboarding-1.png" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/App-icon-onboarding-1.png" decoding="async" class="lazyloaded" data-eio-rwidth="64" data-eio-rheight="64" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/App-icon-onboarding-1.png" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">Onboarding</span>
                              <span class="sub-item-description">Day-one ready, every time</span>
                            </span>
                          </a>

                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/shift" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/line-scheduling.png" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/line-scheduling.png" decoding="async" class="lazyloaded" data-eio-rwidth="116" data-eio-rheight="116" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/line-scheduling.png" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">Shift &amp; Scheduling</span>
                              <span class="sub-item-description">Fill every shift before it gaps</span>
                            </span>
                          </a>
                        </div>
                      </span>
                      <span class="menu-with-children">
                        <span class="dropdown-header menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">AI Agents</span>
                        <div class="menu-child-child-wrapper">
                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/airecruiter" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/anna-icon.png" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/anna-icon.png" decoding="async" class="lazyloaded" data-eio-rwidth="96" data-eio-rheight="96" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/anna-icon.png" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">Anna - AI Recruiter</span>
                              <span class="sub-item-description">Screens candidates while you sleep</span>
                            </span>
                          </a>

                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-custom menu-item-object-custom menu-item-home" href="https://www.fountain.com/#agentic-agents" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/emma-icon.png" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/emma-icon.png" decoding="async" class="lazyloaded" data-eio-rwidth="96" data-eio-rheight="96" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/emma-icon.png" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">Emma - AI 24/7 Support</span>
                              <span class="sub-item-description">Every form, before day one</span>
                            </span>
                          </a>

                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-custom menu-item-object-custom menu-item-home" href="https://www.fountain.com/#agentic-agents" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/sam-icon.png" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/sam-icon.png" decoding="async" class="lazyloaded" data-eio-rwidth="96" data-eio-rheight="96" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/sam-icon.png" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">Sam - AI Satisfaction</span>
                              <span class="sub-item-description">Engage. Retain. Repeat</span>
                            </span>
                          </a>
                        </div>
                      </span>
                      <span class="menu-with-children">
                        <span class="dropdown-header menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">Cue</span>
                        <div class="menu-child-child-wrapper">
                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-custom menu-item-object-custom menu-item-home" href="https://www.fountain.com/#cue-video" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/cue-waiting-ld.png" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/cue-waiting-ld.png" decoding="async" class="lazyloaded" data-eio-rwidth="64" data-eio-rheight="64" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/cue-waiting-ld.png" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">Cue</span>
                              <span class="sub-item-description">One prompt. Everything moves</span>
                            </span>
                          </a>

                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-custom menu-item-object-custom" href="https://run.fountain.com/for/logistics" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/cue-logistics.svg" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/cue-logistics.svg" decoding="async" class="lazyloaded" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/cue-logistics.svg" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">Cue for Logistics/Delivery</span>
                              <span class="sub-item-description">High-volume, time-sensitive hiring</span>
                            </span>
                          </a>

                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-custom menu-item-object-custom" href="https://run.fountain.com/for/retail" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/cue-retail.svg" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/cue-retail.svg" decoding="async" class="lazyloaded" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/cue-retail.svg" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">Cue for Retail</span>
                              <span class="sub-item-description">Store staffing at scale</span>
                            </span>
                          </a>

                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-custom menu-item-object-custom" href="https://run.fountain.com/for/qsr" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/cue-restaurants.svg" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/cue-restaurants.svg" decoding="async" class="lazyloaded" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/cue-restaurants.svg" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">Cue for Restaurants</span>
                              <span class="sub-item-description">Fast hiring, shift coverage</span>
                            </span>
                          </a>

                          <a class="dropdown-item sub-item dropdown-has-image menu-item menu-item-type-custom menu-item-object-custom" href="https://run.fountain.com/for/outsourced" target="_self">
                            <img src="https://www.fountain.com/wp-content/uploads/2026/04/cue-outsourced.png" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2026/04/cue-outsourced.png" decoding="async" class="lazyloaded" data-eio-rwidth="320" data-eio-rheight="320" /><noscript
                              ><img src="https://www.fountain.com/wp-content/uploads/2026/04/cue-outsourced.png" alt="" aria-hidden="true" data-eio="l"
                            /></noscript>

                            <span class="sub-item-wrap">
                              <span class="sub-item-title">Cue for Outsourced Services</span>
                              <span class="sub-item-description">Multi-client hiring, simplified</span>
                            </span>
                          </a>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="listview mb-3">
                  <aside class="products-callout powered-by" style="background-image: url('https://www.fountain.com/wp-content/uploads/2025/09/powered-by-bg.png'); background-size: cover; background-position: center; background-repeat: no-repeat" aria-labelledby="powered-by-title">
                    <div class="powered-by__inner">
                      <div class="powered-by__header">
                        <div id="powered-by-title" class="powered-by__headline">Powered by<br /><i>Frontline Superintelligence</i></div>
                        <img class="powered-by__logo lazyloaded" src="https://www.fountain.com/wp-content/uploads/2025/09/powered-by-header.png" alt="Powered By" data-src="https://www.fountain.com/wp-content/uploads/2025/09/powered-by-header.png" decoding="async" data-eio-rwidth="111" data-eio-rheight="82" /><noscript
                          ><img class="powered-by__logo" src="https://www.fountain.com/wp-content/uploads/2025/09/powered-by-header.png" alt="Powered By" data-eio="l"
                        /></noscript>
                      </div>

                      <div class="powered-by__sub">The agentic operating system for the frontline workforce.</div>

                      <ul class="powered-by__bullets">
                        <li>Connects all Fountain products in one platform</li>
                        <li>Integrates seamlessly with your HR tech stack</li>
                        <li>Automates hiring, onboarding, and shift ops</li>
                        <li>Powers AI agents to act, adapt, and improve</li>
                        <li>Delivers real-time insights to boost performance</li>
                      </ul>

                      <a class="btn btn-primary cta-button powered-by__cta" href="https://www.fountain.com/frontline-os"> Learn more </a>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item megamenu-li full-width menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
            <a id="menu-1477" class="nav-link dropdown-toggle" aria-controls="submenu-1477" role="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" target="_self" tabindex="0">Use Cases</a>
            <div class="dropdown-menu megamenu sm-menu" aria-labelledby="submenu-1477">
              <div class="row">
                <div class="listview mb-12">
                  <div class="items-for-menu">
                    <span class="menu-with-children">
                      <a class="dropdown-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children" href="https://www.fountain.com/industry">By Industry</a>
                      <div class="menu-child-child-wrapper">
                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-industry" href="https://www.fountain.com/industry/retail" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Retail</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-industry" href="https://www.fountain.com/industry/manufacturing" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Manufacturing</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-industry" href="https://www.fountain.com/industry/logistics" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Logistics</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-industry" href="https://www.fountain.com/industry/hospitality" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Hospitality</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-industry" href="https://www.fountain.com/industry/healthcare" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Healthcare</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-industry" href="https://www.fountain.com/industry/delivery" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Delivery</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-industry" href="https://www.fountain.com/industry/food-beverage" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Food and Beverage</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-industry" href="https://www.fountain.com/industry/professional-services" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Professional Services</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-industry" href="https://www.fountain.com/industry/grocery" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Grocery</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-custom menu-item-object-custom" href="https://start.fountain.com/fountain-for-franchise" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Franchises</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-custom menu-item-object-custom" href="https://start.fountain.com/fountain-for-private-equity-firms" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Private Equity Firms</span>
                          </span>
                        </a>
                      </div>
                    </span>
                    <span class="menu-with-children">
                      <a class="dropdown-item menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children" href="https://www.fountain.com/role">By Role</a>
                      <div class="menu-child-child-wrapper">
                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-role" href="https://www.fountain.com/role/chro" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">CHRO</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-role" href="https://www.fountain.com/role/deib" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">DEIB</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-role" href="https://www.fountain.com/role/hiring-managers" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Hiring Managers</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-role" href="https://www.fountain.com/role/hris" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">HRIS</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-role" href="https://www.fountain.com/role/operations" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Operations</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-role" href="https://www.fountain.com/role/recruiters" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Recruiters</span>
                          </span>
                        </a>

                        <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-role" href="https://www.fountain.com/role/talent-acquisition" target="_self">
                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Talent Acquisition</span>
                          </span>
                        </a>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item megamenu-li resources menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
            <a id="menu-3220" class="nav-link dropdown-toggle" aria-controls="submenu-3220" role="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" target="_self" tabindex="0">Resources</a>
            <div class="dropdown-menu megamenu sm-menu" aria-labelledby="submenu-3220">
              <div class="row">
                <div class="listview mb-12 resources-mobile">
                  <a class="dropdown-item menu-item-has-children menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/resources">Resources</a>
                </div>
                <div class="flex-row">
                  <div class="listview mb-3 resources-mobile">
                    <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/ai-glossary-for-hr-frontline-hiring">AI Glossary</a>
                    <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/blog">Blog</a>
                    <a class="dropdown-item sub-item menu-item menu-item-type-custom menu-item-object-custom" href="https://alternatives.fountain.com/compare">Compare</a>
                    <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/customers">Customer Stories</a>
                    <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/datasheets">Data Sheets</a>
                    <a class="dropdown-item sub-item menu-item menu-item-type-custom menu-item-object-custom" href="https://ebook.fountain.com/">E-Books</a>
                  </div>
                  <div class="listview mb-3">
                    <p class="resource-item-title"><i>Latest</i> Blogs</p>
                    <div class="collection-list-32">
                      <div role="listitem" class="collection-item-25 w-dyn-item">
                        <div class="featured-resource-block grid align-left">
                          <a href="https://www.fountain.com/posts/indeed-organic-visibility-change-2026" class="featured-resource-block-inner grid">
                            <div>
                              <p class="menu-item-title">Indeed’s 2026 Organic Visibility Change: What It Means for Frontline Hiring</p>
                              <p class="menu-item-desc">Indeed's single-source feed change went live March 31, 2026. What chan...</p>
                            </div>
                            <div class="small-link-with-arrow black cta">Learn More</div>
                          </a>
                        </div>
                      </div>
                      <div role="listitem" class="collection-item-25 w-dyn-item">
                        <div class="featured-resource-block grid align-left">
                          <a href="https://www.fountain.com/posts/remote-i9-verification-guide-everify-employers" class="featured-resource-block-inner grid">
                            <div>
                              <p class="menu-item-title">A Practical Guide to Remote I-9 Verification</p>
                              <p class="menu-item-desc">How to complete Form I-9 remotely: the DHS live-video procedure, autho...</p>
                            </div>
                            <div class="small-link-with-arrow black cta">Learn More</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="listview mb-3">
                    <p class="resource-item-title"><i>Popular</i> E-Books</p>

                    <div class="collection-list-32 ebooks" role="list">
                      <div role="listitem" class="collection-item-25 w-dyn-item">
                        <div class="featured-resource-block ebooks grid align-left">
                          <a href="https://ebook.fountain.com/2026-gartner-magic-quadrant-talent-acquisition-recruiting-suites" class="featured-resource-block-inner grid">
                            <div>
                              <p class="menu-item-title">2026 Gartner® Magic Quadrant™ for Talent Acquisition (Recruiting) Suites</p>
                              <p class="menu-item-desc">Gain a comprehensive view of the Talent Acquisition (Recruiting) Suites landscape and see how vendors are positioned.</p>
                            </div>
                            <div class="small-link-with-arrow cta">Learn More</div>
                          </a>
                        </div>
                      </div>
                      <div role="listitem" class="collection-item-25 w-dyn-item">
                        <div class="featured-resource-block ebooks grid align-left">
                          <a href="https://ebook.fountain.com/agentic-ai" class="featured-resource-block-inner grid">
                            <div>
                              <p class="menu-item-title">How Agentic AI Is Redefining Frontline Hiring in 2025</p>
                              <p class="menu-item-desc">Discover how leading employers are using Agentic AI to hire faster, retain longer, and reduce manual work—at scale.</p>
                            </div>
                            <div class="small-link-with-arrow cta">Learn More</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="listview mb-3">
                    <p class="resource-item-title"><i>Highlighted</i> Case Study</p>
                    <div class="collection-list-32">
                      <div role="listitem" class="collection-item-25 w-dyn-item">
                        <div class="featured-resource-block case_studies grid align-left">
                          <a href="https://www.fountain.com/customer/bojangles" class="featured-resource-block-inner grid">
                            <div style="background-image: url('https://www.fountain.com/wp-content/uploads/2023/07/bojangles-drive-thru-menu.jpg')" class="resource-image resource-case_studies lazyloaded" data-back="https://www.fountain.com/wp-content/uploads/2023/07/bojangles-drive-thru-menu.jpg" data-eio-rwidth="284" data-eio-rheight="211"></div>
                            <div>
                              <p class="menu-item-title">Bojangles: Decreased time-to-hire for staff by 80%</p>
                              <p class="menu-item-desc">Bojangles paired automated workflows with the human touch to cut time-to-hire</p>
                            </div>
                            <div class="small-link-with-arrow black cta">Learn More</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item megamenu-li menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
            <a id="menu-1479" class="nav-link dropdown-toggle" aria-controls="submenu-1479" role="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" target="_self" tabindex="0">Company</a>
            <div class="dropdown-menu megamenu sm-menu" aria-labelledby="submenu-1479">
              <div class="row">
                <div class="listview mb-8">
                  <div class="items-for-menu">
                    <a class="dropdown-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/contact-us">Contact Us</a>

                    <a class="dropdown-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/about-us">About Us</a>

                    <a class="dropdown-item sub-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/integrations">Partners &amp; Integrations</a>

                    <a class="dropdown-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/newsroom">Newsroom</a>

                    <a class="dropdown-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/careers-fountain">Careers</a>

                    <a class="dropdown-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/customers">Customers</a>

                    <a class="dropdown-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/corporate-responsibility">Impact</a>

                    <a class="dropdown-item menu-item menu-item-type-post_type menu-item-object-page" href="https://www.fountain.com/newsletter">Join our Newsletter</a>
                  </div>
                </div>
                <div class="listview mb-4">
                  <a class="why-fountain-link" target="_self" href="https://www.fountain.com/why-fountain">
                    <span class="why-fountain-link-title">Why Fountain</span>
                    <span class="why-fountain-menu">As your trusted partner in frontline workforce management, Fountain makes every process smarter, faster, and simpler. See how we can help you exceed your hiring goals, one offer at a time.</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
          <li class="nav-item megamenu-li full-width column signin menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
            <a id="menu-4160" class="nav-link dropdown-toggle" aria-controls="submenu-4160" role="button" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown" target="_self" tabindex="0">Sign In</a>
            <div class="dropdown-menu megamenu sm-menu" aria-labelledby="submenu-4160">
              <div class="row">
                <div class="listview mb-12">
                  <div class="items-for-menu">
                    <span class="menu-with-children">
                      <span class="dropdown-header menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children"><i>Log in for</i> Fountain Hire</span>
                      <div class="menu-child-child-wrapper">
                        <a class="dropdown-item sub-item dropdown-has-image hire-login menu-item menu-item-type-custom menu-item-object-custom" href="https://web.fountain.com/users/sign_in" target="_self">
                          <img src="https://www.fountain.com/wp-content/uploads/2024/09/hire-card.svg" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2024/09/hire-card.svg" decoding="async" class="lazyloaded" /><noscript
                            ><img src="https://www.fountain.com/wp-content/uploads/2024/09/hire-card.svg" alt="" aria-hidden="true" data-eio="l"
                          /></noscript>

                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Fountain Hire</span>
                            <span class="sub-item-description">Log In</span>
                          </span>
                        </a>
                      </div>
                    </span>
                    <span class="menu-with-children">
                      <span class="dropdown-header menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children"><i>Log in for</i> Worker Experience Platform</span>
                      <div class="menu-child-child-wrapper">
                        <a class="dropdown-item sub-item dropdown-has-image wx-login menu-item menu-item-type-custom menu-item-object-custom" href="https://employer.fountain.com" target="_self">
                          <img src="https://www.fountain.com/wp-content/uploads/2024/09/wx-card-2.svg" alt="" aria-hidden="true" data-src="https://www.fountain.com/wp-content/uploads/2024/09/wx-card-2.svg" decoding="async" class="lazyloaded" /><noscript
                            ><img src="https://www.fountain.com/wp-content/uploads/2024/09/wx-card-2.svg" alt="" aria-hidden="true" data-eio="l"
                          /></noscript>

                          <span class="sub-item-wrap">
                            <span class="sub-item-title">Worker Experience</span>
                            <span class="sub-item-description">Log In</span>
                          </span>
                        </a>
                      </div>
                    </span>
                    <a class="dropdown-item worker menu-item menu-item-type-custom menu-item-object-custom" href="https://web.fountain.com/portal/v2/applicants/sign_in">Are you a worker? Sign in here</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="flex-one">
        <div class="button_container navbar-toggler" id="togglemenu" data-toggle="collapse" data-target="#mobile_nav" aria-controls="mobile_nav" aria-expanded="false" aria-label="Toggle navigation" role="button" tabindex="0">
          <span class="topline"></span>
          <span class="middleline"></span>
          <span class="bottomline"></span>
        </div>
      </div>
    </div>
  </div>
</nav>

<style>
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 10px;
  }

  li > a {
    cursor: pointer;
  }

  .dropdown-menu.megamenu.sm-menu {
    display: none;
  }
</style>` },
  { filename: "main menu with aria label", content: `<nav aria-label="Main Menu">
  <ul>
    <li>
      <a href="/home">Home</a>
    </li>
    <li>
      <a href="/about">About</a>
    </li>
    <li>
      <a href="/pricing">Pricing</a>
    </li>
  </ul>
</nav>` }
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

export default MainNavigationDiscernibleSuccess;
