// KeyboardRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import SubmenuStateSuccess from "./Success/Submenu-stateSuccess";
import SubmenuStateFailure from "./Failures/Submenu-stateFailure";
import NestedNavigationSuccess from "./Success/Nested-navigationSuccess";
import NestedNavigationFailures from "./Failures/Nested-navigationFailures";
const NavigationRoutes = () => (
  <>
    <Route path="navigation/submenu-state_success" element={<SubmenuStateSuccess />} />
    <Route path="navigation/submenu-state_failure" element={<SubmenuStateFailure />} />
    <Route path="navigation/nested-navigation_success" element={<NestedNavigationSuccess />} />
    <Route path="navigation/nested-navigation_failure" element={<NestedNavigationFailures />} />

  </>
);

export default NavigationRoutes;
