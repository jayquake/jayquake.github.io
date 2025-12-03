import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const MenuItemAvoidFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Menu Item Avoid"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "multiple navs containing menu items", content: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-1" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-2" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>` },
  { filename: "multiple role navigations containing menu items", content: `<div role="navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-1" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>
<div role="navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-2" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>` },
  { filename: "nav and role navigation containing menu items", content: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-1" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>
<div role="navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-2" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>` },
  { filename: "nav containing multiple menu items", content: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-1" role="menuitem" href="#">About</a></li>
    <li><a id="test-subject-2" role="menuitem" href="#">Contact</a></li>
  </ul>
</nav>` },
  { filename: "nav containing single menu item", content: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>` },
  { filename: "role navigation containing multiple menu items", content: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject-1" role="menuitem" href="#">About</a></li>
    <li><a id="test-subject-2" role="menuitem" href="#">Contact</a></li>
  </ul>
</nav>` },
  { filename: "role navigation containing single menu item", content: `<div role="navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a id="test-subject" role="menuitem" href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>` }
      ]}
    />
  );
};

export default MenuItemAvoidFailure;
