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
        <a target="_blank" aria-label="Dribble" class="btn-new silent compensate-left e16fm13v0 e1of9yu15 css-6x6bk e1figufi0" href="https://dribbble.com/sentry/"><svg aria-hidden="true" class="css-35hz2d e1of9yu14" viewBox="0 0 16 16" version="1.1"><path d="M8,16a8,8,0,1,1,8-8A8,8,0,0,1,8,16Zm6.75-6.9a10,10,0,0,0-4.26-.29,29.49,29.49,0,0,1,1.33,4.87A6.84,6.84,0,0,0,14.75,9.1ZM10.67,14.3A28.41,28.41,0,0,0,9.21,9.12,9.38,9.38,0,0,0,3.81,13.4,6.86,6.86,0,0,0,10.67,14.3ZM2.92,12.58A10.75,10.75,0,0,1,8.75,8C8.58,7.6,8.39,7.21,8.19,6.83a25.21,25.21,0,0,1-7,1A6.77,6.77,0,0,0,2.92,12.58Zm-1.61-6a25.49,25.49,0,0,0,6.32-.83,43.6,43.6,0,0,0-2.53-4A6.86,6.86,0,0,0,1.31,6.61ZM6.4,1.37a36.47,36.47,0,0,1,2.55,4A7.72,7.72,0,0,0,12.53,2.9,6.79,6.79,0,0,0,6.4,1.37Zm6.89,2.32A9.1,9.1,0,0,1,9.47,6.38c0.16,0.33.44,0.89,0.6,1.34a16,16,0,0,1,4.76.22A6.8,6.8,0,0,0,13.29,3.69Z" fill="currentColor"></path></svg><span class="silent css-17qgsod e1of9yu11">Dribbble</span></a>
      </>
    }
    itemDescription={itemDescription}
  />
);
