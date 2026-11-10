/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): breadcrumbs-mismatch, breadcrumbs-nav
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation: Breadcrumbs - Failure";

const BreadcrumbsFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-breadcrumbs-failure-failure-1"
          data-atomic-source="breadcrumbs-mismatch/breadcrumbs-nav-mislabeled"
          dangerouslySetInnerHTML={{
            __html: `<style>
    .breadcrumbs {
        display: flex;
        gap: 1rem;
    }
</style>

<nav class="breadcrumbs" aria-label="Navigation Stack">
  <div><a href="/">Home</a></div>
  <div><a href="/perceivable/components/breadcrumb/">Home</a></div>
  <div><a href="/perceivable/components/breadcrumb/atomic-tests/">Home</a></div>
  <div><a href="/perceivable/components/breadcrumb/atomic-tests/pass/enclosing-element-is-nav--list-items-are-divs.html">Home</a></div>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-failure-failure-2"
          data-atomic-source="breadcrumbs-mismatch/breadcrumbs-nav-not-labeled"
          dangerouslySetInnerHTML={{
            __html: `<style>
    .breadcrumbs {
        display: flex;
        gap: 1rem;
    }
</style>

<nav class="breadcrumbs">
  <div><a href="/">Home</a></div>
  <div><a href="/perceivable/components/breadcrumb/">Home</a></div>
  <div><a href="/perceivable/components/breadcrumb/atomic-tests/">Home</a></div>
  <div><a href="/perceivable/components/breadcrumb/atomic-tests/pass/enclosing-element-is-nav--list-items-are-divs.html">Home</a></div>
</nav>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-failure-failure-3"
          data-atomic-source="breadcrumbs-mismatch/breadcrumbs-ol-not-labeled"
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

<ol class="breadcrumb">
  <li class="breadcrumb-item"><a href="/">Home</a></li>
  <li class="breadcrumb-item"><a href="/lib">Library</a></li>
  <li class="breadcrumb-item active" aria-current="page">Data</li>
</ol>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-failure-failure-4"
          data-atomic-source="breadcrumbs-mismatch/breadcrumbs-parent-not-labeled"
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

<div role="navigation">
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
          id="navigation-breadcrumbs-failure-failure-5"
          data-atomic-source="breadcrumbs-nav/breadcrumbs-not-nav"
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

<ol class="breadcrumb">
  <li class="breadcrumb-item"><a href="/">Home</a></li>
  <li class="breadcrumb-item"><a href="/lib">Library</a></li>
  <li class="breadcrumb-item active" aria-current="page">Data</li>
</ol>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-breadcrumbs-failure-failure-6"
          data-atomic-source="breadcrumbs-nav/breadcrumbs-parent-div-no-role"
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

<div>
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
          id="navigation-breadcrumbs-failure-failure-7"
          data-atomic-source="breadcrumbs-nav/breadcrumbs-parent-nav-role-presentation"
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

<nav role="presentation">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item"><a href="/lib">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BreadcrumbsFailure;
