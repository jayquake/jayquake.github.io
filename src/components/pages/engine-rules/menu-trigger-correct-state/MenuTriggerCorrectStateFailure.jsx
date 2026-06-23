import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const MenuTriggerCorrectStateFailure = () => {
  const ruleId = "menu-trigger-correct-state";
  const title = `Triggers that expand additional content should expose their state to assistive technology`;
  const description = `When components such as accordions or navigation menus do not expose their state, screen reader users may not realize that additional content can be revealed or know whether it is currently visible.`;
  const helpText = `Assign aria-expanded to common triggers, such as <button> or custom select elements to indicate whether their associated content is collapsed (false) or expanded (true). Ensure the value is updated as the state changes.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "wrong aria expanded 2 submenu controller", content: `<style>
  #submenu {
    display: block;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <a href="#" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Services</a>
      <ul id="submenu" aria-hidden="false">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>` },
  { filename: "wrong aria expanded submenu controller", content: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <a href="#" aria-haspopup="true" aria-expanded="true" aria-controls="submenu">Services</a>
      <ul id="submenu" aria-hidden="true">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>` }
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

export default MenuTriggerCorrectStateFailure;
