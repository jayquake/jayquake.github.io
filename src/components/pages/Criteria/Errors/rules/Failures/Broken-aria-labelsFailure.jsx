/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): visible-text-part-of-accessible-name
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Broken Aria Labels - Failure";

const BrokenarialabelsFailure = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-1"
          data-atomic-source="visible-text-part-of-accessible-name/anchor-aria-label-incl-text"
          dangerouslySetInnerHTML={{
            __html: `<a href="#" aria-label="this is a test, and some clarification">this is Gazorpazorp" </a>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-2"
          data-atomic-source="visible-text-part-of-accessible-name/anchor-aria-labelledby-incl-text"
          dangerouslySetInnerHTML={{
            __html: `<label id="l1">this is a test, and some clarification</label>
<a href="#" aria-labelledby="l1">this is Gazorpazorp</a>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-3"
          data-atomic-source="visible-text-part-of-accessible-name/anchor-multi-aria-labelledby-incl-text"
          dangerouslySetInnerHTML={{
            __html: `<label id="l1">this is a car, and some clarification</label>
<label id="l2">this is a pole, and some cash</label>
<a href="#" aria-labelledby="l1 l2">this is a test</a>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-4"
          data-atomic-source="visible-text-part-of-accessible-name/aria-label-is-different-from-visible-text"
          dangerouslySetInnerHTML={{
            __html: `<a href="https://act-rules.github.io/" aria-label="WCAG">ACT rules</a>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-5"
          data-atomic-source="visible-text-part-of-accessible-name/button-aria-label-incl-text"
          dangerouslySetInnerHTML={{
            __html: `<button aria-label="this is a test, and some clarification">this is Uranium</button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-6"
          data-atomic-source="visible-text-part-of-accessible-name/button-aria-label-partially-contains-visible-text"
          dangerouslySetInnerHTML={{
            __html: `<button aria-label="the full">The full label</button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-7"
          data-atomic-source="visible-text-part-of-accessible-name/button-aria-labelledby-incl-text"
          dangerouslySetInnerHTML={{
            __html: `<label id="l1">this is a test, and some clarification</label>
<button aria-labelledby="l1">this is Uranium</button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-8"
          data-atomic-source="visible-text-part-of-accessible-name/button-multi-aria-labelledby-incl-text"
          dangerouslySetInnerHTML={{
            __html: `<label id="l1">this is a pool, and some clarification</label>
<label id="l2">this is an axe, and some cash</label>
<button aria-labelledby="l1 l2">this is a test</button>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-9"
          data-atomic-source="visible-text-part-of-accessible-name/checkbox-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<label for="terms"> Accept terms and conditions </label>
<input type="checkbox" name="terms" id="terms" aria-label="terms & conditions"/>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-10"
          data-atomic-source="visible-text-part-of-accessible-name/mathematic-equations-written-differently-in-accname"
          dangerouslySetInnerHTML={{
            __html: `<a href="/" aria-label="Proof of two multiplied by two is four">Proof of 2&times;2=4</a>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-11"
          data-atomic-source="visible-text-part-of-accessible-name/option-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<!-- TODO: skipped due to OPTION being considered non-renderable by classifier and ignored -->
<option aria-label="hello">Hello world</option>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-12"
          data-atomic-source="visible-text-part-of-accessible-name/radio-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<label for="radio1"> Hello World </label>
<input type="radio" id="radio1" aria-label="hello" />`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-13"
          data-atomic-source="visible-text-part-of-accessible-name/role-checkbox-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<div role="checkbox" aria-label="terms & conditions">Accept terms and conditions</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-14"
          data-atomic-source="visible-text-part-of-accessible-name/role-gridcell-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<!-- TODO: requires non existing CompliantComponentGridCell detector -->
<div role="gridcell" aria-label="hello">Hello world</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-15"
          data-atomic-source="visible-text-part-of-accessible-name/role-link-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<span data-href="https://mozilla.org" tabindex="0" role="link" aria-label="fake link"> Fake accessible link created using a span </span>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-16"
          data-atomic-source="visible-text-part-of-accessible-name/role-menuitem-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<div role="menuitem" aria-label="Keyboard"> Keyboard interactions </div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-17"
          data-atomic-source="visible-text-part-of-accessible-name/role-menuitemcheckbox-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<!-- TODO: requires non existing CompliantComponentMenuItemCheckbox detector -->
<div role="menuitemcheckbox" aria-label="hello">Hello world</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-18"
          data-atomic-source="visible-text-part-of-accessible-name/role-menuitemradio-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<!-- TODO: requires non existing CompliantComponentMenuitemradio detector -->
<div role="menuitemradio" aria-label="hello">Hello world</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-19"
          data-atomic-source="visible-text-part-of-accessible-name/role-option-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<div role="option" aria-label="hello">Hello world</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-20"
          data-atomic-source="visible-text-part-of-accessible-name/role-radio-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<div role="radio" aria-label="hello">Hello world</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-21"
          data-atomic-source="visible-text-part-of-accessible-name/role-switch-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<div role="switch" aria-label="switch">Title of my switch</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-22"
          data-atomic-source="visible-text-part-of-accessible-name/role-tab-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<div role="tab" tabindex="0" aria-label="tab title">Title of my tab</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-23"
          data-atomic-source="visible-text-part-of-accessible-name/role-treeitem-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<!-- TODO: test is skipped due to non-existing CompliantComponentTreeItem detector -->
<div role="treeitem" aria-label="Hello">Hello world</div>`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-24"
          data-atomic-source="visible-text-part-of-accessible-name/searchbox-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<!-- TODO: requires non existant CompliantComponentSearchbox detector -->
<label for="searchbox">Search</label>
<input id="searchbox" type="search" aria-label="Find" />`,
          }}
        />
        <div
          className="list-item"
          id="errors-broken-aria-labels-failure-failure-25"
          data-atomic-source="visible-text-part-of-accessible-name/switch-visible-text-is-different-from-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<label for="id-switch-1">Hello world</label>
<input id="id-switch-1" type="checkbox" role="switch" aria-label="hello" />`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BrokenarialabelsFailure;
