import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const SearchFormMismatchFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Search Form Mismatch"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "search form no role", content: `<html lang="he">
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
</html>` },
  { filename: "search form parent no role", content: `<html lang="he">
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
</html>` }
      ]}
    />
  );
};

export default SearchFormMismatchFailure;
