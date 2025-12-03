import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const BreadcrumbsMismatchSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Breadcrumbs Mismatch"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "breadcrumbs nav labeled", content: `<style>
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
  { filename: "breadcrumbs ol labeled", content: `<style>
    .breadcrumb {
        background-color: #f5f5f5;
        padding: 8px 15px;
        margin-bottom: 20px;
        list-style: none;
        border-radius: 4px;
        display: flex;
        flex-flow: row wrap;
    }

    .breadcrumb-item {
        margin-inline: 1rem;
    }

    .breadcrumb-item:not(:last-child)::after {
        content: ">";
        margin-inline: 1rem;
    }
</style>

<ol class="breadcrumb" aria-label="Breadcrumbs">
  <li class="breadcrumb-item"><a href="/">Home</a></li>
  <li class="breadcrumb-item"><a href="/lib">Library</a></li>
  <li class="breadcrumb-item active" aria-current="page">Data</li>
</ol>` },
  { filename: "breadcrumbs parent nav labeled", content: `<style>
    .breadcrumb {
        background-color: #f5f5f5;
        padding: 8px 15px;
        margin-bottom: 20px;
        list-style: none;
        border-radius: 4px;
        display: flex;
        flex-flow: row wrap;
    }

    .breadcrumb-item {
        margin-inline: 1rem;
    }

    .breadcrumb-item:not(:last-child)::after {
        content: ">";
        margin-inline: 1rem;
    }
</style>

<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/lib">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>` },
  { filename: "breadcrumbs parent nav role presentation labeled", content: `<style>
    .breadcrumb {
        background-color: #f5f5f5;
        padding: 8px 15px;
        margin-bottom: 20px;
        list-style: none;
        border-radius: 4px;
        display: flex;
        flex-flow: row wrap;
    }

    .breadcrumb-item {
        margin-inline: 1rem;
    }

    .breadcrumb-item:not(:last-child)::after {
        content: ">";
        margin-inline: 1rem;
    }
</style>

<nav role="presentation" aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/lib">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>` },
  { filename: "breadcrumbs parent role nav. labeled", content: `<style>
    .breadcrumb {
        background-color: #f5f5f5;
        padding: 8px 15px;
        margin-bottom: 20px;
        list-style: none;
        border-radius: 4px;
        display: flex;
        flex-flow: row wrap;
    }

    .breadcrumb-item {
        margin-inline: 1rem;
    }

    .breadcrumb-item:not(:last-child)::after {
        content: ">";
        margin-inline: 1rem;
    }
</style>

<div role="navigation" aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/lib">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</div>` },
  { filename: "breadcrumbs role nav labeled", content: `<style>
  .breadcrumb {
    background-color: #f5f5f5;
    padding: 8px 15px;
    margin-bottom: 20px;
    list-style: none;
    border-radius: 4px;
    display: flex;
    flex-flow: row wrap;
  }

  .breadcrumb-item {
    margin-inline: 1rem;
  }

  .breadcrumb-item:not(:last-child)::after {
    content: ">";
    margin-inline: 1rem;
  }
</style>


<div class="breadcrumb" role="navigation" aria-label="Breadcrumb">
  <span class="breadcrumb-item"><a href="/">Home</a></span>
  <span class="breadcrumb-item"><a href="/lib">Library</a></span>
  <span class="breadcrumb-item active" aria-current="page">Data</span>
</div>` },
  { filename: "div no breadcrumbs", content: `<div>
</div>` }
      ]}
    />
  );
};

export default BreadcrumbsMismatchSuccess;
