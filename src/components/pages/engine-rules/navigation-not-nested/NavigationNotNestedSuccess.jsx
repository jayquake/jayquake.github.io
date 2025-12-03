import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const NavigationNotNestedSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Navigation Not Nested"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "nav nested presentation", content: `<nav>
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
</nav>` },
  { filename: "nav no nested multi", content: `<nav>
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
</nav>` },
  { filename: "nav no nested", content: `<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About Us</a></li>
    <li><a href="/services/">Services</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>` },
  { filename: "nav role nested presentation", content: `<div role="navigation">
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
</div>` },
  { filename: "nav role no nested", content: `<div role="navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About Us</a></li>
    <li><a href="/services/">Services</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</div>` }
      ]}
    />
  );
};

export default NavigationNotNestedSuccess;
