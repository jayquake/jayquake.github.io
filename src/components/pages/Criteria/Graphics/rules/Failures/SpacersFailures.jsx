/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): icon-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Graphics: Decorative Content - Failure";

const SpacersFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="graphics-decorative-content-failure-failure-1"
          data-atomic-source="icon-discernible/font-awesome-icon"
          dangerouslySetInnerHTML={{
            __html: `<!-- classifier returns "\\f005" as discernible text, which is partially corrent, because the screen reader attmpts to read it and shows "[?]" -->
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>
<i class="fa fa-star"></i>
<span class="fa fa-star"></span>
<div class="fa fa-star"></div>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-decorative-content-failure-failure-2"
          data-atomic-source="icon-discernible/img"
          dangerouslySetInnerHTML={{
            __html: `<style>
    img {
        width: calc(var(--base-size) * 1px);
        height: calc(var(--base-size) * 1px);
        display: block;
    }
</style>
<script>
    var dpr = window.devicePixelRatio || 1;
    document.documentElement.style.setProperty('--base-size', 48 * dpr);
</script>
<img src="https://banner2.cleanpng.com/20180411/oqq/kisspng-computer-icons-star-5-star-5acdd9ec67db40.8458493715234401084254.jpg" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-decorative-content-failure-failure-3"
          data-atomic-source="icon-discernible/svg-inside-div-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<div aria-label="Close"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red" /></svg></div>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-decorative-content-failure-failure-4"
          data-atomic-source="icon-discernible/svg-inside-nav-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<nav aria-label="Main"><span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red" /></svg></span></nav>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-decorative-content-failure-failure-5"
          data-atomic-source="icon-discernible/svg-inside-unnamed-button"
          dangerouslySetInnerHTML={{
            __html: `<button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="red" /></svg></button>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-decorative-content-failure-failure-6"
          data-atomic-source="icon-discernible/svg"
          dangerouslySetInnerHTML={{
            __html: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SpacersFailures;
