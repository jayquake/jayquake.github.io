import React from "react";
import { Route, Routes } from "react-router-dom";
import ColorContrastSucces from "./Success/Color-contrastSucces";
import ColorContrastFailures from "./Failures/Color-contrastFailures";


const ReadabilityRoutes = () => (
  <>
  <Route path="readability/color-contrast_success" element={<ColorContrastSucces />} />
    <Route path="readability/color-contrast_failure" element={<ColorContrastFailures />} />
  

  </>
);

export default ReadabilityRoutes;
