import React from "react";
import EngineIssueFailure from "../../../layout/engineIssueFailure";

const MenuBarAvoidFailure = () => {
  return (
    <EngineIssueFailure
      ruleId="N/A"
      title="Menu Bar Avoid"
      description="N/A"
      helpText="N/A"
      fixSteps={[
  "Review the HTML structure",
  "Apply proper accessibility attributes",
  "Test with screen readers"
      ]}
      htmlExamples={[
  { filename: "div role menubar containing div role menubar", content: `<div id="test-subject1" role="menubar" aria-label="Main navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="fileMenuButton" onclick="toggleMenu('fileMenu')">File</div>
  <div id="fileMenu" role="menubar" aria-labelledby="fileMenuButton">
    <div role="menuitem" tabindex="-1" onclick="newFile()">New</div>
    <div role="menuitem" tabindex="-1" onclick="openFile()">Open</div>
    <div role="menuitem" tabindex="-1" onclick="saveFile()">Save</div>
  </div>
</div>` },
  { filename: "div role menubar containing hidden div role menubar", content: `<div id="test-subject1" role="menubar" aria-label="Main navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="fileMenuButton" onclick="toggleMenu('fileMenu')">File</div>
  <div id="fileMenu" role="menubar" aria-labelledby="fileMenuButton" style="display: none;">
    <div role="menuitem" tabindex="-1" onclick="newFile()">New</div>
    <div role="menuitem" tabindex="-1" onclick="openFile()">Open</div>
    <div role="menuitem" tabindex="-1" onclick="saveFile()">Save</div>
  </div>
</div>` },
  { filename: "div role menubar", content: `<div id="test-subject" role="menubar" aria-label="Main navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="fileMenuButton" onclick="toggleMenu('fileMenu')">File</div>
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="editMenuButton" onclick="toggleMenu('editMenu')">Edit</div>
</div>` },
  { filename: "mult div role menubar", content: `<div id="test-subject1" role="menubar" aria-label="Main navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="fileMenuButton" onclick="toggleMenu('fileMenu')">File</div>
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="editMenuButton" onclick="toggleMenu('editMenu')">Edit</div>
</div>
<div id="test-subject2" role="menubar" aria-label="Secondary navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false">File</div>
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false">Edit</div>
</div>` }
      ]}
    />
  );
};

export default MenuBarAvoidFailure;
