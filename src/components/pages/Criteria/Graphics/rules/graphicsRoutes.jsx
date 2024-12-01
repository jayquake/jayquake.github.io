import React from "react";
import { Route, Routes } from "react-router-dom";
import SvgContentSuccess from "./Success/Svg-contentSuccess";
import SvgContentFailure from "./Failures/Svg-contentFailure";

const GraphicsRoutes = () => (
  <>
    <Route path="graphics/svg-content_success" element={<SvgContentSuccess />} />
    <Route path="graphics/svg-content_failure" element={<SvgContentFailure />} />

  </>
);

export default GraphicsRoutes;
