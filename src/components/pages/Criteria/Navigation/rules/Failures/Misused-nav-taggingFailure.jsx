/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): navigation-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation: Misused Nav Tagging - Failure";

const MisusednavtaggingFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-misused-nav-tagging-failure-failure-1"
          data-atomic-source="navigation-misuse/nav-element-is-container-of-nav-container"
          dangerouslySetInnerHTML={{
            __html: `<div>
  <nav>
    <div>
      <ul>
        <li>
          <a href="#main-content">Skip to main content</a>
        </li>
        <li>
          <a href="#footer">Skip to footer</a>
        </li>
      </ul>
    </div>
    <p>some text in here</p>
  </nav>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-misused-nav-tagging-failure-failure-2"
          data-atomic-source="navigation-misuse/nav-is-used-as-container-of-no-list-menus"
          dangerouslySetInnerHTML={{
            __html: `<div>
  <nav>
    <h1>Page header</h1>
    <div>
      <article>
        <h2>Article header</h2>
        <p>Article content</p>
      </article>
    </div>
  </nav>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default MisusednavtaggingFailure;
