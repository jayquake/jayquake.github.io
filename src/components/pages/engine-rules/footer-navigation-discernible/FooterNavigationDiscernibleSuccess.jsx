import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const FooterNavigationDiscernibleSuccess = () => {
  const ruleId = "footer-navigation-discernible";
  const title = `Footer navigation should be labelled properly`;
  const description = `Footer navigation elements should have text available for screen readers explaining that it is footer navigation.`;
  const helpText = `Add an aria-label to the footer navigation elements`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "footer div labelledby heading", content: `<div role="contentinfo">
  <h2 id="footer-heading">Site Map</h2>
  <nav id="footer-nav" aria-labelledby="footer-heading">
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</div>` },
  { filename: "footer div with text content", content: `<div role="contentinfo" id="footer-contentinfo">
  <p>This is a footer with some navigation links.</p>
  <nav aria-label="Footer Menu">
    <ul>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </nav>
</div>` },
  { filename: "footer menu div role contentinfo with aria label", content: `<!-- This test checks for a footer navigation inside a div with role="contentinfo" that has an accessible name. -->
<div role="contentinfo">
<nav id="footer-nav" aria-label="Footer Menu">
  <ul>
    <li>
      <a href="/home">Home</a>
    </li>
    <li>
      <a href="/about">About</a>
    </li>
    <li>
      <a href="/pricing">Pricing</a>
    </li>
  </ul>
</nav>
</div>` },
  { filename: "footer menu with aria label", content: `<!-- This test checks for a footer navigation that has an accessible name. -->
<footer>
<nav id="footer-nav" aria-label="Footer Menu">
  <ul>
    <li>
      <a href="/home">Home</a>
    </li>
    <li>
      <a href="/about">About</a>
    </li>
    <li>
      <a href="/pricing">Pricing</a>
    </li>
  </ul>
</nav>
</footer>` },
  { filename: "footer without navigation", content: `<footer>
  <p>Some footer content.</p>
</footer>` },
  { filename: "multiple footers in page with labels", content: `<!-- This test checks for a footer navigation that has an accessible name. -->
<footer>
  <nav aria-label="Footer Navigation" id="nav1">
    <ul>
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/pricing">Pricing</a>
      </li>
    </ul>
  </nav>
</footer>
<footer>
  <nav aria-label="Other Footer Navigation" id="nav2">
    <ul>
      <li>
        <a href="/someplace">Some Place</a>
      </li>
      <li>
        <a href="/otherplace">A different place</a>
      </li>
    </ul>
  </nav>
</footer>` },
  { filename: "multiple navs in one footer with labels", content: `<!-- This test checks for a footer navigation that has an accessible name. -->
<footer>
  <nav id="nav1" aria-label="Footer Navigation">
    <ul>
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/pricing">Pricing</a>
      </li>
    </ul>
  </nav>
  <nav id="nav2" aria-label="Other Footer Navigation">
    <ul>
      <li>
        <a href="/someplace">Some Place</a>
      </li>
      <li>
        <a href="/otherplace">A different place</a>
      </li>
    </ul>
  </nav>
</footer>` },
  { filename: "skip breadcrumb nav", content: `<style>
  .breadcrumbs {
    display: flex;
    gap: 1rem;
  }
</style>

<footer>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <div><a href="/">Home</a></div>
    <div><a href="/perceivable/components/breadcrumb/">Home</a></div>
    <div><a href="/perceivable/components/breadcrumb/atomic-tests/">Home</a></div>
    <div><a href="/perceivable/components/breadcrumb/atomic-tests/pass/enclosing-element-is-nav--list-items-are-divs.html">Home</a></div>
  </nav>
</footer>` }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default FooterNavigationDiscernibleSuccess;
