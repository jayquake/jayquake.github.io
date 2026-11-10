import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const DialogModalMisuseFailure = () => {
  const ruleId = "N/A";
  const title = `N/A`;
  const description = `N/A`;
  const helpText = `N/A`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "backdrop role dialog without panel", content: `<!-- role="dialog" on a backdrop that does not own any perceived dialog -->
<style>
  body { margin: 0; }
  #overlay { position: fixed; inset: 0; z-index: 10; background: rgba(0, 0, 0, 0.5); }
</style>
<div id="overlay" role="dialog" aria-modal="true"></div>` },
  { filename: "simple div role dialog modal", content: `<div role="dialog" aria-modal="true">Dialog</div>` }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default DialogModalMisuseFailure;
