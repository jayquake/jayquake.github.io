import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const SvgDiscernibleSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Svg Discernible"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "svg display none", content: `<!-- issue with @acsbe/core-engine-classifier -->
<svg alt="Image description" style="width:100px;height:100px;display: none;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>` },
  { filename: "svg in button", content: `<button>
    <svg style="width:100px;height:100px;" >
        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
</button>` },
  { filename: "svg in link", content: `<a href="/search">
    <svg style="width:100px;height:100px;" >
        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
</a>` },
  { filename: "svg visibility hidden", content: `<!-- issue with @acsbe/core-engine-classifier -->
<svg alt="Image description" style="width:100px;height:100px;visibility: hidden;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>` },
  { filename: "svg with aria label aria hidden", content: `<svg aria-label="Image description" aria-hidden="true" style="width:100px;height:100px;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>` },
  { filename: "svg with aria label role presentation", content: `<!-- This test is skipped because PerceivableTraitDiscernibleText uses srVisibleText which uses isExplicitlyHiddenFromScreenReader which must be adjusted with isAffectedByRolePresentation -->
<svg aria-label="Image description" role="presentation" style="width:100px;height:100px;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>` },
  { filename: "svg with aria label", content: `<svg aria-label="Image description" style="width:100px;height:100px;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>` },
  { filename: "svg with nested forigin object figure caption", content: `<!-- issue with @acsbe/core-engine-classifier -->
<svg style="width:100px;height:100px;" >
    <foreignObject>
        <figure>
            <img src="image.png" />
            <figcaption>Image description</figcaption>
        </figure>
    </foreignObject>
</svg>` },
  { filename: "svg with nested forigin object img alt", content: `<!-- issue with @acsbe/core-engine-classifier -->
<svg style="width:100px;height:100px;" >
    <foreignObject>
        <img src="path-to-image.png" alt="Image description" xmlns="http://www.w3.org/1999/xhtml" />
    </foreignObject>
</svg>` },
  { filename: "svg with nested forigin object img aria label", content: `<!-- issue with @acsbe/core-engine-classifier -->
<svg style="width:100px;height:100px;" >
    <foreignObject>
        <img src="path-to-image.png" aria-label="Image description" xmlns="http://www.w3.org/1999/xhtml" />
    </foreignObject>
</svg>` },
  { filename: "svg with nested forigin object text content", content: `<!-- issue with @acsbe/core-engine-classifier -->
<svg style="width:100px;height:100px;" >
    <foreignObject>
        <div xmlns="http://www.w3.org/1999/xhtml">
            SVG Description
        </div>
    </foreignObject>
</svg>` }
      ]}
    />
  );
};

export default SvgDiscernibleSuccess;
