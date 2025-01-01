// KeyboardRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import NonintTabFail from "./Failures/NonintTabFail";
import NonintTabSucc from "./Success/NonintTabSucc";
import BrokentabSuccess from "./Success/BrokentabSuccess";
import BrokenTabindexFailure from "./Failures/Broken-tabindexFailure";
import SkipLinksSuccess from "./Success/Skip-linksSuccess";
import SkiplinksFailure from "./Failures/Skip-linksFailures"; 

const KeyboardRoutes = () => (
  <>
    <Route
      path="keyboard/noninteractive-tabindex_success"
      element={<NonintTabSucc />}
    />
    <Route
      path="keyboard/noninteractive-tabindex_failure"
      element={<NonintTabFail />}
    />
    <Route path="keyboard/broken-tabindex_success" element={<BrokentabSuccess />} />
    <Route
      path="keyboard/broken-tabindex_failure"
      element={<BrokenTabindexFailure />} />
      <Route path="keyboard/skip-links_success" element={<SkipLinksSuccess />} />
      <Route path="keyboard/skip-links_failure" element={<SkiplinksFailure />} />
  </>
);

export default KeyboardRoutes;
