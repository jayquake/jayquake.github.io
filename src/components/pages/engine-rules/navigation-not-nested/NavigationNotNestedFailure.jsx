import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const NavigationNotNestedFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Navigation Not Nested"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "nav nested nav multi", content: `<nav id="not-nested-nav">
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
</nav>` },
  { filename: "nav nested nav role", content: `<nav id="not-nested-nav">
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
</nav>` },
  { filename: "nav nested nav", content: `<nav id="not-nested-nav">
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
</nav>` },
  { filename: "nav role nested nav role", content: `<div role="navigation" id="not-nested-nav">
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
</div>` },
  { filename: "nav role nested nav", content: `<div role="navigation" id="not-nested-nav">
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
</div>` }
      ]}
    />
  );
};

export default NavigationNotNestedFailure;
