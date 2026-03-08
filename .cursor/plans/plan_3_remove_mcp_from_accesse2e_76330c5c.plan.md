---
name: Plan 3 Remove MCP from AccessE2E
overview: Surgically remove all Playwright MCP and CLI code from the AccessE2E project so it can be pushed clean without those features.
todos:
  - id: p3-verify-mcp-in-audit-rules
    content: "GATE: Verify MCP feature is fully present in audit-rules before removing from AccessE2E - check all MCP backend files, frontend files, shared utils, Prisma models, mcp/ directory, and playwright-cli.json exist and the server starts"
    status: pending
  - id: p3-delete-backend-files
    content: Delete 8 MCP backend files (routes, controller, services, infra, repositories)
    status: pending
  - id: p3-edit-server
    content: "Edit server.ts: remove MCP imports, service init, route mount, broadcast, static middleware, startup log"
    status: pending
  - id: p3-edit-qase-controller
    content: "Edit QaseController.ts: remove UIVsQaseValidationService import, validationService property, and runValidationPilot method"
    status: pending
  - id: p3-edit-qase-route
    content: "Edit qase.ts route: remove /validation/pilot route"
    status: pending
  - id: p3-edit-prisma
    content: Remove MCPAnalysis and MCPArtifact models and their relations from schema.prisma
    status: pending
  - id: p3-delete-frontend-files
    content: Delete MCPDebugTab.tsx, MCPAnalysis.ts, MCPAnalysisFilter.ts
    status: pending
  - id: p3-edit-results-view
    content: "Edit ResultsView/index.tsx: remove MCP state, handlers, API calls, tab rendering"
    status: pending
  - id: p3-edit-results-tabs
    content: "Edit ResultsTabs.tsx: remove mcp tab and mcpCount prop"
    status: pending
  - id: p3-edit-summary-tab
    content: "Edit SummaryTab.tsx: remove onDebugWithMCP prop and Debug button"
    status: pending
  - id: p3-edit-api-client
    content: "Edit client.ts: remove entire api.mcp namespace"
    status: pending
  - id: p3-edit-validation-view
    content: "Edit ValidationView.tsx: remove or disable the pilot validation feature (api.qase.validationPilot call)"
    status: pending
  - id: p3-delete-shared-root
    content: Delete MCPTestNavigator.ts, mcp/ directory, playwright-cli.json
    status: pending
  - id: p3-clean-package-json
    content: Remove MCP deps and scripts from root and backend package.json files
    status: pending
  - id: p3-prisma-migrate
    content: Run prisma migrate dev to drop MCP tables
    status: pending
  - id: p3-verify
    content: npm install, prisma generate, build frontend, start backend, grep for remaining MCP references
    status: pending
isProject: false
---

# Plan 3: Remove MCP/CLI from AccessE2E

Remove all Playwright MCP analysis and CLI code from `/Users/jasonquaicoo/Desktop/accessE2E/`. After this, the AccessE2E project retains its full test runner functionality but without MCP debugging or CLI navigation features.

**Prerequisite:** Plans 1 and 2 must be completed first (MCP/CLI code is safely in audit-rules).

---

## Step 0: Verification Gate - Confirm MCP Exists in Audit-Rules

**Do NOT proceed with any removals until this gate passes.** Verify that the MCP/CLI feature has been fully transferred to the audit-rules project by checking:

**Backend files exist in `audit-rules/server/src/`:**

- `services/MCPService.ts`
- `api/routes/mcp.ts`
- `api/controllers/MCPController.ts`
- `infrastructure/mcp/PlaywrightMCPClient.ts`
- `infrastructure/cli/PlaywrightCLIExecutor.ts`
- `repositories/MCPAnalysisRepository.ts`
- `repositories/MCPArtifactRepository.ts`
- `services/UIVsQaseValidationService.ts`

**Frontend files exist in `audit-rules/src/`:**

- `pages/ResultsView/components/MCPDebugTab.tsx`
- `pages/ResultsView/models/MCPAnalysis.ts`
- `pages/ResultsView/services/MCPAnalysisFilter.ts`
- `api/client.ts` contains the `api.mcp` namespace

**Shared and infra exist in `audit-rules/`:**

- `shared/utils/MCPTestNavigator.ts`
- `mcp/` directory (config, guides, prompts, tools)
- `playwright-cli.json`

**Prisma schema includes MCP models:**

- `server/prisma/schema.prisma` contains `MCPAnalysis` and `MCPArtifact` models

**Server starts successfully:**

- Run `cd server && npx tsx src/server.ts` and confirm the health endpoint responds
- Confirm `MCP Service initialized: Yes` appears in the startup log

If any of these checks fail, stop and fix the issue in audit-rules (Plans 1/2) before proceeding.

---

## Step 1: Delete MCP Backend Files

Delete these files from `standalone-app/backend/src/`:

- `api/routes/mcp.ts` - MCP Express router
- `api/controllers/MCPController.ts` - MCP controller
- `services/MCPService.ts` - MCP analysis service
- `services/UIVsQaseValidationService.ts` - validation service that depends on MCP
- `infrastructure/mcp/PlaywrightMCPClient.ts` - MCP SDK client
- `infrastructure/cli/PlaywrightCLIExecutor.ts` - CLI fallback executor
- `repositories/MCPAnalysisRepository.ts` - MCPAnalysis persistence
- `repositories/MCPArtifactRepository.ts` - MCPArtifact persistence

Also delete the parent directories if they become empty:

- `infrastructure/mcp/` (directory)
- `infrastructure/cli/` (directory)

---

## Step 2: Edit server.ts

Edit `standalone-app/backend/src/server.ts` to remove all MCP references:

**Remove imports (lines 20, 30):**

```typescript
// DELETE these lines:
import mcpRouter from "./api/routes/mcp";
import { MCPService } from "./services/MCPService";
```

**Remove MCP output static middleware (lines 51-52):**

```typescript
// DELETE these lines:
const mcpOutputDir = join(__dirname, "../../../mcp/mcp-output");
app.use("/mcp-output", express.static(mcpOutputDir));
```

**Remove MCP service initialization (lines 69-73):**

```typescript
// DELETE these lines:
const mcpServerUrl = process.env.MCP_SERVER_URL || "http://localhost:3001";
const mcpService = new MCPService(mcpServerUrl, reportService);
```

**Remove MCP broadcast wiring (line 122):**

```typescript
// DELETE this line:
mcpService.setBroadcast(broadcastToClients);
```

**Remove MCP route mount (line 217):**

```typescript
// DELETE this line:
app.use("/api/mcp", mcpRouter);
```

**Remove MCP from startup log (line 594):**

```typescript
// DELETE this line:
console.log(`[Server] MCP Service initialized: ${mcpService ? "Yes" : "No"}`);
```

---

## Step 3: Edit QaseController.ts (MCP Dependency)

The `QaseController` imports and uses `UIVsQaseValidationService`, which internally depends on `MCPService`. Edit `standalone-app/backend/src/api/controllers/QaseController.ts`:

**Remove import:**

```typescript
// DELETE:
import { UIVsQaseValidationService } from "../../services/UIVsQaseValidationService";
```

**Remove property and initialization:**

```typescript
// DELETE from class:
private validationService: UIVsQaseValidationService;

// DELETE from constructor:
this.validationService = new UIVsQaseValidationService(
  process.env.MCP_SERVER_URL || 'http://localhost:3001',
);
```

**Remove the `runValidationPilot` method** entirely (it calls `this.validationService.validate()`).

---

## Step 4: Edit Qase Route

Edit `standalone-app/backend/src/api/routes/qase.ts`:

**Remove the pilot validation route:**

```typescript
// DELETE:
router.post("/validation/pilot", (req, res) =>
  qaseController.runValidationPilot(req, res),
);
```

The basic `/validate` route (`qaseController.validateConfig`) remains - it uses `QaseService` directly and has no MCP dependency.

---

## Step 5: Edit Prisma Schema

Edit `standalone-app/backend/prisma/schema.prisma`:

**Remove the `MCPAnalysis` model (lines 176-199):** Delete the entire model block.

**Remove the `MCPArtifact` model (lines 201-214):** Delete the entire model block.

**Remove MCP relations from `TestRun` (line 48):**

```prisma
// DELETE this line from TestRun model:
mcpAnalyses MCPAnalysis[]
```

**Remove MCP relations from `TestResult` (line 79):**

```prisma
// DELETE this line from TestResult model:
mcpAnalyses MCPAnalysis[]
```

---

## Step 6: Delete MCP Frontend Files

Delete these files from `standalone-app/frontend/src/`:

- `pages/ResultsView/components/MCPDebugTab.tsx` - MCP debug UI
- `pages/ResultsView/models/MCPAnalysis.ts` - MCP analysis model
- `pages/ResultsView/services/MCPAnalysisFilter.ts` - MCP filter logic

---

## Step 7: Edit ResultsView/index.tsx

Edit `standalone-app/frontend/src/pages/ResultsView/index.tsx`:

**Remove MCP imports:**

```typescript
// DELETE these imports:
import MCPDebugTab from "./components/MCPDebugTab";
import { MCPAnalysis } from "./models/MCPAnalysis";
import { MCPAnalysisFilter } from "./services/MCPAnalysisFilter";
```

**Remove MCP state variables** (all `useState` calls related to MCP):

```typescript
// DELETE state like:
const [mcpAnalyses, setMcpAnalyses] = useState<MCPAnalysis[]>([]);
const [mcpLoading, setMcpLoading] = useState(false);
const [mcpInteracting, setMcpInteracting] = useState(false);
const [mcpStats, setMcpStats] = useState<any>(null);
const [mcpStatus, setMcpStatus] = useState<any>(null);
const [mcpFailedTests, setMcpFailedTests] = useState<any[]>([]);
```

**Remove MCP handler functions:**

```typescript
// DELETE functions like:
handleAnalyzeWithMCP;
handleTestSelector;
handleNavigateToFailure;
handleNavigateToFailureFromTest;
handleDebugWithMCP;
```

**Remove MCP API calls:**

```typescript
// DELETE calls like:
api.mcp.getStatus();
api.mcp.analyzeRun();
api.mcp.navigate();
api.mcp.interact();
api.mcp.navigateToFailure();
```

**Remove MCP tab rendering** - remove the MCP tab from the tab panel and any conditional rendering of `MCPDebugTab`.

---

## Step 8: Edit ResultsTabs.tsx

Edit `standalone-app/frontend/src/pages/ResultsView/ResultsTabs.tsx`:

- Remove the `mcp` tab entry from the tabs array
- Remove the `mcpCount` prop
- Remove any MCP-related tab label/icon

---

## Step 9: Edit SummaryTab.tsx

Edit `standalone-app/frontend/src/pages/ResultsView/components/SummaryTab.tsx`:

- Remove the `onDebugWithMCP` prop
- Remove the "Debug with MCP" button/action
- Clean up the component's prop types

---

## Step 10: Edit API Client

Edit `standalone-app/frontend/src/api/client.ts`:

**Remove the entire `mcp` namespace** from the `api` object:

```typescript
// DELETE this entire block:
mcp: {
  analyzeElement: (...) => ...,
  analyzeRun: (...) => ...,
  cleanup: (...) => ...,
  getElementAtPosition: (...) => ...,
  getStatus: (...) => ...,
  interact: (...) => ...,
  navigate: (...) => ...,
  validateSelector: (...) => ...,
  navigateToFailure: (...) => ...,
},
```

---

## Step 11: Edit ValidationView.tsx (Frontend)

Edit `standalone-app/frontend/src/pages/ValidationView.tsx`:

The ValidationView has two features:

- **Config validation** (`api.qase.validate`) - NOT MCP-dependent, keep as-is
- **Pilot validation** (`api.qase.validationPilot`) - calls the backend route we just removed

Remove or disable the pilot validation:

- Remove the `api.qase.validationPilot()` call
- Remove the UI button/section that triggers pilot validation
- Keep the basic config validation functionality intact

---

## Step 12: Delete Shared MCP File

Delete `standalone-app/shared/utils/MCPTestNavigator.ts`.

---

## Step 13: Delete Root MCP Infrastructure

- Delete the entire `mcp/` directory (config, guides, prompts, tools, mcp-output)
- Delete `playwright-cli.json` from root

---

## Step 14: Clean Up Root package.json

Edit the root `package.json`:

**Remove dependencies:**

```json
// DELETE from dependencies:
"@playwright/mcp": "^0.0.46"

// DELETE from devDependencies:
"@playwright/cli": "..."
```

**Remove MCP/CLI scripts:**

```json
// DELETE these scripts:
"mcp:start": "...",
"mcp:headless": "...",
"cli:open": "...",
"cli:show": "...",
"cli:sessions": "...",
"cli:close-all": "...",
"standalone:dev:cli": "...",
"standalone:dev:with-mcp": "...",
"run-qa": "..."
```

---

## Step 15: Clean Up Backend package.json

Edit `standalone-app/backend/package.json`:

**Remove dependency:**

```json
// DELETE:
"@modelcontextprotocol/sdk": "^1.25.2"
```

---

## Step 16: Run Prisma Migration

After editing the schema, create a migration to drop the MCP tables:

```bash
cd standalone-app/backend
npx prisma migrate dev --name remove-mcp-models
```

This generates a migration that drops the `MCPAnalysis` and `MCPArtifact` tables.

---

## Step 17: Clean Up and Verify

1. Run `npm install` at root and in `standalone-app/backend/` to update lockfiles
2. Run `cd standalone-app/backend && npx prisma generate` to regenerate the Prisma client
3. Run `cd standalone-app/frontend && npm run build` to verify frontend compiles without MCP references
4. Start the backend (`cd standalone-app/backend && npm run dev`) and verify it starts without errors
5. Start the frontend and verify:

- Results view loads without MCP tab
- Summary tab has no "Debug with MCP" button
- No console errors referencing MCP

1. Search the codebase for any remaining MCP references: `grep -r "mcp\|MCP\|PlaywrightMCPClient\|MCPService\|MCPAnalysis\|MCPArtifact\|playwright-cli\|PlaywrightCLI" --include="*.ts" --include="*.tsx" --include="*.json" standalone-app/`
