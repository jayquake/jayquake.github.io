/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): region-footer
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Context: Footer Landmark - Failure";

const FooterLandmarkFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="context-footer-landmark-failure-failure-1"
          data-atomic-source="region-footer/no-content-info"
          dangerouslySetInnerHTML={{
            __html: `<div aria-label="footer">
  <p>&copy; 2024 My Website. All rights reserved.</p>
  <nav aria-label="Footer navigation">
    <ul>
      <li><a href="/about">About Us</a></li>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </nav>
  <p>Contact us: <a href="mailto:info@mywebsite.com">info@mywebsite.com</a></p>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FooterLandmarkFailures;
