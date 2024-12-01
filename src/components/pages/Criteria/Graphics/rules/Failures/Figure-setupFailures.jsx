import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Graphics : Figure Setup - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="figure-setup-failure-1">
          <figure>
            <img src="https://via.placeholder.com/300" alt="A scenic view of mountains" />
          </figure>
        </div>
        <div className="list-item" id="figure-setup-failure-2">
          <figure role="presentation">
            <img src="https://via.placeholder.com/300" alt="A calm lake at sunset" />
          </figure>
        </div>
        <div className="list-item" id="figure-setup-failure-3">
          <figure>
            <img src="https://via.placeholder.com/300" alt="" />
          </figure>
        </div>
        <div className="list-item" id="figure-setup-failure-4">
          <figure>
            <img src="https://via.placeholder.com/300" alt="A smiling child holding balloons" />
          </figure>
        </div>
        <div className="list-item" id="figure-setup-failure-5">
          <img src="https://via.placeholder.com/300" />
        </div>
        <div className="list-item" id="figure-setup-failure-6">
          <figure>
            <img src="https://via.placeholder.com/300" alt="A busy city street at night" />
            <figcaption></figcaption>
          </figure>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);