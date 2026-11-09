/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): image-discernible, image-discernible-correctly, alt-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Graphics: Alt Text - Failure";

const AlttextFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-1"
          data-atomic-source="image-discernible/img"
          dangerouslySetInnerHTML={{
            __html: `<img style="width:100px;height:100px;" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-2"
          data-atomic-source="image-discernible/picture"
          dangerouslySetInnerHTML={{
            __html: `<picture>
    <source srcset="path-to-image-png">
    <img src="path-to-image-png">
</picture>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-3"
          data-atomic-source="image-discernible/role-img"
          dangerouslySetInnerHTML={{
            __html: `<div role="img" style="width:100px;height:100px;background-image: url(path-to-image.png);" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-4"
          data-atomic-source="image-discernible-correctly/image-with-alt-text-containing-a-long-single-word"
          dangerouslySetInnerHTML={{
            __html: `<img alt="abcdefghijklmnopqrstuvwxyz" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-5"
          data-atomic-source="image-discernible-correctly/image-with-alt-text-containing-a-single-word"
          dangerouslySetInnerHTML={{
            __html: `<img alt="image" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-6"
          data-atomic-source="image-discernible-correctly/image-with-alt-text-containing-more-numbers-than-non-numbers"
          dangerouslySetInnerHTML={{
            __html: `<img alt="1234abc" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-7"
          data-atomic-source="image-discernible-correctly/image-with-alt-text-containing-only-dimensions"
          dangerouslySetInnerHTML={{
            __html: `<img alt="800x600" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-8"
          data-atomic-source="image-discernible-correctly/image-with-alt-text-containing-only-non-alphabetic-characters"
          dangerouslySetInnerHTML={{
            __html: `<img alt="!!!" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-9"
          data-atomic-source="image-discernible-correctly/image-with-aria-label-containing-a-long-single-word"
          dangerouslySetInnerHTML={{
            __html: `<img aria-label="abcdefghijklmnopqrstuvwxyz" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-10"
          data-atomic-source="image-discernible-correctly/image-with-aria-label-containing-a-single-word"
          dangerouslySetInnerHTML={{
            __html: `<img aria-label="image" style="width:100px;height:100px;"/>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-11"
          data-atomic-source="image-discernible-correctly/image-with-aria-label-containing-more-numbers-than-non-numbers"
          dangerouslySetInnerHTML={{
            __html: `<img aria-label="1234abc" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-12"
          data-atomic-source="image-discernible-correctly/image-with-aria-label-containing-only-dimensions"
          dangerouslySetInnerHTML={{
            __html: `<img aria-label="800x600" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-13"
          data-atomic-source="image-discernible-correctly/image-with-aria-label-containing-only-non-alphabetic-characters"
          dangerouslySetInnerHTML={{
            __html: `<img aria-label="!!!" style="width:100px;height:100px;"/>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-14"
          data-atomic-source="image-discernible-correctly/image-with-not-meaningful-alt-text-and-not-meaningful-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<img alt="abcdefghijklmnopqrstuvwxyz" aria-label="1234abc" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-15"
          data-atomic-source="alt-misuse/div-with-alt"
          dangerouslySetInnerHTML={{
            __html: `<div alt="this div is remarkable, you should know this"></div>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-failure-failure-16"
          data-atomic-source="alt-misuse/div-with-role-img-and-alt"
          dangerouslySetInnerHTML={{
            __html: `<div role-="image" alt="this div is remarkable, you should know this"></div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default AlttextFailures;
