import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Graphics : Figure Setup - Success";

export default () => (
  <IssueSuccess
    itemContent={
      <>
        <div className="list-item" id="figure-setup-success-1">
          <figure>
            <img src="https://via.placeholder.com/300" alt="A scenic view of mountains" />
            <figcaption>Photo taken in the Swiss Alps, July 2023.</figcaption>
          </figure>
        </div>
        <div className="list-item" id="figure-setup-success-2">
          <img src="https://via.placeholder.com/300" alt="A calm lake at sunset" />
        </div>
        <div className="list-item" id="figure-setup-success-3">
          <figure>
            <img src="https://via.placeholder.com/300" alt="Historical building" />
            <figcaption>Built in the 18th century in France.</figcaption>
          </figure>
        </div>
        <div className="list-item" id="figure-setup-success-4">
          <img src="https://via.placeholder.com/300" alt="A smiling child holding balloons" />
        </div>
        <div className="list-item" id="figure-setup-success-5">
          <figure>
            <img src="https://via.placeholder.com/300" alt="Abstract painting" />
            <figcaption>Painting by Artist XYZ, created in 2022.</figcaption>
          </figure>
        </div>
        <div className="list-item" id="figure-setup-success-6">
          <img src="https://via.placeholder.com/300" alt="A busy city street at night" />
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);