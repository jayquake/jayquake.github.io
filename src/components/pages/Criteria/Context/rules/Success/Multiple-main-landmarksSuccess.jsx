import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Context : Multiple Main Landmarks - Success";

export default () => (
  <IssueSuccess
    itemContent={
      <>
        <div className="list-item" id="multiple-main-success-1">
          <main>
            <h1>Main Content for Page</h1>
          </main>
        </div>
       
      </>
    }
    itemDescription={itemDescription}
  />
);
