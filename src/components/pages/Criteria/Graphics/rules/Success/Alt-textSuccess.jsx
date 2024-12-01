import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Graphics: Alt Text - Success";

export default () => (
  <IssueSuccess
    itemContent={
      <>
        <div className="list-item" id="altText-success-1">
          <img src="https://via.placeholder.com/150" alt="A fluffy orange cat sitting on a windowsill" />
        </div>
        <div className="list-item" id="altText-success-2">
          <img src="https://via.placeholder.com/200" alt="A scenic sunset over a mountain range" />
        </div>
        <div className="list-item" id="altText-success-3">
          <img src="https://via.placeholder.com/250" alt="Bar chart showing sales trends over the last quarter" />
        </div>
        <div className="list-item" id="altText-success-4">
          <img src="https://via.placeholder.com/300" alt="Company logo for Tech Solutions Inc." />
        </div>
        <div className="list-item" id="altText-success-5">
          <img src="https://via.placeholder.com/350" alt="Map highlighting the location of the new store" />
        </div>
        <div className="list-item" id="altText-success-6">
          <img src="https://via.placeholder.com/400" alt="Team of five people smiling and standing together" />
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);