import React from "react";
import IssueFailure from "../../../layout/issueFailure";

const AltMisuseFailure = () => {
  const description = "Examples that incorrectly apply the alt attribute to non-image elements, such as div. This misuse can lead to invalid markup and confuse assistive technologies.";

  const helpText = "Only certain replaced elements (e.g., img) support the alt attribute. For non-image elements, use visible text, aria-label, or other semantics as appropriate.";

  const fixSteps = [
    "Remove alt attributes from non-image elements (div, span, etc).",
    "If the element conveys text, put the text content directly inside it.",
    "If you need an accessible name for a non-image control, use aria-label or a proper HTML element.",
    "Use <img alt=\"...\"> for images; use empty alt for decorative images."
  ];

  const content = (
    <div>
      <div className="list-item">
        <pre>
{`<!-- Incorrect: alt on a div -->
<div alt="this div is remarkable, you should know this"></div>`}
        </pre>
      </div>
      <div className="list-item">
        <pre>
{`<!-- Incorrect: alt on a span -->
<span alt="fancy label"></span>`}
        </pre>
      </div>
    </div>
  );

  return (
    <IssueFailure 
      itemContent={content}
      itemDescription={description}
      helpText={helpText}
      fixSteps={fixSteps}
    />
  );
};

export default AltMisuseFailure;


