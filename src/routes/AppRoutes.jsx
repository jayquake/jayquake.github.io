import React from "react";
import { Box } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import EngineLibraryHome from "../components/pages/Engine/EngineLibraryHome";
import EngineSlugOutlet from "../components/routes/EngineSlugOutlet";
import EngineIdRedirect from "../components/routes/EngineIdRedirect";
import LegacyRedirect from "../components/routes/LegacyRedirect";
import { useDeferredRouteElements } from "../components/util/DeferredRouteGroup";
import RouteSuspense from "../components/util/RouteSuspense";
import legacyCriteria from "../data/legacy-criteria.json";
import { isCriteriaPath } from "./criteriaPathUtils";

const AllRulesWithRoutes = React.lazy(() => import("../components/pages/Criteria/AllRulesLinks"));
const RuleLab = React.lazy(() => import("../pages/RuleLab/index"));
const ProjectSelector = React.lazy(() => import("../pages/ProjectSelector"));
const TestHistory = React.lazy(() => import("../pages/TestHistory"));
const TestRunner = React.lazy(() => import("../pages/TestRunner"));
const TestLibrary = React.lazy(() => import("../pages/TestLibrary/index"));
const TestProgress = React.lazy(() => import("../pages/TestProgress/index"));
const ResultsView = React.lazy(() => import("../pages/ResultsView/index"));
const ValidationView = React.lazy(() =>
  import("../pages/ValidationView").then((m) => ({ default: m.ValidationView }))
);
const AtomicTestLibrary = React.lazy(() => import("../pages/AtomicTestLibrary/index"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const LoginSuccessPage = React.lazy(() => import("../pages/LoginSuccessPage"));
const RequireFakeLogin = React.lazy(() => import("../components/routes/RequireFakeLogin"));

const wrap = (element) => <RouteSuspense>{element}</RouteSuspense>;

/** Category index pages redirect home. Keep retired criteria so old bookmarks still resolve. */
const CATEGORY_ROOTS = [
  ...new Set([
    ...legacyCriteria.criteria,
    "headings",
    "readability",
  ]),
];

const AppRoutes = () => {
  const criteriaRoutes = useDeferredRouteElements(
    () => import("./criteriaRoutesBundle"),
    isCriteriaPath
  );

  return (
    <LegacyRedirect>
      <EngineIdRedirect>
        <Box sx={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Routes>
            <Route index element={<EngineLibraryHome />} />
            <Route path="/login" element={wrap(<LoginPage />)} />
            <Route
              path="/login/success"
              element={wrap(
                <RequireFakeLogin>
                  <LoginSuccessPage />
                </RequireFakeLogin>
              )}
            />
            <Route path="/engine/:ruleId" element={<EngineSlugOutlet />} />

            <Route path="/test-runner" element={wrap(<ProjectSelector />)} />
            <Route path="/test-runner/validation" element={wrap(<ValidationView />)} />
            <Route path="/test-runner/history" element={wrap(<TestHistory />)} />
            <Route path="/test-runner/run" element={wrap(<TestRunner />)} />
            <Route path="/test-runner/library" element={wrap(<TestLibrary />)} />
            <Route path="/test-runner/progress/:runId" element={wrap(<TestProgress />)} />
            <Route path="/test-runner/results/:runId" element={wrap(<ResultsView />)} />
            <Route path="/test-runner/atomic-tests" element={wrap(<AtomicTestLibrary />)} />

            <Route path="/rule-lab" element={wrap(<RuleLab />)} />

            {CATEGORY_ROOTS.map((criteria) => (
              <Route key={criteria} path={criteria} element={<Navigate to="/" replace />} />
            ))}

            <Route path="rules" element={<Navigate to="/" replace />} />
            <Route path="/engine" element={<Navigate to="/" replace />} />
            <Route path="/engine/library" element={<Navigate to="/" replace />} />

            {criteriaRoutes}

            <Route path="/*" element={wrap(<AllRulesWithRoutes />)} />
          </Routes>
        </Box>
      </EngineIdRedirect>
    </LegacyRedirect>
  );
};

export default AppRoutes;
