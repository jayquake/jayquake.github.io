/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): figure-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Graphics: Figure Setup - Failure";

const FiguresetupFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="graphics-figure-setup-failure-failure-1"
          data-atomic-source="figure-discernible/figure-with-aria-labelledby-but-no-valid-caption"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure aria-labelledby="caption1">
      <span id="caption1"> </span>
      <!-- Empty caption -->
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-failure-failure-2"
          data-atomic-source="figure-discernible/figure-with-empty-alt-and-no-figcaption"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure>
      <img src="diagram.jpg" alt="" />
      <!-- No figcaption provided -->
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-failure-failure-3"
          data-atomic-source="figure-discernible/figure-without-figcaption-child-and-image-alt"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure>
      <img src="event1.jpg" alt="" />
      <figcaption></figcaption>
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-failure-failure-4"
          data-atomic-source="figure-discernible/figure-without-image-and-empty-aria-labelledby"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure aria-labelledby="caption1">
      <span id="caption1"></span>
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-failure-failure-5"
          data-atomic-source="figure-discernible/figure-without-image-and-no-figcaption"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure>
      <!-- No image and no caption -->
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-failure-failure-6"
          data-atomic-source="figure-discernible/figure-witht-empty-figcaption-child"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure>
      <img />
      <figcaption></figcaption>
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-failure-failure-7"
          data-atomic-source="figure-discernible/role-figure-with-no-alt-and-no-aria-labelledby"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <div role="figure">
      <img src="image.jpg" alt="" />
      <!-- No caption or aria-labelledby -->
    </div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-failure-failure-8"
          data-atomic-source="figure-discernible/role-figure-without-aria-labelledby-and-image-alt"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <div role="figure">
      <img src="image.jpg" alt="" />
    </div>
  </body>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FiguresetupFailures;
