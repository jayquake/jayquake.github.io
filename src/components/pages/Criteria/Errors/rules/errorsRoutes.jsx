import React from "react";
import { Route, Routes } from "react-router-dom";
import AriaLabelMissuseSuccess from "./Success/Aria-label-missuseSuccess";
import AriaLabelMissuseFailure from "./Failures/Aria-label-missuseFailure";
import BrokenAriaReferenceSuccess from "./Success/Broken-aria-referenceSuccess";
import BrokenAriaReferenceFailure from "./Failures/Broken-aria-referenceFailure";

const ErrorsRoutes = () => (
  <>
    <Route path="errors/aria-label-missuse_success" element={<AriaLabelMissuseSuccess />} />
    <Route path="errors/aria-label-missuse_failure" element={<AriaLabelMissuseFailure />} />
    <Route path="errors/broken-aria-reference_success" element={<BrokenAriaReferenceSuccess />} />
    <Route path="errors/broken-aria-reference_failure" element={<BrokenAriaReferenceFailure />} />
    
  </>
);

export default ErrorsRoutes;
