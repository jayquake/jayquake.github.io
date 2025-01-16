import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription =
  "menu-trigger-correct-state : Menu open/close states should be indicated to assistive technology - Failures";

export default () => (
  <IssueFailure
    itemContent={
      <>
        {/* Failure Example 1: <a> with Conflicting States */}
        <li className="list-item" id="menu-trigger-failure-1">
          <a
            href="#"
            aria-haspopup="true"
            aria-expanded="true"
            aria-controls="submenu1"
          >
            Services
          </a>
          <ul id="submenu1" aria-hidden="true">
            <li><a href="#">Web Design</a></li>
            <li><a href="#">Graphic Design</a></li>
            <li><a href="#">SEO</a></li>
          </ul>
        </li>

        {/* Failure Example 2: <div> as a Menu Trigger */}
        <li className="list-item" id="menu-trigger-failure-2">
          <div aria-haspopup="menu" aria-expanded="true" aria-controls="submenu2">
            Menu
          </div>
          <ul id="submenu2" aria-hidden="true">
            <li><a href="#">Option 1</a></li>
            <li><a href="#">Option 2</a></li>
          </ul>
        </li>

        {/* Failure Example 3: <span> as a Menu Trigger */}
        <li className="list-item" id="menu-trigger-failure-3">
          <span aria-haspopup="menu" aria-expanded="true" aria-controls="submenu3">
            Options
          </span>
          <ul id="submenu3" aria-hidden="false">
            <li><a href="#">Option A</a></li>
            <li><a href="#">Option B</a></li>
          </ul>
        </li>

        {/* Failure Example 4: <button> with Incorrect aria-hidden */}
        <li className="list-item" id="menu-trigger-failure-4">
          <button aria-haspopup="menu" aria-expanded="true" aria-controls="submenu4">
            More
          </button>
          <ul id="submenu4" aria-hidden="true">
            <li><a href="#">Details</a></li>
            <li><a href="#">More Info</a></li>
          </ul>
        </li>

        {/* Failure Example 5: Missing aria-controls on <a> */}
        <li className="list-item" id="menu-trigger-failure-5">
          <a href="#" aria-haspopup="true" aria-expanded="false">
            Products
          </a>
          <ul id="submenu5" hidden>
            <li><a href="#">Item 1</a></li>
            <li><a href="#">Item 2</a></li>
          </ul>
        </li>

        {/* Failure Example 6: Always Visible Menu with Conflicting States */}
        <li className="list-item" id="menu-trigger-failure-6">
          <button aria-haspopup="menu" aria-expanded="false" aria-controls="submenu6">
            Features
          </button>
          <ul id="submenu6" role="menu" aria-hidden="false">
            <li role="menuitem"><a href="#">Feature 1</a></li>
            <li role="menuitem"><a href="#">Feature 2</a></li>
          </ul>
        </li>

        {/* Failure Example 7: <div> as a Menu without ARIA Roles */}
        <li className="list-item" id="menu-trigger-failure-7">
          <div aria-haspopup="menu" aria-expanded="true" aria-controls="submenu7">
            Options
          </div>
          <div id="submenu7">
            <a href="#">Option A</a>
            <a href="#">Option B</a>
          </div>
        </li>

        {/* Failure Example 8: Incorrect Toggle Behavior */}
        <li className="list-item" id="menu-trigger-failure-8">
          <button aria-haspopup="menu" aria-expanded="true" aria-controls="submenu8">
            Settings
          </button>
          <ul id="submenu8" aria-hidden="false" hidden>
            <li><a href="#">Account</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </li>

        {/* Failure Example 9: <button> Without Any ARIA Attributes */}
        <li className="list-item" id="menu-trigger-failure-9">
          <button>
            Categories
          </button>
          <ul id="submenu9">
            <li><a href="#">Category A</a></li>
            <li><a href="#">Category B</a></li>
          </ul>
        </li>
      </>
    }
    itemDescription={itemDescription}
  />
);