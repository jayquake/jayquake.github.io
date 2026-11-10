import React from "react";
import { Route } from "react-router-dom";
import CarouselsRoutes from "../components/pages/Criteria/Carousels/rules/carouselsRoutes";
import ClickablesRoutes from "../components/pages/Criteria/Clickables/rules/ClickableRoutes";
import ContextRoutes from "../components/pages/Criteria/Context/rules/ContextRoutes";
import DocumentRoutes from "../components/pages/Criteria/Document/rules/documentRoutes";
import ErrorsRoutes from "../components/pages/Criteria/Errors/rules/errorsRoutes";
import FormruleRoutes from "../components/pages/Criteria/Forms/rules/FormruleRoutes";
import GraphicsRoutes from "../components/pages/Criteria/Graphics/rules/graphicsRoutes";
import HeadingsRoutes from "../components/pages/Criteria/Headings/rules/headingsRoutes";
import KeyboardRoutes from "../components/pages/Criteria/Keyboard/rules/KeyboardRoutes";
import LegacyNoExamplesPage from "../components/pages/Criteria/LegacyNoExamplesPage";
import NavigationRoutes from "../components/pages/Criteria/Navigation/rules/navigationRoutes";
import ReadabilityRoutes from "../components/pages/Criteria/Readability/rules/readabilityRoutes";
import TablesRoutes from "../components/pages/Criteria/Tables/rules/tablesRoutes";
import legacyExampleFixtures from "../data/legacy-example-fixtures.json";
import legacyRules from "../data/legacy-rules.json";

const FIXTURE_PATHS = new Set(legacyExampleFixtures.paths || []);

/** All legacy criteria example routes in one lazy-loaded chunk. */
export default function CriteriaRoutesBundle() {
  return (
    <>
      {ClickablesRoutes()}
      {ContextRoutes()}
      {KeyboardRoutes()}
      {FormruleRoutes()}
      {DocumentRoutes()}
      {ErrorsRoutes()}
      {ReadabilityRoutes()}
      {GraphicsRoutes()}
      {HeadingsRoutes()}
      {CarouselsRoutes()}
      {TablesRoutes()}
      {NavigationRoutes()}
      {legacyRules.flatMap((rule) => {
        const criteria = (rule.criteria || "").toLowerCase();
        const route = rule.route;
        if (!criteria || !route) return [];
        return ["success", "failure"].flatMap((variant) => {
          const p = `/${criteria}/${route}_${variant}`;
          if (FIXTURE_PATHS.has(p)) return [];
          return [
            <Route
              key={p}
              path={`${criteria}/${route}_${variant}`}
              element={<LegacyNoExamplesPage />}
            />,
          ];
        });
      })}
    </>
  );
}
