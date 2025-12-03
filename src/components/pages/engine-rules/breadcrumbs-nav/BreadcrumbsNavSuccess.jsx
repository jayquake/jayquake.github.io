import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const BreadcrumbsNavSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Breadcrumbs Nav"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "breadcrumbs nav", content: `<style>
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
  <div class="breadcrumb">
    <span class="breadcrumb-item"><a href="/">Home</a></span>
    <span class="breadcrumb-item"><a href="/lib">Library</a></span>
    <span class="breadcrumb-item active" aria-current="page">Data</span>
  </div>
</nav>` },
  { filename: "breadcrumbs parent nav", content: `<style>
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
  { filename: "breadcrumbs parent role nav", content: `<style>
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
  { filename: "breadcrumbs role nav", content: `<style>
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

export default BreadcrumbsNavSuccess;
