/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): navigation-item-link
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation: Missing Nav Items - Failure";

const MissingnavitemsFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-missing-nav-items-failure-failure-1"
          data-atomic-source="navigation-item-link/broad-interactables"
          dangerouslySetInnerHTML={{
            __html: `<nav aria-label="Main navigation">
  <ul>
    <li id="input" onclick="navigate()">Search <input type="text" aria-label="Search"></li>
    <li id="editable"><span contenteditable="true" onclick="navigate()">Edit</span></li>
    <li id="select" onclick="navigate()">Options <select aria-label="Options"><option>One</option></select></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-failure-failure-2"
          data-atomic-source="navigation-item-link/cursor-pointer-span"
          dangerouslySetInnerHTML={{
            __html: `<style>
  .fake-link {
    cursor: pointer;
  }
</style>
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
    <li id="test-subject"><span class="fake-link">About</span></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-failure-failure-3"
          data-atomic-source="navigation-item-link/nav-div-items"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li id="test-subject-1"><div id="test-subject1" onclick="navigateToPage('home.html');">Home</div></li>
    <li id="test-subject-2"><div id="test-subject2" onclick="navigateToPage('about.html');">About</div></li>
    <li id="test-subject-3"><div id="test-subject3" onclick="navigateToPage('contact.html');">Contact</div></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-failure-failure-4"
          data-atomic-source="navigation-item-link/nav-list-items"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li id="test-subject-1" onclick="navigateToPage('home.html');">Home</li>
    <li id="test-subject-2" onclick="navigateToPage('about.html');">About</li>
    <li id="test-subject-3" onclick="navigateToPage('contact.html');">Contact</li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-failure-failure-5"
          data-atomic-source="navigation-item-link/nav-role-list-items"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <div id="test-subject-1" role="listitem" onclick="navigateToPage('home.html');">Home</div>
    <div id="test-subject-2" role="listitem" onclick="navigateToPage('about.html');">About</div>
    <div id="test-subject-3" role="listitem" onclick="navigateToPage('contact.html');">Contact</div>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-failure-failure-6"
          data-atomic-source="navigation-item-link/nested-button-does-not-satisfy-parent"
          dangerouslySetInnerHTML={{
            __html: `<nav aria-label="Main navigation">
  <ul>
    <li id="parent" onclick="toggleMenu()">Services
      <ul><li id="child"><button type="button">Web design</button></li></ul>
    </li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-failure-failure-7"
          data-atomic-source="navigation-item-link/partial-nav-list-items"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li id="test-subject-1"><a href="#">Home</a></li>
    <li id="test-subject-2"><a href="#">About</a></li>
    <li id="test-subject-3" onclick="navigateToPage('contact.html');">Contact</li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-failure-failure-8"
          data-atomic-source="navigation-item-link/partial-nav-sub-list-items"
          dangerouslySetInnerHTML={{
            __html: `<nav aria-label="Main Navigation">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About Us</a></li>
    <li class="submenu">Services
      <ul>
        <li><a href="/services/web-design">Web Design</a></li>
        <li id="test-subject" onclick="navigateToPage('seo.html');">SEO</li>
        <li><a href="/services/content">Content Creation</a></li>
      </ul>
    </li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-failure-failure-9"
          data-atomic-source="navigation-item-link/role-list-items"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation">
  <ul>
    <li id="test-subject-1" onclick="navigateToPage('home.html');">Home</li>
    <li id="test-subject-2" onclick="navigateToPage('about.html');">About</li>
    <li id="test-subject-3" onclick="navigateToPage('contact.html');">Contact</li>
  </ul>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-failure-failure-10"
          data-atomic-source="navigation-item-link/role-nav-role-list-items"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation">
  <ul>
    <div id="test-subject-1" role="listitem" onclick="navigateToPage('home.html');">Home</div>
    <div id="test-subject-2" role="listitem" onclick="navigateToPage('about.html');">About</div>
    <div id="test-subject-3" role="listitem" onclick="navigateToPage('contact.html');">Contact</div>
  </ul>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MissingnavitemsFailure;
