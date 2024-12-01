import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Graphics: Alt Text - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="altText-failure-1">
          <img src="https://via.placeholder.com/150" alt="" />
        </div>
        <div className="list-item" id="altText-failure-2">
          <img src="https://via.placeholder.com/200" alt="image1234" />
        </div>
        <div className="list-item" id="altText-failure-3">
          <img src="https://via.placeholder.com/250" />
        </div>
        <div className="list-item" id="altText-failure-4">
          <img src="https://via.placeholder.com/300" alt=" " />
        </div>
        <div className="list-item" id="altText-failure-5">
          <img src="https://via.placeholder.com/350" alt="file_upload" />
        </div>
        <div className="list-item" id="altText-failure-6">
          <img src="https://via.placeholder.com/400" />
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);