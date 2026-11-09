import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const NavigationItemLinkSuccess = () => {
  const ruleId = "navigation-item-link";
  const title = `List items in a navigation region should not be interactive`;
  const description = `Adding interactive behavior to <li> elements within a navigation list may prevent screen reader users from identifying the element as actionable, since <li> elements are announced as list items and expected to be static.`;
  const helpText = `In order to maintain the semantic structure of the list, a properly formed <a> element should be nested inside the <li>.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "breadcrumb current page text", content: `<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li id="test-subject" aria-current="page">Shoes</li>
  </ol>
</nav>` },
  { filename: "icon only control", content: `<style>
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
</nav>` },
  { filename: "li onclick with anchor", content: `<nav>
  <ul>
    <li id="test-subject-1" onclick="navigateToPage('home.html');"><a href="home.html">Home</a></li>
    <li id="test-subject-2" onclick="navigateToPage('about.html');"><a href="about.html">About</a></li>
  </ul>
</nav>` },
  { filename: "mixed links and buttons", content: `<nav aria-label="Main navigation">
  <ul>
    <li id="home"><a href="/home">Home</a></li>
    <li id="products"><button type="button">Products</button></li>
    <li id="services" onclick="toggleMenu()"><button type="button">Services</button></li>
    <li id="more"><span role="button" onclick="toggleMenu()">More</span></li>
    <li id="contact"><span role="link" onclick="navigate()">Contact</span></li>
    <li id="input-button" onclick="toggleMenu()">Account <input type="button" value="Open account menu"></li>
  </ul>
</nav>` },
  { filename: "nav anchor list", content: `<nav>
  <ul>
    <li id="test-subject-1"><a href="#">Home</a></li>
    <li id="test-subject-2"><a href="#">About</a></li>
    <li id="test-subject-3"><a href="#">Services</a></li>
    <li id="test-subject-4"><a href="#">Contact</a></li>
  </ul>
</nav>` },
  { filename: "nav anchor role list", content: `<nav>
  <div role="list">
    <div id="test-subject-1" role="listitem"><a href="#">Home</a></div>
    <div id="test-subject-2" role="listitem"><a href="#">About</a></div>
    <div id="test-subject-3" role="listitem"><a href="#">Services</a></div>
    <div id="test-subject-4" role="listitem"><a href="#">Contact</a></div>
  </div>
</nav>` },
  { filename: "nav group label text", content: `<nav aria-label="Footer">
  <ul>
    <li id="test-subject">Company</li>
    <li><a href="/about">About</a></li>
    <li><a href="/careers">Careers</a></li>
  </ul>
</nav>` },
  { filename: "nav role list role list items", content: `<nav>
  <ul>
    <li id="test-subject-1"><div role="link" onclick="navigateToPage('home.html');">Home</div></li>
    <li id="test-subject-2"><div role="link" onclick="navigateToPage('about.html');">About</div></li>
    <li id="test-subject-3"><div role="link" onclick="navigateToPage('contact.html');">Contact</div></li>
  </ul>
</nav>` },
  { filename: "nav sublist", content: `<nav aria-label="Main Navigation">
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
</nav>` },
  { filename: "role anchor list", content: `<div role="navigation">
    <ul>
        <li id="test-subject-1"><a href="#">Home</a></li>
        <li id="test-subject-2"><a href="#">About</a></li>
        <li id="test-subject-3"><a href="#">Services</a></li>
        <li id="test-subject-4"><a href="#">Contact</a></li>
    </ul>
</div>` },
  { filename: "role nav list items", content: `<div role="navigation">
  <ul>
    <li id="test-subject-1"><div role="link" onclick="navigateToPage('home.html');">Home</div></li>
    <li id="test-subject-2"><div role="link" onclick="navigateToPage('about.html');">About</div></li>
    <li id="test-subject-3"><div role="link" onclick="navigateToPage('contact.html');">Contact</div></li>
  </ul>
</div>` },
  { filename: "role nav role list role list items", content: `<div role="navigation">
  <div role="list">
    <div id="test-subject-1" role="listitem"><a href="#">Home</a></div>
    <div id="test-subject-2" role="listitem"><a href="#">About</a></div>
    <div id="test-subject-3" role="listitem"><a href="#">Services</a></div>
    <div id="test-subject-4" role="listitem"><a href="#">Contact</a></div>
  </div>
</div>` }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default NavigationItemLinkSuccess;
