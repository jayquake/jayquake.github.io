import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Headings: Main Heading - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="mainHeading-failure-1">
          <div className="main-header">Welcome to Our Website</div>
        </div>
        <div className="list-item" id="mainHeading-failure-2">
          <h2>About Us</h2>
        </div>
        <div className="list-item" id="mainHeading-failure-3">
          <p>Contact Information</p>
        </div>
        <div className="list-item" id="mainHeading-failure-4">
          <h1></h1>
        </div>
        <div className="list-item" id="mainHeading-failure-5">
          <span>Main Heading: Our Services</span>
        </div>
        <div className="list-item" id="mainHeading-failure-6">
          <h1 style={{ display: "none" }}>Latest News</h1>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);