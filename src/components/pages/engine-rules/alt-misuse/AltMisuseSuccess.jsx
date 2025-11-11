import React from "react";
import IssueSuccess from "../../../layout/issueSuccess";

const AltMisuseSuccess = () => {
  const description = "Examples that properly avoid misusing the alt attribute. Use alt only on relevant elements like img; non-replaced elements such as div must not have an alt attribute.";

  const helpText = "The alt attribute provides alternative text for images. Applying it to non-image elements (e.g., div, span) is invalid HTML and can confuse assistive technologies.";

  const bestPractices = [
    "Only use alt on replaced elements that support it (e.g., img, area, input type=image).",
    "Never add alt to semantic containers like div or span.",
    "For decorative images, use empty alt (alt=\"\").",
    "Ensure meaningful images have concise, descriptive alt text."
  ];

  const content = (
    <div>
      <div className="list-item">
        <pre>
{`<!-- Correct: alt on img -->
<img src="/path/to/logo.png" alt="Company logo" />`}
        </pre>
      </div>
      <div className="list-item">
        <pre>
{`<!-- Correct: no alt on div; use text content or aria-label if needed -->
<div class="promo" aria-label="Promotional banner">Summer Sale</div>`}
        </pre>
      </div>
    </div>
  );

  return (
    <IssueSuccess 
      itemContent={content}
      itemDescription={description}
      helpText={helpText}
      bestPractices={bestPractices}
    />
  );
};

export default AltMisuseSuccess;


