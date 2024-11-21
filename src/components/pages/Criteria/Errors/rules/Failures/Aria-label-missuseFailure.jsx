import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Errors: ARIA Label Misuse - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
         <div className="list-item" id="aria-label-failure-1">
          {/* Incorrect: A div with visible text should not have an ARIA label */}
          <div aria-label="Error message">
            An error occurred. Please try again.
          </div>
        </div>
        <div className="list-item" id="aria-label-failure-2">
          {/* Incorrect: A span with visible error text does not need an ARIA label */}
          <span aria-label="Error label">Error: Invalid credentials</span>
        </div>
        <div className="list-item" id="aria-label-failure-3">
          {/* Incorrect: A paragraph with visible error text should not use ARIA labels */}
          <p aria-label="Error description">Invalid input. Check your data.</p>
        </div>
        <div className="list-item" id="aria-label-failure-4">
          {/* Incorrect: A heading with text should not have an ARIA label */}
          <h2 aria-label="Form error">Form contains errors</h2>
        </div>
        <div className="list-item" id="aria-label-failure-5">
          {/* Incorrect: A list of errors does not require an ARIA label */}
          <ul aria-label="Error list">
            <li>Password is too short.</li>
          </ul>
        </div>
        <div className="list-item" id="aria-label-failure-6">
          {/* Incorrect: An empty div with an ARIA label adds no value */}
          <div aria-label="Broken field"></div>
        </div>
        <div className="list-item" id="aria-labelledby-failure-1">
          {/* Incorrect: aria-labelledby references non-existent IDs */}
          <label id="username-label">Username</label>
          <input 
            type="text" 
            id="username-input" 
            aria-labelledby="username-label missing-error"
          />
          <span id="username-error" className="error-text">
            This ID is not referenced in aria-labelledby.
          </span>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);
