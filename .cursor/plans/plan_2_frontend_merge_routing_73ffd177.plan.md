---
name: Plan 2 Frontend Merge Routing
overview: Merge the standalone-app frontend pages, components, API client, and hooks into the existing CRA React app, upgrade MUI to v7, switch to BrowserRouter, and wire up routing for the test runner views. All original todos completed. Extended with UI Enhancement (phases 1-6) and Runner Shell Integration.
todos:
  - id: p2-upgrade-mui
    content: Upgrade MUI from v6 to v7 in package.json, remove @mui/joy, add @mui/x-tree-view
    status: completed
  - id: p2-add-deps
    content: Add ansi-to-html, socket.io-client, and react-app-rewired to package.json
    status: completed
  - id: p2-rewired
    content: Set up react-app-rewired to remove ModuleScopePlugin so frontend can import from shared/
    status: completed
  - id: p2-switch-router
    content: Switch from HashRouter to BrowserRouter in src/index.js
    status: completed
  - id: p2-add-proxy
    content: Add proxy field to package.json pointing to localhost:3001
    status: completed
  - id: p2-copy-pages
    content: Copy all standalone-app pages (ProjectSelector, TestHistory, TestRunner, TestProgress, ResultsView, ValidationView, TestLibrary) to src/pages/
    status: completed
  - id: p2-copy-components
    content: Copy standalone-app components to src/components/standalone/
    status: completed
  - id: p2-copy-api-hooks
    content: Copy API client to src/api/client.ts, hooks to src/hooks/, theme to src/theme.ts; convert import.meta.env to process.env
    status: completed
  - id: p2-fix-imports
    content: Convert @shared/ aliases to relative ../../shared/ paths in 17 files; exclude vite-env.d.ts
    status: completed
  - id: p2-add-routes
    content: Add /test-runner/* routes to AppRoutes.jsx before the catch-all
    status: completed
  - id: p2-layout-split
    content: Update App.js — test runner routes render inside main shell (full-width, no Container), auto-collapse sidebar; Layout.tsx stripped to content wrapper only
    status: completed
  - id: p2-nav-link
    content: Add Test Runner and Rule Lab links to drawer sidebar in listItems.js
    status: completed
  - id: p2-fix-internal-nav
    content: Prefix all internal navigation in standalone pages with /test-runner
    status: completed
  - id: p2-verify
    content: Verified via Playwright MCP — all routes load correctly inside the main shell
    status: completed
  - id: p2-unified-rule-page
    content: "UI Phase 2: Create UnifiedRulePage.tsx — single tabbed component (Overview, Examples, MCP Analysis, References, Atomic Tests) for both engine and legacy rules. All 159 engine routes + legacy routes updated."
    status: completed
  - id: p2-home-refresh
    content: "UI Phase 3: Home page rewritten — 4-card toolkit row (Legacy Rules, Engine Rules, Test Runner, Rule Lab) + Platform at a Glance stats panel"
    status: completed
  - id: p2-legacy-rules-grid
    content: "UI Phase 4: Legacy Rules page (/rules) — card grid view added as default with view toggle (Cards / Table), Rule Lab button per card"
    status: completed
  - id: p2-atomic-test-library
    content: "UI Phase 5: AtomicTestLibrary page (/test-runner/atomic-tests) — searchable/filterable card grid of 158 engine rules with impact chips and Lab buttons"
    status: completed
  - id: p2-rule-awareness
    content: "UI Phase 6: SummaryTab — keyword index + related engine rule chips on failed E2E test cards"
    status: completed
  - id: p2-runner-hub
    content: "Runner Shell Integration: ProjectSelector rebuilt as Test Runner Hub (Atomic Tests, Validation, History cards); external E2E projects removed. Test runner routes now full-width (no Container constraint)."
    status: completed
isProject: false
---

# Plan 2: Frontend Merge and Routing

Integrate the standalone-app React frontend (pages, components, API client, hooks, theme) into the existing CRA app at [src/](src/), upgrade MUI, switch routers, and add test runner routes alongside existing accessibility rule routes.

**Prerequisite:** Plan 1 (Backend + Infra) must be completed first so the API backend is in place.

---

## Step 1: Upgrade MUI from v6 to v7

The standalone-app uses MUI 7 (`@mui/material: ^7.3.8`). The audit-rules app uses MUI 6 (`@mui/material: ^6.1.6`).

Update [package.json](package.json):

```
@mui/material: ^6.1.6  ->  ^7.3.8
@mui/icons-material: ^6.1.6  ->  ^7.3.8
@mui/utils: ^6.1.6  ->  ^7.3.8
```

Add new MUI dependency needed by standalone-app:

```
@mui/x-tree-view: ^8.27.2
```

Remove `@mui/joy` (v5 beta, not used by standalone-app, potential conflicts with MUI 7).

**MUI 7 migration notes:**

- Most MUI 6 component APIs are backward compatible with 7
- Run the app after upgrade and fix any compile errors in existing components (likely minimal - mainly theme/styling edge cases)

---

## Step 2: Add Frontend Dependencies

Add to [package.json](package.json) dependencies:

```
ansi-to-html: ^0.7.2
socket.io-client: ^4.6.1
```

Add to devDependencies:

```
react-app-rewired: ^2.2.1
```

---

## Step 3: Set Up react-app-rewired

CRA's `ModuleScopePlugin` blocks imports from outside `src/`. The standalone-app frontend imports types from `shared/` (at repo root). Rather than duplicating files into `src/shared/`, use `react-app-rewired` to remove this restriction.

Create `config-overrides.js` at the audit-rules root:

```javascript
const { removeModuleScopePlugin } = require("customize-cra");

module.exports = function override(config) {
  removeModuleScopePlugin()(config);
  return config;
};
```

Add `customize-cra` as a devDependency.

Update scripts in [package.json](package.json):

```json
"start": "react-app-rewired start",
"build": "CI=false react-app-rewired build",
"test": "react-app-rewired test"
```

This is a well-established pattern that lets the frontend import directly from `../../shared/types` without file duplication.

---

## Step 4: Switch from HashRouter to BrowserRouter

The standalone-app routes use path params (e.g., `/progress/:runId`) which work best with BrowserRouter. Update [src/index.js](src/index.js):

```javascript
// Change this:
import { HashRouter as Router } from "react-router-dom";

// To this:
import { BrowserRouter as Router } from "react-router-dom";
```

**Note:** This may affect GitHub Pages deployment (which relies on HashRouter). If GitHub Pages is still needed for the rules-only static site, a separate build configuration can handle that later.

---

## Step 5: Add CRA Proxy

Add to [package.json](package.json):

```json
"proxy": "http://localhost:3001"
```

This tells CRA's dev server to proxy unknown requests (like `/api/*` and `/ws`) to the Express backend on port 3001. No code changes needed - CRA handles this automatically.

---

## Step 6: Copy Standalone-App Pages

Copy from `accessE2E/standalone-app/frontend/src/pages/` to `src/pages/`:

```
src/pages/
  ProjectSelector.tsx
  TestHistory.tsx
  TestRunner.tsx
  ValidationView.tsx
  TestProgress/
    index.tsx
    ProgressAppBar.tsx
    TestExecutionList.tsx
    RunSummaryBar.tsx
    PlaywrightUIPanel.tsx
    ConsolePanel.tsx
    types.ts
  ResultsView/
    index.tsx
    ResultsAppBar.tsx
    ResultsTabs.tsx
    RunStatsBar.tsx
    components/
      SummaryTab.tsx          (includes "Debug with MCP" button - KEEP)
      MCPDebugTab.tsx         (full MCP debug UI - KEEP)
      QaseTestDetailsTab.tsx
      PlaywrightReportTab.tsx
      ConsoleOutputTab.tsx
    models/
      TestRunData.ts
      MCPAnalysis.ts          (MCP model - KEEP)
      ConsoleOutput.ts
    services/
      TestResultMatcher.ts
      MCPAnalysisFilter.ts    (MCP filter - KEEP)
  TestLibrary/
    index.tsx
    StickyRunHeader.tsx
    TestFileTree.tsx
    TargetEnvironmentCard.tsx
    RunQueue.tsx
    ExecutionModeCard.tsx
    AdvancedOptionsAccordion.tsx
    types.ts
```

---

## Step 7: Copy Standalone-App Components

Copy from `accessE2E/standalone-app/frontend/src/components/` to `src/components/standalone/`:

Using a `standalone/` subdirectory avoids naming conflicts with existing components.

```
src/components/standalone/
  ErrorBoundary.tsx
  Layout.tsx
  ToastContainer.tsx
  Toast.tsx
  AnsiConsole.tsx
  StepList.tsx
  QaseTestCaseCard.tsx
  ProjectBreadcrumbItem.tsx
  index.ts
```

---

## Step 8: Copy API Client, Hooks, and Theme

- Copy `accessE2E/standalone-app/frontend/src/api/client.ts` to `src/api/client.ts`
  - This includes the full `api` object with namespaces: `artifacts`, `cleanup`, `environments`, `flows`, `mcp`, `projects`, `qase`, `runs`, `slack`
  - Update the base URL: change `VITE_API_URL` to use `REACT_APP_API_URL` (CRA convention) or default to empty string (relative URLs, which the proxy handles)

```typescript
// Change from:
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// To:
const API_URL = process.env.REACT_APP_API_URL || "";
```

- Copy `accessE2E/standalone-app/frontend/src/hooks/` to `src/hooks/`
  - WebSocket hooks, test progress hooks, etc.
- Copy `accessE2E/standalone-app/frontend/src/theme.ts` to `src/theme.ts`

**Convert `import.meta.env` in ALL copied files** - Vite uses `import.meta.env.VITE_*`, CRA uses `process.env.REACT_APP_*`. Files that need this conversion (found via grep):

- `api/client.ts` - `VITE_API_URL`
- `hooks/useWebSocket.ts` - may use `VITE_WS_URL`
- `components/ErrorBoundary.tsx` - may check dev mode via `import.meta.env.DEV`

Replace pattern: `import.meta.env.VITE_X` -> `process.env.REACT_APP_X`, and `import.meta.env.DEV` -> `process.env.NODE_ENV === 'development'`.

**Do NOT copy `vite-env.d.ts`** - this is a Vite-specific type declaration file (`/// <reference types="vite/client" />`) and is not needed in CRA.

---

## Step 9: Fix Import Aliases

The standalone-app uses `@shared/` Vite aliases. There are NO `@/` aliases in use - only `@shared/`. Thanks to `react-app-rewired` (Step 3), the frontend can now import directly from `shared/` at repo root without CRA blocking it.

Convert all `@shared/` imports to relative paths pointing to the repo-root `shared/` directory. There are exactly 17 files that need this:

**Files importing `@shared/types`** (Project, TestRunConfig, QaseConfig, TestStep, ProgressUpdate, TestNavResult):

- `pages/ProjectSelector.tsx`
- `pages/TestHistory.tsx`
- `pages/ResultsView/index.tsx`
- `pages/ResultsView/ResultsAppBar.tsx`
- `pages/ResultsView/components/SummaryTab.tsx`
- `pages/ResultsView/components/MCPDebugTab.tsx`
- `pages/TestProgress/index.tsx`
- `pages/TestProgress/ProgressAppBar.tsx`
- `pages/TestProgress/types.ts`
- `pages/TestLibrary/index.tsx`
- `pages/TestLibrary/StickyRunHeader.tsx`
- `pages/TestLibrary/types.ts`
- `pages/TestLibrary/AdvancedOptionsAccordion.tsx`
- `components/standalone/ProjectBreadcrumbItem.tsx`
- `components/standalone/StepList.tsx`
- `hooks/useWebSocket.ts`

**Files importing `@shared/domain/valueObjects/TestRunSummary`:**

- `pages/TestHistory.tsx`
- `pages/ResultsView/index.tsx`
- `pages/ResultsView/models/TestRunData.ts`

**Files importing `@shared/utils/`:**

- `pages/TestProgress/index.tsx` (`TestProgressMonitor`)
- `pages/TestProgress/types.ts` (`TestResultItem`)

**Conversion pattern** - from a file in `src/pages/`:

```typescript
// FROM:
import type { Project } from "@shared/types";
// TO:
import type { Project } from "../../shared/types";
```

The exact relative path depends on file depth within `src/`.

---

## Step 10: Add Test Runner Routes

Update [src/routes/AppRoutes.jsx](src/routes/AppRoutes.jsx) to include the new standalone-app pages. The test runner pages manage their own layout (AppBar, etc.), so they render independently of the existing drawer layout.

```jsx
// Add imports at top:
import ProjectSelector from '../pages/ProjectSelector';
import TestHistory from '../pages/TestHistory';
import TestRunner from '../pages/TestRunner';
import TestProgress from '../pages/TestProgress/index';
import ResultsView from '../pages/ResultsView/index';
import { ValidationView } from '../pages/ValidationView';

// Add routes inside <Routes>:
<Route path="/test-runner" element={<ProjectSelector />} />
<Route path="/test-runner/validation" element={<ValidationView />} />
<Route path="/test-runner/history" element={<TestHistory />} />
<Route path="/test-runner/run" element={<TestRunner />} />
<Route path="/test-runner/progress/:runId" element={<TestProgress />} />
<Route path="/test-runner/results/:runId" element={<ResultsView />} />
```

**Important:** These routes should be placed BEFORE the catch-all `/` route (`AllRulesWithRoutes`) so they match first.

---

## Step 11: Handle Layout for Test Runner Pages

The test runner pages have their own AppBar and layout (no drawer). In [src/App.js](src/App.js), detect when the user is on a `/test-runner/` route and skip the drawer/AppBar:

```javascript
const location = useLocation();
const isTestRunnerRoute = location.pathname.startsWith("/test-runner");

// In the render, conditionally show drawer layout:
if (isTestRunnerRoute) {
  return <AppRoutes navigate={navigate} />;
}

// Otherwise render the existing drawer + AppBar layout as-is
```

This keeps the existing accessibility rules UI untouched while giving test runner pages full control of their layout.

---

## Step 12: Add Navigation Link

Update [src/listItems.js](src/listItems.js) to add a "Test Runner" link in the drawer sidebar:

```javascript
// Add to the secondary list items:
<ListItemButton component={Link} to="/test-runner">
  <ListItemIcon>
    <PlayArrowIcon />
  </ListItemIcon>
  <ListItemText primary="Test Runner" />
</ListItemButton>
```

---

## Step 13: Update Internal Navigation in Standalone Pages

The standalone-app pages navigate between each other using paths like `/`, `/history`, `/run`, etc. After prefixing with `/test-runner`, update navigation in the copied pages:

- `ProjectSelector.tsx`: links to `/history`, `/run` -> `/test-runner/history`, `/test-runner/run`
- `TestRunner.tsx`: navigates to `/progress/:runId` -> `/test-runner/progress/:runId`
- `TestProgress.tsx`: navigates to `/results/:runId` -> `/test-runner/results/:runId`
- `ResultsView.tsx`: back links to `/history` -> `/test-runner/history`
- `Layout.tsx` (standalone): navigation links -> prefix with `/test-runner`

---

## Verification

After completing this plan:

1. `npm start` should start the CRA dev server on port 3000
2. Existing accessibility rule pages (`/`, `/clickables`, `/engine/library`, etc.) should work as before
3. Navigating to `/test-runner` should show the ProjectSelector page
4. The "Test Runner" link in the drawer should navigate to `/test-runner`
5. With the backend running (`npm run server:dev`), the test runner pages should be able to communicate with the API
6. MCP debug features should be accessible in the Results view

**Verified via Playwright MCP (2026-03-04):** All pages confirmed loading inside the main shell.

---

## Phase 2 — Completed Additions (2026-03-04)

These enhancements were built on top of the original plan after all original todos were completed.

### UI Enhancement — Phase 1: Shell Integration

- `**src/App.js` — Removed early return that bypassed the shell for test-runner routes. Added `useEffect` to auto-collapse sidebar on test runner navigation. Test runner + Rule Lab routes now render full-width (no `Container` constraint).
- `**src/components/standalone/Layout.tsx` — Stripped duplicate `AppBar` and `Drawer`; now purely a content wrapper with scroll-to-top on route change.

### UI Enhancement — Phase 2: Unified Tabbed Rule Pages

- `**src/components/layout/UnifiedRulePage.tsx` (new) — Single component handling both engine and legacy rules with 5 tabs: Overview, Examples, MCP Analysis, References, Atomic Tests (engine only). Breadcrumbs, hero header with severity/WCAG chips, cross-linking between engine ↔ legacy equivalents.
- `**src/routes/engineRoutes.jsx` — All 159 engine rule routes switched from `EngineRulePage` to `UnifiedRulePage ruleType="engine"`.
- `**src/components/pages/Criteria/AllRulesLinks.jsx` — Legacy rule routes switched from `ItemPage` to `UnifiedRulePage ruleType="legacy"`.

### UI Enhancement — Phase 3: Home Page Refresh

- `**src/components/pages/Home.jsx`** — Replaced 2-card "Browse Rules" section and 3-card "Why Choose" section with a **4-card toolkit row** (Legacy Rules, Engine Rules, Test Runner, Rule Lab) and a **Platform at a Glance stats panel (248+ rules, 1,288 fixtures, 12 categories, 98% coverage).

### UI Enhancement — Phase 4: Legacy Rules Page

- `**src/components/pages/RulesListing.jsx` — Added card grid view as default display mode. View toggle (Cards / Table) added to filter bar. Each card has severity/WCAG chips, rule name, description preview, "View Rule" button, and "Open in Rule Lab" icon button.

### UI Enhancement — Phase 5: Atomic Tests Integration

- `**src/pages/AtomicTestLibrary/index.tsx` (new) — Searchable/filterable card grid of all 158 engine rules with impact-level chips and "View Rule" / "Lab" buttons. Route: `/test-runner/atomic-tests`.
- `**src/pages/ProjectSelector.tsx` — "Engine Rule Atomic Tests" card added as primary entry point.
- `**src/routes/AppRoutes.jsx` — Route `/test-runner/atomic-tests` added.

### UI Enhancement — Phase 6: E2E Result Rule-Awareness

- `**src/pages/ResultsView/components/SummaryTab.tsx` — `KEYWORD_RULE_MAP` and `getRelatedRules()` added. Failed test cards now show clickable related engine rule chips based on keyword scanning of test name and error text.

### Runner Shell Integration (2026-03-04)

- `**src/App.js` — Extended unconstrained-width rendering branch to include `isTestRunnerRoute` (was only Home + Rule Lab).
- `**src/pages/ProjectSelector.tsx`** — Completely rebuilt as **Test Runner Hub: removed external `api.projects.getAll()` dependency and all AccessFlow/AccessScan/CustomerPortal project cards. Replaced with 3 app-native tool cards: Atomic Tests, Validation, History.
- `**src/declarations.d.ts` (new) — Module declarations for `prismjs` and its sub-modules to prevent TS7016 overlay in dev server.
