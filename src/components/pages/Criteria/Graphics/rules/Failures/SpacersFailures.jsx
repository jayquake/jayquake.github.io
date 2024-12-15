import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Icons : Spacers - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="icon-discernible-failure-1">
          <p>Failure: Icon labeled unnecessarily for assistive technology.</p>
          <i
            className="fa fa-circle"
            role="img"
            aria-label="Decorative spacer icon"
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              color: "gray",
            }}
          ></i>
          <p>Example incomplete.</p>
        </div>
        <div className="list-item" id="icon-discernible-failure-2">
          <p>Failure: SVG spacer given an aria-label.</p>
          <svg
            aria-label="Spacer circle"
            style={{ width: "20px", height: "20px", fill: "gray" }}
          >
            <circle cx="10" cy="10" r="10" />
          </svg>
          <p>Example incomplete.</p>
        </div>
        <div className="list-item" id="icon-discernible-failure-3">
          <p>Failure: Icon with role="img" unnecessarily exposed.</p>
          <i
            className="fa fa-square"
            role="img"
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              color: "lightgray",
            }}
          ></i>
          <p>Example incomplete.</p>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);