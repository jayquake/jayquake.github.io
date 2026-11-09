/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): menu-item-avoid
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation: Broken Nav Items - Failure";

const BrokennavitemsFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-broken-nav-items-failure-failure-1"
          data-atomic-source="menu-item-avoid/multiple-navs-containing-menu-items"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-1" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-2" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-items-failure-failure-2"
          data-atomic-source="menu-item-avoid/multiple-role-navigations-containing-menu-items"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-1" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>
<div role="navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-2" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-items-failure-failure-3"
          data-atomic-source="menu-item-avoid/nav-and-role-navigation-containing-menu-items"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-1" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
<div role="navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-2" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-items-failure-failure-4"
          data-atomic-source="menu-item-avoid/nav-containing-multiple-menu-items"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-1" role="menuitem" href="#">About</a></li>
    <li><a id="test-subject-2" role="menuitem" href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-items-failure-failure-5"
          data-atomic-source="menu-item-avoid/nav-containing-single-menu-item"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-items-failure-failure-6"
          data-atomic-source="menu-item-avoid/role-navigation-containing-multiple-menu-items"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-1" role="menuitem" href="#">About</a></li>
    <li><a id="test-subject-2" role="menuitem" href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-items-failure-failure-7"
          data-atomic-source="menu-item-avoid/role-navigation-containing-single-menu-item"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BrokennavitemsFailure;
