import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const MenuBarAvoidSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Menu Bar Avoid"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "nav containing no menu bars", content: `<nav>
    <ul>
      <li><a href="/">Home</a></li>
      <li>
        <a href="/about/" aria-haspopup="true" aria-expanded="false">About Us</a>
        <!-- Submenu for "About Us" -->
        <ul aria-label="About Us">
          <li><a href="/about/history">Our History</a></li>
          <li><a href="/about/team">Our Team</a></li>
          <li><a href="/about/mission">Our Mission</a></li>
        </ul>
      </li>
      <li><a href="/services/">Services</a></li>
      <li><a href="/contact/">Contact</a></li>
    </ul>
</nav>` }
      ]}
    />
  );
};

export default MenuBarAvoidSuccess;
