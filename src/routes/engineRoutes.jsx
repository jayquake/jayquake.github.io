import React from "react";
import { Route } from "react-router-dom";
import EngineRulePage from "../components/layout/engineRulePage";
import { AltMisuse } from "../components/pages/engine-rules/alt-misuse/index.ts";

const EngineRoutes = () => (
  <>
    <Route
      path="/engine/alt-misuse"
      element={<EngineRulePage ruleData={AltMisuse} />}
    />
  </>
);

export default EngineRoutes;
