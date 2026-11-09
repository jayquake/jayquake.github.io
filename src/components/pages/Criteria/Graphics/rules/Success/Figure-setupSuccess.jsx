/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): figure-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Graphics: Figure Setup - Success";

const FiguresetupSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="graphics-figure-setup-success-success-1"
          data-atomic-source="figure-discernible/figure-and-image-with-alt"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure>
      <img
        src="diagram.png"
        alt="diagram showing the four layers of awesome and their relative priority order —
        music, cats, nature, and ice cream"
      />
      <figcaption>January 2020, 10 AM, Milano Italy.</figcaption>
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-success-success-2"
          data-atomic-source="figure-discernible/figure-with-aria-labelledby"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure aria-labelledby="caption1">
      <img src="graph.jpg" alt="" />
      <span id="caption1">A bar graph showing sales trends in 2020.</span>
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-success-success-3"
          data-atomic-source="figure-discernible/figure-with-figcaption-child"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure>
      <img />
      <figcaption>January 2020, 10 AM, Milano Italy.</figcaption>
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-success-success-4"
          data-atomic-source="figure-discernible/figure-with-multiple-captions-one-valid"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure>
      <figcaption></figcaption>
      <figcaption>Europe's geopolitical boundaries in 1453.</figcaption>
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-success-success-5"
          data-atomic-source="figure-discernible/figure-with-multiple-images-and-one-alt"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure>
      <img src="event1.jpg" alt="The first event in the timeline." />
      <img src="event2.jpg" />
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-success-success-6"
          data-atomic-source="figure-discernible/figure-with-svg"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure>
      <svg role="img" aria-label="A diagram of a supply chain network."></svg>
    </figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-success-success-7"
          data-atomic-source="figure-discernible/figure-with-text-node"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <figure>text</figure>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-success-success-8"
          data-atomic-source="figure-discernible/role-figure-and-image-with-alt"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <div role="figure">
      <img
        src="diagram.png"
        alt="diagram showing the four layers of awesome and their relative priority order —
        music, cats, nature, and ice cream"
      />
    </div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-success-success-9"
          data-atomic-source="figure-discernible/role-figure-with-alt-image-and-figcaption"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <div role="figure">
      <img src="image.jpg" alt="A beautiful sunset over the ocean." />
      <figcaption>Photograph taken during the summer of 2023.</figcaption>
    </div>
  </body>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="graphics-figure-setup-success-success-10"
          data-atomic-source="figure-discernible/role-figure-with-aria-labelledby"
          dangerouslySetInnerHTML={{
            __html: `<html>
  <head> </head>
  <body>
    <div role="figure" aria-labelledby="figure-1">
      <img
        src="diagram.png"
      />
      <p id="figure-1">Figure 1: The four layers of awesome.</p>
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

export default FiguresetupSuccess;
