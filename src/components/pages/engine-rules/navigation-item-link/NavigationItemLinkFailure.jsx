import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const NavigationItemLinkFailure = () => {
  const ruleId = "navigation-item-link";
  const title = `List items in a navigation region should not be interactive`;
  const description = `Adding interactive behavior to <li> elements within a navigation list may prevent screen reader users from identifying the element as actionable, since <li> elements are announced as list items and expected to be static.`;
  const helpText = `In order to maintain the semantic structure of the list, a properly formed <a> element should be nested inside the <li>.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "broad interactables", content: `<nav aria-label="Main navigation">
  <ul>
    <li id="input" onclick="navigate()">Search <input type="text" aria-label="Search"></li>
    <li id="editable"><span contenteditable="true" onclick="navigate()">Edit</span></li>
    <li id="select" onclick="navigate()">Options <select aria-label="Options"><option>One</option></select></li>
  </ul>
</nav>` },
  { filename: "cursor pointer span", content: `<style>
  .fake-link {
    cursor: pointer;
  }
</style>
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
    <li id="test-subject"><span class="fake-link">About</span></li>
  </ul>
</nav>` },
  { filename: "nav div items", content: `<nav>
  <ul>
    <li id="test-subject-1"><div id="test-subject1" onclick="navigateToPage('home.html');">Home</div></li>
    <li id="test-subject-2"><div id="test-subject2" onclick="navigateToPage('about.html');">About</div></li>
    <li id="test-subject-3"><div id="test-subject3" onclick="navigateToPage('contact.html');">Contact</div></li>
  </ul>
</nav>` },
  { filename: "nav list items", content: `<nav>
  <ul>
    <li id="test-subject-1" onclick="navigateToPage('home.html');">Home</li>
    <li id="test-subject-2" onclick="navigateToPage('about.html');">About</li>
    <li id="test-subject-3" onclick="navigateToPage('contact.html');">Contact</li>
  </ul>
</nav>` },
  { filename: "nav role list items", content: `<nav>
  <ul>
    <div id="test-subject-1" role="listitem" onclick="navigateToPage('home.html');">Home</div>
    <div id="test-subject-2" role="listitem" onclick="navigateToPage('about.html');">About</div>
    <div id="test-subject-3" role="listitem" onclick="navigateToPage('contact.html');">Contact</div>
  </ul>
</nav>` },
  { filename: "nested button does not satisfy parent", content: `<nav aria-label="Main navigation">
  <ul>
    <li id="parent" onclick="toggleMenu()">Services
      <ul><li id="child"><button type="button">Web design</button></li></ul>
    </li>
  </ul>
</nav>` },
  { filename: "partial nav list items", content: `<nav>
  <ul>
    <li id="test-subject-1"><a href="#">Home</a></li>
    <li id="test-subject-2"><a href="#">About</a></li>
    <li id="test-subject-3" onclick="navigateToPage('contact.html');">Contact</li>
  </ul>
</nav>` },
  { filename: "partial nav sub list items", content: `<nav aria-label="Main Navigation">
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
</nav>` },
  { filename: "role list items", content: `<div role="navigation">
  <ul>
    <li id="test-subject-1" onclick="navigateToPage('home.html');">Home</li>
    <li id="test-subject-2" onclick="navigateToPage('about.html');">About</li>
    <li id="test-subject-3" onclick="navigateToPage('contact.html');">Contact</li>
  </ul>
</div>` },
  { filename: "role nav role list items", content: `<div role="navigation">
  <ul>
    <div id="test-subject-1" role="listitem" onclick="navigateToPage('home.html');">Home</div>
    <div id="test-subject-2" role="listitem" onclick="navigateToPage('about.html');">About</div>
    <div id="test-subject-3" role="listitem" onclick="navigateToPage('contact.html');">Contact</div>
  </ul>
</div>` }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default NavigationItemLinkFailure;
