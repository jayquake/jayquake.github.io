import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation : Broken Nav Items - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="brokenNavItems-failure-1">
          <a href="/home" role="menuitem">Home</a>
        </div>
        <div className="list-item" id="brokenNavItems-failure-2">
          <div role="menuitem" onClick={() => alert('Profile clicked!')}>Profile</div>
        </div>
        <div className="list-item" id="brokenNavItems-failure-3">
          <a href="/settings" role="menuitem">Settings</a>
        </div>
        <div className="list-item" id="brokenNavItems-failure-4">
          <div role="menuitem">About Us</div>
        </div>
        <div className="list-item" id="brokenNavItems-failure-5">
          <div role="menuitem" onClick={() => alert('Logout clicked!')}>Logout</div>
        </div>
        <div className="list-item" id="brokenNavItems-failure-6">
          <a href="/contact" role="menuitem">Contact Us</a>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);