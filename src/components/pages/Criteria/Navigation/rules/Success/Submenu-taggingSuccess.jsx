/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): menu-trigger-mismatch
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Navigation: Submenu Tagging - Success";

const SubmenutaggingSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-submenu-tagging-success-success-1"
          data-atomic-source="menu-trigger-mismatch/anchor-within-nav-with-aria-haspopup-with-aria-controls-with-aria-expanded"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #sub-menu {
    display: none;
  }

  li #test-subject[aria-expanded="true"] + #sub-menu {
    display: block;
  }
</style>

<nav>
  <ul>
    <li>
      <a id="test-subject" aria-haspopup="true" aria-expanded="false" aria-controls="sub-menu">Menu</a>
      <ul id="sub-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-tagging-success-success-2"
          data-atomic-source="menu-trigger-mismatch/button-within-nav-with-aria-haspopup-with-aria-controls-with-aria-expanded"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #sub-menu {
    display: none;
  }

  li #test-subject[aria-expanded="true"] + #sub-menu {
    display: block;
  }
</style>

<nav>
  <ul>
    <li>
      <button id="test-subject" aria-haspopup="true" aria-expanded="false" aria-controls="sub-menu">Menu</button>
      <ul id="sub-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-tagging-success-success-3"
          data-atomic-source="menu-trigger-mismatch/menu-trigger-with-aria-haspopup-and-with-aria-expanded"
          dangerouslySetInnerHTML={{
            __html: `<div data-enable-parallax="0" data-parallax-speed="0.5" data-background-images="{}" data-video-fallback-src="" data-element="inner" data-pb-style="EM2MYR0">
  <div data-content-type="html" data-appearance="default" data-element="main" data-pb-style="PYTK9WD" data-decoded="true">
    <ul class="menuTop" id="topmenu">
      <li>
        <a href="/about-hoffmaster" id="about-hoffmaster" aria-haspopup="menu" aria-expanded="true">About</a>
        <ul id="topmenudropdown">
          <li><a href="/history">History</a></li>
          <li><a href="/social-responsibility">Social Responsibility</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/terms-conditions">Terms and Conditions</a></li>
        </ul>
      </li>
      <li><a href="https://us231.dayforcehcm.com/CandidatePortal/en-US/hoffmaster" target=" _blank">Employment</a></li>
      <li><a href="/customer-care">Customer Care</a></li>
    </ul>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-tagging-success-success-4"
          data-atomic-source="menu-trigger-mismatch/remediated-menu-trigger"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li>
      <button id="sub-menu-button" aria-expanded="false" aria-controls="sub-menu" aria-haspopup="menu">Menu</button>
      <ul id="sub-menu">
        <li><a href="link://#">Home</a></li>
        <li><a href="link://#">About</a></li>
      </ul>
    </li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-tagging-success-success-5"
          data-atomic-source="menu-trigger-mismatch/simple-nav-without-sub-menu"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul id="menu">
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
  </ul>
</nav>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SubmenutaggingSuccess;
