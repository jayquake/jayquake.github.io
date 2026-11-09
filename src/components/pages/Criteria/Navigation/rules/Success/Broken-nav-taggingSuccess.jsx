/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): menu-avoid, menu-bar-avoid
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Navigation: Broken Nav Tagging - Success";

const BrokennavtaggingSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-broken-nav-tagging-success-success-1"
          data-atomic-source="menu-avoid/nav-containing-no-menu-items"
          dangerouslySetInnerHTML={{
            __html: `<nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li>
        <a href="/about/" aria-haspopup="true" aria-expanded="false">About Us</a>
        <!-- Submenu for "About Us" -->
        <ul aria-label="About Us">
          <li><a href="/about/history">Our History</a></li>
          <li><a href="/about/team">Our Team</a></li>
          <li><a href="/about/mission">Our Mission</a></li>
        </ul>
      </li>
      <li><a href="/services/">Services</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-tagging-success-success-2"
          data-atomic-source="menu-bar-avoid/nav-containing-no-menu-bars"
          dangerouslySetInnerHTML={{
            __html: `<nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li>
        <a href="/about/" aria-haspopup="true" aria-expanded="false">About Us</a>
        <!-- Submenu for "About Us" -->
        <ul aria-label="About Us">
          <li><a href="/about/history">Our History</a></li>
          <li><a href="/about/team">Our Team</a></li>
          <li><a href="/about/mission">Our Mission</a></li>
        </ul>
      </li>
      <li><a href="/services/">Services</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul>
</nav>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BrokennavtaggingSuccess;
