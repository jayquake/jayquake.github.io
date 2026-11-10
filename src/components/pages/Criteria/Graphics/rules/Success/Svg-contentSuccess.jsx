/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): svg-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Graphics: SVG Content - Success";

const SvgcontentSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="graphics-svg-content-success-success-1"
          data-atomic-source="svg-discernible/svg-display-none"
          dangerouslySetInnerHTML={{
            __html: `<!-- issue with @acsbe/core-engine-classifier -->
<svg alt="Image description" style="width:100px;height:100px;display: none;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-svg-content-success-success-2"
          data-atomic-source="svg-discernible/svg-in-button"
          dangerouslySetInnerHTML={{
            __html: `<button>
    <svg style="width:100px;height:100px;" >
        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
</button>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-svg-content-success-success-3"
          data-atomic-source="svg-discernible/svg-in-link"
          dangerouslySetInnerHTML={{
            __html: `<a href="/search">
    <svg style="width:100px;height:100px;" >
        <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
    </svg>
</a>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-svg-content-success-success-4"
          data-atomic-source="svg-discernible/svg-visibility-hidden"
          dangerouslySetInnerHTML={{
            __html: `<!-- issue with @acsbe/core-engine-classifier -->
<svg alt="Image description" style="width:100px;height:100px;visibility: hidden;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-svg-content-success-success-5"
          data-atomic-source="svg-discernible/svg-with-aria-label-aria-hidden"
          dangerouslySetInnerHTML={{
            __html: `<svg aria-label="Image description" aria-hidden="true" style="width:100px;height:100px;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-svg-content-success-success-6"
          data-atomic-source="svg-discernible/svg-with-aria-label-role-presentation"
          dangerouslySetInnerHTML={{
            __html: `<!-- This test is skipped because PerceivableTraitDiscernibleText uses srVisibleText which uses isExplicitlyHiddenFromScreenReader which must be adjusted with isAffectedByRolePresentation -->
<svg aria-label="Image description" role="presentation" style="width:100px;height:100px;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-svg-content-success-success-7"
          data-atomic-source="svg-discernible/svg-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<svg aria-label="Image description" style="width:100px;height:100px;" >
    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-svg-content-success-success-8"
          data-atomic-source="svg-discernible/svg-with-nested-forigin-object-figure-caption"
          dangerouslySetInnerHTML={{
            __html: `<!-- issue with @acsbe/core-engine-classifier -->
<svg style="width:100px;height:100px;" >
    <foreignObject>
        <figure>
            <img src="image.png" />
            <figcaption>Image description</figcaption>
        </figure>
    </foreignObject>
</svg>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-svg-content-success-success-9"
          data-atomic-source="svg-discernible/svg-with-nested-forigin-object-img-alt"
          dangerouslySetInnerHTML={{
            __html: `<!-- issue with @acsbe/core-engine-classifier -->
<svg style="width:100px;height:100px;" >
    <foreignObject>
        <img src="path-to-image.png" alt="Image description" xmlns="http://www.w3.org/1999/xhtml" />
    </foreignObject>
</svg>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-svg-content-success-success-10"
          data-atomic-source="svg-discernible/svg-with-nested-forigin-object-img-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<!-- issue with @acsbe/core-engine-classifier -->
<svg style="width:100px;height:100px;" >
    <foreignObject>
        <img src="path-to-image.png" aria-label="Image description" xmlns="http://www.w3.org/1999/xhtml" />
    </foreignObject>
</svg>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-svg-content-success-success-11"
          data-atomic-source="svg-discernible/svg-with-nested-forigin-object-text-content"
          dangerouslySetInnerHTML={{
            __html: `<!-- issue with @acsbe/core-engine-classifier -->
<svg style="width:100px;height:100px;" >
    <foreignObject>
        <div xmlns="http://www.w3.org/1999/xhtml">
            SVG Description
        </div>
    </foreignObject>
</svg>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SvgcontentSuccess;
