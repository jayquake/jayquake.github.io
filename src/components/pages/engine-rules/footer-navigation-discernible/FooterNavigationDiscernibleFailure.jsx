import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const FooterNavigationDiscernibleFailure = () => {
  const ruleId = "footer-navigation-discernible";
  const title = `Footer navigation should be labelled properly`;
  const description = `Footer navigation elements should have text available for screen readers explaining that it is footer navigation.`;
  const helpText = `Add an aria-label to the footer navigation elements`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "footer div labelledby nonexistent heading", content: `<div role="contentinfo">
  <nav id="footer-nav" aria-labelledby="non-existent-heading">
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</div>` },
  { filename: "footer menu div role contentinfo without aria label", content: `<!-- This test checks for a footer navigation inside a div with role="contentinfo" that doesn't have an accessible name. -->
<div role="contentinfo">
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
</div>` },
  { filename: "footer menu without aria label", content: `<!-- This test checks for a footer navigation that doesn't have an accessible name. -->
<footer>
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
  { filename: "footer with empty aria label", content: `<footer>
  <nav id="footer-nav" aria-label="">
    <ul>
      <li><a href="/home">Home</a></li>
    </ul>
  </nav>
</footer>` },
  { filename: "footer with whitespace aria label", content: `<footer>
  <nav id="footer-nav" aria-label="   ">
    <ul>
      <li><a href="/home">Home</a></li>
    </ul>
  </nav>
</footer>` },
  { filename: "multiple footers in page without labels", content: `<!-- This test checks for a footer navigation that has an accessible name. -->
<footer>
  <nav id="nav1">
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
  <nav id="nav2">
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
  { filename: "multiple navs in one footer without labels", content: `<!-- This test checks for a footer navigation that has an accessible name. -->
<footer>
  <nav id="nav1">
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
  <nav id="nav2">
    <ul>
      <li>
        <a href="/someplace">Some Place</a>
      </li>
      <li>
        <a href="/otherplace">A different place</a>
      </li>
    </ul>
  </nav>
</footer>` }
  ];

  return (
    <EngineIssueFailure
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      fixSteps={fixSteps}
      htmlExamples={htmlExamples}
    />
  );
};

export default FooterNavigationDiscernibleFailure;
