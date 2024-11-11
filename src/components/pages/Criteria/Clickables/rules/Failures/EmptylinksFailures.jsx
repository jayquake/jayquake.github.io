import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Clickables : Empty Links - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <li className="list-item" id="rule-failure-1">
          <a href="https://example.com"></a>
        </li>
        <li className="list-item" id="rule-failure-2">
          <a href="https://example.com"><span aria-hidden="true">*</span></a>
        </li>
        <li className="list-item" id="rule-failure-3">
          <a href="https://example.com"><img src="icon.png" alt="" /></a>
        </li>
        <li className="list-item" id="rule-failure-4">
          <a href="https://example.com" aria-label=""></a>
        </li>
        <li className="list-item" id="rule-failure-5">
          <a href="https://example.com"><span></span></a>
        </li>
        <li className="list-item" id="rule-failure-6">
          <a href="https://example.com" aria-labelledby="unrelated-element"></a>
        </li>
      </>
    }
    itemDescription={itemDescription}
  />
);
