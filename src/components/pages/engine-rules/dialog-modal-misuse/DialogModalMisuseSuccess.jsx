import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const DialogModalMisuseSuccess = () => {
  const ruleId = "N/A";
  const title = `N/A`;
  const description = `N/A`;
  const helpText = `N/A`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "bootstrap 4 role on wrapper", content: `<!-- role="dialog" sits on the backdrop wrapper that owns the perceived dialog panel - a valid pattern -->
<meta charset="utf-8">
<div class="row flex-xl-nowrap">
  <main class="col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content" role="main">
<div class="modal fade show" id="exampleModalLive" tabindex="-1" aria-labelledby="exampleModalLiveLabel" aria-modal="true" role="dialog" style="display: block;">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLiveLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Woohoo, you're reading this text in a modal!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
  </main>
</div>
<div class="modal-backdrop fade show"></div>
<style>
html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; }
article, aside, figcaption, figure, footer, header, hgroup, main, nav, section { display: block; }
[tabindex="-1"]:focus:not(:focus-visible) { outline: 0px !important; }
h1, h2, h3, h4, h5, h6 { margin-top: 0px; margin-bottom: 0.5rem; }
p { margin-top: 0px; margin-bottom: 1rem; }
button { border-radius: 0px; }
button, input, optgroup, select, textarea { margin: 0px; font-family: inherit; font-size: inherit; line-height: inherit; }
button, input { overflow: visible; }
button, select { text-transform: none; }
[type="button"], [type="reset"], [type="submit"], button { appearance: button; }
[type="button"]:not(:disabled), [type="reset"]:not(:disabled), [type="submit"]:not(:disabled), button:not(:disabled) { cursor: pointer; }
.h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 { margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; }
.h5, h5 { font-size: 1.25rem; }
.row { display: flex; flex-wrap: wrap; margin-right: -15px; margin-left: -15px; }
.col, .col-1, .col-10, .col-11, .col-12, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-auto, .col-lg, .col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-auto, .col-md, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-auto, .col-sm, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-auto, .col-xl, .col-xl-1, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-auto { position: relative; width: 100%; padding-right: 15px; padding-left: 15px; }
@media (min-width: 768px) {
.col-md-9 { flex: 0 0 75%; max-width: 75%; }
}
@media (min-width: 1200px) {
.col-xl-8 { flex: 0 0 66.6667%; max-width: 66.6667%; }
}
.btn { display: inline-block; font-weight: 400; color: rgb(33, 37, 41); text-align: center; vertical-align: middle; user-select: none; background-color: transparent; border: 1px solid transparent; padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem; transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }
@media (prefers-reduced-motion: reduce) {
.btn { transition: none; }
}
.btn:not(:disabled):not(.disabled) { cursor: pointer; }
.btn-primary { color: rgb(255, 255, 255); background-color: rgb(0, 123, 255); border-color: rgb(0, 123, 255); }
.btn-secondary { color: rgb(255, 255, 255); background-color: rgb(108, 117, 125); border-color: rgb(108, 117, 125); }
.fade { transition: opacity 0.15s linear; }
@media (prefers-reduced-motion: reduce) {
.fade { transition: none; }
}
.close { float: right; font-size: 1.5rem; font-weight: 700; line-height: 1; color: rgb(0, 0, 0); text-shadow: rgb(255, 255, 255) 0px 1px 0px; opacity: 0.5; }
button.close { padding: 0px; background-color: transparent; border: 0px; }
.modal-open .modal { overflow: hidden auto; }
.modal { position: fixed; top: 0px; left: 0px; z-index: 1050; display: none; width: 100%; height: 100%; overflow: hidden; outline: 0px; }
.modal-dialog { position: relative; width: auto; margin: 0.5rem; pointer-events: none; }
.modal.fade .modal-dialog { transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out; transform: translate(0px, -50px); }
@media (prefers-reduced-motion: reduce) {
.modal.fade .modal-dialog { transition: none; }
}
.modal.show .modal-dialog { transform: none; }
.modal-content { position: relative; display: flex; flex-direction: column; width: 100%; pointer-events: auto; background-color: rgb(255, 255, 255); background-clip: padding-box; border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 0.3rem; outline: 0px; }
.modal-backdrop { position: fixed; top: 0px; left: 0px; z-index: 1040; width: 100vw; height: 100vh; background-color: rgb(0, 0, 0); }
.modal-backdrop.fade { opacity: 0; }
.modal-backdrop.show { opacity: 0.5; }
.modal-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 1rem; border-bottom: 1px solid rgb(222, 226, 230); border-top-left-radius: calc(-1px + 0.3rem); border-top-right-radius: calc(-1px + 0.3rem); }
.modal-header .close { padding: 1rem; margin: -1rem -1rem -1rem auto; }
.modal-title { margin-bottom: 0px; line-height: 1.5; }
.modal-body { position: relative; flex: 1 1 auto; padding: 1rem; }
.modal-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; padding: 0.75rem; border-top: 1px solid rgb(222, 226, 230); border-bottom-right-radius: calc(-1px + 0.3rem); border-bottom-left-radius: calc(-1px + 0.3rem); }
.modal-footer > * { margin: 0.25rem; }
@media (min-width: 576px) {
.modal-dialog { max-width: 500px; margin: 1.75rem auto; }
}
@media (min-width: 1200px) {
.flex-xl-nowrap { flex-wrap: nowrap !important; }
}
@media (min-width: 768px) {
.pt-md-3, .py-md-3 { padding-top: 1rem !important; }
}
@media (min-width: 768px) {
.pb-md-3, .py-md-3 { padding-bottom: 1rem !important; }
}
@media (min-width: 768px) {
.pl-md-5, .px-md-5 { padding-left: 3rem !important; }
}
@media print {
h2, h3, p { orphans: 3; widows: 3; }
}
.bd-content { order: 1; }
.modal { z-index: 1072; }
.modal-backdrop { z-index: 1071; }
</style>` },
  { filename: "dialog not open display block", content: `<style>
  dialog {
    display: block;
    width: 250px;
    height: 200px;
  }
</style>
<dialog>
  this is a dialog
  <button>next</button>
</dialog>


<div>body content</div>` },
  { filename: "dialog open", content: `<style>
  dialog {
    width: 250px;
    height: 200px;
  }
</style>
<dialog open>
  this is a dialog
</dialog>` },
  { filename: "div with role dialog modal", content: `<body style="margin: 0; height: 100%">
  <div class="ant-modal-mask" style="background-color: rgba(0, 0, 0, 0.45); box-sizing: border-box; height: 100vh; pointer-events: none; position: fixed; z-index: 1000"></div>
  <div tabindex="-1" class="ant-modal-wrap" style="height: 100vh; width: 100vw; overflow: auto; position: fixed; z-index: 1000; background-color: rgba(165, 165, 165, 0.2)">
    <div id="test-subject" role="dialog" aria-labelledby=":rf:" aria-modal="true" class="ant-modal" style="position: relative; transform: translate(-50%, -50%); top: 50%; left: 50%; width: 502px; z-index: 900">
      <div tabindex="-1" style="outline: none; block-size: 182px; height: 182px; inline-size: 520px; list-style-type: none; perspective-origin: 260px 91px; pointer-events: none; transform-origin: 260px 91px; width: 520px">
        <div
          class="ant-modal-content"
          style="
            background-clip: padding-box;
            background-color: rgb(255, 255, 255);
            block-size: 182px;
            border-radius: 8px;
            border-end-end-radius: 8px;
            border-end-start-radius: 8px;
            border-start-end-radius: 8px;
            border-start-start-radius: 8px;
            inset: 0px;
            box-shadow: rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px;
            box-sizing: border-box;
            height: 182px;
            inline-size: 520px;
            inset-block: 0px;
            inset-inline: 0px;
            list-style-type: none;
            padding-block: 20px;
            padding: 20px 24px;
            padding-inline: 24px;
            perspective-origin: 260px 91px;
            position: relative;
            transform-origin: 260px 91px;
            width: 520px;
          "
        >
          <button
            type="button"
            aria-label="Close"
            class="ant-modal-close"
            style="
              background-color: rgba(0, 0, 0, 0);
              block-size: 32px;
              border-block: 0px none rgba(0, 0, 0, 0.45);
              border-color: rgba(0, 0, 0, 0.45);
              border-radius: 4px;
              border-style: none;
              border-width: 0px;
              border-end-end-radius: 4px;
              border-end-start-radius: 4px;
              border-inline: 0px none rgba(0, 0, 0, 0.45);
              border-start-end-radius: 4px;
              border-start-start-radius: 4px;
              inset: 12px 12px 138px 476px;
              caret-color: rgba(0, 0, 0, 0.45);
              color: rgba(0, 0, 0, 0.45);
              column-rule-color: rgba(0, 0, 0, 0.45);
              cursor: pointer;
              display: block;
              font-weight: 600;
              height: 32px;
              inline-size: 32px;
              inset-block: 12px 138px;
              inset-inline: 476px 12px;
              line-height: 13.3333px;
              list-style-type: none;
              outline-color: rgba(0, 0, 0, 0.45);
              perspective-origin: 16px 16px;
              position: absolute;
              text-decoration: none solid rgba(0, 0, 0, 0.45);
              text-emphasis-color: rgba(0, 0, 0, 0.45);
              transform-origin: 16px 16px;
              transition: color 0.2s, background-color 0.2s;
              width: 32px;
              z-index: 1010;
              -webkit-text-fill-color: rgba(0, 0, 0, 0.45);
              -webkit-text-stroke-color: rgba(0, 0, 0, 0.45);
            "
          >
            <span
              class="ant-modal-close-x"
              style="
                block-size: 16px;
                border-block-color: rgba(0, 0, 0, 0.45);
                border-color: rgba(0, 0, 0, 0.45);
                border-inline-color: rgba(0, 0, 0, 0.45);
                box-sizing: border-box;
                caret-color: rgba(0, 0, 0, 0.45);
                color: rgba(0, 0, 0, 0.45);
                column-rule-color: rgba(0, 0, 0, 0.45);
                cursor: pointer;
                display: flex;
                font-family: Arial;
                font-size: 16px;
                font-weight: 600;
                height: 16px;
                inline-size: 32px;
                justify-content: center;
                line-height: 32px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.45);
                perspective-origin: 16px 8px;
                text-align: center;
                text-decoration: none solid rgba(0, 0, 0, 0.45);
                text-emphasis-color: rgba(0, 0, 0, 0.45);
                transform-origin: 16px 8px;
                width: 32px;
                -webkit-text-fill-color: rgba(0, 0, 0, 0.45);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.45);
              "
              ><span
                role="img"
                aria-label="close"
                class="anticon anticon-close ant-modal-close-icon"
                style="
                  align-items: center;
                  block-size: 16px;
                  border-block-color: rgba(0, 0, 0, 0.45);
                  border-color: rgba(0, 0, 0, 0.45);
                  border-inline-color: rgba(0, 0, 0, 0.45);
                  box-sizing: border-box;
                  caret-color: rgba(0, 0, 0, 0.45);
                  color: rgba(0, 0, 0, 0.45);
                  column-rule-color: rgba(0, 0, 0, 0.45);
                  cursor: pointer;
                  display: flex;
                  font-family: Arial;
                  font-size: 16px;
                  font-weight: 600;
                  height: 16px;
                  inline-size: 16px;
                  line-height: 0px;
                  list-style-type: none;
                  min-block-size: auto;
                  min-height: auto;
                  min-inline-size: auto;
                  min-width: auto;
                  outline-color: rgba(0, 0, 0, 0.45);
                  perspective-origin: 8px 8px;
                  text-align: center;
                  text-decoration: none solid rgba(0, 0, 0, 0.45);
                  text-emphasis-color: rgba(0, 0, 0, 0.45);
                  text-rendering: optimizelegibility;
                  transform-origin: 8px 8px;
                  vertical-align: -2px;
                  width: 16px;
                  -webkit-font-smoothing: antialiased;
                  -webkit-text-fill-color: rgba(0, 0, 0, 0.45);
                  -webkit-text-stroke-color: rgba(0, 0, 0, 0.45);
                "
                ><svg
                  fill-rule="evenodd"
                  viewBox="64 64 896 896"
                  focusable="false"
                  data-icon="close"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  style="
                    block-size: 16px;
                    border-block-color: rgba(0, 0, 0, 0.45);
                    border-color: rgba(0, 0, 0, 0.45);
                    border-inline-color: rgba(0, 0, 0, 0.45);
                    caret-color: rgba(0, 0, 0, 0.45);
                    color: rgba(0, 0, 0, 0.45);
                    column-rule-color: rgba(0, 0, 0, 0.45);
                    cursor: pointer;
                    display: block;
                    fill: rgba(0, 0, 0, 0.45);
                    fill-rule: evenodd;
                    font-family: Arial;
                    font-size: 16px;
                    font-weight: 600;
                    height: 16px;
                    inline-size: 16px;
                    line-height: 16px;
                    list-style-type: none;
                    min-block-size: auto;
                    min-height: auto;
                    min-inline-size: auto;
                    min-width: auto;
                    outline-color: rgba(0, 0, 0, 0.45);
                    overflow-clip-margin: content-box;
                    overflow: hidden;
                    perspective-origin: 8px 8px;
                    text-align: center;
                    text-decoration: none solid rgba(0, 0, 0, 0.45);
                    text-emphasis-color: rgba(0, 0, 0, 0.45);
                    text-rendering: optimizelegibility;
                    transform-origin: 8px 8px;
                    width: 16px;
                    -webkit-font-smoothing: antialiased;
                    -webkit-text-fill-color: rgba(0, 0, 0, 0.45);
                    -webkit-text-stroke-color: rgba(0, 0, 0, 0.45);
                  "
                >
                  <path
                    d="M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"
                  ></path></svg></span
            ></span>
          </button>
          <div
            class="ant-modal-header"
            style="
              background-color: rgb(255, 255, 255);
              block-size: 24px;
              border-start-end-radius: 8px;
              border-start-start-radius: 8px;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
              box-sizing: border-box;
              height: 24px;
              inline-size: 472px;
              list-style-type: none;
              margin-block-end: 8px;
              margin-bottom: 8px;
              perspective-origin: 236px 12px;
              transform-origin: 236px 12px;
              width: 472px;
            "
          >
            <div class="ant-modal-title" id=":rf:" style="block-size: 24px; box-sizing: border-box; font-size: 16px; font-weight: 600; height: 24px; inline-size: 472px; line-height: 24px; list-style-type: none; overflow-wrap: break-word; perspective-origin: 236px 12px; scroll-margin-block-start: 80px; transform-origin: 236px 12px; width: 472px">
              Basic Modal
            </div>
          </div>
          <div class="ant-modal-body" style="block-size: 66px; box-sizing: border-box; height: 66px; inline-size: 472px; list-style-type: none; overflow-wrap: break-word; perspective-origin: 236px 33px; transform-origin: 236px 33px; width: 472px">
            <p style="block-size: 22px; height: 22px; inline-size: 472px; list-style-type: none; overflow-wrap: break-word; perspective-origin: 236px 11px; transform-origin: 236px 11px; width: 472px">Some contents...</p>
            <p style="block-size: 22px; height: 22px; inline-size: 472px; list-style-type: none; overflow-wrap: break-word; perspective-origin: 236px 11px; transform-origin: 236px 11px; width: 472px">Some contents...</p>
            <p style="block-size: 22px; height: 22px; inline-size: 472px; list-style-type: none; overflow-wrap: break-word; perspective-origin: 236px 11px; transform-origin: 236px 11px; width: 472px">Some contents...</p>
          </div>
          <div class="ant-modal-footer" style="block-size: 32px; box-sizing: border-box; height: 32px; inline-size: 472px; list-style-type: none; margin-block-start: 12px; margin-top: 12px; perspective-origin: 236px 16px; text-align: end; transform-origin: 236px 16px; width: 472px">
            <button
              type="button"
              class="ant-btn css-var-R2albtj5cma ant-btn-default"
              style="
                align-items: center;
                background-color: rgb(255, 255, 255);
                block-size: 32px;
                border-block: 1px solid rgb(217, 217, 217);
                border-color: rgb(217, 217, 217);
                border-radius: 6px;
                border-style: solid;
                border-width: 1px;
                border-end-end-radius: 6px;
                border-end-start-radius: 6px;
                border-inline: 1px solid rgb(217, 217, 217);
                border-start-end-radius: 6px;
                border-start-start-radius: 6px;
                inset: 0px;
                box-shadow: rgba(0, 0, 0, 0.02) 0px 2px 0px 0px;
                caret-color: rgba(0, 0, 0, 0.88);
                color: rgba(0, 0, 0, 0.88);
                gap: 8px;
                column-rule-color: rgba(0, 0, 0, 0.88);
                cursor: pointer;
                display: inline-flex;
                font-family: -apple-system, 'system-ui', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
                font-size: 14px;
                height: 32px;
                inline-size: 76.375px;
                inset-block: 0px;
                inset-inline: 0px;
                justify-content: center;
                line-height: 22px;
                list-style-type: none;
                outline-color: rgba(0, 0, 0, 0.88);
                padding-block: 4px;
                padding: 4px 15px;
                padding-inline: 15px;
                perspective-origin: 38.1875px 16px;
                position: relative;
                text-decoration: none solid rgba(0, 0, 0, 0.88);
                text-emphasis-color: rgba(0, 0, 0, 0.88);
                text-wrap: nowrap;
                touch-action: manipulation;
                transform-origin: 38.1875px 16px;
                transition-duration: 0.2s;
                transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
                user-select: none;
                width: 76.375px;
                -webkit-text-fill-color: rgba(0, 0, 0, 0.88);
                -webkit-text-stroke-color: rgba(0, 0, 0, 0.88);
              "
            >
              <span
                style="
                  block-size: 22px;
                  cursor: pointer;
                  display: block;
                  height: 22px;
                  inline-size: 44.3906px;
                  list-style-type: none;
                  min-block-size: auto;
                  min-height: auto;
                  min-inline-size: auto;
                  min-width: auto;
                  perspective-origin: 22.1875px 11px;
                  text-align: center;
                  text-wrap: nowrap;
                  transform-origin: 22.1953px 11px;
                  user-select: none;
                  width: 44.3906px;
                "
                >Cancel</span
              ></button
            ><button
              type="button"
              class="ant-btn css-var-R2albtj5cma ant-btn-primary"
              style="
                align-items: center;
                background-color: rgb(22, 119, 255);
                block-size: 32px;
                border-block: 1px solid rgba(0, 0, 0, 0);
                border-color: rgba(0, 0, 0, 0);
                border-radius: 6px;
                border-style: solid;
                border-width: 1px;
                border-end-end-radius: 6px;
                border-end-start-radius: 6px;
                border-inline: 1px solid rgba(0, 0, 0, 0);
                border-start-end-radius: 6px;
                border-start-start-radius: 6px;
                inset: 0px;
                box-shadow: rgba(5, 145, 255, 0.1) 0px 2px 0px 0px;
                caret-color: rgb(255, 255, 255);
                color: rgb(255, 255, 255);
                gap: 8px;
                column-rule-color: rgb(255, 255, 255);
                cursor: pointer;
                display: inline-flex;
                font-family: -apple-system, 'system-ui', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
                font-size: 14px;
                height: 32px;
                inline-size: 51.7344px;
                inset-block: 0px;
                inset-inline: 0px;
                justify-content: center;
                line-height: 22px;
                list-style-type: none;
                margin-inline-start: 8px;
                margin-left: 8px;
                outline-color: rgb(255, 255, 255);
                padding-block: 4px;
                padding: 4px 15px;
                padding-inline: 15px;
                perspective-origin: 25.8594px 16px;
                position: relative;
                text-decoration: none solid rgb(255, 255, 255);
                text-emphasis-color: rgb(255, 255, 255);
                text-wrap: nowrap;
                touch-action: manipulation;
                transform-origin: 25.8672px 16px;
                transition-duration: 0.2s;
                transition-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
                user-select: none;
                width: 51.7344px;
                -webkit-text-fill-color: rgb(255, 255, 255);
                -webkit-text-stroke-color: rgb(255, 255, 255);
              "
            >
              <span
                style="
                  block-size: 22px;
                  border-block-color: rgb(255, 255, 255);
                  border-color: rgb(255, 255, 255);
                  border-inline-color: rgb(255, 255, 255);
                  caret-color: rgb(255, 255, 255);
                  color: rgb(255, 255, 255);
                  column-rule-color: rgb(255, 255, 255);
                  cursor: pointer;
                  display: block;
                  height: 22px;
                  inline-size: 19.7344px;
                  list-style-type: none;
                  min-block-size: auto;
                  min-height: auto;
                  min-inline-size: auto;
                  min-width: auto;
                  outline-color: rgb(255, 255, 255);
                  perspective-origin: 9.85938px 11px;
                  text-align: center;
                  text-decoration: none solid rgb(255, 255, 255);
                  text-emphasis-color: rgb(255, 255, 255);
                  text-wrap: nowrap;
                  transform-origin: 9.86719px 11px;
                  user-select: none;
                  width: 19.7344px;
                  -webkit-text-fill-color: rgb(255, 255, 255);
                  -webkit-text-stroke-color: rgb(255, 255, 255);
                "
                >OK</span
              >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>` },
  { filename: "modal with fractional backdrop within tolerance", content: `<!-- Tests that a dialog with a fixed backdrop that is within the 1px width tolerance of the total width of the dom rect is still recognized as modal. -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html,
      body {
        height: 100%;
        margin: 0;
      }

      body {
        font-family: Arial, sans-serif;
      }

      .backdrop {
        position: fixed;
        top: 0.5px;
        left: 0.5px;
        width: calc(100vw - 0.5px);
        height: 100vh;
        background: rgba(15, 23, 42, 0.45);
        z-index: 10;
      }

      #test-subject {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 320px;
        min-height: 180px;
        padding: 24px;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 16px 48px rgba(15, 23, 42, 0.25);
        z-index: 11;
      }

      h1 {
        margin: 0 0 12px;
        font-size: 24px;
      }

      p {
        margin: 0;
        line-height: 1.5;
      }

      .actions {
        display: flex;
        gap: 12px;
        margin-top: 24px;
      }
    </style>
  </head>
  <body>
    <div class="backdrop" aria-hidden="true"></div>
    <div id="test-subject" role="dialog" aria-modal="true" aria-label="Product update dialog">
      <h1>Stay updated</h1>
      <p>Subscribe to get notified when this item is back in stock.</p>
      <div class="actions">
        <button type="button">Close</button>
        <button type="button">Subscribe</button>
      </div>
    </div>
  </body>
</html>` },
  { filename: "southern arboretum help modal role on modal dialog", content: `<!-- role="dialog" sits on the intermediate \`.modal-dialog\` between the perceived dialog panel and its backdrop - a valid pattern -->
<meta charset="utf-8">
<div id="map-grid">
  <div id="map-container">
<div id="twig-map" class="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" tabindex="0" style="position: relative;"><div class="leaflet-pane leaflet-map-pane" style="transform: translate3d(0px, 0px, 0px);"><div class="leaflet-pane leaflet-rotate-pane" style="transform: translate3d(0px, 0px, 0px);"><div class="leaflet-pane leaflet-tile-pane"><div class="leaflet-layer " style="z-index: 1;"><div class="leaflet-tile-container leaflet-zoom-animated" style="z-index: 24; transform: translate3d(0px, 0px, 0px) scale(1);"><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(396px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(652px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(396px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(652px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(396px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(652px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(140px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(908px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(140px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(908px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(396px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(652px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(140px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(908px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(140px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(908px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(-116px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(1164px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(-116px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(1164px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(-116px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(1164px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(-116px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(1164px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="></div></div></div><div class="leaflet-pane leaflet-overlay-pane"><svg pointer-events="none" class="leaflet-zoom-animated" width="1446" height="774" viewBox="-121 -65 1446 774" style="transform: translate3d(-121px, -65px, 0px);"><g><path class="leaflet-interactive" stroke="#000" stroke-opacity="1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#00ffab" fill-opacity="0.8" fill-rule="evenodd" d="M641,28a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 "></path></g></svg></div></div><div class="leaflet-pane leaflet-norotate-pane"><div class="leaflet-pane leaflet-shadow-pane"></div><div class="leaflet-pane leaflet-marker-pane"><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(489px, 611px, 0px); z-index: 611;"><div><span>14</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(544px, 455px, 0px); z-index: 455;"><div><span>135</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(520px, 557px, 0px); z-index: 557;"><div><span>69</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(786px, 225px, 0px); z-index: 225;"><div><span>3</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(805px, 329px, 0px); z-index: 329;"><div><span>11</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(559px, 21px, 0px); z-index: 21;"><div><span>10</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(755px, 124px, 0px); z-index: 124;"><div><span>3</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(692px, 207px, 0px); z-index: 207;"><div><span>53</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(662px, 97px, 0px); z-index: 97;"><div><span>31</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(609px, 177px, 0px); z-index: 177;"><div><span>256</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(657px, 517px, 0px); z-index: 517;"><div><span>38</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(697px, 410px, 0px); z-index: 410;"><div><span>44</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(723px, 530px, 0px); z-index: 530;"><div><span>38</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(581px, 248px, 0px); z-index: 248;"><div><span>265</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(590px, 400px, 0px); z-index: 400;"><div><span>87</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(676px, 313px, 0px); z-index: 313;"><div><span>55</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(524px, 322px, 0px); z-index: 322;"><div><span>155</span></div></div></div><div class="leaflet-pane leaflet-tooltip-pane"></div><div class="leaflet-pane leaflet-popup-pane"></div></div><div class="leaflet-proxy leaflet-zoom-animated"></div></div><div class="leaflet-control-container"><div class="leaflet-top leaflet-left"><div class="leaflet-control-zoom leaflet-bar leaflet-control"><a class="leaflet-control-zoom-in" title="Zoom in" role="button" aria-label="Zoom in" aria-disabled="false"><span aria-hidden="true">+</span></a><a class="leaflet-control-zoom-out" title="Zoom out" role="button" aria-label="Zoom out" aria-disabled="false"><span aria-hidden="true">−</span></a></div><div class="leaflet-control-rotate leaflet-bar leaflet-control" style="display: none;"><a class="leaflet-control-rotate-toggle" title="Rotate map"><span class="leaflet-control-rotate-arrow"></span></a></div></div><div class="leaflet-top leaflet-right"><div class="twig-toolbar leaflet-control"><a><i class="las la-plus-square" style="font-size:18px" aria-hidden="true"></i></a></div></div><div class="leaflet-bottom leaflet-left"></div><div class="leaflet-bottom leaflet-right"><input id="twig-map-attribution-toggle" type="checkbox" class="leaflet-compact-attribution-toggle"><div class="leaflet-control-attribution leaflet-control leaflet-compact-attribution"><a title="A JavaScript library for interactive maps"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"></path><path fill="#FFD500" d="M0 4h12v3H0z"></path><path fill="#E0BC00" d="M0 7h12v1H0z"></path></svg> Leaflet</a> <span aria-hidden="true">|</span> © OpenStreetMap France | © <a>OpenStreetMap</a> contributors</div><label for="twig-map-attribution-toggle" class="leaflet-control leaflet-compact-attribution-label"></label></div></div></div>
<div id="twig-alert" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Error</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <p id="twig-alert-msg">Error msg.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
            </div>
        </div>
    </div>
</div>
<div id="twig-sgtour-help" class="modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            Arboretum Self-Guided Tour                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII=">
                                                    Welcome to the <b>Self-Guided Tour</b>! Explore the Arboretum at your own pace.
                            At any time you can disable or enable this in the map settings
                            (<i class="las la-plus-square" style="font-size:18px" aria-hidden="true"></i>).
                                            </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
<div id="twig-help" class="modal show"  style="display: block;">
        <div class="modal-dialog modal-dialog-centered" tabindex="-1" aria-modal="true" role="dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Welcome to the Arboretum Map!                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Start exploring the <b>Arboretum</b>!</p>
                    <ul>
                        <li>Each marker on the map is a tree, so click on it to see more info.</li>
                        <li>
                            Click the icon
                            (<i class="las la-plus-square" style="font-size:18px" aria-hidden="true"></i>)
                            in the top right of the map to change settings.
                        </li>
                                                    <li>
                                If you want a more full view of the map, you can collapse the top
                                ( <i class="fa fa-arrows-v" aria-hidden="true"></i> )
                                and right
                                ( <i class="fa fa-map" aria-hidden="true"></i> / <i class="fa fa-list" aria-hidden="true"></i> )
                                panels.
                            </li>
                                            </ul>
                </div>
                <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Next</button>
                                    </div>
            </div>
        </div>
    </div>
  </div>
</div>
<style>
html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; }
h1, h2, h3, h4, h5, h6 { margin-top: 0px; margin-bottom: 0.5rem; }
p { margin-top: 0px; margin-bottom: 1rem; }
ol, ul, dl { margin-top: 0px; margin-bottom: 1rem; }
b, strong { font-weight: bolder; }
button { border-radius: 0px; }
input, button, select, optgroup, textarea { margin: 0px; font-family: inherit; font-size: inherit; line-height: inherit; }
button, input { overflow: visible; }
button, select { text-transform: none; }
button, [type="button"], [type="reset"], [type="submit"] { appearance: button; }
button:not(:disabled), [type="button"]:not(:disabled), [type="reset"]:not(:disabled), [type="submit"]:not(:disabled) { cursor: pointer; }
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 { margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; }
h5, .h5 { font-size: 1.25rem; }
.btn { display: inline-block; font-weight: 400; color: rgb(33, 37, 41); text-align: center; vertical-align: middle; user-select: none; background-color: transparent; border: 1px solid transparent; padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem; transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }
@media (prefers-reduced-motion: reduce) {
.btn { transition: none; }
}
.btn:not(:disabled):not(.disabled) { cursor: pointer; }
.btn-secondary { color: rgb(255, 255, 255); background-color: rgb(108, 117, 125); border-color: rgb(108, 117, 125); }
.close { float: right; font-size: 1.5rem; font-weight: 700; line-height: 1; color: rgb(0, 0, 0); text-shadow: rgb(255, 255, 255) 0px 1px 0px; opacity: 0.5; }
button.close { padding: 0px; background-color: transparent; border: 0px; }
.modal-open .modal { overflow: hidden auto; }
.modal { position: fixed; top: 0px; left: 0px; z-index: 1050; display: none; width: 100%; height: 100%; overflow: hidden; outline: 0px; background-color: rgba(0, 0, 0, 0.5); }
.modal-dialog { position: relative; width: auto; margin: 0.5rem; pointer-events: none; }
.modal.show .modal-dialog { transform: none; }
.modal-dialog-centered { display: flex; align-items: center; min-height: calc(100% - 1rem); }
.modal-dialog-centered::before { display: block; height: min-content; content: ""; }
.modal-content { position: relative; display: flex; flex-direction: column; width: 100%; pointer-events: auto; background-color: rgb(255, 255, 255); background-clip: padding-box; border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 0.3rem; outline: 0px; }
.modal-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 1rem; border-bottom: 1px solid rgb(222, 226, 230); border-top-left-radius: calc(-1px + 0.3rem); border-top-right-radius: calc(-1px + 0.3rem); }
.modal-header .close { padding: 1rem; margin: -1rem -1rem -1rem auto; }
.modal-title { margin-bottom: 0px; line-height: 1.5; }
.modal-body { position: relative; flex: 1 1 auto; padding: 1rem; }
.modal-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; padding: 0.75rem; border-top: 1px solid rgb(222, 226, 230); border-bottom-right-radius: calc(-1px + 0.3rem); border-bottom-left-radius: calc(-1px + 0.3rem); }
.modal-footer > * { margin: 0.25rem; }
@media (min-width: 576px) {
.modal-dialog { max-width: 500px; margin: 1.75rem auto; }
}
@media (min-width: 576px) {
.modal-dialog-centered { min-height: calc(100% - 3.5rem); }
}
@media (min-width: 576px) {
.modal-dialog-centered::before { height: min-content; }
}
@media print {
p, h2, h3 { orphans: 3; widows: 3; }
}
* { font-family: "Open Sans"; }
h1, h2, h3, h4, h5, h6 { font-family: "Neue Helvetica Condensed"; text-transform: uppercase; color: var(--color-evergreen); font-weight: 600; }
.styled-link h1, h2, h3, h4, h5, a, a:visited { font-family: "Neue Helvetica Condensed"; font-weight: 600; text-transform: uppercase; text-decoration: none; color: var(--color-evergreen); background-color: transparent; }
.la, .lab, .lad, .lal, .lar, .las { -webkit-font-smoothing: antialiased; display: inline-block; font-style: normal; font-variant: normal; text-rendering: auto; line-height: 1; }
.la-plus-square::before { content: ""; }
.la, .las { font-family: "Line Awesome Free"; font-weight: 900; }
.fa, .fab, .fad, .fal, .far, .fas { -webkit-font-smoothing: antialiased; display: inline-block; font-style: normal; font-variant: normal; text-rendering: auto; line-height: 1; }
.fa-list::before { content: ""; }
.fa-map::before { content: ""; }
.fa, .far, .fas { font-family: "Font Awesome 5 Free"; }
.fa, .fas { font-weight: 900; }
.fa { display: inline-block; font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: 1; font-family: FontAwesome; font-size: inherit; text-rendering: auto; -webkit-font-smoothing: antialiased; }
.fa-list::before { content: ""; }
.fa-arrows-v::before { content: ""; }
.fa-map::before { content: ""; }
#map-grid { display: grid; grid-template-columns: 1fr 75px; height: auto; }
@media (max-width: 550px) {
#map-grid { grid-template-columns: 0px 1fr; }
}
</style>` },
  { filename: "southern arboretum help modal", content: `<!-- role="dialog" sits on the Bootstrap backdrop wrapper that owns the perceived dialog panel - a valid pattern -->
<meta charset="utf-8">
<div id="map-grid">
  <div id="map-container">
<div id="twig-map" class="leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" tabindex="0" style="position: relative;"><div class="leaflet-pane leaflet-map-pane" style="transform: translate3d(0px, 0px, 0px);"><div class="leaflet-pane leaflet-rotate-pane" style="transform: translate3d(0px, 0px, 0px);"><div class="leaflet-pane leaflet-tile-pane"><div class="leaflet-layer " style="z-index: 1;"><div class="leaflet-tile-container leaflet-zoom-animated" style="z-index: 24; transform: translate3d(0px, 0px, 0px) scale(1);"><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(396px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(652px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(396px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(652px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(396px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(652px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(140px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(908px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(140px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(908px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(396px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(652px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(140px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(908px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(140px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(908px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(-116px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(1164px, 79px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(-116px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(1164px, 335px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(-116px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(1164px, -177px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(-116px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="><img alt="" class="leaflet-tile" style="width: 256px; height: 256px; transform: translate3d(1164px, 591px, 0px);" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII="></div></div></div><div class="leaflet-pane leaflet-overlay-pane"><svg pointer-events="none" class="leaflet-zoom-animated" width="1446" height="774" viewBox="-121 -65 1446 774" style="transform: translate3d(-121px, -65px, 0px);"><g><path class="leaflet-interactive" stroke="#000" stroke-opacity="1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#00ffab" fill-opacity="0.8" fill-rule="evenodd" d="M641,28a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 "></path></g></svg></div></div><div class="leaflet-pane leaflet-norotate-pane"><div class="leaflet-pane leaflet-shadow-pane"></div><div class="leaflet-pane leaflet-marker-pane"><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(489px, 611px, 0px); z-index: 611;"><div><span>14</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(544px, 455px, 0px); z-index: 455;"><div><span>135</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(520px, 557px, 0px); z-index: 557;"><div><span>69</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(786px, 225px, 0px); z-index: 225;"><div><span>3</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(805px, 329px, 0px); z-index: 329;"><div><span>11</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(559px, 21px, 0px); z-index: 21;"><div><span>10</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-small leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(755px, 124px, 0px); z-index: 124;"><div><span>3</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(692px, 207px, 0px); z-index: 207;"><div><span>53</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(662px, 97px, 0px); z-index: 97;"><div><span>31</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(609px, 177px, 0px); z-index: 177;"><div><span>256</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(657px, 517px, 0px); z-index: 517;"><div><span>38</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(697px, 410px, 0px); z-index: 410;"><div><span>44</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(723px, 530px, 0px); z-index: 530;"><div><span>38</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(581px, 248px, 0px); z-index: 248;"><div><span>265</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(590px, 400px, 0px); z-index: 400;"><div><span>87</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-medium leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(676px, 313px, 0px); z-index: 313;"><div><span>55</span></div></div><div class="leaflet-marker-icon marker-cluster marker-cluster-large leaflet-zoom-animated leaflet-interactive" tabindex="0" role="button" style="margin-left: -20px; margin-top: -20px; transform-origin: 20px 20px 0px; width: 40px; height: 40px; transform: translate3d(524px, 322px, 0px); z-index: 322;"><div><span>155</span></div></div></div><div class="leaflet-pane leaflet-tooltip-pane"></div><div class="leaflet-pane leaflet-popup-pane"></div></div><div class="leaflet-proxy leaflet-zoom-animated"></div></div><div class="leaflet-control-container"><div class="leaflet-top leaflet-left"><div class="leaflet-control-zoom leaflet-bar leaflet-control"><a class="leaflet-control-zoom-in" title="Zoom in" role="button" aria-label="Zoom in" aria-disabled="false"><span aria-hidden="true">+</span></a><a class="leaflet-control-zoom-out" title="Zoom out" role="button" aria-label="Zoom out" aria-disabled="false"><span aria-hidden="true">−</span></a></div><div class="leaflet-control-rotate leaflet-bar leaflet-control" style="display: none;"><a class="leaflet-control-rotate-toggle" title="Rotate map"><span class="leaflet-control-rotate-arrow"></span></a></div></div><div class="leaflet-top leaflet-right"><div class="twig-toolbar leaflet-control"><a><i class="las la-plus-square" style="font-size:18px" aria-hidden="true"></i></a></div></div><div class="leaflet-bottom leaflet-left"></div><div class="leaflet-bottom leaflet-right"><input id="twig-map-attribution-toggle" type="checkbox" class="leaflet-compact-attribution-toggle"><div class="leaflet-control-attribution leaflet-control leaflet-compact-attribution"><a title="A JavaScript library for interactive maps"><svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"></path><path fill="#FFD500" d="M0 4h12v3H0z"></path><path fill="#E0BC00" d="M0 7h12v1H0z"></path></svg> Leaflet</a> <span aria-hidden="true">|</span> © OpenStreetMap France | © <a>OpenStreetMap</a> contributors</div><label for="twig-map-attribution-toggle" class="leaflet-control leaflet-compact-attribution-label"></label></div></div></div>
<div id="twig-alert" class="modal" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Error</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
            </div>
            <div class="modal-body">
                <p id="twig-alert-msg">Error msg.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
            </div>
        </div>
    </div>
</div>
<div id="twig-sgtour-help" class="modal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            Arboretum Self-Guided Tour                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img alt="" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/lXcAAAAASUVORK5CYII=">
                                                    Welcome to the <b>Self-Guided Tour</b>! Explore the Arboretum at your own pace.
                            At any time you can disable or enable this in the map settings
                            (<i class="las la-plus-square" style="font-size:18px" aria-hidden="true"></i>).
                                            </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>
<div id="twig-help" class="modal show" tabindex="-1" aria-modal="true" role="dialog" style="display: block;">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Welcome to the Arboretum Map!                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Start exploring the <b>Arboretum</b>!</p>
                    <ul>
                        <li>Each marker on the map is a tree, so click on it to see more info.</li>
                        <li>
                            Click the icon
                            (<i class="las la-plus-square" style="font-size:18px" aria-hidden="true"></i>)
                            in the top right of the map to change settings.
                        </li>
                                                    <li>
                                If you want a more full view of the map, you can collapse the top
                                ( <i class="fa fa-arrows-v" aria-hidden="true"></i> )
                                and right
                                ( <i class="fa fa-map" aria-hidden="true"></i> / <i class="fa fa-list" aria-hidden="true"></i> )
                                panels.
                            </li>
                                            </ul>
                </div>
                <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Next</button>
                                    </div>
            </div>
        </div>
    </div>
  </div>
</div>
<style>
html, body { width: 100%; height: 100%; margin: 0; overflow: hidden; }
h1, h2, h3, h4, h5, h6 { margin-top: 0px; margin-bottom: 0.5rem; }
p { margin-top: 0px; margin-bottom: 1rem; }
ol, ul, dl { margin-top: 0px; margin-bottom: 1rem; }
b, strong { font-weight: bolder; }
button { border-radius: 0px; }
input, button, select, optgroup, textarea { margin: 0px; font-family: inherit; font-size: inherit; line-height: inherit; }
button, input { overflow: visible; }
button, select { text-transform: none; }
button, [type="button"], [type="reset"], [type="submit"] { appearance: button; }
button:not(:disabled), [type="button"]:not(:disabled), [type="reset"]:not(:disabled), [type="submit"]:not(:disabled) { cursor: pointer; }
h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 { margin-bottom: 0.5rem; font-weight: 500; line-height: 1.2; }
h5, .h5 { font-size: 1.25rem; }
.btn { display: inline-block; font-weight: 400; color: rgb(33, 37, 41); text-align: center; vertical-align: middle; user-select: none; background-color: transparent; border: 1px solid transparent; padding: 0.375rem 0.75rem; font-size: 1rem; line-height: 1.5; border-radius: 0.25rem; transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out; }
@media (prefers-reduced-motion: reduce) {
.btn { transition: none; }
}
.btn:not(:disabled):not(.disabled) { cursor: pointer; }
.btn-secondary { color: rgb(255, 255, 255); background-color: rgb(108, 117, 125); border-color: rgb(108, 117, 125); }
.close { float: right; font-size: 1.5rem; font-weight: 700; line-height: 1; color: rgb(0, 0, 0); text-shadow: rgb(255, 255, 255) 0px 1px 0px; opacity: 0.5; }
button.close { padding: 0px; background-color: transparent; border: 0px; }
.modal-open .modal { overflow: hidden auto; }
.modal { position: fixed; top: 0px; left: 0px; z-index: 1050; display: none; width: 100%; height: 100%; overflow: hidden; outline: 0px; background-color: rgba(0, 0, 0, 0.5); }
.modal-dialog { position: relative; width: auto; margin: 0.5rem; pointer-events: none; }
.modal.show .modal-dialog { transform: none; }
.modal-dialog-centered { display: flex; align-items: center; min-height: calc(100% - 1rem); }
.modal-dialog-centered::before { display: block; height: min-content; content: ""; }
.modal-content { position: relative; display: flex; flex-direction: column; width: 100%; pointer-events: auto; background-color: rgb(255, 255, 255); background-clip: padding-box; border: 1px solid rgba(0, 0, 0, 0.2); border-radius: 0.3rem; outline: 0px; }
.modal-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 1rem; border-bottom: 1px solid rgb(222, 226, 230); border-top-left-radius: calc(-1px + 0.3rem); border-top-right-radius: calc(-1px + 0.3rem); }
.modal-header .close { padding: 1rem; margin: -1rem -1rem -1rem auto; }
.modal-title { margin-bottom: 0px; line-height: 1.5; }
.modal-body { position: relative; flex: 1 1 auto; padding: 1rem; }
.modal-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; padding: 0.75rem; border-top: 1px solid rgb(222, 226, 230); border-bottom-right-radius: calc(-1px + 0.3rem); border-bottom-left-radius: calc(-1px + 0.3rem); }
.modal-footer > * { margin: 0.25rem; }
@media (min-width: 576px) {
.modal-dialog { max-width: 500px; margin: 1.75rem auto; }
}
@media (min-width: 576px) {
.modal-dialog-centered { min-height: calc(100% - 3.5rem); }
}
@media (min-width: 576px) {
.modal-dialog-centered::before { height: min-content; }
}
@media print {
p, h2, h3 { orphans: 3; widows: 3; }
}
* { font-family: "Open Sans"; }
h1, h2, h3, h4, h5, h6 { font-family: "Neue Helvetica Condensed"; text-transform: uppercase; color: var(--color-evergreen); font-weight: 600; }
.styled-link h1, h2, h3, h4, h5, a, a:visited { font-family: "Neue Helvetica Condensed"; font-weight: 600; text-transform: uppercase; text-decoration: none; color: var(--color-evergreen); background-color: transparent; }
.la, .lab, .lad, .lal, .lar, .las { -webkit-font-smoothing: antialiased; display: inline-block; font-style: normal; font-variant: normal; text-rendering: auto; line-height: 1; }
.la-plus-square::before { content: ""; }
.la, .las { font-family: "Line Awesome Free"; font-weight: 900; }
.fa, .fab, .fad, .fal, .far, .fas { -webkit-font-smoothing: antialiased; display: inline-block; font-style: normal; font-variant: normal; text-rendering: auto; line-height: 1; }
.fa-list::before { content: ""; }
.fa-map::before { content: ""; }
.fa, .far, .fas { font-family: "Font Awesome 5 Free"; }
.fa, .fas { font-weight: 900; }
.fa { display: inline-block; font-style: normal; font-variant: normal; font-size-adjust: none; font-kerning: auto; font-optical-sizing: auto; font-feature-settings: normal; font-variation-settings: normal; font-weight: normal; font-stretch: normal; line-height: 1; font-family: FontAwesome; font-size: inherit; text-rendering: auto; -webkit-font-smoothing: antialiased; }
.fa-list::before { content: ""; }
.fa-arrows-v::before { content: ""; }
.fa-map::before { content: ""; }
#map-grid { display: grid; grid-template-columns: 1fr 75px; height: auto; }
@media (max-width: 550px) {
#map-grid { grid-template-columns: 0px 1fr; }
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

export default DialogModalMisuseSuccess;
