import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const HeadingOrderOptimalSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Heading Order Optimal"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "aria level 1 2 3", content: `<style>
  [aria-level="1"] {
    font-size: 2em;
    font-weight: bold;
  }
  [aria-level="2"] {
    font-size: 1.75em;
    font-weight: bold;
  }
  [aria-level="3"] {
    font-size: 1.5em;
    font-weight: bold;
  }
</style>

<br>
<br>
<br>
<br>

<div role="heading" aria-level="1">Heading 1</div>
<div role="heading" aria-level="2">Heading 2</div>
<div role="heading" aria-level="3">Heading 3</div>` },
  { filename: "h1 aria level 2 h3", content: `<style>
  [aria-level="2"] {
    font-size: 1.75em;
    font-weight: bold;
  }
</style>

<br>
<br>
<br>
<br>

<h1>Heading 1</h1>
<div role="heading" aria-level="2">Heading 2</div>
<h3>Heading 3</h3>` },
  { filename: "h1 h2 h3 h2 h3", content: `<br>
<br>
<br>

<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h2>Second Heading 2</h2>
<h3>Second Heading 3</h3>` },
  { filename: "h1 h2 h3", content: `<br>
<br>
<br>

<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>` }
      ]}
    />
  );
};

export default HeadingOrderOptimalSuccess;
