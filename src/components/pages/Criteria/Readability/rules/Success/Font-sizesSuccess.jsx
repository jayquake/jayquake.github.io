/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): font-sizes
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Readability: Font Sizes - Success";

const FontsizesSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="readability-font-sizes-success-success-1"
          data-atomic-source="font-sizes/berlin-packaging-button-with-only-pseudo-after-text"
          dangerouslySetInnerHTML={{
            __html: `<!-- Generated using Ofek's slash command! -->

<style>
    *,
    ::after,
    ::before {
        box-sizing: border-box;
    }

    .button,
    button {
        appearance: none;
        border-radius: 0px;
        border-style: solid;
        border-width: 1px;
        cursor: pointer;
        font-family: Roboto, Arial, Helvetica, sans-serif;
        font-weight: 400;
        line-height: normal;
        margin: 0px 0px 1rem;
        position: relative;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        padding: 1rem 2rem 1.0625rem;
        font-size: 1rem;
        background-color: rgb(35, 31, 32);
        border-color: rgb(28, 25, 26);
        color: rgb(255, 255, 255);
        transition: background-color 0.3s ease-out;
    }

    @media only screen and (min-width: 551px) {
        .button,
        button {
            display: inline-block;
        }
    }

    blockquote,
    dd,
    div,
    dl,
    dt,
    form,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    li,
    ol,
    p,
    pre,
    td,
    th,
    ul {
        margin: 0px;
        padding: 0px;
    }

    @media print {
        * {
            background: 0px 0px !important;
            color: rgb(0, 0, 0) !important;
            box-shadow: none !important;
            text-shadow: none !important;
        }
    }

    button,
    input,
    optgroup,
    select,
    textarea {
        color: inherit;
        font: inherit;
        margin: 0px;
    }

    button {
        overflow: visible;
    }

    button,
    select {
        text-transform: none;
    }

    button,
    html input[type="button"],
    input[type="reset"],
    input[type="submit"] {
        appearance: button;
        cursor: pointer;
    }

    button {
        background: 0px 0px;
        border: 0px;
    }

    .button {
        appearance: none;
        border-style: solid;
        border-width: 2px;
        cursor: pointer;
        font-family: Roboto;
        font-weight: 700;
        line-height: normal;
        margin: 0px 0px 1rem;
        position: relative;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        background-color: rgb(255, 255, 255);
        border-color: rgb(224, 27, 34);
        color: rgb(224, 27, 34);
        font-size: 0.875rem;
        padding: 11px 15px;
        border-radius: 2px;
        outline: 0px;
        vertical-align: middle;
    }

    .button--primary {
        background-color: rgb(224, 27, 34);
        border-color: rgb(224, 27, 34);
        color: rgb(255, 255, 255);
    }

    .button {
        line-height: 0.875rem;
        transition: 0.15s;
    }

    body[data-page-type="product"] .build-quote.build-quote-only {
        font-size: 0px;
    }

    body[data-page-type="product"] .build-quote.build-quote-only::after {
        font-size: 14px;
        content: "Submit Special Order Request";
    }

    body[data-page-type="product"] .center-all {
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
    }

    body[data-page-type="product"] .productView-options .form-action {
        margin-top: 0px;
    }

    body[data-page-type="product"] .productView-options .form-action .button {
        display: block;
        width: 100%;
        margin-left: 0px;
        margin-right: 0px;
        border-radius: 2px;
    }

    @media (min-width: 801px) {
        body[data-page-type="product"] .productView-options .form-action .button {
            max-width: 33.3%;
            margin-left: 10px;
        }

        body[data-page-type="product"] .productView-options .form-action .button:first-child {
            margin-left: 0px;
        }

        body[data-page-type="product"] .productView-options .form-action {
            display: flex;
            flex-wrap: wrap;
        }
    }

    body[data-page-type="product"] .cart-buttons-div {
        margin-bottom: 1rem;
    }

    body[data-page-type="product"] .cart-buttons-div {
        display: none;
    }

    @media (min-width: 551px) {
        body[data-page-type="product"] #form-action-addToCart,
        body[data-page-type="product"] .cart-buttons-div,
        body[data-page-type="product"] .productView-price {
            display: block;
        }
    }

    body[data-page-type="product"] .productView-options .form-action .button {
        margin-bottom: 10px !important;
    }

    body[data-page-type="product"] .productView-options .form-action {
        margin-bottom: -10px;
    }

    @media (min-width: 801px) {
        body[data-page-type="product"] .productView-options .form-action .button {
            max-width: 48.3% !important;
            margin: 0px auto 10px !important;
        }

        body[data-page-type="product"] .productView-options .form-action .button.special-quote-btn {
            border-radius: 5px;
            margin: 0px 0px 10px !important;
        }
    }

    @media (max-width: 550px) and (hover: hover) and (pointer: fine) {
        body[data-page-type="product"] #form-action-addToCart,
        body[data-page-type="product"] .cart-buttons-div,
        body[data-page-type="product"] .productView-price {
            display: block;
        }
    }

    @media screen and (min-width: 300px) and (max-width: 700px) {
        body[data-page-type="product"] .cart-buttons-div {
            display: block !important;
        }
    }

    .special-quote-btn {
        border-radius: 5px;
        margin: 0px 0px 10px !important;
    }
</style>

<body data-page-type="product">
<div class="product-right-sections ">
  <div class="form-action cart-buttons-div">
    <button
      data-link="/custom-quote-request/"
      class="build-quote build-quote-only button button--primary center-all special-quote-btn"
      type="submit"
      id="quoteOnly"
      data-plm-sku="328812"
      style="margin: initial"
    >
      Build a Quote
    </button>
  </div>
</div>
</body>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-success-success-2"
          data-atomic-source="font-sizes/div-with-good-font-size-in-style-attribute"
          dangerouslySetInnerHTML={{
            __html: `<div style="font-size: 12px">Some text content</div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-success-success-3"
          data-atomic-source="font-sizes/nested-with-good-font-size-in-css-class"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .good-font-size {
    font-size: 12px;
  }
</style>
<div>
  <div id="div1" style="font-size: 12px">
    This is a div with font-size 12px.
    <p id="p1">
      This is a paragraph with class good-font-size.
      <span id="span1" class="good-font-size"> This is a span with no style or class. </span>
    </p>
  </div>
  <div id="div2" style="font-size: 10px">
    <p id="p2" style="font-size: 14px">
      This is a paragraph with font-size 14px.
      <span id="span2" class="good-font-size">
        <!-- This is a span with no text -->
      </span>
    </p>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-success-success-4"
          data-atomic-source="font-sizes/paragraph-with-good-font-size-in-css-class"
          dangerouslySetInnerHTML={{
            __html: `<style>
.good-font-size {
    font-size: 12px;
}
</style>
<p class="good-font-size">Some text content</p>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-success-success-5"
          data-atomic-source="font-sizes/paragraph-with-good-font-size-in-css-selector"
          dangerouslySetInnerHTML={{
            __html: `<style>
p {
    font-size: 12px;
}
</style>
<p style="font-size: 12px;">Some text content</p>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-success-success-6"
          data-atomic-source="font-sizes/paragraph-with-good-font-size-in-style-attribute"
          dangerouslySetInnerHTML={{
            __html: `<p style="font-size: 12px;">Some text content</p>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-success-success-7"
          data-atomic-source="font-sizes/paragraph-with-no-content"
          dangerouslySetInnerHTML={{
            __html: `<p style="font-size: 10px;"></p>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-success-success-8"
          data-atomic-source="font-sizes/subscript-element-is-exempt"
          dangerouslySetInnerHTML={{
            __html: `<div style="font-size: 12px">Do it <sub style="font-size: 7px">don't do it?</sub></div>`,
          }}
        />
        <div
          className="list-item"
          id="readability-font-sizes-success-success-9"
          data-atomic-source="font-sizes/superscript-element-is-exempt"
          dangerouslySetInnerHTML={{
            __html: `<div style="font-size: 12px">Corporation<sup style="font-size: 7px">TM</sup></div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FontsizesSuccess;
