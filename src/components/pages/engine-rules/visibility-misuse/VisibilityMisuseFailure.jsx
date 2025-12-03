import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const VisibilityMisuseFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Visibility Misuse"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "div height 0 overflow hidden", content: `<div style="height: 0; overflow: hidden">Hidden content</div>` },
  { filename: "div opacity 0", content: `<div style="opacity: 0">This is visually hidden</div>` },
  { filename: "div text indent negative 9999px", content: `<div style="text-indent: -9999px">Hidden text</div>` },
  { filename: "div width 0 height 0 overflow hidden", content: `<div style="width: 0; height: 0; overflow: hidden">Hidden visually</div>` },
  { filename: "nested invisible elements", content: `<!-- This test is skipped because the span is perceivable visible (even though it shouldn't be) -->

<div style="height: 0.5px; width: 0.5px; overflow: hidden">
    <div id="test-subject">
        This text is still visible to
        <span class="should not appear in the failed nodes array as it's a child of a failed node">screen reader</span>
    </div>
</div>` },
  { filename: "zero opacity element", content: `<div style="opacity: 0">This text is still visible to screen reader</div>` }
      ]}
    />
  );
};

export default VisibilityMisuseFailure;
