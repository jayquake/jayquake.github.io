import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const MenuTriggerClickableFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Menu Trigger Clickable"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "li as menu trigger", content: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <ul>
        <li id="test-subject" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">
          <button>Services</button>
        </li>
        <ul id="submenu" aria-hidden="true">
          <li><a href="#">Graphic Design</a></li>
          <li><a href="#">SEO</a></li>
        </ul>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>` },
  { filename: "span as menu trigger", content: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <span id="test-subject" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Services</span>
    </li>
    <li>
      <ul id="submenu" aria-hidden="true">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>` }
      ]}
    />
  );
};

export default MenuTriggerClickableFailure;
