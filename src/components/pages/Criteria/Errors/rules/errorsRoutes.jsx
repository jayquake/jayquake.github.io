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

const ErrorsRoutes = () => (
  <>
    <Route path="errors/aria-label-missuse_success" element={<AriaLabelMissuseSuccess />} />
    <Route path="errors/aria-label-missuse_failure" element={<AriaLabelMissuseFailure />} />
    <Route path="errors/broken-aria-reference_success" element={<BrokenAriaReferenceSuccess />} />
    <Route path="errors/broken-aria-reference_failure" element={<BrokenAriaReferenceFailure />} />
    <Route path="errors/broken-list_success" element={<BrokenListSuccess />} />
    <Route path="errors/broken-list_failure" element={<BrokenListFailure />} />
    <Route path="errors/hidden-visible-content_success" element={<HiddenVisibleContentSuccess />} />
    <Route path="errors/hidden-visible-content_failure" element={<HiddenVisibleContentFailure />} />
    <Route path="errors/fake-hidden-content_success" element={<FakeHiddenContentSuccess />} />
    <Route path="errors/fake-hidden-content_failure" element={<FakeHiddenContentFailures />} />
    <Route path="errors/duplicate-ids_success" element={<DuplicateIdsSuccess />} />
    <Route path="errors/duplicate-ids_failure" element={<DuplicateIdsFailures />} />
    <Route path="errors/empty-list_success" element={<EmptyListSuccess />} />
    <Route path="errors/empty-list_failure" element={<EmptyListFailures />} />
    <Route path="errors/load-autofocus_success" element={<LoadAutofocusSuccess />} />
    <Route path="errors/load-autofocus_failure" element={<LoadAutofocusFailure />} />
    
    
    
    
  </>
);

export default ErrorsRoutes;
