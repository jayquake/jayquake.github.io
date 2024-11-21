import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Errors: Broken Aria Reference - Success";

export default () => (
  <IssueSuccess
    itemContent={
      <>
        <div className="list-item" id="brokenAriaReference-success-1">
          <p>Input field with valid aria-labelledby pointing to an existing label.</p>
          <label id="name-label" htmlFor="name-input">Name</label>
          <input id="name-input" type="text" aria-labelledby="name-label" />
        </div>
        
        <div className="list-item" id="brokenAriaReference-success-2">
          <p>Input field with valid aria-describedby pointing to helper text.</p>
          <p id="password-instructions">Password must be 8-20 characters long.</p>
          <input id="password-input" type="password" aria-describedby="password-instructions" />
        </div>
        
        <div className="list-item" id="brokenAriaReference-success-3">
          <p>Button with aria-controls pointing to a valid menu element.</p>
          <button aria-controls="dropdown-menu" aria-expanded="false">Toggle Menu</button>
          <ul id="dropdown-menu" hidden>
            <li><a href="#">Option 1</a></li>
            <li><a href="#">Option 2</a></li>
          </ul>
        </div>
        
        <div className="list-item" id="brokenAriaReference-success-4">
          <p>Listbox with aria-owns referencing valid option elements.</p>
          <div role="listbox" id="listbox" aria-owns="option1 option2">
            <div id="option1" role="option">Option 1</div>
            <div id="option2" role="option">Option 2</div>
          </div>
        </div>
        
        <div className="list-item" id="brokenAriaReference-success-5">
          <p>Autocomplete input with aria-activedescendant referencing a valid suggestion.</p>
          <ul id="autocomplete-list" role="listbox">
            <li id="suggestion1" role="option">Suggestion 1</li>
            <li id="suggestion2" role="option">Suggestion 2</li>
          </ul>
          <input type="text" aria-activedescendant="suggestion1" aria-owns="autocomplete-list" />
        </div>
        
        <div className="list-item" id="brokenAriaReference-success-6">
          <p>Search input field with aria-labelledby referencing a valid label.</p>
          <input id="search-input" type="search" aria-labelledby="search-label" />
          <label id="search-label" htmlFor="search-input">Search</label>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);
