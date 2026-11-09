/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): menu-trigger-clickable
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation: Broken Submenu Indication - Failure";

const BrokensubmenuindicationFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-broken-submenu-indication-failure-failure-1"
          data-atomic-source="menu-trigger-clickable/li-as-menu-trigger"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <ul>
        <li id="test-subject" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">
          <button>Services</button>
        </li>
        <ul id="submenu" aria-hidden="true">
          <li><a href="#">Graphic Design</a></li>
          <li><a href="#">SEO</a></li>
        </ul>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-submenu-indication-failure-failure-2"
          data-atomic-source="menu-trigger-clickable/span-as-menu-trigger"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <span id="test-subject" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Services</span>
    </li>
    <li>
      <ul id="submenu" aria-hidden="true">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BrokensubmenuindicationFailures;
