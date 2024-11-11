import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Context: Footer Landmark - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="footer-landmark-failure-1">
          <div>
            <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
        <div className="list-item" id="footer-landmark-failure-2">
          <footer role="banner">
            <a href="/about">About Us</a> | <a href="/contact">Contact</a> | <a href="/terms">Terms of Service</a>
          </footer>
        </div>
        <div className="list-item" id="footer-landmark-failure-3">
          <div role="contentinfo">
            <a href="/about">About</a> | <a href="/support">Support</a> | <a href="/feedback">Feedback</a>
          </div>
        </div>
        <div className="list-item" id="footer-landmark-failure-4">
          <div role="main" aria-label="footer">
            <a href="/company">Company</a> | <a href="/careers">Careers</a> | <a href="/legal">Legal</a>
          </div>
        </div>
        <div className="list-item" id="footer-landmark-failure-5">
          <section role="contentinfo" aria-label="footer section">
            <a href="/help">Help</a> | <a href="/accessibility">Accessibility</a> | <a href="/security">Security</a>
          </section>
        </div>
        <div className="list-item" id="footer-landmark-failure-6">
          <footer aria-hidden="true">
            <a href="/faq">FAQ</a> | <a href="/terms">Terms of Use</a> | <a href="/sitemap">Sitemap</a>
          </footer>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);
