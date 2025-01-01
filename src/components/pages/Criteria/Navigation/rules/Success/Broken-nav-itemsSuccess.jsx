import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Navigation : Broken Nav Items - Success";

export default () => (
  <IssueSuccess
    itemContent={
      <>
        <div className="list-item" id="brokenNavItems-success-1">
          <a href="/home">Home</a>
        </div>
        <div className="list-item" id="brokenNavItems-success-2">
          <button onClick={() => alert('Profile clicked!')}>Profile</button>
        </div>
        <div className="list-item" id="brokenNavItems-success-3">
          <a href="/settings">Settings</a>
        </div>
        <div className="list-item" id="brokenNavItems-success-4">
          <a href="/about">About Us</a>
        </div>
        <div className="list-item" id="brokenNavItems-success-5">
          <button onClick={() => alert('Logout clicked!')}>Logout</button>
        </div>
        <div className="list-item" id="brokenNavItems-success-6">
          <a href="/contact">Contact Us</a>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);