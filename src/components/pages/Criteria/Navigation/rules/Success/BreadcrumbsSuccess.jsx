/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): breadcrumbs-mismatch, breadcrumbs-nav
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Navigation: Breadcrumbs - Success";

const BreadcrumbsSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-1"
          data-atomic-source="breadcrumbs-mismatch/breadcrumbs-nav-labeled"
          dangerouslySetInnerHTML={{
            __html: `<style>
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
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-2"
          data-atomic-source="breadcrumbs-mismatch/breadcrumbs-ol-labeled"
          dangerouslySetInnerHTML={{
            __html: `<style>
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
</ol>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-3"
          data-atomic-source="breadcrumbs-mismatch/breadcrumbs-parent-nav-labeled"
          dangerouslySetInnerHTML={{
            __html: `<style>
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
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-4"
          data-atomic-source="breadcrumbs-mismatch/breadcrumbs-parent-nav-role-presentation-labeled"
          dangerouslySetInnerHTML={{
            __html: `<style>
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
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-5"
          data-atomic-source="breadcrumbs-mismatch/breadcrumbs-parent-role-nav.-labeled"
          dangerouslySetInnerHTML={{
            __html: `<style>
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
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-6"
          data-atomic-source="breadcrumbs-mismatch/breadcrumbs-role-nav-labeled"
          dangerouslySetInnerHTML={{
            __html: `<style>
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
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-7"
          data-atomic-source="breadcrumbs-mismatch/div-no-breadcrumbs"
          dangerouslySetInnerHTML={{
            __html: `<div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-8"
          data-atomic-source="breadcrumbs-nav/breadcrumbs-nav"
          dangerouslySetInnerHTML={{
            __html: `<style>
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
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-9"
          data-atomic-source="breadcrumbs-nav/breadcrumbs-parent-nav"
          dangerouslySetInnerHTML={{
            __html: `<style>
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
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-10"
          data-atomic-source="breadcrumbs-nav/breadcrumbs-parent-role-nav"
          dangerouslySetInnerHTML={{
            __html: `<style>
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
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-11"
          data-atomic-source="breadcrumbs-nav/breadcrumbs-role-nav"
          dangerouslySetInnerHTML={{
            __html: `<style>
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
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-success-success-12"
          data-atomic-source="breadcrumbs-nav/div-no-breadcrumbs"
          dangerouslySetInnerHTML={{
            __html: `<div>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BreadcrumbsSuccess;
