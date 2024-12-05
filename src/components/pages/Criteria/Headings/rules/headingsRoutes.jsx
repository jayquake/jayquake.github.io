import React from "react";
import { Route, Routes } from "react-router-dom";
import MainHeadingSuccess from "./Success/Main-headingSuccess";
import MainHeadingFailure from "./Failures/Main-headingFailure";
import MultipleMainHeadingsSuccess from "./Success/Multiple-main-headingsSuccess";
import MultipleMainHeadingsFailure from "./Failures/Multiple-main-headingsFailure";

const HeadingsRoutes = () => (
  <>
  <Route path="headings/main-heading_success" element={<MainHeadingSuccess />} />
  <Route path="headings/main-heading_failure" element={<MainHeadingFailure />} />
  <Route path="headings/multiple-main-headings_success" element={<MultipleMainHeadingsSuccess />} />
  <Route path="headings/multiple-main-headings_failure" element={<MultipleMainHeadingsFailure />} />

  </>
);

export default HeadingsRoutes;
