/* eslint-disable react/no-danger */
/**
 * AUTO-GENERATED from core-engine atomic-tests.
 * Source engine rule(s): menu-avoid, menu-bar-avoid
 * Do not hand-edit example bodies — re-run:
 *   node scripts/generate-criteria-examples-from-atomic.js
 */
import React from "react";
import IssueFailure from "../../../../../layout/issueFailure";

const itemDescription = "Navigation: Broken Nav Tagging - Failure";

const BrokennavtaggingFailures = () => (
  <IssueFailure
    itemContent={
      <>
        <div
          className="list-item"
          id="navigation-broken-nav-tagging-failure-failure-1"
          data-atomic-source="menu-avoid/div-role-menu-containing-div-role-menu"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject1" role="menu" aria-label="Main navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="fileMenuButton" onclick="toggleMenu('fileMenu')">File</div>
  <div id="fileMenu" role="menu" aria-labelledby="fileMenuButton">
    <div role="menuitem" tabindex="-1" onclick="newFile()">New</div>
    <div role="menuitem" tabindex="-1" onclick="openFile()">Open</div>
    <div role="menuitem" tabindex="-1" onclick="saveFile()">Save</div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-tagging-failure-failure-2"
          data-atomic-source="menu-avoid/div-role-menu-containing-hidden-div-role-menu"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject1" role="menu" aria-label="Main navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="fileMenuButton" onclick="toggleMenu('fileMenu')">File</div>
  <div id="fileMenu" role="menu" aria-labelledby="fileMenuButton" style="display: none;">
    <div role="menuitem" tabindex="-1" onclick="newFile()">New</div>
    <div role="menuitem" tabindex="-1" onclick="openFile()">Open</div>
    <div role="menuitem" tabindex="-1" onclick="saveFile()">Save</div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-tagging-failure-failure-3"
          data-atomic-source="menu-avoid/div-role-menu"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject" role="menu" aria-label="File Operations" tabindex="0">
  <div role="menuitem" tabindex="-1" id="newFile" onclick="newFile()">New</div>
  <div role="menuitem" tabindex="-1" id="saveFile" onclick="saveFile()">Save</div>
  <div role="menuitem" tabindex="-1" id="deleteFile" onclick="deleteFile()">Delete</div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-tagging-failure-failure-4"
          data-atomic-source="menu-avoid/multi-div-role-menu"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject1" role="menu" aria-label="File Operations" tabindex="0">
  <div role="menuitem" tabindex="-1" id="newFile" onclick="newFile()">New</div>
  <div role="menuitem" tabindex="-1" id="saveFile" onclick="saveFile()">Save</div>
  <div role="menuitem" tabindex="-1" id="deleteFile" onclick="deleteFile()">Delete</div>
</div>
<div id="test-subject2" role="menu" aria-label="File Operations" tabindex="0">
  <div role="menuitem" tabindex="-1" id="editFile" onclick="editFile()">New</div>
  <div role="menuitem" tabindex="-1" id="copyFile" onclick="copyFile()">Save</div>
  <div role="menuitem" tabindex="-1" id="cutFile" onclick="cutFile()">Delete</div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-tagging-failure-failure-5"
          data-atomic-source="menu-bar-avoid/div-role-menubar-containing-div-role-menubar"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject1" role="menubar" aria-label="Main navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="fileMenuButton" onclick="toggleMenu('fileMenu')">File</div>
  <div id="fileMenu" role="menubar" aria-labelledby="fileMenuButton">
    <div role="menuitem" tabindex="-1" onclick="newFile()">New</div>
    <div role="menuitem" tabindex="-1" onclick="openFile()">Open</div>
    <div role="menuitem" tabindex="-1" onclick="saveFile()">Save</div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-tagging-failure-failure-6"
          data-atomic-source="menu-bar-avoid/div-role-menubar-containing-hidden-div-role-menubar"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject1" role="menubar" aria-label="Main navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="fileMenuButton" onclick="toggleMenu('fileMenu')">File</div>
  <div id="fileMenu" role="menubar" aria-labelledby="fileMenuButton" style="display: none;">
    <div role="menuitem" tabindex="-1" onclick="newFile()">New</div>
    <div role="menuitem" tabindex="-1" onclick="openFile()">Open</div>
    <div role="menuitem" tabindex="-1" onclick="saveFile()">Save</div>
  </div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-tagging-failure-failure-7"
          data-atomic-source="menu-bar-avoid/div-role-menubar"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject" role="menubar" aria-label="Main navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="fileMenuButton" onclick="toggleMenu('fileMenu')">File</div>
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="editMenuButton" onclick="toggleMenu('editMenu')">Edit</div>
</div>`,
          }}
        />
        <div
          className="list-item"
          id="navigation-broken-nav-tagging-failure-failure-8"
          data-atomic-source="menu-bar-avoid/mult-div-role-menubar"
          dangerouslySetInnerHTML={{
            __html: `<div id="test-subject1" role="menubar" aria-label="Main navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="fileMenuButton" onclick="toggleMenu('fileMenu')">File</div>
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false" id="editMenuButton" onclick="toggleMenu('editMenu')">Edit</div>
</div>
<div id="test-subject2" role="menubar" aria-label="Secondary navigation">
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false">File</div>
  <div role="menuitem" aria-haspopup="true" tabindex="0" aria-expanded="false">Edit</div>
</div>`,
          }}
        />
      </>
    }
    itemDescription={itemDescription}
  />
);

export default BrokennavtaggingFailures;
