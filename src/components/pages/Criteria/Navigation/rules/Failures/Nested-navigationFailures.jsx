/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): navigation-not-nested
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation: Nested Navigation - Failure";

const NestednavigationFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-nested-navigation-failure-failure-1"
          data-atomic-source="navigation-not-nested/nav-nested-nav-multi"
          dangerouslySetInnerHTML={{
            __html: `<nav id="not-nested-nav">
  <ul>
    <li><a href="/">Home</a></li>
    <li>
      <a href="/about/">About Us</a>
      <!-- Submenu for "About Us" -->
      <nav id="nested-nav1">
        <ul>
          <li><a href="/about/history">Our History</a></li>
          <li><a href="/about/team">Our Team</a></li>
          <li>
            <a href="/about/mission">Our Mission</a>
            <nav id="nested-nav2">
              <ul>
                <li><a href="/about/mission/start">Our Beginning</a></li>
                <li><a href="/about/mission/end">Our Goal</a></li>
              </ul>
            </nav>
          </li>
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
          id="navigation-nested-navigation-failure-failure-2"
          data-atomic-source="navigation-not-nested/nav-nested-nav-role"
          dangerouslySetInnerHTML={{
            __html: `<nav id="not-nested-nav">
  <ul>
    <li><a href="/">Home</a></li>
    <li>
      <a href="/about/">About Us</a>
      <!-- Submenu for "About Us" -->
      <div id="nested-role" role="navigation">
        <ul>
          <li><a href="/about/history">Our History</a></li>
          <li><a href="/about/team">Our Team</a></li>
          <li><a href="/about/mission">Our Mission</a></li>
        </ul>
      </div>
    </li>
    <li><a href="/services/">Services</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-nested-navigation-failure-failure-3"
          data-atomic-source="navigation-not-nested/nav-nested-nav"
          dangerouslySetInnerHTML={{
            __html: `<nav id="not-nested-nav">
  <ul>
    <li><a href="/">Home</a></li>
    <li>
      <a href="/about/">About Us</a>
      <!-- Submenu for "About Us" -->
      <nav id="nested-nav">
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
          id="navigation-nested-navigation-failure-failure-4"
          data-atomic-source="navigation-not-nested/nav-role-nested-nav-role"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation" id="not-nested-nav">
  <ul>
    <li><a href="/">Home</a></li>
    <li>
      <a href="/about/">About Us</a>
      <!-- Submenu for "About Us" -->
      <div id="nested-nav" role="navigation">
        <ul>
          <li><a href="/about/history">Our History</a></li>
          <li><a href="/about/team">Our Team</a></li>
          <li><a href="/about/mission">Our Mission</a></li>
        </ul>
      </div>
    </li>
    <li><a href="/services/">Services</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-nested-navigation-failure-failure-5"
          data-atomic-source="navigation-not-nested/nav-role-nested-nav"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation" id="not-nested-nav">
  <ul>
    <li><a href="/">Home</a></li>
    <li>
      <a href="/about/">About Us</a>
      <!-- Submenu for "About Us" -->
      <nav id="nested-nav">
        <ul>
          <li><a href="/about/history">Our History</a></li>
          <li><a href="/about/team">Our Team</a></li>
          <li><a href="/about/mission">Our Mission</a></li>
        </ul>
        <nav id="nested-nav2"></nav>
      </nav>
    </li>
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

export default NestednavigationFailures;
