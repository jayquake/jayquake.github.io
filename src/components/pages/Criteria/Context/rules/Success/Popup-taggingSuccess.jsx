import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Context : Popup Tagging - Success";

export default () => (
  <IssueSuccess
    itemContent={
      <>
        <div className="list-item" id="popup-tagging-success-1">
          <div className="my-popup" role="dialog" aria-modal="true">Popup Content</div>
        </div>
        <div className="list-item" id="popup-tagging-success-2">
          <div className="my-popup" role="dialog" aria-modal="true" aria-labelledby="popupTitle">Popup Content</div>
        </div>
        <div className="list-item" id="popup-tagging-success-3">
          <div className="my-popup" role="dialog" aria-modal="true" aria-describedby="popupDescription">Popup Content</div>
        </div>
        <div className="list-item" id="popup-tagging-success-4">
          <div className="my-popup" role="dialog" aria-modal="true" aria-labelledby="popupHeader">Popup Content</div>
        </div>
        <div className="list-item" id="popup-tagging-success-5">
          <div className="my-popup" role="dialog" aria-modal="true" aria-describedby="popupHelp">Popup Content</div>
        </div>
        <div className="list-item" id="popup-tagging-success-6">
          <div className="my-popup" role="dialog" aria-modal="true" aria-labelledby="titleLabel" aria-describedby="popupText">Popup Content</div>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);
