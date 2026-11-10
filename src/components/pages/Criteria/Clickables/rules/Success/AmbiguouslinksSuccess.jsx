/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): link-anchor-ambiguous, link-navigation-ambiguous
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Clickables: Ambiguous Links - Success";

const AmbiguouslinksSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-1"
          data-atomic-source="link-anchor-ambiguous/link-navigation"
          dangerouslySetInnerHTML={{
            __html: `<!-- Navigation links should not be audited at all here -->
<a href="/homepage" aria-label="this link leads to the homepage">click here</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-2"
          data-atomic-source="link-anchor-ambiguous/link-with-ambiguous-content-and-good-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<a href="#faq" aria-label="this link leads to the FAQ section">click here</a>

<section id="faq"></section>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-3"
          data-atomic-source="link-anchor-ambiguous/link-with-image-content-and-good-alt"
          dangerouslySetInnerHTML={{
            __html: `<a href="#faq"><img alt="image for link that leads to the FAQ section" /></a>

<section id="faq"></section>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-4"
          data-atomic-source="link-anchor-ambiguous/link-with-no-content"
          dangerouslySetInnerHTML={{
            __html: `<!-- Empty link are inapplicable -->
<a href="#plans"></a>

<section id="plans"></section>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-5"
          data-atomic-source="link-anchor-ambiguous/link-with-non-ambiguous-long-content"
          dangerouslySetInnerHTML={{
            __html: `<a href="#faq">jump tp frequently asked question</a>

<section id="faq"></section>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-6"
          data-atomic-source="link-anchor-ambiguous/link-with-non-ambiguous-short-content"
          dangerouslySetInnerHTML={{
            __html: `<a href="#plans">go to see plans</a>

<section id="plans"></section>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-7"
          data-atomic-source="link-navigation-ambiguous/allamericanclothing"
          dangerouslySetInnerHTML={{
            __html: `<a id="target" class="blog__read-more-button global-button global-button--text extracted_12" href="http://localhost/test" title="Made by Americans: Vermont Teddy Bear"> Read More </a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-8"
          data-atomic-source="link-navigation-ambiguous/ambigious-link-remediated-with-appened-visible-text"
          dangerouslySetInnerHTML={{
            __html: `<a aria-label="Home | click here" href="/home">click here</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-9"
          data-atomic-source="link-navigation-ambiguous/link-anchor"
          dangerouslySetInnerHTML={{
            __html: `<!-- Anchor link should not be audited at all here -->
<a class="button-solid-reversed" href="#marketoModalForm-demo">Demo</a>
<div class="modal" id="marketoModalForm-demo">
    <h3 class="coralogix-marketo__title">Book a Demo</h3>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-10"
          data-atomic-source="link-navigation-ambiguous/link-with-ambiguous-content-and-good-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<a href="/homepage" aria-label="this link leads to the homepage">click here</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-11"
          data-atomic-source="link-navigation-ambiguous/link-with-image-content-and-good-alt"
          dangerouslySetInnerHTML={{
            __html: `<a href="/homepage"><img alt="image for link that leads to the homepage" /></a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-12"
          data-atomic-source="link-navigation-ambiguous/link-with-no-content"
          dangerouslySetInnerHTML={{
            __html: `<!-- Empty link are inapplicable -->
<a href="/homepage"></a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-13"
          data-atomic-source="link-navigation-ambiguous/link-with-non-ambiguous-long-content"
          dangerouslySetInnerHTML={{
            __html: `<a href="/homepage">this link leads to the homepage</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-14"
          data-atomic-source="link-navigation-ambiguous/link-with-non-ambiguous-short-content"
          dangerouslySetInnerHTML={{
            __html: `<a href="/homepage">go to homepage</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-15"
          data-atomic-source="link-navigation-ambiguous/remediated-link--bacekdn-string-is-ambigous-already-includes-visible-text"
          dangerouslySetInnerHTML={{
            __html: `<a href="/discover-more/" aria-label="Discover more - gardyn">Discover more</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-16"
          data-atomic-source="link-navigation-ambiguous/remediated-link-with-context-appended-to-short-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<!-- The remediation appends into the highest priority attribute rather than overwriting it, so nothing in the DOM
     marks the addition - "more Go | Home" is still ambiguous (the "|" is stripped, leaving 3 words, one of them
     "more") and the only evidence of the added context is the name having outgrown the visible text "Go". -->
<a href="http://localhost/" aria-label="more Go | Home">Go</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-17"
          data-atomic-source="link-navigation-ambiguous/remediated-link-with-image-alt-and-sr-only-context"
          dangerouslySetInnerHTML={{
            __html: `<a href="http://localhost/">
  <img alt="click here" />
  <span data-acsb-sr-only="true" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important">
    Home
  </span>
</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-18"
          data-atomic-source="link-navigation-ambiguous/remediated-link"
          dangerouslySetInnerHTML={{
            __html: `<a href="http://localhost/"><span data-acsb-sr-only="true" class="acsb-sr-only" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;">home </span>Go</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-success-success-19"
          data-atomic-source="link-navigation-ambiguous/tel-link"
          dangerouslySetInnerHTML={{
            __html: `<a href="tel:6128721152">612-872-1152</a>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default AmbiguouslinksSuccess;
