/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): navigation-item-link
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Navigation: Missing Nav Items - Success";

const MissingnavitemsSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-missing-nav-items-success-success-1"
          data-atomic-source="navigation-item-link/breadcrumb-current-page-text"
          dangerouslySetInnerHTML={{
            __html: `<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li id="test-subject" aria-current="page">Shoes</li>
  </ol>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-success-success-2"
          data-atomic-source="navigation-item-link/icon-only-control"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #language-select {
    cursor: pointer;
    display: inline-block;
    width: 24px;
    height: 24px;
  }
</style>
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
    <li id="test-subject">
      <div id="language-select" tabindex="0" onclick="toggleLanguages();">
        <span id="language-icon">
          <span class="juniper-icon icon-globe-2"></span>
          <span class="juniper-icon icon-close"></span>
          <span class="arrow-wrap">
            <svg id="language-select-arrow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path>
            </svg>
          </span>
        </span>
      </div>
    </li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-success-success-3"
          data-atomic-source="navigation-item-link/li-onclick-with-anchor"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li id="test-subject-1" onclick="navigateToPage('home.html');"><a href="home.html">Home</a></li>
    <li id="test-subject-2" onclick="navigateToPage('about.html');"><a href="about.html">About</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-success-success-4"
          data-atomic-source="navigation-item-link/mixed-links-and-buttons"
          dangerouslySetInnerHTML={{
            __html: `<nav aria-label="Main navigation">
  <ul>
    <li id="home"><a href="/home">Home</a></li>
    <li id="products"><button type="button">Products</button></li>
    <li id="services" onclick="toggleMenu()"><button type="button">Services</button></li>
    <li id="more"><span role="button" onclick="toggleMenu()">More</span></li>
    <li id="contact"><span role="link" onclick="navigate()">Contact</span></li>
    <li id="input-button" onclick="toggleMenu()">Account <input type="button" value="Open account menu"></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-success-success-5"
          data-atomic-source="navigation-item-link/nav-anchor-list"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li id="test-subject-1"><a href="#">Home</a></li>
    <li id="test-subject-2"><a href="#">About</a></li>
    <li id="test-subject-3"><a href="#">Services</a></li>
    <li id="test-subject-4"><a href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-success-success-6"
          data-atomic-source="navigation-item-link/nav-anchor-role-list"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <div role="list">
    <div id="test-subject-1" role="listitem"><a href="#">Home</a></div>
    <div id="test-subject-2" role="listitem"><a href="#">About</a></div>
    <div id="test-subject-3" role="listitem"><a href="#">Services</a></div>
    <div id="test-subject-4" role="listitem"><a href="#">Contact</a></div>
  </div>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-success-success-7"
          data-atomic-source="navigation-item-link/nav-group-label-text"
          dangerouslySetInnerHTML={{
            __html: `<nav aria-label="Footer">
  <ul>
    <li id="test-subject">Company</li>
    <li><a href="/about">About</a></li>
    <li><a href="/careers">Careers</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-success-success-8"
          data-atomic-source="navigation-item-link/nav-role-list-role-list-items"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li id="test-subject-1"><div role="link" onclick="navigateToPage('home.html');">Home</div></li>
    <li id="test-subject-2"><div role="link" onclick="navigateToPage('about.html');">About</div></li>
    <li id="test-subject-3"><div role="link" onclick="navigateToPage('contact.html');">Contact</div></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-success-success-9"
          data-atomic-source="navigation-item-link/nav-sublist"
          dangerouslySetInnerHTML={{
            __html: `<nav aria-label="Main Navigation">
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About Us</a></li>
    <li id="target">Services
      <ul>
        <li><a href="/services/web-design">Web Design</a></li>
        <li><a href="/services/seo">SEO</a></li>
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
          id="navigation-missing-nav-items-success-success-10"
          data-atomic-source="navigation-item-link/role-anchor-list"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation">
    <ul>
        <li id="test-subject-1"><a href="#">Home</a></li>
        <li id="test-subject-2"><a href="#">About</a></li>
        <li id="test-subject-3"><a href="#">Services</a></li>
        <li id="test-subject-4"><a href="#">Contact</a></li>
    </ul>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-success-success-11"
          data-atomic-source="navigation-item-link/role-nav-list-items"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation">
  <ul>
    <li id="test-subject-1"><div role="link" onclick="navigateToPage('home.html');">Home</div></li>
    <li id="test-subject-2"><div role="link" onclick="navigateToPage('about.html');">About</div></li>
    <li id="test-subject-3"><div role="link" onclick="navigateToPage('contact.html');">Contact</div></li>
  </ul>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-missing-nav-items-success-success-12"
          data-atomic-source="navigation-item-link/role-nav-role-list-role-list-items"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation">
  <div role="list">
    <div id="test-subject-1" role="listitem"><a href="#">Home</a></div>
    <div id="test-subject-2" role="listitem"><a href="#">About</a></div>
    <div id="test-subject-3" role="listitem"><a href="#">Services</a></div>
    <div id="test-subject-4" role="listitem"><a href="#">Contact</a></div>
  </div>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MissingnavitemsSuccess;
