/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): menu-item-avoid
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Navigation: Broken Nav Items - Success";

const BrokennavitemsSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-broken-nav-items-success-success-1"
          data-atomic-source="menu-item-avoid/div-with-role-navigation-containing-ul-and-li-without-roles"
          dangerouslySetInnerHTML={{
            __html: `<div role="navigation">
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
    <li><a href="#">Contact</a></li>
  </ul>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-items-success-success-2"
          data-atomic-source="menu-item-avoid/nav-containing-ul-and-li-without-roles"
          dangerouslySetInnerHTML={{
            __html: `<nav>
  <ul>
    <li><a href="#">Home</a></li>
    <li><a href="#">About</a></li>
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

export default BrokennavitemsSuccess;
