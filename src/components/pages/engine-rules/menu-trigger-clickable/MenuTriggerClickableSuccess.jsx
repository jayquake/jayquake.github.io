import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const MenuTriggerClickableSuccess = () => {
  const ruleId = "menu-trigger-clickable";
  const title = `ARIA relationship and state attributes should only be applied to elements with appropriate roles`;
  const description = `Interactive elements that trigger additional content should only have relationship and state ARIA attributes, such as aria-expanded and aria-controls, if they have interactive roles, such as button, tab, combobox and in rarer cases, link.`;
  const helpText = `Make sure relationship and state ARIA attributes are only applied to elements with interactive roles, such as button, tab, and combobox. In rare cases, aria-expanded can be applied to link elements or elements with role='link', however this should only be done when the link both navigates and expands content.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "anchor as menu trigger", content: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <a id="test-subject" href="#" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Services</a>
      <ul id="submenu" aria-hidden="true">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>` },
  { filename: "button role as menu trigger", content: `<style>
  #submenu {
    display: block;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <span role="button" id="test-subject" href="#" aria-haspopup="true" aria-expanded="true" aria-controls="submenu">Services</span>
      <ul id="submenu" aria-hidden="false">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>` },
  { filename: "button tag as menu trigger", content: `<style>
  #submenu {
    display: block;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <button id="test-subject" href="#" aria-haspopup="true" aria-expanded="true" aria-controls="submenu">Services</button>
      <ul id="submenu" aria-hidden="false">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>` },
  { filename: "link role as menu trigger", content: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <span role="link" id="test-subject" href="#" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Services</span>
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

export default MenuTriggerClickableSuccess;
