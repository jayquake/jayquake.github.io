/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): search-form-mismatch
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Forms: Search Form Tagging - Failure";

const SearchFormTaggingFail = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-search-form-tagging-failure-failure-1"
          data-atomic-source="search-form-mismatch/search-form-no-role"
          dangerouslySetInnerHTML={{
            __html: `<html lang="he">
  <style>
    form {
      width: 400px;
    }

    input {
      width: 100%;
    }
  </style>

  <form>
    <textarea placeholder="חיפוש"></textarea>
    <button type="submit"></button>
  </form>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="forms-search-form-tagging-failure-failure-2"
          data-atomic-source="search-form-mismatch/search-form-parent-no-role"
          dangerouslySetInnerHTML={{
            __html: `<html lang="he">
  <style>
    form {
      width: 400px;
    }

    input {
      width: 100%;
    }
  </style>

  <div role="main">
    <form>
      <textarea placeholder="חיפוש"></textarea>
      <button type="submit"></button>
    </form>
  </div>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SearchFormTaggingFail;
