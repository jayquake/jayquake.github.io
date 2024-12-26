// KeyboardRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import SubmenuStateSuccess from "./Success/Submenu-stateSuccess";
import SubmenuStateFailure from "./Failures/Submenu-stateFailure";

const NavigationRoutes = () => (
  <>
    <Route path="navigation/submenu-state_success" element={<SubmenuStateSuccess />} />
    <Route path="navigation/submenu-state_failure" element={<SubmenuStateFailure />} />

  </>
);

export default NavigationRoutes;
