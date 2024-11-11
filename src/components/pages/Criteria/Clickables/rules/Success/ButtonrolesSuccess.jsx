import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";
const itemDescription = "Navigation: Button Roles - Success";
export default () => (
  <IssueSuccess itemContent={
    <>
      <li className="list-item" id="success-button-role-1"><button id="success-button-1">Click Me</button></li>
      <li className="list-item" id="success-button-role-2"><a role="button" id="success-button-2" tabIndex="0">Submit</a></li>
      <li className="list-item" id="success-button-role-3"><div role="button" id="success-button-3" tabIndex="0" onClick={() => alert("Clicked")}>Press</div></li>
      <li className="list-item" id="success-button-role-4"><span role="button" id="success-button-4" tabIndex="0" onClick={() => alert("Clicked")}>Proceed</span></li>
      <li className="list-item" id="success-button-role-5"><a role="button" id="success-button-5" tabIndex="0">Next Step</a></li>
      <li className="list-item" id="success-button-role-6"><div role="button" id="success-button-6" tabIndex="0" onClick={() => alert("Clicked")}>More Info</div></li>
    </>
  } itemDescription={itemDescription} />
);
