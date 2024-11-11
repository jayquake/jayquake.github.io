import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";
const itemDescription = "Navigation: Button Roles - Failures";
export default () => (
  <IssueFailure itemContent={
    <>
      <li className="list-item" id="failure-button-role-1"><a href="#" id="failure-button-1">Click Me</a></li>
      <li className="list-item" id="failure-button-role-2"><div id="failure-button-2" tabIndex="0" onClick={() => alert("Clicked")}>Submit</div></li>
      <li className="list-item" id="failure-button-role-3"><span id="failure-button-3" tabIndex="0" onClick={() => alert("Clicked")}>Proceed</span></li>
      <li className="list-item" id="failure-button-role-4"><a href="#" id="failure-button-4">Next</a></li>
      <li className="list-item" id="failure-button-role-5"><span id="failure-button-5" tabIndex="0" onClick={() => alert("Clicked")}>Learn More</span></li>
      <li className="list-item" id="failure-button-role-6"><div id="failure-button-6" tabIndex="0" onClick={() => alert("Clicked")}>Continue</div></li>
    </>
  } itemDescription={itemDescription} />
);
