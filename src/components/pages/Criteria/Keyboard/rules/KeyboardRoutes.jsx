// KeyboardRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";
import NonintTabFail from "./Failures/NonintTabFail";
import NonintTabSucc from "./Success/NonintTabSucc";
import BrokentabSuccess from "./Success/BrokentabSuccess";
import BrokenTabindexFailure from "./Failures/Broken-tabindexFailure";

const KeyboardRoutes = () => (
  <>
    <Route
      path="/keyboard/noninteractive-tabindex_success"
      element={<NonintTabSucc />}
    />
    <Route
      path="/keyboard/noninteractive-tabindex_failure"
      element={<NonintTabFail />}
    />
    <Route path="/keyboard/broken-tabindex_success" element={<BrokentabSuccess />} />
    <Route
      path="/keyboard/broken-tabindex_failure"
      element={<BrokenTabindexFailure />} />
  </>
);

export default KeyboardRoutes;
