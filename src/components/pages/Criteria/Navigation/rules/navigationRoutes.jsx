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
import NavigationTaggingSuccess from "./Success/Navigation-taggingSuccess";
import NavigationTaggingFailure from "./Failures/Navigation-taggingFailure";
import NavigationFailures from "./Failures/Navigation-taggingFailure";
import SubmenuTriggerTaggingSuccess from "./Success/Submenu-trigger-taggingSuccess";
import SubmenuTriggerTaggingFailure from "./Failures/Submenu-trigger-taggingFailure";
import SubmenuOperabilitySuccess from "./Success/Submenu-operabilitySuccess";
import SubmenuOperabilityFailure from "./Failures/Submenu-operabilityFailure";
import SubmenuTaggingSuccess from "./Success/Submenu-taggingSuccess";
import SubmenuTaggingFailure from "./Failures/Submenu-taggingFailure";



const NavigationRoutes = () => (
  <>
    <Route path="interactive-content/submenu-state_success" element={<SubmenuStateSuccess />} />
    <Route path="interactive-content/submenu-state_failure" element={<SubmenuStateFailure />} />
    <Route path="landmarks/nested-navigation_success" element={<NestedNavigationSuccess />} />
    <Route path="landmarks/nested-navigation_failure" element={<NestedNavigationFailures />} />
    <Route path="general/broken-nav-items_success" element={<BrokenNavItemsSuccess />} />
    <Route path="general/broken-nav-items_failure" element={<BrokenNavItemsFailure />} />
    <Route path="navigation/breadcrumbs_success" element={<BreadcrumbsSuccess />} />
    <Route path="navigation/breadcrumbs_failure" element={<BreadcrumbsFailure />} />
    <Route path="navigation/broken-nav-tagging_success" element={<BrokenNavTaggingSuccess />} />
    <Route path="navigation/broken-nav-tagging_failure" element={<BrokenNavTaggingFailures />} />
    <Route path="interactive-content/broken-submenu-indication_success" element={<BrokenSubmenuIndicationSuccess />} />
    <Route path="interactive-content/broken-submenu-indication_failure" element={<BrokenSubmenuIndicationFailures />} />
    <Route path="lists/missing-nav-items_success" element={<MissingNavItemsSuccess />} />
    <Route path="lists/missing-nav-items_failure" element={<MissingNavItemsFailure />} />
    <Route path="landmarks/misused-nav-tagging_success" element={<MisusedNavTaggingSuccess />} />
    <Route path="landmarks/misused-nav-tagging_failure" element={<MisusedNavTaggingFailure />} />
    <Route path="landmarks/navigation-tagging_success" element={<NavigationTaggingSuccess />} />
    <Route path="landmarks/navigation-tagging_failure" element={<NavigationTaggingFailure />} />
    <Route path="navigation/navigation-tagging_failure/:id" element={<NavigationTaggingFailure />} />
    <Route path="general/submenu-trigger-tagging_success" element={<SubmenuTriggerTaggingSuccess />} />
    <Route path="general/submenu-trigger-tagging_failure" element={<SubmenuTriggerTaggingFailure />} />
    <Route path="navigation/submenu-operability_success" element={<SubmenuOperabilitySuccess />} />
    <Route path="navigation/submenu-operability_failure" element={<SubmenuOperabilityFailure />} />
    <Route path="landmarks/submenu-tagging_success" element={<SubmenuTaggingSuccess />} />
    <Route path="landmarks/submenu-tagging_failure" element={<SubmenuTaggingFailure />} />

  </>
);

export default NavigationRoutes;
