/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): navigation-not-nested
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Navigation: Nested Navigation - Success";

const NestednavigationSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-nested-navigation-success-success-1"
          data-atomic-source="navigation-not-nested/nav-nested-presentation"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li>
      <a href="/about/">About Us</a>
      <!-- Submenu for "About Us" -->
      <nav role="presentation" aria-label="submenu">
        <ul>
          <li><a href="/about/history">Our History</a></li>
          <li><a href="/about/team">Our Team</a></li>
          <li><a href="/about/mission">Our Mission</a></li>
        </ul>
      </nav>
    </li>
    <li><a href="/services/">Services</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-nested-navigation-success-success-2"
          data-atomic-source="navigation-not-nested/nav-no-nested-multi"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About Us</a></li>
    <li><a href="/services/">Services</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About Us</a></li>
    <li><a href="/services/">Services</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About Us</a></li>
    <li><a href="/services/">Services</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-nested-navigation-success-success-3"
          data-atomic-source="navigation-not-nested/nav-no-nested"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About Us</a></li>
    <li><a href="/services/">Services</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-nested-navigation-success-success-4"
          data-atomic-source="navigation-not-nested/nav-role-nested-presentation"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li>
      <a href="/about/">About Us</a>
      <!-- Submenu for "About Us" -->
      <nav role="presentation">
        <ul>
          <li><a href="/about/history">Our History</a></li>
          <li><a href="/about/team">Our Team</a></li>
          <li><a href="/about/mission">Our Mission</a></li>
        </ul>
      </nav>
    </li>
    <li><a href="/services/">Services</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-nested-navigation-success-success-5"
          data-atomic-source="navigation-not-nested/nav-role-no-nested"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About Us</a></li>
    <li><a href="/services/">Services</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default NestednavigationSuccess;
