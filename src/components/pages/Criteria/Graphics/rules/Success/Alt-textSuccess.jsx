/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): image-discernible, image-discernible-correctly, alt-misuse
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Graphics: Alt Text - Success";

const AlttextSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="graphics-alt-text-success-success-1"
          data-atomic-source="image-discernible/img-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<img aria-label="Image description" style="width:100px;height:100px;" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-2"
          data-atomic-source="image-discernible/picture-with-alt-on-child-img"
          dangerouslySetInnerHTML={{
            __html: `<!-- issue with @acsbe/classifier -->
<picture >
    <img src="cat.jpg" alt="A picture of a cat" />
</picture>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-3"
          data-atomic-source="image-discernible/picture-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<!-- issue with @acsbe/classifier -->
<picture aria-label="A picture of a cat">
    <img src="cat.jpg" />
</picture>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-4"
          data-atomic-source="image-discernible/role-img-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<div role="img" aria-label="Image description" style="width:100px;height:100px;background-image: url(path-to-image.png);" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-5"
          data-atomic-source="image-discernible-correctly/easyfinancial.com-image-with-svg-src"
          dangerouslySetInnerHTML={{
            __html: `<img data-src="../assets/GoeasyConnect.e75d4a9a.svg" src="../assets/GoeasyConnect.e75d4a9a.svg" alt="GoeasyConnect.e75d4a9a.svg" width="82px" height="100%" class="lazy entered loaded" data-ll-status="loaded" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-6"
          data-atomic-source="image-discernible-correctly/image-with-base64-src"
          dangerouslySetInnerHTML={{
            __html: `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" alt="Test image" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-7"
          data-atomic-source="image-discernible-correctly/image-with-linear-gradient"
          dangerouslySetInnerHTML={{
            __html: `<img src="linear-gradient(to right, red, blue)" alt="Gradient" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-8"
          data-atomic-source="image-discernible-correctly/image-with-meaningful-alt-text-hebrew"
          dangerouslySetInnerHTML={{
            __html: `<img alt="זריחה יפה מעל ההרים" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-9"
          data-atomic-source="image-discernible-correctly/image-with-meaningful-alt-text"
          dangerouslySetInnerHTML={{
            __html: `<img alt="A beautiful sunrise over the mountains" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-10"
          data-atomic-source="image-discernible-correctly/image-with-meaningful-aria-label-hebrew"
          dangerouslySetInnerHTML={{
            __html: `<img aria-label="זריחה יפה מעל ההרים" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-11"
          data-atomic-source="image-discernible-correctly/image-with-meaningful-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<img aria-label="A beautiful sunrise over the mountains" style="width:100px;height:100px;"/>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-12"
          data-atomic-source="image-discernible-correctly/image-with-not-meaningful-alt-text-and-meaningful-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<img alt="abcdefghijklmnopqrstuvwxyz" aria-label="A beautiful sunrise over the mountains" style="width: 100px; height: 100px" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-13"
          data-atomic-source="image-discernible-correctly/image-with-svg-data-uri"
          dangerouslySetInnerHTML={{
            __html: `<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E" alt="SVG image" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-14"
          data-atomic-source="image-discernible-correctly/image-with-svg-src"
          dangerouslySetInnerHTML={{
            __html: `<img src="image.svg" alt="SVG file" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-15"
          data-atomic-source="alt-misuse/div-with-no-alt"
          dangerouslySetInnerHTML={{
            __html: `<div></div>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-16"
          data-atomic-source="alt-misuse/img-with-alt"
          dangerouslySetInnerHTML={{
            __html: `<img alt="this div is remarkable, you should know this" />`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-17"
          data-atomic-source="alt-misuse/img-with-map"
          dangerouslySetInnerHTML={{
            __html: `<img src="world-map.png" usemap="#worldmap" alt="World map with clickable countries">
<map name="worldmap">
  <area shape="rect" coords="0,0,100,100" href="usa.html" alt="United States" />
  <area shape="rect" coords="101,0,200,100" href="canada.html" alt="Canada" />
</map>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-alt-text-success-success-18"
          data-atomic-source="alt-misuse/input-with-alt"
          dangerouslySetInnerHTML={{
            __html: `<input type="image" alt="this div is remarkable, you should know this" />`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default AlttextSuccess;
