import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Graphics: Spacers - Success";

export default () => (
  <IssueSuccess
    itemContent={
      <>
        <div className="list-item" id="spacers-success-1">
          <img src="https://via.placeholder.com/150" alt="" role="presentation" />
        </div>
        <div className="list-item" id="spacers-success-2">
          <img src="https://via.placeholder.com/100" alt="Decorative" aria-hidden="true" />
        </div>
        <div className="list-item" id="spacers-success-3">
          <div aria-hidden="true">
            <img src="https://via.placeholder.com/200" alt="" />
          </div>
        </div>
        <div className="list-item" id="spacers-success-4">
          <img src="https://via.placeholder.com/50" alt="" aria-hidden="true" />
        </div>
        <div className="list-item" id="spacers-success-5">
          <div role="none">
            <img src="https://via.placeholder.com/300x50" alt="" />
          </div>
        </div>
        <div className="list-item" id="spacers-success-6">
          <img src="https://via.placeholder.com/400x200" alt="" style={{ visibility: "hidden" }} />
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);