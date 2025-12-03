import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const RegionFooterSingleSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Region Footer Single"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "footer presentation and content info", content: `<div role="contentinfo" aria-label="footer">
  <p>&copy; 2024 My Website. All rights reserved.</p>
  <nav aria-label="Footer navigation">
    <ul>
      <li><a href="/about">About Us</a></li>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </nav>
  <p>Contact us: <a href="mailto:info@mywebsite.com">info@mywebsite.com</a></p>
</div>

<footer role="presentation">
  <p>&copy; 2024 My Website. All rights reserved.</p>
  <nav aria-label="Footer navigation">
    <ul>
      <li><a href="/about">About Us</a></li>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </nav>
  <p>Contact us: <a href="mailto:info@mywebsite.com">info@mywebsite.com</a></p>
</footer>` },
  { filename: "single content info", content: `<div role="contentinfo" aria-label="footer">
  <p>&copy; 2024 My Website. All rights reserved.</p>
  <nav aria-label="Footer navigation">
    <ul>
      <li><a href="/about">About Us</a></li>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </nav>
  <p>Contact us: <a href="mailto:info@mywebsite.com">info@mywebsite.com</a></p>
</div>` },
  { filename: "single footer", content: `<footer>
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
</footer>` }
      ]}
    />
  );
};

export default RegionFooterSingleSuccess;
