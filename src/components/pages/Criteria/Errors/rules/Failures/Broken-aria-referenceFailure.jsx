import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Broken Aria Reference - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="ariaReference-failure-1">
          <label id="name-label" htmlFor="name-input">Name</label>
          <input id="name-input" type="text" aria-labelledby="non-existent-id" />
        </div>
        
        <div className="list-item" id="ariaReference-failure-2">
          <input id="password-input" type="password" aria-describedby="non-existent-instructions" />
        </div>
        
        <div className="list-item" id="ariaReference-failure-3">
          <button aria-controls="non-existent-menu" aria-expanded="false">Toggle Menu</button>
        </div>
        
        <div className="list-item" id="ariaReference-failure-4">
          <div role="listbox" id="listbox" aria-owns="non-existent-option">
            <div id="option1" role="option">Option 1</div>
          </div>
        </div>
        
        <div className="list-item" id="ariaReference-failure-5">
          <ul id="autocomplete-list" role="listbox">
            <li id="suggestion1" role="option">Suggestion 1</li>
          </ul>
          <input type="text" aria-activedescendant="non-existent-suggestion" aria-owns="autocomplete-list" />
        </div>
        
        <div className="list-item" id="ariaReference-failure-6">
          <input id="search-input" type="search" aria-labelledby="non-existent-label" />
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);