import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import EngineLibraryHome from "../components/pages/Engine/EngineLibraryHome";
import { useDeferredRouteElements } from "../components/util/DeferredRouteGroup";
import RouteSuspense from "../components/util/RouteSuspense";
import { isCriteriaPath } from "./criteriaPathUtils";

const EngineSlugOutlet = lazy(() => import("../components/routes/EngineSlugOutlet"));

const UnifiedRulePage = lazy(() => import("../components/layout/UnifiedRulePage"));
const AllRulesWithRoutes = lazy(() => import("../components/pages/Criteria/AllRulesLinks"));
const RuleLab = lazy(() => import("../pages/RuleLab/index"));
const ProjectSelector = lazy(() => import("../pages/ProjectSelector"));
const TestHistory = lazy(() => import("../pages/TestHistory"));
const TestRunner = lazy(() => import("../pages/TestRunner"));
const TestLibrary = lazy(() => import("../pages/TestLibrary/index"));
const TestProgress = lazy(() => import("../pages/TestProgress/index"));
const ResultsView = lazy(() => import("../pages/ResultsView/index"));
const ValidationView = lazy(() =>
  import("../pages/ValidationView").then((m) => ({ default: m.ValidationView }))
);
const AtomicTestLibrary = lazy(() => import("../pages/AtomicTestLibrary/index"));

const wrap = (element) => <RouteSuspense>{element}</RouteSuspense>;

const AppRoutes = ({ navigate }) => {
  const criteriaRoutes = useDeferredRouteElements(
    () => import("./criteriaRoutesBundle"),
    isCriteriaPath
  );

  return (
  <Routes>
    <Route index element={<EngineLibraryHome />} />
    <Route path="/engine/:ruleId" element={wrap(<EngineSlugOutlet />)} />

    <Route path="/test-runner" element={wrap(<ProjectSelector />)} />
    <Route path="/test-runner/validation" element={wrap(<ValidationView />)} />
    <Route path="/test-runner/history" element={wrap(<TestHistory />)} />
    <Route path="/test-runner/run" element={wrap(<TestRunner />)} />
    <Route path="/test-runner/library" element={wrap(<TestLibrary />)} />
    <Route path="/test-runner/progress/:runId" element={wrap(<TestProgress />)} />
    <Route path="/test-runner/results/:runId" element={wrap(<ResultsView />)} />
    <Route path="/test-runner/atomic-tests" element={wrap(<AtomicTestLibrary />)} />

    <Route path="/rule-lab" element={wrap(<RuleLab />)} />

    <Route path="graphics" element={<Navigate to="/" replace />} />
    <Route path="forms" element={<Navigate to="/" replace />} />
    <Route path="keyboard" element={<Navigate to="/" replace />} />
    <Route path="navigation" element={<Navigate to="/" replace />} />
    <Route path="headings" element={<Navigate to="/" replace />} />
    <Route path="errors" element={<Navigate to="/" replace />} />
    <Route path="carousels" element={<Navigate to="/" replace />} />
    <Route path="clickables" element={<Navigate to="/" replace />} />
    <Route path="context" element={<Navigate to="/" replace />} />
    <Route path="document" element={<Navigate to="/" replace />} />
    <Route path="readability" element={<Navigate to="/" replace />} />
    <Route path="tables" element={<Navigate to="/" replace />} />

    <Route path="rules" element={<Navigate to="/" replace />} />
    <Route path="/engine" element={<Navigate to="/" replace />} />
    <Route path="/engine/library" element={<Navigate to="/" replace />} />

    {criteriaRoutes}

    <Route
      path="/*"
      element={wrap(<AllRulesWithRoutes navigate={navigate} />)}
    />

    <Route
      path="/test-item"
      element={wrap(
        <UnifiedRulePage
          ruleType="legacy"
          ruleData={{ name: "Test Rule", description: "Testing ItemPage" }}
        />
      )}
    />
  </Routes>
  );
};

export default AppRoutes;
