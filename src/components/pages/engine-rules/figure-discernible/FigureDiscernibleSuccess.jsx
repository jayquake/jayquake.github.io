import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const FigureDiscernibleSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Figure Discernible"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "figure and image with alt", content: `<html>
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
</html>` },
  { filename: "figure with aria labelledby", content: `<html>
  <head> </head>
  <body>
    <figure aria-labelledby="caption1">
      <img src="graph.jpg" alt="" />
      <span id="caption1">A bar graph showing sales trends in 2020.</span>
    </figure>
  </body>
</html>` },
  { filename: "figure with figcaption child", content: `<html>
  <head> </head>
  <body>
    <figure>
      <img />
      <figcaption>January 2020, 10 AM, Milano Italy.</figcaption>
    </figure>
  </body>
</html>` },
  { filename: "figure with multiple captions one valid", content: `<html>
  <head> </head>
  <body>
    <figure>
      <figcaption></figcaption>
      <figcaption>Europe's geopolitical boundaries in 1453.</figcaption>
    </figure>
  </body>
</html>` },
  { filename: "figure with multiple images and one alt", content: `<html>
  <head> </head>
  <body>
    <figure>
      <img src="event1.jpg" alt="The first event in the timeline." />
      <img src="event2.jpg" />
    </figure>
  </body>
</html>` },
  { filename: "figure with svg", content: `<html>
  <head> </head>
  <body>
    <figure>
      <svg role="img" aria-label="A diagram of a supply chain network."></svg>
    </figure>
  </body>
</html>` },
  { filename: "figure with text node", content: `<html>
  <head> </head>
  <body>
    <figure>text</figure>
  </body>
</html>` },
  { filename: "role figure and image with alt", content: `<html>
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
</html>` },
  { filename: "role figure with alt image and figcaption", content: `<html>
  <head> </head>
  <body>
    <div role="figure">
      <img src="image.jpg" alt="A beautiful sunset over the ocean." />
      <figcaption>Photograph taken during the summer of 2023.</figcaption>
    </div>
  </body>
</html>` },
  { filename: "role figure with aria labelledby", content: `<html>
  <head> </head>
  <body>
    <div role="figure" aria-labelledby="figure-1">
      <img
        src="diagram.png"
      />
      <p id="figure-1">Figure 1: The four layers of awesome.</p>
    </div>
  </body>
</html>` }
      ]}
    />
  );
};

export default FigureDiscernibleSuccess;
