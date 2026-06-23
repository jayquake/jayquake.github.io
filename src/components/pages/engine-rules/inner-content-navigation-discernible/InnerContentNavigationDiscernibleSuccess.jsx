import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const InnerContentNavigationDiscernibleSuccess = () => {
  const ruleId = "inner-content-navigation-discernible";
  const title = `Inner content navigation should be labelled properly`;
  const description = `Navigation elements within the page content should have text available for screen readers explaining that it is inner-content navigation.`;
  const helpText = `Add an aria-label to the inner-content navigation elements`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "div with role banner labelledby heading", content: `<div role="banner">
  <h2 id="inner-content-heading">Site Map</h2>
  <nav id="inner-content-nav" aria-labelledby="inner-content-heading">
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</div>` },
  { filename: "div with role banner with label", content: `<div role="banner" id="inner-content-banner">
  <p>This is a inner-content with some navigation links.</p>
  <nav aria-label="InnerContent Menu">
    <ul>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </nav>
</div>` },
  { filename: "inner content without navigation", content: `<article>
  <p>Some inner-content content.</p>
</article>` },
  { filename: "multiple inner contents in page with labels", content: `<!-- This test checks for multiple inner-contents in page with labels. -->
<main>
  <nav aria-label="InnerContent Navigation" id="nav1">
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
</main>
<article>
  <nav aria-label="Other InnerContent Navigation" id="nav2">
    <ul>
      <li>
        <a href="/someplace">Some Place</a>
      </li>
      <li>
        <a href="/otherplace">A different place</a>
      </li>
    </ul>
  </nav>
</article>` },
  { filename: "multiple navs in one inner content with labels", content: `<!-- This test checks for multiple navs in one inner-content with labels. -->
<article>
  <nav id="nav1" aria-label="InnerContent Navigation">
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
  <nav id="nav2" aria-label="Other InnerContent Navigation">
    <ul>
      <li>
        <a href="/someplace">Some Place</a>
      </li>
      <li>
        <a href="/otherplace">A different place</a>
      </li>
    </ul>
  </nav>
</article>` },
  { filename: "skip breadcrumb nav", content: `<style>
    .breadcrumbs {
        display: flex;
        gap: 1rem;
    }
</style>

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <div><a href="/">Home</a></div>
  <div><a href="/perceivable/components/breadcrumb/">Home</a></div>
  <div><a href="/perceivable/components/breadcrumb/atomic-tests/">Home</a></div>
  <div><a href="/perceivable/components/breadcrumb/atomic-tests/pass/enclosing-element-is-nav--list-items-are-divs.html">Home</a></div>
</nav>` },
  { filename: "skip footer nav", content: `<footer>
  <nav id="footer-nav">
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
  { filename: "skip header nav", content: `<header>
  <nav id="header-nav">
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
</header>` }
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

export default InnerContentNavigationDiscernibleSuccess;
