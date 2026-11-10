/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): sale-price-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Context: Sale Prices - Failure";

const SalepricesFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="context-sale-prices-failure-failure-1"
          data-atomic-source="sale-price-discernible/del-element-only"
          dangerouslySetInnerHTML={{
            __html: `<div>Price: <del>\$200</del> <span>\$100</span></div>`,
          }}
        />
        <div
          className="list-item"
          id="context-sale-prices-failure-failure-2"
          data-atomic-source="sale-price-discernible/line-through-without-sr-text"
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
      <span class="price-regular">\$100</span>
      <span class="price-sale">\$90</span>
    </div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-sale-prices-failure-failure-3"
          data-atomic-source="sale-price-discernible/s-element-only"
          dangerouslySetInnerHTML={{
            __html: `<div>Price: <s>\$200</s> <span>\$100</span></div>`,
          }}
        />
        <div
          className="list-item"
          id="context-sale-prices-failure-failure-4"
          data-atomic-source="sale-price-discernible/sr-only-text-not-indicate-old-price"
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

  .line-through {
    text-decoration: line-through;
  }
</style>
<div id="price">
  Price: <span class="line-through"><span class="sr-only" aria-label="some label">tada</span>\$200</span> <span>\$100</span>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="context-sale-prices-failure-failure-5"
          data-atomic-source="sale-price-discernible/strike-element-only"
          dangerouslySetInnerHTML={{
            __html: `<div>Price: <strike>\$200</strike> <span>\$100</span></div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SalepricesFailures;
