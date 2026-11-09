/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): search-form-mismatch
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Forms: Search Form Tagging - Success";

const SearchFormTaggingSuccess = () => (
  <IssueSuccess
    itemContent={
      <>
        <div
          className="list-item"
          id="forms-search-form-tagging-success-success-1"
          data-atomic-source="search-form-mismatch/search-form-parent-role-search"
          dangerouslySetInnerHTML={{
            __html: `<html lang="he">
  <style>
    form {
      width: 400px;
    }

    textarea {
      width: 100%;
    }
  </style>

  <div role="search">
    <form>
      <textarea placeholder="חיפוש"></textarea>
      <button type="submit"></button>
    </form>
  </div>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="forms-search-form-tagging-success-success-2"
          data-atomic-source="search-form-mismatch/search-form-parent-search-landmark"
          dangerouslySetInnerHTML={{
            __html: `<html lang="he">
  <style>
    form {
      width: 400px;
    }

    textarea {
      width: 100%;
    }
  </style>

  <search>
    <form>
      <textarea placeholder="חיפוש"></textarea>
      <button type="submit"></button>
    </form>
  </search>
</html>`,
          }}
        />
        <div
          className="list-item"
          id="forms-search-form-tagging-success-success-3"
          data-atomic-source="search-form-mismatch/search-form-role-search"
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

  <form role="search">
    <textarea placeholder="חיפוש"></textarea>
    <button type="submit"></button>
  </form>
</html>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default SearchFormTaggingSuccess;
