import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const InnerContentNavigationDiscernibleFailure = () => {
  const ruleId = "inner-content-navigation-discernible";
  const title = `Inner content navigation should be labelled properly`;
  const description = `Navigation elements within the page content should have text available for screen readers explaining that it is inner-content navigation.`;
  const helpText = `Add an aria-label to the inner-content navigation elements`;
  const fixSteps = [
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
  ];
  const htmlExamples = [
  { filename: "inner content menu without label", content: `<body>
<nav id="inner-content-nav">
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
</body>` },
  { filename: "multiple inner contents in page without labels", content: `<!-- This test checks for multiple inner-contents in page without labels. -->
<main>
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
</main>
<article>
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
</article>` },
  { filename: "multiple navs in one inner content without labels", content: `<!-- This test checks for multiple navs in one inner-content without labels. -->
<article>
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
</article>` }
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

export default InnerContentNavigationDiscernibleFailure;
