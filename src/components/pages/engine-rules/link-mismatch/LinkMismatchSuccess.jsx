import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LinkMismatchSuccess = () => {
  const ruleId = "link-mismatch";
  const title = `Links should be tagged properly`;
  const description = `Custom links should be tagged with role='link' for assistive technologies to identify them correctly.`;
  const helpText = `Add role='link' to custom link elements or use a HTML <a> element to ensure they are recognized as links by assistive technologies.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "anchor checkout", content: `<a href="/">Checkout</a>` },
  { filename: "check out button with role link", content: `<button
  class="button-primary cart-title-button mdc-ripple-surface mdc-ripple-upgraded"
  name="checkout"
  type="submit"
  aria-label="Check out"
  role="link"
  style="
    --mdc-ripple-fg-size: 88px;
    --mdc-ripple-fg-scale: 1.856834989916348;
    --mdc-ripple-fg-translate-start: 30.96875px, -25.68359375px;
    --mdc-ripple-fg-translate-end: 29.41796875px, -21.80078125px;
    align-items: center;
    background-color: rgb(255, 171, 65);
    block-size: 44.3984px;
    border-block: 1px solid rgb(255, 171, 65);
    border-color: rgb(255, 171, 65);
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    border-end-end-radius: 3px;
    border-end-start-radius: 3px;
    border-inline: 1px solid rgb(255, 171, 65);
    border-start-end-radius: 3px;
    border-start-start-radius: 3px;
    inset: 0px;
    cursor: pointer;
    display: flex;
    font-family: 'Open Sans', sans-serif;
    font-weight: 700;
    height: 44.3984px;
    inline-size: 146.836px;
    inset-block: 0px;
    inset-inline: 0px;
    min-block-size: auto;
    min-height: auto;
    min-inline-size: auto;
    min-width: auto;
    overflow-block: hidden;
    overflow-inline: hidden;
    overflow: hidden;
    padding-block: 12px;
    padding: 12px 18px;
    padding-inline: 18px;
    perspective-origin: 73.4141px 22.1953px;
    position: relative;
    transform-origin: 73.418px 22.1992px;
    transition: width 0.125s cubic-bezier(0.4, 0, 0.2, 1), height 0.125s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.125s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.125s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.125s cubic-bezier(0.4, 0, 0.2, 1);
    width: 146.836px;
  "
  data-id="0"
>
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="currentColor"
    style="
      block-size: 18px;
      border-block-color: rgb(0, 0, 0);
      border-color: rgb(0, 0, 0);
      border-inline-color: rgb(0, 0, 0);
      caret-color: rgb(0, 0, 0);
      color: rgb(0, 0, 0);
      column-rule-color: rgb(0, 0, 0);
      cursor: pointer;
      display: block;
      font-weight: 700;
      height: 18px;
      inline-size: 19px;
      margin-inline-end: 10px;
      margin-right: 10px;
      min-block-size: auto;
      min-height: auto;
      min-inline-size: auto;
      min-width: auto;
      outline-color: rgb(0, 0, 0);
      overflow-clip-margin: content-box;
      perspective-origin: 9.5px 9px;
      text-align: center;
      text-decoration-color: rgb(0, 0, 0);
      text-emphasis-color: rgb(0, 0, 0);
      transform-origin: 9.5px 9px;
      width: 19px;
      -webkit-text-fill-color: rgb(0, 0, 0);
      -webkit-text-stroke-color: rgb(0, 0, 0);
    "
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1 0C0.447715 0 0 0.447715 0 1C0 1.55228 0.447715 2 1 2H1.33877H1.33883C1.61048 2.00005 2.00378 2.23945 2.10939 2.81599L2.10937 2.816L2.11046 2.82171L5.01743 18.1859C5.12011 18.7286 5.64325 19.0852 6.18591 18.9826C6.21078 18.9779 6.23526 18.9723 6.25933 18.9658C6.28646 18.968 6.31389 18.9692 6.34159 18.9692H18.8179H18.8181C19.0302 18.9691 19.2141 18.9765 19.4075 18.9842L19.4077 18.9842C19.5113 18.9884 19.6175 18.9926 19.7323 18.9959C20.0255 19.0043 20.3767 19.0061 20.7177 18.9406C21.08 18.871 21.4685 18.7189 21.8028 18.3961C22.1291 18.081 22.3266 17.6772 22.4479 17.2384C22.4569 17.2058 22.4642 17.1729 22.4699 17.1396L23.944 8.46865C24.2528 7.20993 23.2684 5.99987 21.9896 6H21.9894H4.74727L4.07666 2.45562L4.07608 2.4525C3.83133 1.12381 2.76159 8.49962e-05 1.33889 0H1.33883H1ZM5.12568 8L6.8227 16.9692H18.8178H18.8179C19.0686 16.9691 19.3257 16.9793 19.5406 16.9877L19.5413 16.9877C19.633 16.9913 19.7171 16.9947 19.7896 16.9967C20.0684 17.0047 20.2307 16.9976 20.3403 16.9766C20.3841 16.9681 20.4059 16.96 20.4151 16.9556C20.4247 16.9443 20.4639 16.8918 20.5077 16.7487L21.9794 8.09186C21.9842 8.06359 21.9902 8.03555 21.9974 8.0078C21.9941 8.00358 21.9908 8.00108 21.989 8H5.12568ZM20.416 16.9552C20.4195 16.9534 20.4208 16.9524 20.4205 16.9523C20.4204 16.9523 20.4199 16.9525 20.4191 16.953L20.416 16.9552ZM10.8666 22.4326C10.8666 23.2982 10.195 24 9.36658 24C8.53815 24 7.86658 23.2982 7.86658 22.4326C7.86658 21.567 8.53815 20.8653 9.36658 20.8653C10.195 20.8653 10.8666 21.567 10.8666 22.4326ZM18.0048 24C18.8332 24 19.5048 23.2982 19.5048 22.4326C19.5048 21.567 18.8332 20.8653 18.0048 20.8653C17.1763 20.8653 16.5048 21.567 16.5048 22.4326C16.5048 23.2982 17.1763 24 18.0048 24Z"
      fill="currentColor"
    ></path>
  </svg>

  Check out
</button>
<style>
  [data-id="0"]::after {
    background-color: rgb(0, 0, 0);
    block-size: 88px;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-end-end-radius: 50%;
    border-end-start-radius: 50%;
    border-start-end-radius: 50%;
    border-start-start-radius: 50%;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    bottom: -45.6094px;
    content: "";
    cursor: pointer;
    display: block;
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
    height: 88px;
    inline-size: 88px;
    inset-block-end: -45.6094px;
    inset-block-start: 0px;
    inset-inline-end: 56.8359px;
    inset-inline-start: 0px;
    left: 0px;
    opacity: 0;
    perspective-origin: 44px 44px;
    pointer-events: none;
    position: absolute;
    right: 56.8359px;
    top: 0px;
    transform: matrix(0, 0, 0, 0, 0, 0);
    transform-origin: 44px 44px;
    width: 88px;
    --layout-container-gutter: 25px;
    --mdc-ripple-fg-opacity: 0.16;
    --mdc-ripple-fg-translate-end: 29.41796875px, -21.80078125px;
    --mdc-ripple-fg-scale: 1.856834989916348;
    --mdc-ripple-top: 0;
    --mdc-ripple-fg-translate-start: 30.96875px, -25.68359375px;
    --mdc-ripple-left: 0;
    --mdc-ripple-fg-size: 88px;
    --layout-container-max-width: 1400px;
  }
  [data-id="0"]::before {
    background-color: rgb(0, 0, 0);
    block-size: 84.7812px;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    border-end-end-radius: 50%;
    border-end-start-radius: 50%;
    border-start-end-radius: 50%;
    border-start-start-radius: 50%;
    border-top-left-radius: 50%;
    border-top-right-radius: 50%;
    bottom: -21.1953px;
    content: "";
    cursor: pointer;
    display: block;
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
    height: 84.7812px;
    inline-size: 289.672px;
    inset-block-end: -21.1953px;
    inset-block-start: -21.1953px;
    inset-inline-end: -72.4219px;
    inset-inline-start: -72.4141px;
    left: -72.4141px;
    opacity: 0;
    perspective-origin: 144.836px 42.3906px;
    pointer-events: none;
    position: absolute;
    right: -72.4219px;
    top: -21.1953px;
    transform: matrix(1.85684, 0, 0, 1.85684, 0, 0);
    transform-origin: 144.836px 42.3906px;
    transition-behavior: normal, normal;
    transition-delay: 0s, 0s;
    transition-duration: 0.015s, 0.015s;
    transition-property: opacity, background-color;
    transition-timing-function: linear, linear;
    width: 289.672px;
    z-index: 1;
    --layout-container-gutter: 25px;
    --mdc-ripple-fg-opacity: 0.16;
    --mdc-ripple-fg-translate-end: 29.41796875px, -21.80078125px;
    --mdc-ripple-fg-scale: 1.856834989916348;
    --mdc-ripple-top: 0;
    --mdc-ripple-fg-translate-start: 30.96875px, -25.68359375px;
    --mdc-ripple-left: 0;
    --mdc-ripple-fg-size: 88px;
    --layout-container-max-width: 1400px;
  }
</style>` },
  { filename: "checkout button with role link", content: `<button
  type="submit"
  class="global-button global-button--primary add_to_cart tpo-btn-checkout"
  id="checkout"
  name="checkout"
  data-cart-checkout-button=""
  role="link"
  style="
    pointer-events: auto;
    background-color: rgb(0, 186, 190);
    border-block-style: none;
    border-block-width: 0px;
    border-style: none;
    border-width: 0px;
    border-inline-style: none;
    border-inline-width: 0px;
    inset: 0px;
    font-size: 26px;
    inline-size: 358.195px;
    inset-block: 0px;
    inset-inline: 0px;
    letter-spacing: 1px;
    line-height: 31.2px;
    min-block-size: 54px;
    min-height: 54px;
    padding-block: 13px;
    padding-bottom: 13px;
    padding-top: 13px;
    perspective-origin: 179.094px 30px;
    position: relative;
    transform-origin: 179.098px 30px;
    width: 358.195px;
    word-break: break-word;
  "
>
  Checkout
</button>
<style></style>` },
  { filename: "shop button", content: `<button
  type="submit"
  class="global-button global-button--primary add_to_cart tpo-btn-checkout"
  id="checkout"
  name="checkout"
  data-cart-checkout-button=""
  style="
    pointer-events: auto;
    background-color: rgb(0, 186, 190);
    border-block-style: none;
    border-block-width: 0px;
    border-style: none;
    border-width: 0px;
    border-inline-style: none;
    border-inline-width: 0px;
    inset: 0px;
    font-size: 26px;
    inline-size: 358.195px;
    inset-block: 0px;
    inset-inline: 0px;
    letter-spacing: 1px;
    line-height: 31.2px;
    min-block-size: 54px;
    min-height: 54px;
    padding-block: 13px;
    padding-bottom: 13px;
    padding-top: 13px;
    perspective-origin: 179.094px 30px;
    position: relative;
    transform-origin: 179.098px 30px;
    width: 358.195px;
    word-break: break-word;
  "
>
  Shop
</button>
<style></style>` }
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

export default LinkMismatchSuccess;
