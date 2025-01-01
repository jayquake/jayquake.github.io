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

  </>
);

export default NavigationRoutes;
