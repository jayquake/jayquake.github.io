import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Headings : Empty Headings - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="empty-headings-failure-1">
          <h1></h1>
        </div>
        <div className="list-item" id="empty-headings-failure-2">
          <h2> </h2>
        </div>
        <div className="list-item" id="empty-headings-failure-3">
          <h3>&nbsp;</h3>
        </div>
        <div className="list-item" id="empty-headings-failure-4">
          <h4>No Title</h4>
        </div>
        <div className="list-item" id="empty-headings-failure-5">
          <h5>Heading Placeholder</h5>
        </div>
        <div className="list-item" id="empty-headings-failure-6">
          <h6>Untitled Section</h6>
        </div>
        <div className="list-item" id="empty-headings-failure-1">
          <h1 aria-level="2"></h1>
        </div>
        <div className="list-item" id="empty-headings-failure-2">
          <div role="heading" aria-level="3"></div>
        </div>
        <div className="list-item" id="empty-headings-failure-3">
          <h2 aria-hidden="true"></h2>
        </div>
        <div className="list-item" id="empty-headings-failure-4">
          <h3 tabindex="-1"></h3>
        </div>
        <div className="list-item" id="empty-headings-failure-5">
          <div role="heading" aria-level="1"> </div>
        </div>
        <div className="list-item" id="empty-headings-failure-6">
          <h4 aria-level="5">Untitled</h4>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);