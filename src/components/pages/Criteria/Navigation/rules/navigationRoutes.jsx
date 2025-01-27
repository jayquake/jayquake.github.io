// KeyboardRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import BreadcrumbsSuccess from "./Success/BreadcrumbsSuccess";
import BreadcrumbsFailure from "./Failures/BreadcrumbsFailure";
import BrokenNavTaggingSuccess from "./Success/Broken-nav-taggingSuccess";
import BrokenNavTaggingFailures from "./Failures/Broken-nav-taggingFailures";
import SubmenuStateSuccess from "./Success/Submenu-stateSuccess";
import SubmenuStateFailure from "./Failures/Submenu-stateFailure";
import NestedNavigationSuccess from "./Success/Nested-navigationSuccess";
import NestedNavigationFailures from "./Failures/Nested-navigationFailures";
import BrokenNavItemsSuccess from "./Success/Broken-nav-itemsSuccess";
import BrokenNavItemsFailure from "./Failures/Broken-nav-itemsFailure";
import BrokenSubmenuIndicationSuccess from "./Success/Broken-submenu-indicationSuccess"; 
import BrokenSubmenuIndicationFailures from "./Failures/Broken-submenu-indicationFailures";
import MissingNavItemsSuccess from "./Success/Missing-nav-itemsSuccess";
import MissingNavItemsFailure from "./Failures/Missing-nav-itemsFailure";
import MisusedNavTaggingSuccess from "./Success/Misused-nav-taggingSuccess";
import MisusedNavTaggingFailure from "./Failures/Misused-nav-taggingFailure";


const NavigationRoutes = () => (
  <>
    <Route path="navigation/submenu-state_success" element={<SubmenuStateSuccess />} />
    <Route path="navigation/submenu-state_failure" element={<SubmenuStateFailure />} />
    <Route path="navigation/nested-navigation_success" element={<NestedNavigationSuccess />} />
    <Route path="navigation/nested-navigation_failure" element={<NestedNavigationFailures />} />
    <Route path="navigation/broken-nav-items_success" element={<BrokenNavItemsSuccess />} />
    <Route path="navigation/broken-nav-items_failure" element={<BrokenNavItemsFailure />} />
    <Route path="navigation/breadcrumbs_success" element={<BreadcrumbsSuccess />} />
    <Route path="navigation/breadcrumbs_failure" element={<BreadcrumbsFailure />} />  
    <Route path="navigation/broken-nav-tagging_success" element={<BrokenNavTaggingSuccess />} />
    <Route path="navigation/broken-nav-tagging_failure" element={<BrokenNavTaggingFailures />} />
    <Route path="navigation/broken-submenu-indication_success" element={<BrokenSubmenuIndicationSuccess />} />
    <Route path="navigation/broken-submenu-indication_failure" element={<BrokenSubmenuIndicationFailures />} />
    <Route path="navigation/missing-nav-items_success" element={<MissingNavItemsSuccess />} />

    <Route path="navigation/misused-nav-tagging_success" element={<MisusedNavTaggingSuccess />} />  
    <Route path="navigation/misused-nav-tagging_failure" element={<MisusedNavTaggingFailure />} />   
  </>
);

export default NavigationRoutes;
