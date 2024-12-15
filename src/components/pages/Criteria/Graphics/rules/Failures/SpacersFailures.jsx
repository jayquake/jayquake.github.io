import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Graphics : Spacers - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="spacers-failure-1">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div
            style={{
              height: "20px",
              background: "#e0e0e0",
              width: "100%",
            }}
            role="img"
            aria-label="Spacer element"
          ></div>
          <p>Nullam vel risus ac risus feugiat fermentum.</p>
        </div>
        <div className="list-item" id="spacers-failure-2">
          <p>Curabitur vitae libero non justo aliquam fermentum.</p>
          <span
            style={{
              display: "block",
              width: "100%",
              height: "15px",
              background: "#ccc",
            }}
            aria-label="Spacing element"
          ></span>
          <p>Ut convallis nisi sit amet ex convallis volutpat.</p>
        </div>
        <div className="list-item" id="spacers-failure-3">
          <p>Pellentesque eget lacus non odio volutpat scelerisque.</p>
          <div
            style={{
              marginTop: "10px",
              height: "20px",
              background: "#d6d6d6",
            }}
            role="img"
          ></div>
          <p>Fusce gravida mi nec ligula sagittis feugiat.</p>
        </div>
        <div className="list-item" id="spacers-failure-4">
          <p>Mauris lacinia erat sed nulla dapibus dapibus.</p>
          <hr
            aria-label="Decorative horizontal line"
            style={{
              border: "none",
              height: "1px",
              background: "#aaa",
              margin: "15px 0",
            }}
          />
          <p>Phasellus vulputate est et felis placerat, a lacinia massa.</p>
        </div>
        <div className="list-item" id="spacers-failure-5">
          <p>Donec efficitur, urna in convallis tempus, elit elit fermentum eros.</p>
          <div
            role="img"
            style={{
              height: "30px",
              width: "100%",
              background: "#e6e6e6",
            }}
            aria-label="Spacer"
          ></div>
          <p>Aliquam vehicula ex ut risus venenatis congue.</p>
        </div>
        <div className="list-item" id="spacers-failure-6">
          <p>Proin vel nunc ac nulla cursus fringilla sit amet non lacus.</p>
          <span
            style={{
              display: "inline-block",
              width: "20px",
              height: "20px",
              background: "#ccc",
            }}
            role="img"
          ></span>
          <p>Sed quis arcu nec sapien scelerisque facilisis.</p>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);