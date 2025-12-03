import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const NavigationItemLinkFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Navigation Item Link"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
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
    <li>Services
      <ul>
        <li><a href="/services/web-design">Web Design</a></li>
        <li id="test-subject">SEO</li>
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
      ]}
    />
  );
};

export default NavigationItemLinkFailure;
