import React, { useState } from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation : Submenu State - Failure";

const InvalidMenuTrigger = ({ label, menuId }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => setIsExpanded((prev) => !prev);

  return (
    <div className="menu-container">
      <button onClick={toggleMenu} className="menu-trigger">
        {label}
      </button>
      <ul id={menuId} hidden={!isExpanded}>
        <li>Option 1</li>
        <li>Option 2</li>
        <li>Option 3</li>
      </ul>
    </div>
  );
};

export default () => (
  <IssueFailure
    itemContent={
      <>
        <li className="list-item" id="submenu-state-failure-1">
          <InvalidMenuTrigger label="Menu 1" menuId="menu1" />
        </li>
        <li className="list-item" id="submenu-state-failure-2">
          <InvalidMenuTrigger label="Menu 2" menuId="menu2" />
        </li>
        <li className="list-item" id="submenu-state-failure-3">
          <InvalidMenuTrigger label="Menu 3" menuId="menu3" />
        </li>
        <li className="list-item" id="submenu-state-failure-4">
          <InvalidMenuTrigger label="Settings" menuId="settingsMenu" />
        </li>
        <li className="list-item" id="submenu-state-failure-5">
          <InvalidMenuTrigger label="Account Options" menuId="accountMenu" />
        </li>
        <li className="list-item" id="submenu-state-failure-6">
          <InvalidMenuTrigger label="More Actions" menuId="actionsMenu" />
        </li>
      </>
    }
    itemDescription={itemDescription}
  />
);