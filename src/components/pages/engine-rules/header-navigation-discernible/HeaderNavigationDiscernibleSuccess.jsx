import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const HeaderNavigationDiscernibleSuccess = () => {
  const ruleId = "header-navigation-discernible";
  const title = `Header navigation should be labelled properly`;
  const description = `Header navigation elements should have text available for screen readers explaining that it is header navigation.`;
  const helpText = `Add an aria-label to the header navigation elements`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "header div labelledby heading", content: `<div role="banner">
  <h2 id="header-heading">Site Map</h2>
  <nav id="header-nav" aria-labelledby="header-heading">
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</div>` },
  { filename: "header div with role banner with label", content: `<div role="banner" id="header-banner">
  <p>This is a header with some navigation links.</p>
  <nav aria-label="Header Menu">
    <ul>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  </nav>
</div>` },
  { filename: "header menu div role banner with label", content: `<!-- This test checks for a header navigation inside a div with role="banner" that has an accessible name. -->
<div role="banner">
<nav id="header-nav" aria-label="Header Menu">
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
  { filename: "header menu with aria label", content: `<!-- This test checks for a header navigation that has an accessible name. -->
<header>
<nav id="header-nav" aria-label="Header Menu">
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
</header>` },
  { filename: "header without navigation", content: `<header>
  <p>Some header content.</p>
</header>` },
  { filename: "multiple headers in page with labels", content: `<!-- This test checks for multiple headers in page with labels. -->
<header>
  <nav aria-label="Header Navigation" id="nav1">
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
</header>
<header>
  <nav aria-label="Other Header Navigation" id="nav2">
    <ul>
      <li>
        <a href="/someplace">Some Place</a>
      </li>
      <li>
        <a href="/otherplace">A different place</a>
      </li>
    </ul>
  </nav>
</header>` },
  { filename: "multiple navs in one header with labels", content: `<!-- This test checks for multiple navs in one header with labels. -->
<header>
  <nav id="nav1" aria-label="Header Navigation">
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
  <nav id="nav2" aria-label="Other Header Navigation">
    <ul>
      <li>
        <a href="/someplace">Some Place</a>
      </li>
      <li>
        <a href="/otherplace">A different place</a>
      </li>
    </ul>
  </nav>
</header>` },
  { filename: "skip breadcrumb nav", content: `<style>
  .breadcrumbs {
    display: flex;
    gap: 1rem;
  }
</style>

<header>
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <div><a href="/">Home</a></div>
    <div><a href="/perceivable/components/breadcrumb/">Home</a></div>
    <div><a href="/perceivable/components/breadcrumb/atomic-tests/">Home</a></div>
    <div><a href="/perceivable/components/breadcrumb/atomic-tests/pass/enclosing-element-is-nav--list-items-are-divs.html">Home</a></div>
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

export default HeaderNavigationDiscernibleSuccess;
