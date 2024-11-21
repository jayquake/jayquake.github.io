import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: Broken Aria Reference - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="brokenAriaReference-failure-1">
          <p>Input field with aria-labelledby referencing a non-existent ID.</p>
          <label id="name-label" htmlFor="name-input">Name</label>
          <input id="name-input" type="text" aria-labelledby="non-existent-id" />
        </div>
        
        <div className="list-item" id="brokenAriaReference-failure-2">
          <p>Input field with aria-describedby referencing a non-existent ID.</p>
          <input id="password-input" type="password" aria-describedby="non-existent-instructions" />
        </div>
        
        <div className="list-item" id="brokenAriaReference-failure-3">
          <p>Button with aria-controls referencing a non-existent element.</p>
          <button aria-controls="non-existent-menu" aria-expanded="false">Toggle Menu</button>
        </div>
        
        <div className="list-item" id="brokenAriaReference-failure-4">
          <p>Listbox with aria-owns referencing non-existent option elements.</p>
          <div role="listbox" id="listbox" aria-owns="non-existent-option">
            <div id="option1" role="option">Option 1</div>
          </div>
        </div>
        
        <div className="list-item" id="brokenAriaReference-failure-5">
          <p>Autocomplete input with aria-activedescendant referencing a non-existent suggestion.</p>
          <ul id="autocomplete-list" role="listbox">
            <li id="suggestion1" role="option">Suggestion 1</li>
          </ul>
          <input type="text" aria-activedescendant="non-existent-suggestion" aria-owns="autocomplete-list" />
        </div>
        
        <div className="list-item" id="brokenAriaReference-failure-6">
          <p>Search input field with aria-labelledby referencing a non-existent label.</p>
          <input id="search-input" type="search" aria-labelledby="non-existent-label" />
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);
