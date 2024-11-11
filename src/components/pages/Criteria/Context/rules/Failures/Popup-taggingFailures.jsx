import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Context : Popup Tagging - Failure";

export default () => (
  <IssueFailure
    itemContent={
      <>
        <div className="list-item" id="popup-tagging-failure-1">
          <div className="my-popup" role="dialog">Popup Content</div>
        </div>
        <div className="list-item" id="popup-tagging-failure-2">
          <div className="my-popup" aria-modal="true">Popup Content</div>
        </div>
        <div className="list-item" id="popup-tagging-failure-3">
          <div className="my-popup">Popup Content</div>
        </div>
        <div className="list-item" id="popup-tagging-failure-4">
          <div className="my-popup" role="dialog" aria-modal="true" aria-hidden="true">Popup Content</div>
        </div>
        <div className="list-item" id="popup-tagging-failure-5">
          <div className="my-popup" role="alertdialog">Popup Content</div>
        </div>
        <div className="list-item" id="popup-tagging-failure-6">
          <div className="my-popup" role="dialog" aria-live="polite">Popup Content</div>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);
