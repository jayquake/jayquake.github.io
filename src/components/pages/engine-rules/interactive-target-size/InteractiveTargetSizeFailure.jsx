import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const InteractiveTargetSizeFailure = () => {
  const ruleId = "interactive-target-size";
  const title = `Targets for interactive elements should meet a minimum size (at least 24 by 24 CSS pixels) or have enough spacing around them`;
  const description = `Interactive elements, such as buttons and links, should have a minimum size of 24 by 24 CSS pixels or have enough spacing to avoid accidental activation of adjacent elements. This is crucial for users with motor impairments or those using the website in unstable environments, like on a bus.`;
  const helpText = `Make sure all interactive targets meet the minimum size of 24 by 24 CSS pixels. If resizing is not possible, provide spacing with a diameter of at least 24 CSS pixels around smaller targets to ensure they don't intersect with adjacent controls.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "16 by 16 css pixels button inside big button", content: `<html>
  <head></head>
  <body style="height: 100px">
    <button class="interactive interactive-big" style="width: 80px; height: 80px; background-color: red; position: absolute"></button>
    <div></div>
    <button class="interactive interactive-small" style="width: 16px; height: 16px; background-color: yellow; position: absolute"></button>
  </body>
</html>` },
  { filename: "16 by 16 css pixels button next to big button", content: `<button class="interactive interactive-big" style="width: 80px; height: 80px; background-color: red"></button>
<div></div>
<button class="interactive interactive-small" style="width: 16px; height: 16px; background-color: yellow"></button>` },
  { filename: "16 by 16 css pixels button without enough space around it next to big button", content: `<style>
  .interactive-small {
    margin-top: 2px;
  }
</style>
<button class="interactive interactive-big" style="width: 80px; height: 80px; background-color: red"></button>
<div></div>
<button class="interactive interactive-small" style="width: 16px; height: 16px; background-color: yellow"></button>` },
  { filename: "cuisinart fixed sale promotion dialog close button", content: `<div>
<div class="needsclick kl-teaser-RqxZnN kl-private-reset-css-Xuajs1" role="dialog" aria-modal="true" aria-label="Popup dialog" style="z-index: 90000; position: fixed; filter: drop-shadow(rgba(0, 0, 0, 0.15) 0px 0px 30px); bottom: 0px; left: 0px; margin: 5px; height: 84px; width: 84px">
  <div data-testid="animated-teaser" class="needsclick kl-private-reset-css-Xuajs1" role="dialog" aria-modal="true" aria-label="Popup dialog" style="height: 100%; width: 100%">
    <span tabindex="0" role="dialog" class="needsclick Teaser-pointer-kSCH8 kl-private-reset-css-Xuajs1" aria-modal="true" aria-label="Popup dialog" style="overflow: hidden; box-sizing: border-box; border-radius: 50%; background-color: rgb(255, 195, 26); height: 100%; padding: 8px; display: flex; flex-direction: column; justify-content: center; cursor: pointer;"
      ><div class="needsclick kl-private-reset-css-Xuajs1" role="dialog" aria-modal="true" aria-label="Popup dialog">
        <div class="needsclick kl-private-reset-css-Xuajs1" role="dialog" aria-modal="true" aria-label="Popup dialog">
          <div id="rich-text-01M2N8M1Q9K19BZ7VA55FD68SX" class="kl-private-reset-css-Xuajs1 go3176171171" style="width: 100%">
            <p style="text-align: center; line-height: 1; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 14px">
              <span style="line-height: 1; color: rgb(35, 60, 40); font-family: 'Work Sans', Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px"><strong style="font-weight: 700">Get 15% Off</strong></span>
            </p>
          </div>
        </div>
      </div></span
    ><button id="target" tabindex="0" aria-label="Close teaser" class="needsclick klaviyo-close-form go2324193863 kl-private-reset-css-Xuajs1" role="dialog" aria-modal="true" style="position: absolute; z-index: 6; cursor: pointer; height: 20px; width: 20px; border-radius: 50%; top: -16px; right: -16px">
      <svg role="dialog" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="needsclick kl-private-reset-css-Xuajs1" aria-modal="true" aria-label="Popup dialog">
        <title id="title-Close-teaser">Close teaser</title>
        <circle cx="10" cy="10" r="9.5" fill="#000000" stroke="#FFFFFF" style="cursor: pointer"></circle>
        <path d="M6 6L14 14M6 14L14 6L6 14Z" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor: pointer"></path>
      </svg>
    </button>
  </div>
</div>
</div>` },
  { filename: "equivalent exception two red buttons with same functionality both dont meet the criterion", content: `<button class="interactive-small" style="width: 20px; height: 20px; background-color: red"></button>
<div></div>
<button class="interactive-big" style="width: 24px; height: 24px"></button>
<div></div>
<button class="interactive" style="width: 20px; height: 20px; background-color: red"></button>` },
  { filename: "links not in a sentence", content: `<style>
  a {
    font-size: 8px;
  }
</style>
<a href="https://www.example1.com" target="_blank">1</a>
<div></div>
<a href="https://www.example2.com" target="_blank">Example 2</a>` },
  { filename: "testimonials mantra", content: `<div
  class="testimonials-slider-template--15756659982391__ss_testimonial_11_ffKdC6 swiper swiper-container-fade swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
  style="
    list-style-type: none;
    overflow: hidden;
    perspective-origin: 668.5px 140.75px;
    position: relative;
    touch-action: pan-y;
    transform-origin: 668.5px 140.75px;
    z-index: 1;
    block-size: 281.5px;
    inset: 0px;
    height: 281.5px;
    inline-size: 1337px;
    inset-block: 0px;
    inset-inline: 0px;
    min-block-size: 0px;
    min-height: 0px;
    min-inline-size: 0px;
    min-width: 0px;
    padding-block-start: 30px;
    padding-top: 30px;
    width: 1337px;
  "
>
  <div
    class="swiper-wrapper"
    style="
      transition-duration: 0ms;
      box-sizing: content-box;
      display: flex;
      list-style-type: none;
      perspective-origin: 668.5px 94.75px;
      position: relative;
      transform: matrix(1, 0, 0, 1, 0, 0);
      transform-origin: 668.5px 94.75px;
      transition-property: transform;
      z-index: 1;
      block-size: 189.5px;
      inset: 0px;
      height: 189.5px;
      inline-size: 1337px;
      inset-block: 0px;
      inset-inline: 0px;
      min-block-size: 0px;
      min-height: 0px;
      min-inline-size: 0px;
      min-width: 0px;
      width: 1337px;
    "
  >
    <div
      class="testimonials-slide-template--15756659982391__ss_testimonial_11_ffKdC6 swiper-slide swiper-slide-duplicate swiper-slide-prev"
      data-swiper-slide-index="2"
      style="
        transition-duration: 0ms;
        opacity: 0;
        transform: matrix(1, 0, 0, 1, 0, 0);
        flex-shrink: 0;
        list-style-type: none;
        perspective-origin: 668.5px 81.75px;
        pointer-events: none;
        position: relative;
        transform-origin: 668.5px 81.75px;
        transition-property: opacity;
        block-size: 163.5px;
        inset: 0px;
        height: 163.5px;
        inline-size: 1337px;
        inset-block: 0px;
        inset-inline: 0px;
        width: 1337px;
      "
    >
      <div
        class="testimonials-content-template--15756659982391__ss_testimonial_11_ffKdC6"
        style="
          list-style-type: none;
          perspective-origin: 350px 81.75px;
          pointer-events: none;
          transform: matrix(1, 0, 0, 1, 0, 20);
          transform-origin: 350px 81.75px;
          transition-duration: 0.3s;
          block-size: 163.5px;
          height: 163.5px;
          inline-size: 700px;
          margin-inline: 318.5px;
          margin-left: 318.5px;
          margin-right: 318.5px;
          max-inline-size: 700px;
          max-width: 700px;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: 700px;
        "
      >
        <div
          class="testimonials-text-template--15756659982391__ss_testimonial_11_ffKdC6"
          style="
            list-style-type: none;
            perspective-origin: 350px 65px;
            pointer-events: none;
            position: relative;
            text-align: center;
            transform-origin: 350px 65px;
            block-size: 130px;
            inset: 0px;
            height: 130px;
            inline-size: 700px;
            inset-block: 0px;
            inset-inline: 0px;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            width: 700px;
          "
        >
          <div
            class="testimonials-abs-template--15756659982391__ss_testimonial_11_ffKdC6"
            style="
              caret-color: rgb(73, 73, 74);
              color: rgb(73, 73, 74);
              column-rule-color: rgb(73, 73, 74);
              font-family: 'Josefin Slab', serif;
              font-size: 20px;
              line-height: 26px;
              list-style-type: none;
              outline-color: rgb(73, 73, 74);
              perspective-origin: 35px 43px;
              pointer-events: none;
              position: absolute;
              text-align: center;
              text-decoration: none solid rgb(73, 73, 74);
              text-emphasis-color: rgb(73, 73, 74);
              transform-origin: 35px 43px;
              word-break: break-word;
              -webkit-text-fill-color: rgb(73, 73, 74);
              -webkit-text-stroke-color: rgb(73, 73, 74);
              block-size: 86px;
              border-block-color: rgb(73, 73, 74);
              border-color: rgb(73, 73, 74);
              border-inline-color: rgb(73, 73, 74);
              inset: -45px 620px 89px 10px;
              height: 86px;
              inline-size: 70px;
              inset-block: -45px 89px;
              inset-inline: 10px 620px;
              min-block-size: 0px;
              min-height: 0px;
              min-inline-size: 0px;
              min-width: 0px;
              width: 70px;
            "
          >
            <svg
              width="86"
              height="55"
              viewBox="0 0 86 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="
                caret-color: rgb(73, 73, 74);
                color: rgb(73, 73, 74);
                column-rule-color: rgb(73, 73, 74);
                fill: none;
                font-family: 'Josefin Slab', serif;
                font-size: 20px;
                line-height: 26px;
                list-style-type: none;
                object-fit: cover;
                opacity: 0.2;
                outline-color: rgb(73, 73, 74);
                overflow-clip-margin: content-box;
                overflow: hidden;
                perspective-origin: 35px 43px;
                pointer-events: none;
                text-align: center;
                text-decoration: none solid rgb(73, 73, 74);
                text-emphasis-color: rgb(73, 73, 74);
                transform-origin: 35px 43px;
                word-break: break-word;
                -webkit-text-fill-color: rgb(73, 73, 74);
                -webkit-text-stroke-color: rgb(73, 73, 74);
                block-size: 86px;
                border-block-color: rgb(73, 73, 74);
                border-color: rgb(73, 73, 74);
                border-inline-color: rgb(73, 73, 74);
                height: 86px;
                inline-size: 70px;
                min-block-size: 0px;
                min-height: 0px;
                min-inline-size: 0px;
                min-width: 0px;
                width: 70px;
              "
            >
              <path d="M71.3163 54.6H42.5163L60.3163 0.400024H85.5163L71.3163 54.6ZM29.3163 54.6H0.716309L18.9163 0.400024H44.1163L29.3163 54.6Z" fill="#252627"></path>
            </svg>
          </div>
          <p
            style="
              caret-color: rgb(73, 73, 74);
              color: rgb(73, 73, 74);
              column-rule-color: rgb(73, 73, 74);
              font-family: 'Josefin Slab', serif;
              font-size: 20px;
              line-height: 26px;
              list-style-type: none;
              outline-color: rgb(73, 73, 74);
              perspective-origin: 350px 65px;
              pointer-events: none;
              text-align: center;
              text-decoration: none solid rgb(73, 73, 74);
              text-emphasis-color: rgb(73, 73, 74);
              transform-origin: 350px 65px;
              word-break: break-word;
              -webkit-text-fill-color: rgb(73, 73, 74);
              -webkit-text-stroke-color: rgb(73, 73, 74);
              block-size: 130px;
              border-block-color: rgb(73, 73, 74);
              border-color: rgb(73, 73, 74);
              border-inline-color: rgb(73, 73, 74);
              height: 130px;
              inline-size: 700px;
              min-block-size: 0px;
              min-height: 0px;
              min-inline-size: 0px;
              min-width: 0px;
              width: 700px;
            "
          >
            I love your MantraBands &amp; if I could, I would buy every one to share with the world. Thank you for the positive messages, messages of empowerment &amp; messages of hope and belonging. We desperately need these messages now more than ever. I appreciate you and your inspirational business. Thank you from the bottom of my heart, spirit
            &amp; soul.
          </p>
        </div>

        <p
          class="testimonials-author-template--15756659982391__ss_testimonial_11_ffKdC6"
          style="
            caret-color: rgb(73, 73, 74);
            color: rgb(73, 73, 74);
            column-rule-color: rgb(73, 73, 74);
            font-family: 'Josefin Slab', serif;
            font-size: 15px;
            line-height: 19.5px;
            list-style-type: none;
            outline-color: rgb(73, 73, 74);
            perspective-origin: 350px 9.75px;
            pointer-events: none;
            text-align: center;
            text-decoration: none solid rgb(73, 73, 74);
            text-emphasis-color: rgb(73, 73, 74);
            transform-origin: 350px 9.75px;
            word-break: break-word;
            -webkit-text-fill-color: rgb(73, 73, 74);
            -webkit-text-stroke-color: rgb(73, 73, 74);
            block-size: 19.5px;
            border-block-color: rgb(73, 73, 74);
            border-color: rgb(73, 73, 74);
            border-inline-color: rgb(73, 73, 74);
            height: 19.5px;
            inline-size: 700px;
            margin-block-start: 14px;
            margin-top: 14px;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            width: 700px;
          "
        >
          Pam
        </p>
      </div>
    </div>

    <div
      class="testimonials-slide-template--15756659982391__ss_testimonial_11_ffKdC6 swiper-slide swiper-slide-active"
      data-swiper-slide-index="0"
      style="
        transition-duration: 0ms;
        opacity: 1;
        transform: matrix(1, 0, 0, 1, -1337, 0);
        flex-shrink: 0;
        list-style-type: none;
        perspective-origin: 668.5px 94.75px;
        position: relative;
        transform-origin: 668.5px 94.75px;
        transition-property: opacity;
        block-size: 189.5px;
        inset: 0px;
        height: 189.5px;
        inline-size: 1337px;
        inset-block: 0px;
        inset-inline: 0px;
        width: 1337px;
      "
    >
      <div
        class="testimonials-content-template--15756659982391__ss_testimonial_11_ffKdC6"
        style="
          list-style-type: none;
          perspective-origin: 350px 94.75px;
          transform: matrix(1, 0, 0, 1, 0, 0);
          transform-origin: 350px 94.75px;
          transition-duration: 0.3s;
          block-size: 189.5px;
          height: 189.5px;
          inline-size: 700px;
          margin-inline: 318.5px;
          margin-left: 318.5px;
          margin-right: 318.5px;
          max-inline-size: 700px;
          max-width: 700px;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: 700px;
        "
      >
        <div
          class="testimonials-text-template--15756659982391__ss_testimonial_11_ffKdC6"
          style="list-style-type: none; perspective-origin: 350px 78px; position: relative; text-align: center; transform-origin: 350px 78px; block-size: 156px; inset: 0px; height: 156px; inline-size: 700px; inset-block: 0px; inset-inline: 0px; min-block-size: 0px; min-height: 0px; min-inline-size: 0px; min-width: 0px; width: 700px"
        >
          <div
            class="testimonials-abs-template--15756659982391__ss_testimonial_11_ffKdC6"
            style="
              caret-color: rgb(73, 73, 74);
              color: rgb(73, 73, 74);
              column-rule-color: rgb(73, 73, 74);
              font-family: 'Josefin Slab', serif;
              font-size: 20px;
              line-height: 26px;
              list-style-type: none;
              outline-color: rgb(73, 73, 74);
              perspective-origin: 35px 43px;
              position: absolute;
              text-align: center;
              text-decoration: none solid rgb(73, 73, 74);
              text-emphasis-color: rgb(73, 73, 74);
              transform-origin: 35px 43px;
              word-break: break-word;
              -webkit-text-fill-color: rgb(73, 73, 74);
              -webkit-text-stroke-color: rgb(73, 73, 74);
              block-size: 86px;
              border-block-color: rgb(73, 73, 74);
              border-color: rgb(73, 73, 74);
              border-inline-color: rgb(73, 73, 74);
              inset: -45px 620px 115px 10px;
              height: 86px;
              inline-size: 70px;
              inset-block: -45px 115px;
              inset-inline: 10px 620px;
              min-block-size: 0px;
              min-height: 0px;
              min-inline-size: 0px;
              min-width: 0px;
              width: 70px;
            "
          >
            <svg
              width="86"
              height="55"
              viewBox="0 0 86 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="
                caret-color: rgb(73, 73, 74);
                color: rgb(73, 73, 74);
                column-rule-color: rgb(73, 73, 74);
                fill: none;
                font-family: 'Josefin Slab', serif;
                font-size: 20px;
                line-height: 26px;
                list-style-type: none;
                object-fit: cover;
                opacity: 0.2;
                outline-color: rgb(73, 73, 74);
                overflow-clip-margin: content-box;
                overflow: hidden;
                perspective-origin: 35px 43px;
                text-align: center;
                text-decoration: none solid rgb(73, 73, 74);
                text-emphasis-color: rgb(73, 73, 74);
                transform-origin: 35px 43px;
                word-break: break-word;
                -webkit-text-fill-color: rgb(73, 73, 74);
                -webkit-text-stroke-color: rgb(73, 73, 74);
                block-size: 86px;
                border-block-color: rgb(73, 73, 74);
                border-color: rgb(73, 73, 74);
                border-inline-color: rgb(73, 73, 74);
                height: 86px;
                inline-size: 70px;
                min-block-size: 0px;
                min-height: 0px;
                min-inline-size: 0px;
                min-width: 0px;
                width: 70px;
              "
            >
              <path d="M71.3163 54.6H42.5163L60.3163 0.400024H85.5163L71.3163 54.6ZM29.3163 54.6H0.716309L18.9163 0.400024H44.1163L29.3163 54.6Z" fill="#252627"></path>
            </svg>
          </div>
          <p
            style="
              caret-color: rgb(73, 73, 74);
              color: rgb(73, 73, 74);
              column-rule-color: rgb(73, 73, 74);
              font-family: 'Josefin Slab', serif;
              font-size: 20px;
              line-height: 26px;
              list-style-type: none;
              outline-color: rgb(73, 73, 74);
              perspective-origin: 350px 78px;
              text-align: center;
              text-decoration: none solid rgb(73, 73, 74);
              text-emphasis-color: rgb(73, 73, 74);
              transform-origin: 350px 78px;
              word-break: break-word;
              -webkit-text-fill-color: rgb(73, 73, 74);
              -webkit-text-stroke-color: rgb(73, 73, 74);
              block-size: 156px;
              border-block-color: rgb(73, 73, 74);
              border-color: rgb(73, 73, 74);
              border-inline-color: rgb(73, 73, 74);
              height: 156px;
              inline-size: 700px;
              min-block-size: 0px;
              min-height: 0px;
              min-inline-size: 0px;
              min-width: 0px;
              width: 700px;
            "
          >
            There is something truly special about these bands and I was able to buy one for myself, but most importantly for the people that mean the most in my life. The phrases on the bands are already perfect, but what was a beyond beautiful surprise was the little message that came with the bracelets. They are inspiring and heartfelt and I
            couldn't be happier with how they turned out. Worth every penny and I can't wait to add to the collection!
          </p>
        </div>

        <p
          class="testimonials-author-template--15756659982391__ss_testimonial_11_ffKdC6"
          style="
            caret-color: rgb(73, 73, 74);
            color: rgb(73, 73, 74);
            column-rule-color: rgb(73, 73, 74);
            font-family: 'Josefin Slab', serif;
            font-size: 15px;
            line-height: 19.5px;
            list-style-type: none;
            outline-color: rgb(73, 73, 74);
            perspective-origin: 350px 9.75px;
            text-align: center;
            text-decoration: none solid rgb(73, 73, 74);
            text-emphasis-color: rgb(73, 73, 74);
            transform-origin: 350px 9.75px;
            word-break: break-word;
            -webkit-text-fill-color: rgb(73, 73, 74);
            -webkit-text-stroke-color: rgb(73, 73, 74);
            block-size: 19.5px;
            border-block-color: rgb(73, 73, 74);
            border-color: rgb(73, 73, 74);
            border-inline-color: rgb(73, 73, 74);
            height: 19.5px;
            inline-size: 700px;
            margin-block-start: 14px;
            margin-top: 14px;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            width: 700px;
          "
        >
          Kathlina C.
        </p>
      </div>
    </div>

    <div
      class="testimonials-slide-template--15756659982391__ss_testimonial_11_ffKdC6 swiper-slide swiper-slide-next"
      data-swiper-slide-index="1"
      style="
        transition-duration: 0ms;
        opacity: 0;
        transform: matrix(1, 0, 0, 1, -2674, 0);
        flex-shrink: 0;
        list-style-type: none;
        perspective-origin: 668.5px 68.75px;
        pointer-events: none;
        position: relative;
        transform-origin: 668.5px 68.75px;
        transition-property: opacity;
        block-size: 137.5px;
        inset: 0px;
        height: 137.5px;
        inline-size: 1337px;
        inset-block: 0px;
        inset-inline: 0px;
        width: 1337px;
      "
    >
      <div
        class="testimonials-content-template--15756659982391__ss_testimonial_11_ffKdC6"
        style="
          list-style-type: none;
          perspective-origin: 350px 68.75px;
          pointer-events: none;
          transform: matrix(1, 0, 0, 1, 0, 20);
          transform-origin: 350px 68.75px;
          transition-duration: 0.3s;
          block-size: 137.5px;
          height: 137.5px;
          inline-size: 700px;
          margin-inline: 318.5px;
          margin-left: 318.5px;
          margin-right: 318.5px;
          max-inline-size: 700px;
          max-width: 700px;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: 700px;
        "
      >
        <div
          class="testimonials-text-template--15756659982391__ss_testimonial_11_ffKdC6"
          style="
            list-style-type: none;
            perspective-origin: 350px 52px;
            pointer-events: none;
            position: relative;
            text-align: center;
            transform-origin: 350px 52px;
            block-size: 104px;
            inset: 0px;
            height: 104px;
            inline-size: 700px;
            inset-block: 0px;
            inset-inline: 0px;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            width: 700px;
          "
        >
          <div
            class="testimonials-abs-template--15756659982391__ss_testimonial_11_ffKdC6"
            style="
              caret-color: rgb(73, 73, 74);
              color: rgb(73, 73, 74);
              column-rule-color: rgb(73, 73, 74);
              font-family: 'Josefin Slab', serif;
              font-size: 20px;
              line-height: 26px;
              list-style-type: none;
              outline-color: rgb(73, 73, 74);
              perspective-origin: 35px 43px;
              pointer-events: none;
              position: absolute;
              text-align: center;
              text-decoration: none solid rgb(73, 73, 74);
              text-emphasis-color: rgb(73, 73, 74);
              transform-origin: 35px 43px;
              word-break: break-word;
              -webkit-text-fill-color: rgb(73, 73, 74);
              -webkit-text-stroke-color: rgb(73, 73, 74);
              block-size: 86px;
              border-block-color: rgb(73, 73, 74);
              border-color: rgb(73, 73, 74);
              border-inline-color: rgb(73, 73, 74);
              inset: -45px 620px 63px 10px;
              height: 86px;
              inline-size: 70px;
              inset-block: -45px 63px;
              inset-inline: 10px 620px;
              min-block-size: 0px;
              min-height: 0px;
              min-inline-size: 0px;
              min-width: 0px;
              width: 70px;
            "
          >
            <svg
              width="86"
              height="55"
              viewBox="0 0 86 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="
                caret-color: rgb(73, 73, 74);
                color: rgb(73, 73, 74);
                column-rule-color: rgb(73, 73, 74);
                fill: none;
                font-family: 'Josefin Slab', serif;
                font-size: 20px;
                line-height: 26px;
                list-style-type: none;
                object-fit: cover;
                opacity: 0.2;
                outline-color: rgb(73, 73, 74);
                overflow-clip-margin: content-box;
                overflow: hidden;
                perspective-origin: 35px 43px;
                pointer-events: none;
                text-align: center;
                text-decoration: none solid rgb(73, 73, 74);
                text-emphasis-color: rgb(73, 73, 74);
                transform-origin: 35px 43px;
                word-break: break-word;
                -webkit-text-fill-color: rgb(73, 73, 74);
                -webkit-text-stroke-color: rgb(73, 73, 74);
                block-size: 86px;
                border-block-color: rgb(73, 73, 74);
                border-color: rgb(73, 73, 74);
                border-inline-color: rgb(73, 73, 74);
                height: 86px;
                inline-size: 70px;
                min-block-size: 0px;
                min-height: 0px;
                min-inline-size: 0px;
                min-width: 0px;
                width: 70px;
              "
            >
              <path d="M71.3163 54.6H42.5163L60.3163 0.400024H85.5163L71.3163 54.6ZM29.3163 54.6H0.716309L18.9163 0.400024H44.1163L29.3163 54.6Z" fill="#252627"></path>
            </svg>
          </div>
          <p
            style="
              caret-color: rgb(73, 73, 74);
              color: rgb(73, 73, 74);
              column-rule-color: rgb(73, 73, 74);
              font-family: 'Josefin Slab', serif;
              font-size: 20px;
              line-height: 26px;
              list-style-type: none;
              outline-color: rgb(73, 73, 74);
              perspective-origin: 350px 52px;
              pointer-events: none;
              text-align: center;
              text-decoration: none solid rgb(73, 73, 74);
              text-emphasis-color: rgb(73, 73, 74);
              transform-origin: 350px 52px;
              word-break: break-word;
              -webkit-text-fill-color: rgb(73, 73, 74);
              -webkit-text-stroke-color: rgb(73, 73, 74);
              block-size: 104px;
              border-block-color: rgb(73, 73, 74);
              border-color: rgb(73, 73, 74);
              border-inline-color: rgb(73, 73, 74);
              height: 104px;
              inline-size: 700px;
              min-block-size: 0px;
              min-height: 0px;
              min-inline-size: 0px;
              min-width: 0px;
              width: 700px;
            "
          >
            This is a sweet and perfect gift for my sister. She prefers classic pieces of jewelry rather than something trendy or big. I thought she would like this reminder as she searches for a new career path. She appreciates the thoughtful gift and enjoys wearing it with her other bracelet: I can do hard things
          </p>
        </div>

        <p
          class="testimonials-author-template--15756659982391__ss_testimonial_11_ffKdC6"
          style="
            caret-color: rgb(73, 73, 74);
            color: rgb(73, 73, 74);
            column-rule-color: rgb(73, 73, 74);
            font-family: 'Josefin Slab', serif;
            font-size: 15px;
            line-height: 19.5px;
            list-style-type: none;
            outline-color: rgb(73, 73, 74);
            perspective-origin: 350px 9.75px;
            pointer-events: none;
            text-align: center;
            text-decoration: none solid rgb(73, 73, 74);
            text-emphasis-color: rgb(73, 73, 74);
            transform-origin: 350px 9.75px;
            word-break: break-word;
            -webkit-text-fill-color: rgb(73, 73, 74);
            -webkit-text-stroke-color: rgb(73, 73, 74);
            block-size: 19.5px;
            border-block-color: rgb(73, 73, 74);
            border-color: rgb(73, 73, 74);
            border-inline-color: rgb(73, 73, 74);
            height: 19.5px;
            inline-size: 700px;
            margin-block-start: 14px;
            margin-top: 14px;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            width: 700px;
          "
        >
          Kristin H.
        </p>
      </div>
    </div>

    <div
      class="testimonials-slide-template--15756659982391__ss_testimonial_11_ffKdC6 swiper-slide swiper-slide-duplicate-prev"
      data-swiper-slide-index="2"
      style="
        transition-duration: 0ms;
        opacity: 0;
        transform: matrix(1, 0, 0, 1, -4011, 0);
        flex-shrink: 0;
        list-style-type: none;
        perspective-origin: 668.5px 81.75px;
        pointer-events: none;
        position: relative;
        transform-origin: 668.5px 81.75px;
        transition-property: opacity;
        block-size: 163.5px;
        inset: 0px;
        height: 163.5px;
        inline-size: 1337px;
        inset-block: 0px;
        inset-inline: 0px;
        width: 1337px;
      "
    >
      <div
        class="testimonials-content-template--15756659982391__ss_testimonial_11_ffKdC6"
        style="
          list-style-type: none;
          perspective-origin: 350px 81.75px;
          pointer-events: none;
          transform: matrix(1, 0, 0, 1, 0, 20);
          transform-origin: 350px 81.75px;
          transition-duration: 0.3s;
          block-size: 163.5px;
          height: 163.5px;
          inline-size: 700px;
          margin-inline: 318.5px;
          margin-left: 318.5px;
          margin-right: 318.5px;
          max-inline-size: 700px;
          max-width: 700px;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: 700px;
        "
      >
        <div
          class="testimonials-text-template--15756659982391__ss_testimonial_11_ffKdC6"
          style="
            list-style-type: none;
            perspective-origin: 350px 65px;
            pointer-events: none;
            position: relative;
            text-align: center;
            transform-origin: 350px 65px;
            block-size: 130px;
            inset: 0px;
            height: 130px;
            inline-size: 700px;
            inset-block: 0px;
            inset-inline: 0px;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            width: 700px;
          "
        >
          <div
            class="testimonials-abs-template--15756659982391__ss_testimonial_11_ffKdC6"
            style="
              caret-color: rgb(73, 73, 74);
              color: rgb(73, 73, 74);
              column-rule-color: rgb(73, 73, 74);
              font-family: 'Josefin Slab', serif;
              font-size: 20px;
              line-height: 26px;
              list-style-type: none;
              outline-color: rgb(73, 73, 74);
              perspective-origin: 35px 43px;
              pointer-events: none;
              position: absolute;
              text-align: center;
              text-decoration: none solid rgb(73, 73, 74);
              text-emphasis-color: rgb(73, 73, 74);
              transform-origin: 35px 43px;
              word-break: break-word;
              -webkit-text-fill-color: rgb(73, 73, 74);
              -webkit-text-stroke-color: rgb(73, 73, 74);
              block-size: 86px;
              border-block-color: rgb(73, 73, 74);
              border-color: rgb(73, 73, 74);
              border-inline-color: rgb(73, 73, 74);
              inset: -45px 620px 89px 10px;
              height: 86px;
              inline-size: 70px;
              inset-block: -45px 89px;
              inset-inline: 10px 620px;
              min-block-size: 0px;
              min-height: 0px;
              min-inline-size: 0px;
              min-width: 0px;
              width: 70px;
            "
          >
            <svg
              width="86"
              height="55"
              viewBox="0 0 86 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="
                caret-color: rgb(73, 73, 74);
                color: rgb(73, 73, 74);
                column-rule-color: rgb(73, 73, 74);
                fill: none;
                font-family: 'Josefin Slab', serif;
                font-size: 20px;
                line-height: 26px;
                list-style-type: none;
                object-fit: cover;
                opacity: 0.2;
                outline-color: rgb(73, 73, 74);
                overflow-clip-margin: content-box;
                overflow: hidden;
                perspective-origin: 35px 43px;
                pointer-events: none;
                text-align: center;
                text-decoration: none solid rgb(73, 73, 74);
                text-emphasis-color: rgb(73, 73, 74);
                transform-origin: 35px 43px;
                word-break: break-word;
                -webkit-text-fill-color: rgb(73, 73, 74);
                -webkit-text-stroke-color: rgb(73, 73, 74);
                block-size: 86px;
                border-block-color: rgb(73, 73, 74);
                border-color: rgb(73, 73, 74);
                border-inline-color: rgb(73, 73, 74);
                height: 86px;
                inline-size: 70px;
                min-block-size: 0px;
                min-height: 0px;
                min-inline-size: 0px;
                min-width: 0px;
                width: 70px;
              "
            >
              <path d="M71.3163 54.6H42.5163L60.3163 0.400024H85.5163L71.3163 54.6ZM29.3163 54.6H0.716309L18.9163 0.400024H44.1163L29.3163 54.6Z" fill="#252627"></path>
            </svg>
          </div>
          <p
            style="
              caret-color: rgb(73, 73, 74);
              color: rgb(73, 73, 74);
              column-rule-color: rgb(73, 73, 74);
              font-family: 'Josefin Slab', serif;
              font-size: 20px;
              line-height: 26px;
              list-style-type: none;
              outline-color: rgb(73, 73, 74);
              perspective-origin: 350px 65px;
              pointer-events: none;
              text-align: center;
              text-decoration: none solid rgb(73, 73, 74);
              text-emphasis-color: rgb(73, 73, 74);
              transform-origin: 350px 65px;
              word-break: break-word;
              -webkit-text-fill-color: rgb(73, 73, 74);
              -webkit-text-stroke-color: rgb(73, 73, 74);
              block-size: 130px;
              border-block-color: rgb(73, 73, 74);
              border-color: rgb(73, 73, 74);
              border-inline-color: rgb(73, 73, 74);
              height: 130px;
              inline-size: 700px;
              min-block-size: 0px;
              min-height: 0px;
              min-inline-size: 0px;
              min-width: 0px;
              width: 700px;
            "
          >
            I love your MantraBands &amp; if I could, I would buy every one to share with the world. Thank you for the positive messages, messages of empowerment &amp; messages of hope and belonging. We desperately need these messages now more than ever. I appreciate you and your inspirational business. Thank you from the bottom of my heart, spirit
            &amp; soul.
          </p>
        </div>

        <p
          class="testimonials-author-template--15756659982391__ss_testimonial_11_ffKdC6"
          style="
            caret-color: rgb(73, 73, 74);
            color: rgb(73, 73, 74);
            column-rule-color: rgb(73, 73, 74);
            font-family: 'Josefin Slab', serif;
            font-size: 15px;
            line-height: 19.5px;
            list-style-type: none;
            outline-color: rgb(73, 73, 74);
            perspective-origin: 350px 9.75px;
            pointer-events: none;
            text-align: center;
            text-decoration: none solid rgb(73, 73, 74);
            text-emphasis-color: rgb(73, 73, 74);
            transform-origin: 350px 9.75px;
            word-break: break-word;
            -webkit-text-fill-color: rgb(73, 73, 74);
            -webkit-text-stroke-color: rgb(73, 73, 74);
            block-size: 19.5px;
            border-block-color: rgb(73, 73, 74);
            border-color: rgb(73, 73, 74);
            border-inline-color: rgb(73, 73, 74);
            height: 19.5px;
            inline-size: 700px;
            margin-block-start: 14px;
            margin-top: 14px;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            width: 700px;
          "
        >
          Pam
        </p>
      </div>
    </div>

    <div
      class="testimonials-slide-template--15756659982391__ss_testimonial_11_ffKdC6 swiper-slide swiper-slide-duplicate swiper-slide-duplicate-active"
      data-swiper-slide-index="0"
      style="
        transition-duration: 0ms;
        opacity: 0;
        transform: matrix(1, 0, 0, 1, -5348, 0);
        flex-shrink: 0;
        list-style-type: none;
        perspective-origin: 668.5px 94.75px;
        pointer-events: none;
        position: relative;
        transform-origin: 668.5px 94.75px;
        transition-property: opacity;
        block-size: 189.5px;
        inset: 0px;
        height: 189.5px;
        inline-size: 1337px;
        inset-block: 0px;
        inset-inline: 0px;
        width: 1337px;
      "
    >
      <div
        class="testimonials-content-template--15756659982391__ss_testimonial_11_ffKdC6"
        style="
          list-style-type: none;
          perspective-origin: 350px 94.75px;
          pointer-events: none;
          transform: matrix(1, 0, 0, 1, 0, 20);
          transform-origin: 350px 94.75px;
          transition-duration: 0.3s;
          block-size: 189.5px;
          height: 189.5px;
          inline-size: 700px;
          margin-inline: 318.5px;
          margin-left: 318.5px;
          margin-right: 318.5px;
          max-inline-size: 700px;
          max-width: 700px;
          min-block-size: 0px;
          min-height: 0px;
          min-inline-size: 0px;
          min-width: 0px;
          width: 700px;
        "
      >
        <div
          class="testimonials-text-template--15756659982391__ss_testimonial_11_ffKdC6"
          style="
            list-style-type: none;
            perspective-origin: 350px 78px;
            pointer-events: none;
            position: relative;
            text-align: center;
            transform-origin: 350px 78px;
            block-size: 156px;
            inset: 0px;
            height: 156px;
            inline-size: 700px;
            inset-block: 0px;
            inset-inline: 0px;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            width: 700px;
          "
        >
          <div
            class="testimonials-abs-template--15756659982391__ss_testimonial_11_ffKdC6"
            style="
              caret-color: rgb(73, 73, 74);
              color: rgb(73, 73, 74);
              column-rule-color: rgb(73, 73, 74);
              font-family: 'Josefin Slab', serif;
              font-size: 20px;
              line-height: 26px;
              list-style-type: none;
              outline-color: rgb(73, 73, 74);
              perspective-origin: 35px 43px;
              pointer-events: none;
              position: absolute;
              text-align: center;
              text-decoration: none solid rgb(73, 73, 74);
              text-emphasis-color: rgb(73, 73, 74);
              transform-origin: 35px 43px;
              word-break: break-word;
              -webkit-text-fill-color: rgb(73, 73, 74);
              -webkit-text-stroke-color: rgb(73, 73, 74);
              block-size: 86px;
              border-block-color: rgb(73, 73, 74);
              border-color: rgb(73, 73, 74);
              border-inline-color: rgb(73, 73, 74);
              inset: -45px 620px 115px 10px;
              height: 86px;
              inline-size: 70px;
              inset-block: -45px 115px;
              inset-inline: 10px 620px;
              min-block-size: 0px;
              min-height: 0px;
              min-inline-size: 0px;
              min-width: 0px;
              width: 70px;
            "
          >
            <svg
              width="86"
              height="55"
              viewBox="0 0 86 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style="
                caret-color: rgb(73, 73, 74);
                color: rgb(73, 73, 74);
                column-rule-color: rgb(73, 73, 74);
                fill: none;
                font-family: 'Josefin Slab', serif;
                font-size: 20px;
                line-height: 26px;
                list-style-type: none;
                object-fit: cover;
                opacity: 0.2;
                outline-color: rgb(73, 73, 74);
                overflow-clip-margin: content-box;
                overflow: hidden;
                perspective-origin: 35px 43px;
                pointer-events: none;
                text-align: center;
                text-decoration: none solid rgb(73, 73, 74);
                text-emphasis-color: rgb(73, 73, 74);
                transform-origin: 35px 43px;
                word-break: break-word;
                -webkit-text-fill-color: rgb(73, 73, 74);
                -webkit-text-stroke-color: rgb(73, 73, 74);
                block-size: 86px;
                border-block-color: rgb(73, 73, 74);
                border-color: rgb(73, 73, 74);
                border-inline-color: rgb(73, 73, 74);
                height: 86px;
                inline-size: 70px;
                min-block-size: 0px;
                min-height: 0px;
                min-inline-size: 0px;
                min-width: 0px;
                width: 70px;
              "
            >
              <path d="M71.3163 54.6H42.5163L60.3163 0.400024H85.5163L71.3163 54.6ZM29.3163 54.6H0.716309L18.9163 0.400024H44.1163L29.3163 54.6Z" fill="#252627"></path>
            </svg>
          </div>
          <p
            style="
              caret-color: rgb(73, 73, 74);
              color: rgb(73, 73, 74);
              column-rule-color: rgb(73, 73, 74);
              font-family: 'Josefin Slab', serif;
              font-size: 20px;
              line-height: 26px;
              list-style-type: none;
              outline-color: rgb(73, 73, 74);
              perspective-origin: 350px 78px;
              pointer-events: none;
              text-align: center;
              text-decoration: none solid rgb(73, 73, 74);
              text-emphasis-color: rgb(73, 73, 74);
              transform-origin: 350px 78px;
              word-break: break-word;
              -webkit-text-fill-color: rgb(73, 73, 74);
              -webkit-text-stroke-color: rgb(73, 73, 74);
              block-size: 156px;
              border-block-color: rgb(73, 73, 74);
              border-color: rgb(73, 73, 74);
              border-inline-color: rgb(73, 73, 74);
              height: 156px;
              inline-size: 700px;
              min-block-size: 0px;
              min-height: 0px;
              min-inline-size: 0px;
              min-width: 0px;
              width: 700px;
            "
          >
            There is something truly special about these bands and I was able to buy one for myself, but most importantly for the people that mean the most in my life. The phrases on the bands are already perfect, but what was a beyond beautiful surprise was the little message that came with the bracelets. They are inspiring and heartfelt and I
            couldn't be happier with how they turned out. Worth every penny and I can't wait to add to the collection!
          </p>
        </div>

        <p
          class="testimonials-author-template--15756659982391__ss_testimonial_11_ffKdC6"
          style="
            caret-color: rgb(73, 73, 74);
            color: rgb(73, 73, 74);
            column-rule-color: rgb(73, 73, 74);
            font-family: 'Josefin Slab', serif;
            font-size: 15px;
            line-height: 19.5px;
            list-style-type: none;
            outline-color: rgb(73, 73, 74);
            perspective-origin: 350px 9.75px;
            pointer-events: none;
            text-align: center;
            text-decoration: none solid rgb(73, 73, 74);
            text-emphasis-color: rgb(73, 73, 74);
            transform-origin: 350px 9.75px;
            word-break: break-word;
            -webkit-text-fill-color: rgb(73, 73, 74);
            -webkit-text-stroke-color: rgb(73, 73, 74);
            block-size: 19.5px;
            border-block-color: rgb(73, 73, 74);
            border-color: rgb(73, 73, 74);
            border-inline-color: rgb(73, 73, 74);
            height: 19.5px;
            inline-size: 700px;
            margin-block-start: 14px;
            margin-top: 14px;
            min-block-size: 0px;
            min-height: 0px;
            min-inline-size: 0px;
            min-width: 0px;
            width: 700px;
          "
        >
          Kathlina C.
        </p>
      </div>
    </div>
  </div>
  <div
    class="testimonials-navigation-template--15756659982391__ss_testimonial_11_ffKdC6"
    style="
      align-items: center;
      gap: 20px;
      display: flex;
      justify-content: center;
      list-style-type: none;
      perspective-origin: 668.5px 24px;
      transform-origin: 668.5px 24px;
      block-size: 48px;
      height: 48px;
      inline-size: 1337px;
      margin-block-start: 14px;
      margin-top: 14px;
      min-block-size: 0px;
      min-height: 0px;
      min-inline-size: 0px;
      min-width: 0px;
      width: 1337px;
    "
  >
    <button
      class="testimonials-btn-prev-template--15756659982391__ss_testimonial_11_ffKdC6"
      style="
        align-items: center;
        background-color: rgba(0, 0, 0, 0);
        display: flex;
        flex-basis: 48px;
        flex-shrink: 0;
        justify-content: center;
        list-style-type: none;
        perspective-origin: 24px 24px;
        transform-origin: 24px 24px;
        transition-duration: 0.3s;
        block-size: 48px;
        border-block: 1px solid rgb(255, 255, 255);
        border-color: rgb(255, 255, 255);
        border-radius: 50%;
        border-style: solid;
        border-width: 1px;
        border-end-end-radius: 50%;
        border-end-start-radius: 50%;
        border-inline: 1px solid rgb(255, 255, 255);
        border-start-end-radius: 50%;
        border-start-start-radius: 50%;
        height: 48px;
        inline-size: 48px;
        padding-block: 0px;
        padding: 0px;
        padding-inline: 0px;
        width: 48px;
      "
    >
      <svg
        width="16"
        height="9"
        viewBox="0 0 16 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="svelte-1dofwfm use-transition right"
        style="
          caret-color: rgb(0, 0, 0);
          color: rgb(0, 0, 0);
          column-rule-color: rgb(0, 0, 0);
          cursor: pointer;
          fill: none;
          flex-basis: 14px;
          flex-shrink: 0;
          list-style-type: none;
          outline-color: rgb(0, 0, 0);
          overflow-clip-margin: content-box;
          overflow: hidden;
          perspective-origin: 7px 7px;
          text-align: center;
          text-decoration: none solid rgb(0, 0, 0);
          text-emphasis-color: rgb(0, 0, 0);
          transform: matrix(0, 1, -1, 0, 0, 0);
          transform-origin: 7px 7px;
          -webkit-text-fill-color: rgb(0, 0, 0);
          -webkit-text-stroke-color: rgb(0, 0, 0);
          block-size: 14px;
          border-block-color: rgb(0, 0, 0);
          border-color: rgb(0, 0, 0);
          border-inline-color: rgb(0, 0, 0);
          height: 14px;
          inline-size: 14px;
          margin-inline-start: -2px;
          margin-left: -2px;
          width: 14px;
        "
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 1.38462L14.5455 0L8 6.23077L1.45455 0L0 1.38462L8 9L16 1.38462Z" fill="currentColor"></path>
      </svg>
    </button>
    <div
      class="testimonials-pagination-template--15756659982391__ss_testimonial_11_ffKdC6 swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"
      style="
        align-items: center;
        gap: 10px;
        display: flex;
        justify-content: center;
        list-style-type: none;
        perspective-origin: 19px 3px;
        text-align: center;
        transform: matrix(1, 0, 0, 1, 0, 0);
        transform-origin: 19px 3px;
        transition-duration: 0.3s;
        transition-property: opacity;
        z-index: 10;
        block-size: 6px;
        height: 6px;
        inline-size: 38px;
        max-inline-size: fit-content;
        max-width: fit-content;
        width: 38px;
      "
    >
      <span
        class="swiper-pagination-bullet swiper-pagination-bullet-active"
        style="
          background-color: rgb(73, 73, 74);
          cursor: pointer;
          list-style-type: none;
          perspective-origin: 3px 3px;
          text-align: center;
          transform-origin: 3px 3px;
          transition-duration: 0.25s;
          block-size: 6px;
          border-radius: 50%;
          border-end-end-radius: 50%;
          border-end-start-radius: 50%;
          border-start-end-radius: 50%;
          border-start-start-radius: 50%;
          height: 6px;
          inline-size: 6px;
          width: 6px;
        "
      ></span
      ><span
        class="swiper-pagination-bullet"
        style="
          background-color: rgb(73, 73, 74);
          cursor: pointer;
          list-style-type: none;
          opacity: 0.5;
          perspective-origin: 3px 3px;
          text-align: center;
          transform-origin: 3px 3px;
          transition-duration: 0.25s;
          block-size: 6px;
          border-radius: 50%;
          border-end-end-radius: 50%;
          border-end-start-radius: 50%;
          border-start-end-radius: 50%;
          border-start-start-radius: 50%;
          height: 6px;
          inline-size: 6px;
          width: 6px;
        "
      ></span
      ><span
        class="swiper-pagination-bullet"
        style="
          background-color: rgb(73, 73, 74);
          cursor: pointer;
          list-style-type: none;
          opacity: 0.5;
          perspective-origin: 3px 3px;
          text-align: center;
          transform-origin: 3px 3px;
          transition-duration: 0.25s;
          block-size: 6px;
          border-radius: 50%;
          border-end-end-radius: 50%;
          border-end-start-radius: 50%;
          border-start-end-radius: 50%;
          border-start-start-radius: 50%;
          height: 6px;
          inline-size: 6px;
          width: 6px;
        "
      ></span>
    </div>
    <button
      class="testimonials-btn-next-template--15756659982391__ss_testimonial_11_ffKdC6"
      style="
        align-items: center;
        background-color: rgba(0, 0, 0, 0);
        display: flex;
        flex-basis: 48px;
        flex-shrink: 0;
        justify-content: center;
        list-style-type: none;
        perspective-origin: 24px 24px;
        transform-origin: 24px 24px;
        transition-duration: 0.3s;
        block-size: 48px;
        border-block: 1px solid rgb(255, 255, 255);
        border-color: rgb(255, 255, 255);
        border-radius: 50%;
        border-style: solid;
        border-width: 1px;
        border-end-end-radius: 50%;
        border-end-start-radius: 50%;
        border-inline: 1px solid rgb(255, 255, 255);
        border-start-end-radius: 50%;
        border-start-start-radius: 50%;
        height: 48px;
        inline-size: 48px;
        padding-block: 0px;
        padding: 0px;
        padding-inline: 0px;
        width: 48px;
      "
    >
      <svg
        width="16"
        height="9"
        viewBox="0 0 16 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        class="svelte-1dofwfm use-transition right"
        style="
          caret-color: rgb(0, 0, 0);
          color: rgb(0, 0, 0);
          column-rule-color: rgb(0, 0, 0);
          cursor: pointer;
          fill: none;
          flex-basis: 14px;
          flex-shrink: 0;
          list-style-type: none;
          outline-color: rgb(0, 0, 0);
          overflow-clip-margin: content-box;
          overflow: hidden;
          perspective-origin: 7px 7px;
          text-align: center;
          text-decoration: none solid rgb(0, 0, 0);
          text-emphasis-color: rgb(0, 0, 0);
          transform: matrix(0, -1, 1, 0, 0, 0);
          transform-origin: 7px 7px;
          -webkit-text-fill-color: rgb(0, 0, 0);
          -webkit-text-stroke-color: rgb(0, 0, 0);
          block-size: 14px;
          border-block-color: rgb(0, 0, 0);
          border-color: rgb(0, 0, 0);
          border-inline-color: rgb(0, 0, 0);
          height: 14px;
          inline-size: 14px;
          margin-inline-start: 2px;
          margin-left: 2px;
          width: 14px;
        "
      >
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 1.38462L14.5455 0L8 6.23077L1.45455 0L0 1.38462L8 9L16 1.38462Z" fill="currentColor"></path>
      </svg>
    </button>
  </div>
</div>
<style></style>` },
  { filename: "text in the right links in the left", content: `<style>
  .parent {
    width: 100%;
    text-align: right;
    font-size: 8px;
  }
  a {
    float: left;
  }
</style>
<div class="parent">
  Hi
  <a href="https://www.example1.com" target="_blank">1</a>
  <div></div>
  <a href="https://www.example2.com" target="_blank">Example 2</a>
</div>` },
  { filename: "two undersized interactive elements intersect", content: `<button class="interactive-small" style="width: 20px; height: 20px"></button>
<div></div>
<button class="interactive-small" style="width: 20px; height: 20px"></button>` },
  { filename: "undersized interactive element without enough space around it", content: `<style>
  .interactive-small {
    margin: 1px;
  }
</style>
<button class="interactive interactive-small" style="width: 20px; height: 20px"></button>
<div></div>
<button class="interactive interactive-big" style="width: 24px; height: 24px"></button>` },
  { filename: "undersized interactive elements intersect", content: `<button class="interactive-small" style="width: 20px; height: 20px"></button>
<div></div>
<button class="interactive-big" style="width: 24px; height: 24px"></button>` },
  { filename: "xoo wsc basket", content: `<!-- This test is skipped because we currently do not check with elements from point in the case that intersecting sticky elements are not in the same sticky context -->

<meta charset="utf-8" />
<style>
  ol,
  ul,
  dl {
    margin-top: 0px;
    margin-bottom: 1rem;
  }
  a {
    color: rgb(68, 68, 68);
    text-decoration: none;
    background-color: transparent;
  }
  print {
    a:not(.btn) {
      text-decoration: underline;
    }
  }
  [role="menuitem"] {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  footer ul {
    list-style: none;
    padding-left: 0px;
  }
  a {
    background-color: transparent;
  }
  .color--quaternary,
  .breadcrumb-on-dark,
  .footer .menu-footer li a {
    color: rgb(255, 255, 255) !important;
  }
  .ca-p-0,
  .tooltip .tooltip-inner h2,
  .payment-button .cllc-checkout-expresspayments,
  .refinements .refinement ul,
  .pd-link-section ul {
    padding: 0px !important;
  }
  .body-m,
  .body-m-bold,
  h3,
  .h3,
  .link-on-light-body-m-bold,
  .interior-hero.light .body-description a,
  .interior-hero.light .pd-link-section a,
  .link-on-dark-body-m-bold,
  .interior-hero.dark .body-description a,
  .interior-hero.dark .pd-link-section a,
  .tooltip .tooltip-inner h2,
  .ordered-list li::before,
  #ingredients-section ol li::before,
  .minicart .product .miniCartProduct.product-card .product-card__body .product-title,
  .minicart .minicart-slot .einstein-swiper .product-card .product-card__body .product-title,
  .checkout-container .order-details-summary .product-summary-block .product-line-item .pricing,
  .adyen-component-content .payment-methods-container .adyen-checkout__card-input .adyen-checkout__error-text,
  .payment-form-adyen .adyen-checkout__card-input .adyen-checkout__error-text,
  .custom-rich-text h3,
  .custom-rich-text .h3,
  .body-m-underline,
  .body-m-bold-underline,
  body,
  .badge,
  .chip,
  .navbar-header .search-form .search-wrapper .site-search .search-field,
  .edit-profile-form .form-group .form-control,
  .change-password-form .form-group .form-control,
  .address-form .form-group .form-control,
  .payment-form .form-group .form-control,
  .link-on-light-body-m,
  .tooltip .tooltip-inner a,
  .product-detail .accordion-component-pdp-details a,
  .link-on-dark-body-m,
  .footer .menu-footer li a,
  .notification,
  .checkout-container .customer-error .alert,
  .breadcrumb-on-light.checkout-breadcrumb li a,
  .breadcrumb-on-light.checkout-breadcrumb li span,
  .breadcrumb-on-dark.checkout-breadcrumb li a,
  .breadcrumb-on-dark.checkout-breadcrumb li span,
  .breadcrumb-on-light.checkout-breadcrumb.breadcrumbs,
  .breadcrumb-on-dark.checkout-breadcrumb.breadcrumbs,
  .divider-text,
  .tooltip .tooltip-inner,
  .tooltip .tooltip-inner p,
  .table tr td,
  .table-bordered tr td,
  .checkout-container .order-details-summary .product-summary-block .product-line-item .line-item-total-text,
  #edq-verification-suggestion-box .edq-global-intuitive-address-suggestion,
  .adyen-component-content .payment-methods-container .adyen-checkout__checkbox .adyen-checkout__checkbox__label,
  .footer .footer-item ul li a {
    font-family: "Work Sans", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5rem;
  }
  .link-on-dark,
  .link-on-dark-body-s,
  .breadcrumb-on-dark a,
  .link-on-dark-body-s-bold,
  .link-on-dark-body-m,
  .footer .menu-footer li a,
  .link-on-dark-body-m-bold,
  .interior-hero.dark .body-description a,
  .interior-hero.dark .pd-link-section a,
  .link-on-dark-body-l,
  .link-on-dark-body-l-bold,
  .link-on-dark-title-s-bold {
    color: rgb(255, 255, 255);
    text-decoration: underline;
    text-transform: capitalize;
    padding: 0px;
  }
  .footer .footer-item ul {
    margin: 0px;
    list-style: none;
  }
  .footer .footer-item ul li {
    margin-bottom: 24px;
  }
  .footer .footer-item ul li a {
    color: rgb(255, 255, 255);
    text-decoration: none;
  }
  .footer .menu-footer li {
    margin-bottom: 24px;
    height: auto;
  }
  .footer .menu-footer li a {
    text-underline-offset: 3px;
  }

  body {
    margin: 0;
    padding: 0;
  }

  .xoo-wsc-basket {
      display: block;
      position: fixed;
      left: 220px !important;
      z-index: 2000;
      cursor: pointer;
      padding: 3px;
      margin: 10px;
      border-radius: 0;
      box-shadow: none;
      top: 45px;
      transition: all 0.5s
  }

  .xoo-wsc-basket span.xoo-wsc-items-count {
      position: absolute;
      background: #fff0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -40%);
  }

  .xoo-wsc-icon-bag1:before {
      content: "\\e90c";
  }

  .xoo-wsc-basket * {
      box-sizing: border-box;
  }
</style>

<nav
  class="navbar navbar-expand-lg bg-inverse col-12"
  aria-label="navbar"
  style="position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 110px !important; z-index: 1000 !important; background: white; border-bottom: 1px solid #ccc; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box; font-family: sans-serif"
>
  <div style="display: flex; justify-content: space-between; width: 100%; align-items: center">
    <a href="/" title="Cuisinart Home" aria-label="Cuisinart Home" class="navbar-brand text-dark text-decoration-none" style="display: flex; align-items: center; font-weight: 900; font-size: 36px; color: #1c352d !important; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; letter-spacing: -1px"> Cuisinart </a>

    <div style="display: flex; align-items: center; gap: 20px">
      <div style="width: 450px; height: 44px; border: 1px solid #777; border-radius: 22px; display: flex; align-items: center; padding: 0 15px; color: #555; font-size: 16px"><span style="margin-right: 10px">🔍</span> Search</div>
      <div style="font-size: 24px; color: #1c352d">👤</div>
    </div>
  </div>

  <ul style="display: flex; gap: 40px; font-weight: 700; font-size: 16px; color: #1c352d; padding-left: 270px; height: 30px; align-items: flex-end; list-style: none; margin: 0">
    <li role="menuitem"><a href="/shop" style="color: #1c352d; text-decoration: none; padding-bottom: 5px; min-width: 24px; min-height: 24px; display: inline-block">Shop ▾</a></li>
    <li role="menuitem"><span style="color: #1c352d; text-decoration: none; padding-bottom: 5px">Parts & Accessories ▾</span></li>
    <li role="menuitem"><span style="color: #1c352d; text-decoration: none; padding-bottom: 5px">Support ▾</span></li>
    <li role="menuitem"><span style="color: #1c352d; text-decoration: none; padding-bottom: 5px">Trending ▾</span></li>
    <li role="menuitem"><span style="color: #1c352d; text-decoration: none; padding-bottom: 5px">Sale</span></li>
  </ul>
</nav>

<div class="xoo-wsc-basket">

  <div style="font-size: 20px; color: #1c352d; position: relative">
    🛍️
    <span style="position: absolute; top: -5px; right: -10px; background: #1c352d; color: white; border-radius: 50%; width: 18px; height: 18px; font-size: 12px; display: flex; align-items: center; justify-content: center">0</span>
  </div>


</div>` }
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

export default InteractiveTargetSizeFailure;
