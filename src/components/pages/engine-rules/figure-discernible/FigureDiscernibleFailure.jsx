import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const FigureDiscernibleFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Figure Discernible"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "figure with aria labelledby but no valid caption", content: `<html>
  <head> </head>
  <body>
    <figure aria-labelledby="caption1">
      <span id="caption1"> </span>
      <!-- Empty caption -->
    </figure>
  </body>
</html>` },
  { filename: "figure with empty alt and no figcaption", content: `<html>
  <head> </head>
  <body>
    <figure>
      <img src="diagram.jpg" alt="" />
      <!-- No figcaption provided -->
    </figure>
  </body>
</html>` },
  { filename: "figure without figcaption child and image alt", content: `<html>
  <head> </head>
  <body>
    <figure>
      <img src="event1.jpg" alt="" />
      <figcaption></figcaption>
    </figure>
  </body>
</html>` },
  { filename: "figure without image and empty aria labelledby", content: `<html>
  <head> </head>
  <body>
    <figure aria-labelledby="caption1">
      <span id="caption1"></span>
    </figure>
  </body>
</html>` },
  { filename: "figure without image and no figcaption", content: `<html>
  <head> </head>
  <body>
    <figure>
      <!-- No image and no caption -->
    </figure>
  </body>
</html>` },
  { filename: "figure witht empty figcaption child", content: `<html>
  <head> </head>
  <body>
    <figure>
      <img />
      <figcaption></figcaption>
    </figure>
  </body>
</html>` },
  { filename: "role figure with no alt and no aria labelledby", content: `<html>
  <head> </head>
  <body>
    <div role="figure">
      <img src="image.jpg" alt="" />
      <!-- No caption or aria-labelledby -->
    </div>
  </body>
</html>` },
  { filename: "role figure without aria labelledby and image alt", content: `<html>
  <head> </head>
  <body>
    <div role="figure">
      <img src="image.jpg" alt="" />
    </div>
  </body>
</html>` }
      ]}
    />
  );
};

export default FigureDiscernibleFailure;
