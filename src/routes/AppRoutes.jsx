import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../components/pages/Home";

// Modularized Routes for Each Criteria (individual rule detail pages)
import UnifiedRulePage from "../components/layout/UnifiedRulePage";
import CarouselsRoutes from "../components/pages/Criteria/Carousels/rules/carouselsRoutes";
import ClickablesRoutes from "../components/pages/Criteria/Clickables/rules/ClickableRoutes";
import ContextRoutes from "../components/pages/Criteria/Context/rules/ContextRoutes";
import DocumentRoutes from "../components/pages/Criteria/Document/rules/documentRoutes";
import ErrorsRoutes from "../components/pages/Criteria/Errors/rules/errorsRoutes";
import FormruleRoutes from "../components/pages/Criteria/Forms/rules/FormruleRoutes";
import GraphicsRoutes from "../components/pages/Criteria/Graphics/rules/graphicsRoutes";
import HeadingsRoutes from "../components/pages/Criteria/Headings/rules/headingsRoutes";
import KeyboardRoutes from "../components/pages/Criteria/Keyboard/rules/KeyboardRoutes";
import NavigationRoutes from "../components/pages/Criteria/Navigation/rules/navigationRoutes";
import ReadabilityRoutes from "../components/pages/Criteria/Readability/rules/readabilityRoutes";
import TablesRoutes from "../components/pages/Criteria/Tables/rules/tablesRoutes";

// Dynamic catch-all for legacy rule detail pages
import AllRulesWithRoutes from "../components/pages/Criteria/AllRulesLinks";
import EngineRoutes from "./engineRoutes";

// Rule Lab
import RuleLab from "../pages/RuleLab/index";

// Test Runner Pages
import ProjectSelector from "../pages/ProjectSelector";
import TestHistory from "../pages/TestHistory";
import TestRunner from "../pages/TestRunner";
import TestLibrary from "../pages/TestLibrary/index";
import TestProgress from "../pages/TestProgress/index";
import ResultsView from "../pages/ResultsView/index";
import { ValidationView } from "../pages/ValidationView";
import AtomicTestLibrary from "../pages/AtomicTestLibrary/index";

const AppRoutes = ({ navigate }) => (
  <Routes>
    {/* Home / Dashboard */}
    <Route index element={<Home navigate={navigate} title="Home" />} />

    {/* Test Runner Routes */}
    <Route path="/test-runner" element={<ProjectSelector />} />
    <Route path="/test-runner/validation" element={<ValidationView />} />
    <Route path="/test-runner/history" element={<TestHistory />} />
    <Route path="/test-runner/run" element={<TestRunner />} />
    <Route path="/test-runner/library" element={<TestLibrary />} />
    <Route path="/test-runner/progress/:runId" element={<TestProgress />} />
    <Route path="/test-runner/results/:runId" element={<ResultsView />} />
    <Route path="/test-runner/atomic-tests" element={<AtomicTestLibrary />} />

    {/* Rule Lab */}
    <Route path="/rule-lab" element={<RuleLab />} />

    {/* Criteria landing pages redirect to dashboard (tree sidebar replaces them) */}
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

    {/* Listing pages redirect to dashboard (tree sidebar replaces them) */}
    <Route path="rules" element={<Navigate to="/" replace />} />
    <Route path="/engine" element={<Navigate to="/" replace />} />
    <Route path="/engine/library" element={<Navigate to="/" replace />} />

    {/* Individual criteria rule detail routes (keep working) */}
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

    {/* Engine rule detail routes */}
    {EngineRoutes()}

    {/* Dynamic catch-all for legacy rule detail pages */}
    <Route path="/*" element={<AllRulesWithRoutes navigate={navigate} />} />

    <Route
      path="/test-item"
      element={
        <UnifiedRulePage
          ruleType="legacy"
          ruleData={{ name: "Test Rule", description: "Testing ItemPage" }}
        />
      }
    />
  </Routes>
);

export default AppRoutes;
