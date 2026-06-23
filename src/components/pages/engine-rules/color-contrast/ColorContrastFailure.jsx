import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const ColorContrastFailure = () => {
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
  { filename: "div with background black and color black", content: `<div style="background-color: black; color: black">Content</div>` },
  { filename: "div with background transparent and color white and parent transparent", content: `<div style="background-color: transparent">
  <div id="test-subject" style="background-color: transparent; color: white">Content</div>
</div>` },
  { filename: "div with background transparent and color white", content: `<div style="background-color: transparent; color: white">Content</div>` },
  { filename: "div with background white and color white", content: `<div style="background-color: white; color: white">Content</div>` },
  { filename: "div with font size 16px with ratio 3.5", content: `<div style="font-size: 16px; color: #000000; background-color: #C80909;">Text Contrast Ratio 3.49:1</div>` },
  { filename: "lab color background contrast too dark", content: `<style>
    :root {
        --color-wicked-black: lab(14.9042% -15.339 28.5532);
        --color-noir-black: lab(0% 0 0);
    }

    .bg-wicked-black {
        background-color: var(--color-wicked-black);
    }

    .text-noir-black {
        color: var(--color-noir-black);
    }
</style>

<div class="bg-wicked-black text-noir-black">
  “Dressing in one color—head-to-toe—is less complicated... it is just bold and fierce, for lack of a better word.”
</div>` }
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

export default ColorContrastFailure;
