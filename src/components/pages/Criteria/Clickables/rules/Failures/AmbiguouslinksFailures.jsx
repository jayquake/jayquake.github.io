/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): link-anchor-ambiguous, link-navigation-ambiguous
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Clickables: Ambiguous Links - Failure";

const AmbiguouslinksFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="clickables-ambiguous-links-failure-failure-1"
          data-atomic-source="link-anchor-ambiguous/link-with-ambiguous-content-and-ambiguous-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<a href="#more" aria-label="show more">click here</a>


<section id="more">

</section>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-failure-failure-2"
          data-atomic-source="link-anchor-ambiguous/link-with-ambiguous-content"
          dangerouslySetInnerHTML={{
            __html: `<header id="top"></header>

<a href="#top">click here</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-failure-failure-3"
          data-atomic-source="link-anchor-ambiguous/link-with-image-content-with-ambiguous-alt"
          dangerouslySetInnerHTML={{
            __html: `<a href="#info"><img alt="click here" /></a>


<section id="info"></section>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-failure-failure-4"
          data-atomic-source="link-navigation-ambiguous/link-short-content"
          dangerouslySetInnerHTML={{
            __html: `<a href="http://localhost/">Go</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-failure-failure-5"
          data-atomic-source="link-navigation-ambiguous/link-with-ambiguous-content-and-ambiguous-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<a href="/homepage" aria-label="show more">click here</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-failure-failure-6"
          data-atomic-source="link-navigation-ambiguous/link-with-ambiguous-content"
          dangerouslySetInnerHTML={{
            __html: `<a href="/homepage">click here</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-failure-failure-7"
          data-atomic-source="link-navigation-ambiguous/link-with-image-content-with-ambiguous-alt"
          dangerouslySetInnerHTML={{
            __html: `<a href="/homepage"><img alt="click here" /></a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-failure-failure-8"
          data-atomic-source="link-navigation-ambiguous/link-with-numeric-characters-only"
          dangerouslySetInnerHTML={{
            __html: `<a href="http://localhost/" aria-label="123 12">1234 5</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-failure-failure-9"
          data-atomic-source="link-navigation-ambiguous/link-with-special-characters-only"
          dangerouslySetInnerHTML={{
            __html: `<a href="http://localhost/" aria-label="---">?!?!?!</a>`,
          }}
        />
        <div
          className="list-item"
          id="clickables-ambiguous-links-failure-failure-10"
          data-atomic-source="link-navigation-ambiguous/link-with-sr-only-context-not-in-accessible-name"
          dangerouslySetInnerHTML={{
            __html: `<!-- A screen-reader-only element is present, but the aria-label outranks it and the context never reaches the name -
     the screen reader still hears only "click here". Merely nesting a hidden element is not enough to clear the rule. -->
<a href="http://localhost/" aria-label="click here"><span data-acsb-sr-only="true" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;">Home</span>Go</a>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default AmbiguouslinksFailures;
