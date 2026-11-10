/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): region-footer
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Context: Footer Landmark - Success";

const FooterLandmarkSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="context-footer-landmark-success-success-1"
          data-atomic-source="region-footer/content-info-and-label"
          dangerouslySetInnerHTML={{
            __html: `<div role="contentinfo" aria-label="footer">
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
        <div
          className="list-item"
          id="context-footer-landmark-success-success-2"
          data-atomic-source="region-footer/footer-tag"
          dangerouslySetInnerHTML={{
            __html: `<footer>
  <div>
    <h3>About Us</h3>
    <p>Learn more about our mission and values.</p>
  </div>
  <div>
    <h3>Contact</h3>
    <p>Email: <a href="mailto:support@mywebsite.com">support@mywebsite.com</a></p>
    <p>Phone: (555) 123-4567</p>
  </div>
  <div>
    <h3>Quick Links</h3>
    <ul>
      <li><a href="/faq">FAQ</a></li>
      <li><a href="/support">Support</a></li>
    </ul>
  </div>
</footer>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FooterLandmarkSuccess;
