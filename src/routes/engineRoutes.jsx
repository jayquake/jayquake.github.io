import React from "react";
import { Route } from "react-router-dom";
import EngineRulePage from "../components/layout/engineRulePage";
import { AltMisuse } from "../components/pages/engine-rules/alt-misuse/index.ts";
import AltMisuseSuccess from "../components/pages/engine-rules/alt-misuse/AltMisuseSuccess";
import AltMisuseFailure from "../components/pages/engine-rules/alt-misuse/AltMisuseFailure";

const EngineRoutes = () => (
  <>
    <Route
      path="/engine/alt-misuse"
      element={<EngineRulePage ruleData={AltMisuse} />}
    />
    <Route
      path="/engine/alt-misuse_success"
      element={<AltMisuseSuccess />}
    />
    <Route
      path="/engine/alt-misuse_failure"
      element={<AltMisuseFailure />}
    />
  </>
);

export default EngineRoutes;
