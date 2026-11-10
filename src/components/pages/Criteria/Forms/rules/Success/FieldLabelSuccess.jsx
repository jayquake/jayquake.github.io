/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): input-discernible
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Forms: Field Label - Success";

const FieldLabelSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-field-label-success-success-1"
          data-atomic-source="input-discernible/div-contenteditable-without-label"
          dangerouslySetInnerHTML={{
            __html: `<!--
    CompliantComponentInput matches \`[contenteditable]:not([contenteditable='false'])\`, so this div is an input
    component with no accessible name. It is also name-prohibited, so the remediation's \`aria-label\` fallback would
    never be exposed - the node is out of this rule's scope.
-->
<div class="comment-box" contenteditable="true" style="min-height: 40px; border: 1px solid #333"></div>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-2"
          data-atomic-source="input-discernible/input-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<input type="text" id="username" aria-label="Username" />`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-3"
          data-atomic-source="input-discernible/input-with-for-attr-for-element"
          dangerouslySetInnerHTML={{
            __html: `<label for="username">Username</label>
<input type="text" name="username" id="username">`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-4"
          data-atomic-source="input-discernible/input-with-implicit-label"
          dangerouslySetInnerHTML={{
            __html: `<label>
  Username
  <input type="text" name="username" id="username" />
</label>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-5"
          data-atomic-source="input-discernible/input-with-label-element"
          dangerouslySetInnerHTML={{
            __html: `<input type="text" aria-labelledby="username" />
<label id="username">Username</label>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-6"
          data-atomic-source="input-discernible/input-with-label-with-describedby"
          dangerouslySetInnerHTML={{
            __html: `<form>
    <label for="fname">First name</label>
    <input aria-describedby="int2" autocomplete="given-name" id="fname" type="text">
    <p id="int2">Your first name is sometimes called your "given name".</p>
  </form>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-7"
          data-atomic-source="input-discernible/input-with-labelled-by-and-described-by"
          dangerouslySetInnerHTML={{
            __html: `<label id="username">Username</label>
<input type="text" aria-labelledby="username" aria-describedby="usernameHint" />
<span id="usernameHint">Enter your username, which is usually your email address.</span>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-8"
          data-atomic-source="input-discernible/input-with-labelled-by-element"
          dangerouslySetInnerHTML={{
            __html: `<input type="text" aria-labelledby="username" />
<label id="username">Username</label>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-9"
          data-atomic-source="input-discernible/select-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<select id="username" aria-label="Username"></select>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-10"
          data-atomic-source="input-discernible/select-with-for-attr-for-element"
          dangerouslySetInnerHTML={{
            __html: `<label for="username">Username</label>
<select name="username" id="username"></select>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-11"
          data-atomic-source="input-discernible/select-with-label-element"
          dangerouslySetInnerHTML={{
            __html: `<label id="username">Username</label>
<select aria-labelledby="username"></select>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-12"
          data-atomic-source="input-discernible/textarea-with-aria-label"
          dangerouslySetInnerHTML={{
            __html: `<textarea id="username" aria-label="Username"></textarea>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-13"
          data-atomic-source="input-discernible/textarea-with-for-attr-for-element"
          dangerouslySetInnerHTML={{
            __html: `<label for="username">Username</label>
<textarea name="username" id="username"></textarea>`,
          }}
        />
        <div
          className="list-item"
          id="forms-field-label-success-success-14"
          data-atomic-source="input-discernible/textarea-with-label-element"
          dangerouslySetInnerHTML={{
            __html: `<label id="username">Username</label>
<textarea aria-labelledby="username"></textarea>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default FieldLabelSuccess;
