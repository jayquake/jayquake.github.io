import React from "react";
import IssueSuccess from "../../../../../layout/issueSuccess";

const itemDescription = "Button Roles - Success";

export default () => (
  <IssueSuccess
    itemContent={
      <>
        <div className="list-item" id="button-role-1">
          <button role="button" onClick={() => alert('Standard Button Clicked!')}>
            Standard Button
          </button>
        </div>

        <div className="list-item" id="button-role-2">
          <button role="link" onClick={() => alert('Navigating to link...')}>
            Link Button
          </button>
        </div>

        <div className="list-item" id="button-role-3">
          <button role="menuitem" onClick={() => alert('Menu Item Selected!')}>
            Menu Item Button
          </button>
        </div>

        <div className="list-item" id="button-role-4">
          <button role="tab" onClick={() => alert('Tab Selected!')}>
            Tab Button
          </button>
        </div>

        <div className="list-item" id="button-role-5">
          <button role="switch" aria-checked="false" onClick={() => alert('Switch Toggled!')}>
            Toggle Switch
          </button>
        </div>

        <div className="list-item" id="button-role-6">
          <button role="checkbox" aria-checked="false" onClick={() => alert('Checkbox Checked!')}>
            Checkbox Button
          </button>
        </div>

        <div className="list-item" id="button-role-7">
          <button role="radio" aria-checked="false" onClick={() => alert('Radio Selected!')}>
            Radio Button
          </button>
        </div>

        <div className="list-item" id="button-role-8">
          <button role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
            Loading Progress
          </button>
        </div>

        <div className="list-item" id="button-role-9">
          <button role="alert" onClick={() => alert('Alert triggered!')}>
            Alert Button
          </button>
        </div>

        <div className="list-item" id="button-role-10">
          <button role="presentation" onClick={() => alert('Presentation button clicked!')}>
            Presentation Button
          </button>
        </div>
      </>
    }
    itemDescription={itemDescription}
  />
);