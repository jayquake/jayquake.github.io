import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LinkNavigationAmbiguousSuccess = () => {
  const ruleId = "link-navigation-ambiguous";
  const title = `Link context should be exposed to assistive technology`;
  const description = `Screen reader users may find it difficult to distinguish between links when the purpose of each link cannot be determined from its text alone or together with its immediate context.`;
  const helpText = `Assign a unique id to an existing element that contains additional context for the link, add aria-describedby to the link and reference the assigned id. Alternatively, nest a visibly hidden element that contains additional context inside of the link.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "ambigious link remediated with appened visible text", content: `<a aria-label="Home | click here" href="/home">click here</a>` },
  { filename: "link anchor", content: `<!-- Anchor link should not be audited at all here -->
<a class="button-solid-reversed" href="#marketoModalForm-demo">Demo</a>
<div class="modal" id="marketoModalForm-demo">
    <h3 class="coralogix-marketo__title">Book a Demo</h3>
</div>` },
  { filename: "link with ambiguous content and good aria label", content: `<a href="/homepage" aria-label="this link leads to the homepage">click here</a>` },
  { filename: "link with image content and good alt", content: `<a href="/homepage"><img alt="image for link that leads to the homepage" /></a>` },
  { filename: "link with no content", content: `<!-- Empty link are inapplicable -->
<a href="/homepage"></a>` },
  { filename: "link with non ambiguous long content", content: `<a href="/homepage">this link leads to the homepage</a>` },
  { filename: "link with non ambiguous short content", content: `<a href="/homepage">go to homepage</a>` },
  { filename: "remediated link  bacekdn string is ambigous already includes visible text", content: `<a href="/discover-more/" aria-label="Discover more - gardyn">Discover more</a>` },
  { filename: "remediated link", content: `<a href="http://localhost/"><span data-acsb-sr-only="true" class="acsb-sr-only" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important;">home </span>Go</a>` },
  { filename: "tel link", content: `<a href="tel:6128721152">612-872-1152</a>` }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default LinkNavigationAmbiguousSuccess;
