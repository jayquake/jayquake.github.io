/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): tabbable-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Keyboard: Noninteractive Tabindex - Success";

const NonintTabSucc = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="keyboard-noninteractive-tabindex-success-success-1"
          data-atomic-source="tabbable-misuse/abboptical-aria-disabled-link"
          dangerouslySetInnerHTML={{
            __html: `<a href="/contact-lenses/soft-lenses/coopervision/avaira-vitality-toric" class="product-image" aria-disabled="true">
  <img loading="eager" srcset="/sites/default/files/styles/product_400x400/public/images/soft-contact-lenses/ATV_1.jpg?itok=lbATlnHy 1x" width="285" height="185" src="/sites/default/files/styles/product_400x400/public/images/soft-contact-lenses/ATV_1.jpg?itok=lbATlnHy" alt="Avaira Vitality™ toric" />
</a>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noninteractive-tabindex-success-success-2"
          data-atomic-source="tabbable-misuse/input-element-without-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<body style="height: 100vh; width: 100vw">
  <input style="width: 150px; height: 100px" type="text" placeholder="enter your name" />
</body>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noninteractive-tabindex-success-success-3"
          data-atomic-source="tabbable-misuse/interactive-element-with-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<button>Click here</button>
<div role="button" onclick="alert('Hello, user!')" tabindex="0">or here</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noninteractive-tabindex-success-success-4"
          data-atomic-source="tabbable-misuse/interactive-element-without-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<span onclick="alert('Hello, user!')" style="cursor: pointer">Interactive but without tabindex - should not be included in the passedNodes array</span>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noninteractive-tabindex-success-success-5"
          data-atomic-source="tabbable-misuse/role-button"
          dangerouslySetInnerHTML={{
            __html: `<body style="height: 100vh; width: 100vw">
  <div style="width: 150px; height: 100px" id="btn" role="button" class="no tabIndex - not tabbable">Click here</div>
</body>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noninteractive-tabindex-success-success-6"
          data-atomic-source="tabbable-misuse/role-link"
          dangerouslySetInnerHTML={{
            __html: `<div role="link" tabindex="0" aria-label="Go to next page" onclick="location.href='next.html'">Next Page</div>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noninteractive-tabindex-success-success-7"
          data-atomic-source="tabbable-misuse/select-element-without-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<select>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>`,
          }}
        />
        <div
          className="list-item"
          id="keyboard-noninteractive-tabindex-success-success-8"
          data-atomic-source="tabbable-misuse/text-area-element-without-tabindex"
          dangerouslySetInnerHTML={{
            __html: `<textarea placeholder="comment.."></textarea>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default NonintTabSucc;
