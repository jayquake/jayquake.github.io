/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): menu-trigger-correct-state
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Navigation: Submenu State - Success";

const SubmenustateSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-submenu-state-success-success-1"
          data-atomic-source="menu-trigger-correct-state/aria-expanded-false-submenu-controller"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <a href="#" aria-haspopup="true" aria-expanded="false" aria-controls="submenu">Services</a>
      <ul id="submenu" aria-hidden="true">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-state-success-success-2"
          data-atomic-source="menu-trigger-correct-state/aria-expanded-true-submenu-controller"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #submenu {
    display: block;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <a href="#" aria-haspopup="true" aria-expanded="true" aria-controls="submenu">Services</a>
      <ul id="submenu" aria-hidden="false">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-state-success-success-3"
          data-atomic-source="menu-trigger-correct-state/no-aria-controls-submenu-controller"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <a href="#" aria-haspopup="true" aria-expanded="false">Services</a>
      <ul id="submenu" aria-hidden="true">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-state-success-success-4"
          data-atomic-source="menu-trigger-correct-state/no-aria-expanded-submenu-controller"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <a href="#" aria-haspopup="true" aria-controls="submenu">Services</a>
      <ul id="submenu" aria-hidden="true">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-state-success-success-5"
          data-atomic-source="menu-trigger-correct-state/no-aria-haspopup-submenu-controller"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <a href="#" aria-expanded="false" aria-controls="submenu">Services</a>
      <ul id="submenu" aria-hidden="true">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-submenu-state-success-success-6"
          data-atomic-source="menu-trigger-correct-state/wrong-aria-haspopup-submenu-controller"
          dangerouslySetInnerHTML={{
            __html: `<style>
  #submenu {
    display: none;
  }
</style>
<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li>
      <a href="#" aria-haspopup="false" aria-expanded="false" aria-controls="submenu">Services</a>
      <ul id="submenu" aria-hidden="true">
        <li><a href="#">Web Design</a></li>
        <li><a href="#">Graphic Design</a></li>
        <li><a href="#">SEO</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>
</nav>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SubmenustateSuccess;
