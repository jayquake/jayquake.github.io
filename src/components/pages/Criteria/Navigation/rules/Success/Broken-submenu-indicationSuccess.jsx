/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): menu-trigger-clickable
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Navigation: Broken Submenu Indication - Success";

const BrokensubmenuindicationSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-broken-submenu-indication-success-success-1"
          data-atomic-source="menu-trigger-clickable/anchor-as-menu-trigger"
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
      <a id="test-subject" href="#" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Services</a>
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
        <div
          className="list-item"
          id="navigation-broken-submenu-indication-success-success-2"
          data-atomic-source="menu-trigger-clickable/button-role-as-menu-trigger"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #submenu {
    display: block;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <span role="button" id="test-subject" href="#" aria-haspopup="true" aria-expanded="true" aria-controls="submenu">Services</span>
      <ul id="submenu" aria-hidden="false">
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
        <div
          className="list-item"
          id="navigation-broken-submenu-indication-success-success-3"
          data-atomic-source="menu-trigger-clickable/button-tag-as-menu-trigger"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #submenu {
    display: block;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <button id="test-subject" href="#" aria-haspopup="true" aria-expanded="true" aria-controls="submenu">Services</button>
      <ul id="submenu" aria-hidden="false">
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
        <div
          className="list-item"
          id="navigation-broken-submenu-indication-success-success-4"
          data-atomic-source="menu-trigger-clickable/link-role-as-menu-trigger"
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
      <span role="link" id="test-subject" href="#" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Services</span>
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

export default BrokensubmenuindicationSuccess;
