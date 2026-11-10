import React from "react";
import { Route, Routes } from "react-router-dom";
import AriaLabelMissuseSuccess from "./Success/Aria-label-missuseSuccess";
import AriaLabelMissuseFailure from "./Failures/Aria-label-missuseFailure";
import BrokenAriaReferenceSuccess from "./Success/Broken-aria-referenceSuccess";
import BrokenAriaReferenceFailure from "./Failures/Broken-aria-referenceFailure";
import BrokenListSuccess from "./Success/Broken-listSuccess";
import BrokenListFailure from "./Failures/Broken-listFailure";
import HiddenVisibleContentSuccess from "./Success/Hidden-visible-contentSuccess";
import HiddenVisibleContentFailure from "./Failures/Hidden-visible-contentFailure";
import FakeHiddenContentSuccess from "./Success/Fake-hidden-contentSuccess";
import FakeHiddenContentFailures from "./Failures/Fake-hidden-contentFailures";
import DuplicateIdsSuccess from "./Success/Duplicate-idsSuccess";
import DuplicateIdsFailures from "./Failures/Duplicate-idsFailures";
import EmptyListSuccess from "./Success/Empty-listSuccess";
import EmptyListFailures from "./Failures/Empty-listFailures";
import LoadAutofocusSuccess from "./Success/Load-autofocusSuccess";
import LoadAutofocusFailure from "./Failures/Load-autofocusFailure";
import MarqueeSuccess from "./Success/MarqueeSuccess";
import MarqueeFailure from "./Failures/MarqueeFailure";
import RoleApplicationsSuccess from "./Success/Role-applicationsSuccess";
import RoleApplicationsFailure from "./Failures/Role-applicationsFailure";
import TitleMisuseSuccess from "./Success/Title-misuseSuccess";
import TitleMisuseFailure from "./Failures/Title-misuseFailure";
import RedundantAriaLabelsSuccess from "./Success/Redundant-aria-labelsSuccess";
import RedundantAriaLabelsFailure from "./Failures/Redundant-aria-labelsFailure";
import BrokenAriaLabelsSuccess from "./Success/Broken-aria-labelsSuccess";
import BrokenAriaLabelsFailure from "./Failures/Broken-aria-labelsFailure";
const ErrorsRoutes = () => (
  <>
    <Route path="general/aria-label-misuse_success" element={<AriaLabelMissuseSuccess />} />
    <Route path="general/aria-label-misuse_failure" element={<AriaLabelMissuseFailure />} />
    <Route path="errors/broken-aria-reference_success" element={<BrokenAriaReferenceSuccess />} />
    <Route path="errors/broken-aria-reference_failure" element={<BrokenAriaReferenceFailure />} />
    <Route path="lists/broken-list_success" element={<BrokenListSuccess />} />
    <Route path="lists/broken-list_failure" element={<BrokenListFailure />} />
    <Route path="general/hidden-visible-content_success" element={<HiddenVisibleContentSuccess />} />
    <Route path="general/hidden-visible-content_failure" element={<HiddenVisibleContentFailure />} />
    <Route path="general/fake-hidden-content_success" element={<FakeHiddenContentSuccess />} />
    <Route path="general/fake-hidden-content_failure" element={<FakeHiddenContentFailures />} />
    <Route path="errors/duplicate-ids_success" element={<DuplicateIdsSuccess />} />
    <Route path="errors/duplicate-ids_failure" element={<DuplicateIdsFailures />} />
    <Route path="lists/empty-list_success" element={<EmptyListSuccess />} />
    <Route path="lists/empty-list_failure" element={<EmptyListFailures />} />
    <Route path="general/load-autofocus_success" element={<LoadAutofocusSuccess />} />
    <Route path="general/load-autofocus_failure" element={<LoadAutofocusFailure />} />
    <Route path="moving-content/marquee_success" element={<MarqueeSuccess />} />
    <Route path="moving-content/marquee_failure" element={<MarqueeFailure />} />
    <Route path="general/role-applications_success" element={<RoleApplicationsSuccess />} />
    <Route path="general/role-applications_failure" element={<RoleApplicationsFailure />} />
    <Route path="interactive-content/title-misuse_success" element={<TitleMisuseSuccess />} />
    <Route path="interactive-content/title-misuse_failure" element={<TitleMisuseFailure />} />
    <Route path="interactive-content/redundant-aria-labels_success" element={<RedundantAriaLabelsSuccess />} />
    <Route path="interactive-content/redundant-aria-labels_failure" element={<RedundantAriaLabelsFailure />} />
    <Route path="interactive-content/aria-label-misuse_success" element={<BrokenAriaLabelsSuccess />} />
    <Route path="interactive-content/aria-label-misuse_failure" element={<BrokenAriaLabelsFailure />} />



  </>
);

export default ErrorsRoutes;
