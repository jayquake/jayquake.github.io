import React, { useState } from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Visually Hidden Content: Fake Hidden Content - Failure";

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IssueFailure
      itemContent={
        <>
          <div className="list-item" id="fake-hidden-failure-1">
            <div className="popup" aria-hidden="true">
              <p>Popup content is visible but marked hidden.</p>
            </div>
          </div>

          <div className="list-item" id="fake-hidden-failure-2">
            <div className="hidden-content">
              <p>Visually hidden content is accessible.</p>
            </div>
          </div>

          <div className="list-item" id="fake-hidden-failure-3">
            <div id="tab1">
              <p>Tab content is accessible without hidden attribute.</p>
            </div>
          </div>

          <div className="list-item" id="fake-hidden-failure-4">
            <div aria-hidden="false">
              <p>Tooltip content is hidden but marked as visible.</p>
            </div>
          </div>

          <div className="list-item" id="fake-hidden-failure-5">
            <div className={`modal ${isOpen ? "visible" : ""}`} aria-hidden="true">
              <p>Modal content is visible but marked as hidden.</p>
            </div>
          </div>

          <div className="list-item" id="fake-hidden-failure-6">
            <ul className={isOpen ? "" : "hidden"}>
              <li>Option 1</li>
              <li>Option 2</li>
            </ul>
          </div>
        </>
      }
      itemDescription={itemDescription}
    />
  );
};