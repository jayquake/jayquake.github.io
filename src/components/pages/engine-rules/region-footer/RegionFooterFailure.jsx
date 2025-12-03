import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const RegionFooterFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Region Footer"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "no content info", content: `<div aria-label="footer">
  <p>&copy; 2024 My Website. All rights reserved.</p>
  <nav aria-label="Footer navigation">
    <ul>
      <li><a href="/about">About Us</a></li>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </nav>
  <p>Contact us: <a href="mailto:info@mywebsite.com">info@mywebsite.com</a></p>
</div>` }
      ]}
    />
  );
};

export default RegionFooterFailure;
