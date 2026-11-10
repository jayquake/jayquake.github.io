/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): sale-price-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Context: Sale Prices - Success";

const SalepricesSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="context-sale-prices-success-success-1"
          data-atomic-source="sale-price-discernible/del-element-with-aria-labelledby"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>
<div>
  Price:
  <del aria-labelledby="old-price"
    >\$200
    <span id="old-price" class="sr-only">old price</span>
  </del>
  <span>\$100</span>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-sale-prices-success-success-2"
          data-atomic-source="sale-price-discernible/del-element-with-sr-only-sibling"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>
<div>
  Price:
  <span class="sr-only">old price</span>
  <del>\$200</del>
  <span>\$100</span>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-sale-prices-success-success-3"
          data-atomic-source="sale-price-discernible/line-through-and-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .product {
    display: flex;
    justify-content: space-between;
  }

  .price {
    display: flex;
    flex-direction: column;
  }

  .price-regular {
    text-decoration: line-through;
  }

  .price-sale {
    color: red;
  }

</style>

<div>
  <div class="product">
    <div class="price">
      <span class="price-regular" aria-label="was">\$100</span>
      <span class="price-sale">\$90</span>
    </div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-sale-prices-success-success-4"
          data-atomic-source="sale-price-discernible/line-through-with-a-nested-sr-text"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .product {
    display: flex;
    justify-content: space-between;
  }

  .price {
    display: flex;
    flex-direction: column;
  }

  .price-regular {
    text-decoration: line-through;
  }

  .price-sale {
    color: red;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>

<div>
  <div class="product">
    <div class="price">
      <span class="price-regular">
        <span class="sr-only">original price</span>
        \$100
      </span>
      <span class="price-sale">\$90</span>
    </div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-sale-prices-success-success-5"
          data-atomic-source="sale-price-discernible/no-indication-of-old-price"
          dangerouslySetInnerHTML={{
            __html: `<div>Price: <span class="red">\$200</span> <span>\$100</span></div>`,
          }}
        />
        <div
          className="list-item"
          id="context-sale-prices-success-success-6"
          data-atomic-source="sale-price-discernible/s-element-with-aria-describedby"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>
<div>Price:
    <s aria-describedby="original-price">\$200</s>
    <span id="original-price" class="sr-only">Original price</span>
    <span>\$100</span>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-sale-prices-success-success-7"
          data-atomic-source="sale-price-discernible/strike-element-with-aria-label-regular-price"
          dangerouslySetInnerHTML={{
            __html: `<div>
  Price:
  <strike aria-label="Product regular price">\$200</strike>
  <span>\$100</span>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-sale-prices-success-success-8"
          data-atomic-source="sale-price-discernible/strike-element-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<div>
  Price:
  <strike aria-label="was">\$200</strike>
  <span>\$100</span>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SalepricesSuccess;
