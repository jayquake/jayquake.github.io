import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Graphics: Spacers - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="spacers-failure-1">
          <img src="https://via.placeholder.com/150" alt="spacer graphic" />
        </div>
        <div className="list-item" id="spacers-failure-2">
          <img src="https://via.placeholder.com/100" alt="important icon" />
        </div>
        <div className="list-item" id="spacers-failure-3">
          <img src="https://via.placeholder.com/200" alt="This is a pattern" />
        </div>
        <div className="list-item" id="spacers-failure-4">
          <img src="https://via.placeholder.com/50" alt="background image" />
        </div>
        <div className="list-item" id="spacers-failure-5">
          <img src="https://via.placeholder.com/300x50" alt="border decoration" />
        </div>
        <div className="list-item" id="spacers-failure-6">
          <img src="https://via.placeholder.com/400x200" alt="wave design" />
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);