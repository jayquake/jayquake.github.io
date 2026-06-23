import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ListItemMisuseSuccess = () => {
  const ruleId = "list-item-missuse";
  const title = `Orphaned list items with no direct list parent should not be tagged as list items`;
  const description = `Orphaned list items can be confusing for users of assistive technologies. If list items are used, they should be grouped within a list structure.`;
  const helpText = `Tag the element as a role="presentation" or remove the list item tag.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "alternative menu", content: `<!-- This test case is to make sure that list items under ul[role=region] are not incorrectly remediated with [role=presentation] -->

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
</ul>` },
  { filename: "li in ol no li siblings", content: `<ol>
  <li>Coffee</li>
</ol>` },
  { filename: "ol multiple li elements", content: `<ol>
  <li>Coffee</li>
  <li>Milk</li>
</ol>` },
  { filename: "ol role region multiple li elements", content: `<ol role="region">
  <li>Coffee</li>
  <li>Milk</li>
</ol>` },
  { filename: "role list with list item no list item siblings", content: `<div role="list">
  <div role="listitem">Milk</div>
</div>` },
  { filename: "role list with multiple list items", content: `<div role="list">
  <div role="listitem">Milk</div>
  <div role="listitem">Eggs</div>
</div>` },
  { filename: "ul multiple li elements", content: `<ul>
  <li>Milk</li>
  <li>Eggs</li>
</ul>` },
  { filename: "ul role region multiple li elements", content: `<ul role="region">
  <li>Milk</li>
  <li>Eggs</li>
</ul>` },
  { filename: "ul with list item no li siblings", content: `<ul>
  <li>Milk</li>
</ul>` }
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

export default ListItemMisuseSuccess;
