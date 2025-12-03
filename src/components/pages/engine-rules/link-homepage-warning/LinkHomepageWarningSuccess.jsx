import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const LinkHomepageWarningSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Link Homepage Warning"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "coralogix schedule demo link", content: `<a class="button-solid-reversed" href="#marketoModalForm-demo">Schedule Demo</a>` },
  { filename: "link homepage acsb sr element", content: `<a href="/" id="homepage-link">
  Redirect to home page
  <span data-acsb-sr-only="true" class="acsb-sr-only" style="position: absolute !important; width: 1px !important; height: 1px !important; padding: 0px !important; overflow: hidden !important; clip: rect(0px, 0px, 0px, 0px) !important; border: 0px !important"> | Redirecting user</span>
</a>` },
  { filename: "link homepage full base url end with slash", content: `<p>
  <a href="http://127.0.0.1:9000/" id="homepage-link" aria-describedby="homepage-desc">Homepage</a>
</p>
<p id="homepage-desc">Redirecting to the homepage</p>` },
  { filename: "link homepage full base url", content: `<p>
  <a href="http://127.0.0.1:9000" id="homepage-link" aria-describedby="homepage-desc">Homepage</a>
</p>
<p id="homepage-desc">Redirecting to the homepage</p>` },
  { filename: "link homepage sr element", content: `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>
<p>
  <a href="/" id="homepage-link"
    >Homepage
    <span id="homepage-desc" class="sr-only">Redirect to homepage</span>
  </a>
</p>` },
  { filename: "link homepage with aria describedby", content: `<p>
  <a href="/" id="homepage-link" aria-describedby="homepage-desc">Homepage</a>
</p>
<p id="homepage-desc">Redirecting to the homepage</p>` },
  { filename: "link homepage with aria label", content: `<p>
  <a href="/" aria-label="Redirecting the user to the homepage">Home</a>
</p>` },
  { filename: "link homepage with aria labelledby", content: `<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
</style>
<p>
  <a href="/" id="homepage-link" aria-labelledby="homepage-desc">homepage</a>
  <span id="homepage-desc" class="sr-only">home page</span>
</p>` },
  { filename: "no link to homepage", content: `<p>
  <a href="/cats" id="homepage-link" aria-describedby="homepage-desc">Homepage</a>
</p>
<p id="homepage-desc">Redirecting to the homepage</p>` }
      ]}
    />
  );
};

export default LinkHomepageWarningSuccess;
