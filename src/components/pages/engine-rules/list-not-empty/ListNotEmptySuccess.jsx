import React from "react";
import EngineIssueSuccess from "../../../layout/engineIssueSuccess";

const ListNotEmptySuccess = () => {
  const ruleId = "list-not-empty";
  const title = `Lists should contain at least one list item`;
  const description = `An empty list will still be announced by screen readers, which may confuse users, leaving them unsure if the list is empty or an issue prevents the screen reader from announcing the list items.`;
  const helpText = `Remove the empty HTML list elements (<ul>/<ol>) or assign aria-hidden="true" to make sure they are ignored by screen readers.`;
  const bestPractices = [
  "Follow proper HTML semantics",
  "Ensure screen reader compatibility",
  "Test with assistive technologies"
  ];
  const htmlExamples = [
  { filename: "empty lists with aria hidden true", fixture: "list-not-empty/0-empty-lists-with-aria-hidden-true.html" },
  { filename: "list with invisible items", fixture: "list-not-empty/1-list-with-invisible-items.html" },
  { filename: "no empty lists", fixture: "list-not-empty/2-no-empty-lists.html" },
  { filename: "remediated list", fixture: "list-not-empty/3-remediated-list.html" },
  { filename: "role list with list items under div dividers", fixture: "list-not-empty/4-role-list-with-list-items-under-div-dividers.html" },
  { filename: "role list with list items", fixture: "list-not-empty/5-role-list-with-list-items.html" }
  ];

  return (
    <EngineIssueSuccess
      ruleId={ruleId}
      title={title}
      description={description}
      helpText={helpText}
      bestPractices={bestPractices}
      htmlExamples={htmlExamples}
    />
  );
};

export default ListNotEmptySuccess;
