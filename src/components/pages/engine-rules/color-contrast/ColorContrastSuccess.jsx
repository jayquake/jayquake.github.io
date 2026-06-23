import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ColorContrastSuccess = () => {
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
  { filename: "div with background black and color white", content: `<div style="background-color: black; color: white">Content</div>` },
  { filename: "div with background image", content: `<div
  class="shg-box shg-c"
  style="
    background-image: url('../assets/background-image.avif');
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    block-size: 224.844px;
    inset: 0px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 224.844px;
    inset-block: 0px;
    inset-inline: 0px;
    justify-content: flex-start;
    min-block-size: 122px;
    min-height: 122px;
    min-inline-size: auto;
    min-width: auto;
    padding-block: 40px;
    padding-bottom: 40px;
    padding-top: 40px;
    perspective-origin: 748.5px 112.422px;
    position: relative;
    transform-origin: 748.5px 112.422px;
  "
  data-id="2"
>
  <span
    class="sr-only"
    role="img"
    aria-label="Hero Image - A close-up image of a textured surface with abstract shapes in shades of purple, orange, and blue."
    style="
      block-size: 1px;
      inset: 40px 1497px 204.844px 0px;
      clip: rect(0px, 0px, 0px, 0px);
      cursor: text;
      display: block;
      font-size: 15px;
      height: 1px;
      inline-size: 1px;
      inset-block: 40px 204.844px;
      inset-inline: 0px 1497px;
      line-height: 1px;
      margin-block-start: -1px;
      margin-inline-start: -1px;
      margin-left: -1px;
      margin-top: -1px;
      outline-width: 0px;
      overflow-block: hidden;
      overflow-inline: hidden;
      overflow: hidden;
      perspective-origin: 0.5px 0.5px;
      position: absolute;
      transform-origin: 0.5px 0.5px;
      width: 1px;
    "
  ></span>
  <div class="shg-box-overlay" style="background-color: rgb(35, 31, 32); block-size: 244.844px; inset: 0px; height: 244.844px; inset-block: 0px; inset-inline: 0px; opacity: 0.3; perspective-origin: 748.5px 122.422px; pointer-events: none; position: absolute; transform-origin: 748.5px 122.422px; z-index: 3"></div>
  <div class="shg-box-content" style="block-size: 144.844px; inset: 0px; height: 144.844px; inset-block: 0px; inset-inline: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 748.5px 72.4219px; position: relative; transform-origin: 748.5px 72.4219px; z-index: 4">
    <div class="shg-box-vertical-align-wrapper" style="block-size: 144.844px; display: flex; height: 144.844px; perspective-origin: 748.5px 72.4219px; transform-origin: 748.5px 72.4219px">
      <div
        class="shg-box shg-c container"
        id="s-218db286-99d9-4e19-a184-14cea84ff8b0"
        style="
          block-size: 144.844px;
          inset: 0px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          height: 144.844px;
          inline-size: 1296px;
          inset-block: 0px;
          inset-inline: 0px;
          justify-content: flex-start;
          margin-inline: 100.5px;
          margin-left: 100.5px;
          margin-right: 100.5px;
          max-inline-size: 1296px;
          max-width: 1296px;
          min-block-size: 50px;
          min-height: 50px;
          min-inline-size: auto;
          min-width: auto;
          padding-inline: 24px;
          padding-left: 24px;
          padding-right: 24px;
          perspective-origin: 648px 72.4219px;
          position: relative;
          transform-origin: 648px 72.4219px;
          width: 1296px;
        "
        data-id="1"
      >
        <div
          class="shg-box-overlay"
          style="background-color: rgb(255, 255, 255); block-size: 164.844px; inset: 0px; height: 164.844px; inline-size: 1296px; inset-block: 0px; inset-inline: 0px; opacity: 0; perspective-origin: 648px 82.4219px; pointer-events: none; position: absolute; transform-origin: 648px 82.4219px; width: 1296px; z-index: 3"
        ></div>
        <div
          class="shg-box-content"
          style="block-size: 144.844px; inset: 0px; height: 144.844px; inline-size: 1248px; inset-block: 0px; inset-inline: 0px; min-block-size: auto; min-height: auto; min-inline-size: auto; min-width: auto; perspective-origin: 624px 72.4219px; position: relative; transform-origin: 624px 72.4219px; width: 1248px; z-index: 4"
        >
          <div
            id="s-3711a918-4a16-4002-b314-9b28275040d4"
            class="shg-c hero-text"
            style="block-size: 144.844px; height: 144.844px; inline-size: 750px; margin-inline: 249px; margin-left: 249px; margin-right: 249px; max-inline-size: 750px; max-width: 750px; perspective-origin: 375px 72.4219px; transform-origin: 375px 72.4219px; width: 750px"
            data-id="0"
          >
            <div class="shg-rich-text shg-theme-text-content" style="block-size: 108.844px; height: 108.844px; inline-size: 750px; overflow-wrap: break-word; perspective-origin: 375px 54.4219px; transform-origin: 375px 54.4219px; width: 750px">
              <h1 style="text-align: center; block-size: 45.8438px; height: 45.8438px; inline-size: 750px; overflow-wrap: break-word; perspective-origin: 375px 22.9219px; transform-origin: 375px 22.9219px; width: 750px">
                <span
                  id="h1"
                  style="
                    color: rgb(255, 255, 255);
                    border-block-color: rgb(255, 255, 255);
                    border-color: rgb(255, 255, 255);
                    border-inline-color: rgb(255, 255, 255);
                    caret-color: rgb(255, 255, 255);
                    column-rule-color: rgb(255, 255, 255);
                    font-size: 40px;
                    font-weight: 900;
                    line-height: 45.84px;
                    outline-color: rgb(255, 255, 255);
                    overflow-wrap: break-word;
                    text-align: center;
                    text-decoration-color: rgb(255, 255, 255);
                    text-emphasis-color: rgb(255, 255, 255);
                    text-rendering: optimizelegibility;
                    -webkit-text-fill-color: rgb(255, 255, 255);
                    -webkit-text-stroke-color: rgb(255, 255, 255);
                  "
                  >Home Care</span
                >
              </h1>
              <h4 style="text-align: center; block-size: 27px; height: 27px; inline-size: 750px; overflow-wrap: break-word; perspective-origin: 375px 13.5px; transform-origin: 375px 13.5px; width: 750px">
                <span
                  id="h4"
                  style="
                    color: rgb(255, 255, 255);
                    border-block-color: rgb(255, 255, 255);
                    border-color: rgb(255, 255, 255);
                    border-inline-color: rgb(255, 255, 255);
                    caret-color: rgb(255, 255, 255);
                    column-rule-color: rgb(255, 255, 255);
                    font-size: 20px;
                    font-weight: 900;
                    line-height: 27px;
                    outline-color: rgb(255, 255, 255);
                    overflow-wrap: break-word;
                    text-align: center;
                    text-decoration-color: rgb(255, 255, 255);
                    text-emphasis-color: rgb(255, 255, 255);
                    text-rendering: optimizelegibility;
                    -webkit-text-fill-color: rgb(255, 255, 255);
                    -webkit-text-stroke-color: rgb(255, 255, 255);
                  "
                  >We provide the cleanest solutions for the perfect package.</span
                >
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<style>
  [data-id="0"]::after {
    block-size: 0px;
    content: " ";
    display: table;
    height: 0px;
    inline-size: 0px;
    perspective-origin: 0px 0px;
    transform-origin: 0px 0px;
    width: 0px;
  }
  [data-id="0"]::before {
    block-size: 0px;
    content: " ";
    display: table;
    height: 0px;
    inline-size: 0px;
    perspective-origin: 0px 0px;
    transform-origin: 0px 0px;
    width: 0px;
  }
  [data-id="1"]::after {
    block-size: 0px;
    content: " ";
    display: table;
    height: 0px;
    inline-size: 1248px;
    min-block-size: auto;
    min-height: auto;
    min-inline-size: auto;
    min-width: auto;
    perspective-origin: 624px 0px;
    transform-origin: 624px 0px;
    width: 1248px;
  }
  [data-id="1"]::before {
    block-size: 0px;
    content: " ";
    display: table;
    height: 0px;
    inline-size: 1248px;
    min-block-size: auto;
    min-height: auto;
    min-inline-size: auto;
    min-width: auto;
    perspective-origin: 624px 0px;
    transform-origin: 624px 0px;
    width: 1248px;
  }
  [data-id="2"]::after {
    block-size: 0px;
    content: " ";
    display: table;
    height: 0px;
    inline-size: 1497px;
    min-block-size: auto;
    min-height: auto;
    min-inline-size: auto;
    min-width: auto;
    perspective-origin: 748.5px 0px;
    transform-origin: 748.5px 0px;
    width: 1497px;
  }
  [data-id="2"]::before {
    block-size: 0px;
    content: " ";
    display: table;
    height: 0px;
    inline-size: 1497px;
    min-block-size: auto;
    min-height: auto;
    min-inline-size: auto;
    min-width: auto;
    perspective-origin: 748.5px 0px;
    transform-origin: 748.5px 0px;
    width: 1497px;
  }
</style>` },
  { filename: "div with background transparent and color black and parent non transparent", content: `<div style="background-color: white">
  <div style="background-color: transparent; color: black">Content</div>
</div>` },
  { filename: "div with background transparent and color black", content: `<div style="background-color: transparent; color: black">Content</div>` },
  { filename: "div with background white and color black", content: `<div style="background-color: white; color: black">Content</div>` },
  { filename: "div with font size 16px with ratio bigger than 4.5", content: `<div style="font-size: 16px; color: #824040; background-color: #CCCCCC;">Text Contrast Ratio 4.74:1</div>` },
  { filename: "div with font size 26px with ratio smaller than 4.5", content: `<div style="font-size: 26px; color:  #000000; background-color: #C80909;">Text Contrast Ratio 3.49:1</div>` },
  { filename: "lab color background contrast", content: `<style>
    :root {
        --color-wicked-green: lab(64.9042% -15.339 28.5532);
        --color-noir-black: lab(0% 0 0);
    }

    .bg-wicked-green {
        background-color: var(--color-wicked-green);
    }

    .text-noir-black {
        color: var(--color-noir-black);
    }
</style>

<div class="bg-wicked-green text-noir-black">
  “Dressing in one color—head-to-toe—is less complicated... it is just bold and fierce, for lack of a better word.”
</div>` },
  { filename: "muliple div with font size 16px with ratio bigger than 4.5", content: `<div style="font-size: 16px; color: #824040; background-color: #CCCCCC;"></div>
<div style="font-size: 16px; color: #824040; background-color: #CCCCCC;">Text Contrast Ratio 4.74:1</div>
<div style="font-size: 16px; color: #824040; background-color: #CCCCCC;">Text Contrast Ratio 4.74:1</div>
<div style="font-size: 16px; color: #824040; background-color: #CCCCCC;">Text Contrast Ratio 4.74:1</div>` }
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

export default ColorContrastSuccess;
