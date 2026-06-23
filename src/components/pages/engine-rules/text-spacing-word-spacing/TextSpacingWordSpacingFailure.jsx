import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const TextSpacingWordSpacingFailure = () => {
  const ruleId = "text-spacing-word-spacing";
  const title = `Word spacing should scale to at least 0.16 times the font size without loss of content or functionality`;
  const description = `When word spacing is increased to 0.16 times the font size, text may be clipped, overlap, or overflow its container if styles like fixed heights, fixed widths, hidden overflow, forced no-wrap, or absolute positioning prevent proper reflow.`;
  const helpText = `Use flexible heights and widths, position elements in ways that allow text reflow, enable text wrapping, and avoid hidden overflow to ensure content remains readable when word spacing is scaled to 0.16 times the font size.`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "font size to word spacing ratio of 0.1 nested element", content: `<div style="font-size:10px;" ><span style="word-spacing: 1px;">Some content</span></div>` },
  { filename: "font size to word spacing ratio of 0.1", content: `<div style="font-size:10px;word-spacing: 1px;" > Some content</div>` }
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

export default TextSpacingWordSpacingFailure;
