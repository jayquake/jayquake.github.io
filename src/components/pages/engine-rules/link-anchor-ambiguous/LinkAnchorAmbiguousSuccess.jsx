import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LinkAnchorAmbiguousSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Link Anchor Ambiguous"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "link navigation", content: `<!-- Navigation links should not be audited at all here -->
<a href="/homepage" aria-label="this link leads to the homepage">click here</a>` },
  { filename: "link with ambiguous content and good aria label", content: `<a href="#faq" aria-label="this link leads to the FAQ section">click here</a>

<section id="faq"></section>` },
  { filename: "link with image content and good alt", content: `<a href="#faq"><img alt="image for link that leads to the FAQ section" /></a>

<section id="faq"></section>` },
  { filename: "link with no content", content: `<!-- Empty link are inapplicable -->
<a href="#plans"></a>

<section id="plans"></section>` },
  { filename: "link with non ambiguous long content", content: `<a href="#faq">jump tp frequently asked question</a>

<section id="faq"></section>` },
  { filename: "link with non ambiguous short content", content: `<a href="#plans">go to see plans</a>

<section id="plans"></section>` }
      ]}
    />
  );
};

export default LinkAnchorAmbiguousSuccess;
