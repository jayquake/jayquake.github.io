/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): list-item-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Errors: Broken List - Success";

const BrokenlistSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-broken-list-success-success-1"
          data-atomic-source="list-item-misuse/alternative-menu"
          dangerouslySetInnerHTML={{
            __html: `<!-- This test case is to make sure that list items under ul[role=region] are not incorrectly remediated with [role=presentation] -->

<ul
  data-acsb-now-navigable="true"
  data-acsb-force-visible="true"
  role="region"
  aria-label="Submenu"
  style="
    position: fixed;
    text-align: left;
    bottom: 0px;
    width: 300px;
    min-width: 300px;
    max-height: 100vh;
    height: 150px;
    background: rgba(255, 255, 255, 0.95);
    font-size: 16px;
    z-index: 2147483647;
    max-width: 100%;
    overflow: hidden auto;
    display: block !important;
    padding: 15px;
    border-radius: 0px 3px 3px 0px;
    margin: 0px auto 20px;
    color: rgb(90, 90, 90);
    box-shadow: rgba(159, 159, 159, 0.75) 2px 0px 5px 0px;
    box-sizing: border-box;
    top: 197.664px;
    left: 362.719px;
  "
  class=""
>
  <li style="display: block" data-acsb-hidden="false">
    <a
      href="https://www.bellaallnatural.com/collections/all"
      tabindex="0"
      data-acsb-clickable="true"
      data-acsb-now-navigable="true"
      data-acsb-force-visible="true"
      style="display: block; padding: 10px; text-decoration: none; border-bottom: 1px solid rgb(206, 206, 206); color: rgb(90, 90, 90)"
      data-acsb-navigable="true"
      data-custom-button-processed="true"
    >Shop All</a
    >
  </li>
  <li style="display: block" data-acsb-hidden="false">
    <a
      href="https://www.bellaallnatural.com/collections/best-sellers"
      tabindex="0"
      data-acsb-clickable="true"
      data-acsb-now-navigable="true"
      data-acsb-force-visible="true"
      aria-label="Best sellers – bella all natural"
      style="display: block; padding: 10px; text-decoration: none; border-bottom: 1px solid rgb(206, 206, 206); color: rgb(90, 90, 90)"
      data-acsb-navigable="true"
      data-custom-button-processed="true"
    >Best Sellers</a
    >
  </li>
  <li style="display: block" data-acsb-hidden="false">
    <a
      href="https://www.bellaallnatural.com/collections/new-arrivals"
      tabindex="0"
      data-acsb-clickable="true"
      data-acsb-now-navigable="true"
      data-acsb-force-visible="true"
      aria-label="New arrivals – bella all natural"
      style="display: block; padding: 10px; text-decoration: none; border-bottom: 1px solid rgb(206, 206, 206); color: rgb(90, 90, 90)"
      data-acsb-navigable="true"
      data-custom-button-processed="true"
    >New Arrivals</a
    >
  </li>
</ul>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-list-success-success-2"
          data-atomic-source="list-item-misuse/li-in-ol-no-li-siblings"
          dangerouslySetInnerHTML={{
            __html: `<ol>
  <li>Coffee</li>
</ol>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-list-success-success-3"
          data-atomic-source="list-item-misuse/ol-multiple-li-elements"
          dangerouslySetInnerHTML={{
            __html: `<ol>
  <li>Coffee</li>
  <li>Milk</li>
</ol>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-list-success-success-4"
          data-atomic-source="list-item-misuse/ol-role-region-multiple-li-elements"
          dangerouslySetInnerHTML={{
            __html: `<ol role="region">
  <li>Coffee</li>
  <li>Milk</li>
</ol>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-list-success-success-5"
          data-atomic-source="list-item-misuse/role-list-with-list-item-no-list-item-siblings"
          dangerouslySetInnerHTML={{
            __html: `<div role="list">
  <div role="listitem">Milk</div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-list-success-success-6"
          data-atomic-source="list-item-misuse/role-list-with-multiple-list-items"
          dangerouslySetInnerHTML={{
            __html: `<div role="list">
  <div role="listitem">Milk</div>
  <div role="listitem">Eggs</div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-list-success-success-7"
          data-atomic-source="list-item-misuse/ul-multiple-li-elements"
          dangerouslySetInnerHTML={{
            __html: `<ul>
  <li>Milk</li>
  <li>Eggs</li>
</ul>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-list-success-success-8"
          data-atomic-source="list-item-misuse/ul-role-region-multiple-li-elements"
          dangerouslySetInnerHTML={{
            __html: `<ul role="region">
  <li>Milk</li>
  <li>Eggs</li>
</ul>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-list-success-success-9"
          data-atomic-source="list-item-misuse/ul-with-list-item-no-li-siblings"
          dangerouslySetInnerHTML={{
            __html: `<ul>
  <li>Milk</li>
</ul>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BrokenlistSuccess;
