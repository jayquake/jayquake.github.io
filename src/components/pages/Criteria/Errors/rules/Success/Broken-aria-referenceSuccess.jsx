import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Errors: Broken Aria Reference - Success";

export default () => (
  <IssueSuccess
    itemContent={
      <>
        <div className="list-item" id="ariaReference-success-1">
          <label id="name-label" htmlFor="name-input">Name</label>
          <input id="name-input" type="text" aria-labelledby="name-label" />
        </div>
        
        <div className="list-item" id="ariaReference-success-2">
          <p id="password-instructions">Password must be at least 8 characters long.</p>
          <input id="password-input" type="password" aria-describedby="password-instructions" />
        </div>
        
        <div className="list-item" id="ariaReference-success-3">
          <button aria-controls="dropdown-menu" aria-expanded="false">Toggle Menu</button>
          <ul id="dropdown-menu" hidden>
            <li>Option 1</li>
            <li>Option 2</li>
          </ul>
        </div>
        
        <div className="list-item" id="ariaReference-success-4">
          <div role="listbox" id="listbox" aria-owns="option1 option2">
            <div id="option1" role="option">Option 1</div>
            <div id="option2" role="option">Option 2</div>
          </div>
        </div>
        
        <div className="list-item" id="ariaReference-success-5">
          <ul id="autocomplete-list" role="listbox">
            <li id="suggestion1" role="option">Suggestion 1</li>
            <li id="suggestion2" role="option">Suggestion 2</li>
          </ul>
          <input type="text" aria-activedescendant="suggestion1" aria-owns="autocomplete-list" />
        </div>
        
        <div className="list-item" id="ariaReference-success-6">
          <input id="search-input" type="search" aria-labelledby="search-label" />
          <label id="search-label" htmlFor="search-input">Search</label>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);