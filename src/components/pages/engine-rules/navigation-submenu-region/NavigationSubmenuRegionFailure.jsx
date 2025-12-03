import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const NavigationSubmenuRegionFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Navigation Submenu Region"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "navigation nested submenu no role", content: `<style>
    button {
        display: none;
    }
</style>


<nav>
  <ul>
    <li>
      <a href="#">About</a>
      <ul id="sub-menu" role="region">
        <li><a href="#">Home</a></li>
        <li>
          <a href="#">About</a>
          <ul id="nested-sub-menu">
            <li><a href="#">Contact</a></li>
            <li><a href="#">Location</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li>
      <a href="#">Contact</a>
    </li>
  </ul>
</nav>` },
  { filename: "navigation submenu no role", content: `<nav>
  <ul>
    <li>
      <button id="sub-menu-button" aria-expanded="false">About</button>
      <ul id="sub-menu">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </li>
    <li>
      <a href="#">Contact</a>
    </li>
  </ul>
</nav>` }
      ]}
    />
  );
};

export default NavigationSubmenuRegionFailure;
