import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const NavigationMismatchSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Navigation Mismatch"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "nav role is container of multiple list menus nav links", content: `<div>
  <div role="navigation">
    <ul>
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
    </ul>
    <div>
      <h4>Contact us</h4>
      <ul>
        <li>
          <a href="/contact/info">Get info</a>
        </li>
        <li>
          <a href="/contact/ticket">Submit a ticket</a>
        </li>
      </ul>
    </div>
  </div>
</div>` },
  { filename: "nav role is container of multiple list menus", content: `<div>
  <div role="navigation">
    <ul>
      <li>
        <a href="#main-content">Skip to main content</a>
      </li>
      <li>
        <a href="#footer">Skip to footer</a>
      </li>
    </ul>
    <ul>
      <li>
        <a href="#main-content">Skip to main content</a>
      </li>
      <li>
        <a href="#footer">Skip to footer</a>
      </li>
    </ul>
  </div>
</div>` },
  { filename: "nav role is container of single list menu", content: `<div>
  <div role="navigation">
    <ul>
      <li>
        <a href="#main-content">Skip to main content</a>
      </li>
      <li>
        <a href="#footer">Skip to footer</a>
      </li>
    </ul>
  </div>
</div>` }
      ]}
    />
  );
};

export default NavigationMismatchSuccess;
