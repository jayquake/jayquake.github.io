import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const HeadingOrderSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Heading Order"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "heading levels consistent hierarchy 1 to 2", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <h1>Regular H1 Heading</h1>
    <h2>Regular H2 Heading</h2>
  </body>
</html>` },
  { filename: "heading levels consistent hierarchy 1 to 3", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <h1>Regular H1 Heading</h1>
    <div role="heading" aria-level="2">Regular H2 Heading</div>
    <h3>Regular H3 Heading</h3>
  </body>
</html>` },
  { filename: "heading levels consistent hierarchy 1 to 4", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <div role="heading" aria-level="1">Big Heading</div>
    <h2>Regular H2 Heading</h2>
    <h3>Regular H3 Heading</h3>
    <h4>Regular H4 Heading</h4>
  </body>
</html>` },
  { filename: "heading levels consistent hierarchy 1 to 5", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <div role="heading" aria-level="1">Big Heading</div>
    <h2>Regular H2 Heading</h2>
    <h3>Regular H3 Heading</h3>
    <h4>Regular H4 Heading</h4>
    <h5>Regular H5 Heading</h5>
  </body>
</html>` },
  { filename: "heading levels consistent hierarchy 1 to 6", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <h1>Regular H1 Heading</h1>
    <h2>Regular H2 Heading</h2>
    <h3>Regular H3 Heading</h3>
    <h4>Regular H4 Heading</h4>
    <h5>Regular H5 Heading</h5>
    <h6>Regular H6 Heading</h6>
  </body>
</html>` },
  { filename: "heading levels consistent hierarchy 1", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <h1>Regular H1 Heading</h1>
  </body>
</html>` },
  { filename: "heading levels consistent hierarchy", content: `<h1>Title of a News Article</h1>

<nav>
  <h2>Main Menu</h2>
</nav>

<article>
  <h2>Subheading in the Content of the News Article</h2>
  <h3>Subheading of the h2</h3>
  <h4>Subheading of the h3</h4>

  <h2>Another Subheading in the Content of the News Article</h2>
</article>

<aside>
  <h2>Related News</h2>
</aside>

<footer>
  <h2>Contact Us</h2>
  <h3>Address</h3>
  <h4>Phone Number</h4>
  <h3>Follow Us</h3>
</footer>` },
  { filename: "no headings", content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Example Page</title>
  </head>
  <body>
    <p>Hi</p>
  </body>
</html>` }
      ]}
    />
  );
};

export default HeadingOrderSuccess;
