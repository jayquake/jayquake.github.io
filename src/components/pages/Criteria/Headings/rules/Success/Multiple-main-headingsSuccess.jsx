import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Headings: Multiple Main Headings - Success";

export default () => (
  <IssueSuccess
    itemContent={
      <>
        <div className="list-item" id="multipleMainHeadings-success-1">
          <h1>Welcome to Our Website</h1>
        </div>
        <div className="list-item" id="multipleMainHeadings-success-2">
          <h2>About Our Services</h2>
        </div>
        <div className="list-item" id="multipleMainHeadings-success-3">
          <h3>Contact Us</h3>
        </div>
        <div className="list-item" id="multipleMainHeadings-success-4">
          <h4>FAQs</h4>
        </div>
        <div className="list-item" id="multipleMainHeadings-success-5">
          <h5>Company History</h5>
        </div>
        <div className="list-item" id="multipleMainHeadings-success-6">
          <h6>Our Team</h6>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);