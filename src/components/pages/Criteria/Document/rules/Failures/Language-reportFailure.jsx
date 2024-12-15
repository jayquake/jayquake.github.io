import React, { useState } from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Document: Language Report - Failure";

// JavaScript function to set the `lang` attribute
function simulatePage(lang) {
  document.documentElement.lang = lang;
}

export default () => {
  const [currentFailure, setCurrentFailure] = useState(null);

  // List of invalid lang attributes for failure simulation
  const failureCases = [
    { id: "language-report-failure-1", lang: "", description: 'Failure 1: lang=""' },
    { id: "language-report-failure-2", lang: " ", description: 'Failure 2: lang=" "' },
    { id: "language-report-failure-3", lang: "123", description: 'Failure 3: lang="123"' },
    { id: "language-report-failure-4", lang: "en-us-es", description: 'Failure 4: lang="en-us-es"' },
    { id: "language-report-failure-5", lang: "undefined", description: 'Failure 5: lang="undefined"' },
    { id: "language-report-failure-6", lang: null, description: "Failure 6: lang=null" },
  ];

  const navigateToFailure = (failure) => {
    simulatePage(failure.lang);
    setCurrentFailure(failure.description);
    console.log(`Navigated to page with lang="${failure.lang}"`);
  };

  return (
    <IssueFailure
      itemContent={
        <>
          <div>
            <h2>Navigate to Failure Pages</h2>
            <ul>
              {failureCases.map((failure, index) => (
                <li key={failure.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToFailure(failure);
                    }}
                  >
                    {failure.description}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="failure-details">
            <h3>Current Failure Page</h3>
            <p>{currentFailure || "No page selected yet."}</p>
          </div>
        </>
      }
      itemDescription={itemDescription}
    />
  );
};