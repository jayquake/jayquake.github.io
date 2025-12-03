import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const SearchFormMismatchSuccess = () => {
  return (
    <EngineIssueSuccess
      ruleId="N/A"
      title="Search Form Mismatch"
      description="N/A"
      helpText="N/A"
      bestPractices={[
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
      ]}
      htmlExamples={[
  { filename: "search form parent role search", content: `<html lang="he">
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
</html>` },
  { filename: "search form parent search landmark", content: `<html lang="he">
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
</html>` },
  { filename: "search form role search", content: `<html lang="he">
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
</html>` }
      ]}
    />
  );
};

export default SearchFormMismatchSuccess;
