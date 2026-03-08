---
name: Plan 1 Backend Infra Setup
overview: Copy the Express backend, Prisma DB, shared utilities, and MCP/CLI infrastructure from AccessE2E standalone-app into the audit-rules project, and wire up dev scripts.
todos:
  - id: p1-tsconfig
    content: Add tsconfig.json and TypeScript devDependency to audit-rules root
    status: completed
  - id: p1-copy-backend
    content: Copy standalone-app/backend/src/ to server/src/ and update port to 3001
    status: completed
  - id: p1-copy-prisma
    content: Copy Prisma setup (schema, migrations, config) to server/prisma/
    status: completed
  - id: p1-copy-shared
    content: Copy standalone-app/shared/ to shared/ at repo root
    status: completed
  - id: p1-copy-mcp
    content: Copy mcp/ directory and playwright-cli.json to repo root
    status: completed
  - id: p1-copy-projects
    content: Copy project configs to server/projects/
    status: completed
  - id: p1-adapt-pathutils
    content: "Rewrite PathUtils.ts for audit-rules structure: remove AccessE2E-specific hardcoded paths, use PROJECT_ROOT env var, update fallback strategies"
    status: completed
  - id: p1-adapt-projectmanager
    content: Fix ProjectManager PROJECTS_DIR path for new directory structure (server/src/infrastructure/config/ -> server/projects/)
    status: completed
  - id: p1-adapt-server-paths
    content: "Fix server.ts static asset paths: frontendDist -> ../../build, mcpOutputDir -> ../../mcp/mcp-output"
    status: completed
  - id: p1-backend-pkg
    content: Create server/package.json with all backend dependencies
    status: completed
  - id: p1-env
    content: Create server/.env.example with documented env vars for path configuration
    status: completed
  - id: p1-gitignore
    content: "Update .gitignore: add server/node_modules, server/prisma/data/, server/.env, mcp/mcp-output/"
    status: completed
  - id: p1-root-scripts
    content: "Add unified dev scripts to root package.json: dev:full, server:dev, mcp:start, setup"
    status: completed
  - id: p1-fix-imports
    content: Verify and fix all import paths in backend files referencing shared/
    status: completed
  - id: p1-verify
    content: Install deps, generate Prisma client, start server, test health endpoint
    status: completed
isProject: false
---

# Plan 1: Backend and Infrastructure Setup

Integrate the Express backend (with MCP/CLI), Prisma database, shared code, and MCP infrastructure from AccessE2E into the audit-rules project. This plan pays special attention to adapting paths, configs, and conventions so the backend feels native to the audit-rules project rather than a foreign drop-in.

**Final directory structure after this plan:**

```
audit-rules/
  src/              (existing CRA frontend - untouched in this plan)
  public/           (existing static data)
  server/           (NEW - Express backend)
    src/
    prisma/
    projects/
    package.json
    .env
  shared/           (NEW - types and utils shared between frontend and backend)
    types/
    domain/
    utils/
  mcp/              (NEW - MCP infrastructure: config, guides, tools)
  test-suite/       (existing Playwright tests)
  package.json      (existing - updated with new scripts)
  tsconfig.json     (NEW)
  playwright-cli.json (NEW)
```

---

## Step 1: Add TypeScript Support to CRA

CRA supports `.ts`/`.tsx` files natively when a `tsconfig.json` exists.

- Create `tsconfig.json` at audit-rules root based on CRA defaults, enabling `jsx: "react-jsx"`, `strict: true`
- Install `typescript` as a devDependency
- This enables the existing JS files to coexist with the new TS files from the standalone-app

---

## Step 2: Copy the Express Backend

Copy `accessE2E/standalone-app/backend/` into `server/` at the audit-rules root.

**Directory mapping:**

- `standalone-app/backend/src/` -> `server/src/`
- `standalone-app/backend/prisma/` -> `server/prisma/`
- `standalone-app/backend/prisma.config.ts` -> `server/prisma.config.ts`

**All 114 files under `backend/src/` are copied**, organized as:

- `server.ts` - main Express server
- `testRunner.ts`, `resultsStorage.ts`, `flowOrchestrator.ts`
- `api/routes/` - all routers (artifacts, cleanup, database, environments, mcp, projects, qase, slack, testRuns)
- `api/controllers/` - all controllers including `MCPController.ts`
- `api/middleware/` - request logger, performance monitor, error handler
- `services/` - MCPService, QaseService, ReportService, TestExecutionService, UIVsQaseValidationService, processors
- `infrastructure/` - DatabaseService, ProjectManager, ConfigManager, PlaywrightMCPClient, PlaywrightCLIExecutor, PathUtils
- `repositories/` - all repos including MCPAnalysisRepository, MCPArtifactRepository
- `domain/` - domain objects
- `scripts/` - migration and database scripts

---

## Step 3: Adapt server.ts for Audit-Rules Structure

The original `server.ts` has paths relative to the AccessE2E layout. Update for audit-rules:

**Change port** (CRA dev server uses 3000):

```typescript
const PORT = process.env.PORT || 3001;
```

**Fix frontend dist path** - CRA builds to `build/` at repo root, not `frontend/dist`:

```typescript
// FROM: join(__dirname, '../../frontend/dist')
const frontendDist = join(__dirname, "../../build");
```

**Fix MCP output path** - `mcp/` is now at repo root, so from `server/src/server.ts`:

```typescript
// FROM: join(__dirname, '../../../mcp/mcp-output')
const mcpOutputDir = join(__dirname, "../../mcp/mcp-output");
```

---

## Step 4: Adapt PathUtils.ts for Audit-Rules

The original `PathUtils.ts` has AccessE2E-specific logic: it looks for a package named `test-e2e`, checks for a `standalone-app` sibling directory, and has a hardcoded fallback to `/Users/jasonquaicoo/Desktop/accessiE2E`. Rewrite it for the audit-rules project:

**Key changes:**

- `getProjectRoot()`: Use `PROJECT_ROOT` env var (first priority), then resolve from `server/src/` up to the repo root (2 levels: `../../`)
- `getTestE2eDir()`: Use `TEST_E2E_DIR` env var, then fall back to repo root (where `package.json` with name `accessibility-rule-testing` lives)
- Remove the hardcoded `/Users/jasonquaicoo/Desktop/accessiE2E` fallback
- Remove the check for `standalone-app` sibling directory
- Remove the check for package name `test-e2e`
- Add a check for package name `accessibility-rule-testing` as the new identifier

```typescript
static getProjectRoot(): string {
  if (process.env.PROJECT_ROOT && existsSync(process.env.PROJECT_ROOT)) {
    return resolve(process.env.PROJECT_ROOT);
  }
  // From server/src/infrastructure/utils/ -> repo root is 4 levels up
  return resolve(join(__dirname, '../../../..'));
}

static getTestE2eDir(): string {
  if (process.env.TEST_E2E_DIR && existsSync(process.env.TEST_E2E_DIR)) {
    return process.env.TEST_E2E_DIR;
  }
  return this.getProjectRoot();
}
```

---

## Step 5: Adapt ProjectManager.ts for New Directory Layout

The `PROJECTS_DIR` constant uses `join(__dirname, '../../../../projects')`. After moving to `server/src/infrastructure/config/ProjectManager.ts`, recalculate:

- `__dirname` = `server/src/infrastructure/config/`
- `../` = `server/src/infrastructure/`
- `../../` = `server/src/`
- `../../../` = `server/`
- `../../../projects` = `server/projects/` (correct destination)

```typescript
// FROM: join(__dirname, '../../../../projects')
const PROJECTS_DIR = join(__dirname, "../../../projects");
```

Also: during `loadProjects()`, the `PathUtils.validatePathExists()` calls will fail if the referenced test suites (`apps/accessFlow/tests`, etc.) don't exist locally. Make validation non-fatal at startup by catching and warning rather than failing the entire server startup. The test suites may live in a separate checkout.

---

## Step 6: Copy Prisma Setup

- Copy full `backend/prisma/` directory to `server/prisma/` (schema, migrations, data dir)
- Copy `backend/prisma.config.ts` to `server/prisma.config.ts`
- The schema includes ALL models: `TestRun`, `TestResult`, `TestStep`, `Environment`, `TestFile`, `QaseTestCase`, `TestLog`, `MCPAnalysis`, `MCPArtifact`, `TestArtifact`
- Exclude `server/prisma/data/*.db` from git (added to `.gitignore`)

---

## Step 7: Copy Shared Utilities

Copy `accessE2E/standalone-app/shared/` to `shared/` at audit-rules root.

**Files (14 total):**

- `types/index.ts` - FlowConfig, TestRunConfig, Project, ProgressUpdate types
- `types/playwrightSignals.ts` - Playwright signal types
- `domain/valueObjects/TestRunSummary.ts` - TestRunSummary value object
- `utils/ConsoleOutputParser.ts`, `TestProgressMonitor.ts`, `TestExecutionTracker.ts`
- `utils/MCPTestNavigator.ts` - MCP failure navigation (KEEP - this is moving here)
- `utils/ReportPathResolver.ts`, `TestReportParser.ts`, `TestResultItem.ts`
- `utils/QaseIdExtractor.ts`, `GitService.ts`, `PlaywrightUIService.ts`
- `utils/stagingSetupScript.ts`

---

## Step 8: Copy MCP Infrastructure

- Copy entire `accessE2E/mcp/` directory to `mcp/` at audit-rules root (config, guides, prompts, tools)
- Create empty `mcp/mcp-output/` with a `.gitkeep` (actual output files are gitignored)
- Copy `accessE2E/playwright-cli.json` to audit-rules root

---

## Step 9: Copy and Adapt Project Configs

Copy `accessE2E/standalone-app/projects/*.json` to `server/projects/`:

- `accessflow.json`, `accessscan.json`, `customer-portal.json`

**Important adaptation:** These configs reference test directories and Playwright configs relative to the AccessE2E project (e.g., `"testDirectory": "apps/accessFlow/tests"`). Since the audit-rules project doesn't contain these test suites, update the configs to use absolute paths or document that `TEST_E2E_DIR` must point to the AccessE2E checkout:

```json
{
  "id": "accessflow",
  "name": "AccessFlow",
  "testDirectory": "apps/accessFlow/tests",
  "configPath": "apps/accessFlow/playwright.config.ts"
}
```

These paths are resolved relative to `TEST_E2E_DIR`. Add a comment in `.env.example` explaining this:

```
# Point to the AccessE2E checkout where test suites live
TEST_E2E_DIR=/Users/jasonquaicoo/Desktop/accessE2E
```

---

## Step 10: Create Backend package.json

Create `server/package.json`:

```json
{
  "name": "audit-rules-server",
  "version": "1.0.0",
  "description": "Backend server for audit-rules test runner and MCP analysis",
  "main": "dist/server.js",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:studio": "npx prisma studio",
    "prisma:generate": "npx prisma generate",
    "db:push": "npx prisma db push",
    "db:clear": "tsx src/scripts/clearDatabase.ts"
  }
}
```

Dependencies and devDependencies as listed in the AccessE2E backend `package.json` (see previous plan version for full list).

---

## Step 11: Create Backend .env.example

Create `server/.env.example` with clear documentation:

```bash
# Server port (CRA dev server uses 3000, so backend uses 3001)
PORT=3001

# Playwright MCP server URL
MCP_SERVER_URL=http://localhost:3002

# SQLite database path (relative to server/ directory)
DATABASE_URL=file:./prisma/data/test-runner.db

# Project root for report resolution (defaults to repo root)
# PROJECT_ROOT=/path/to/audit-rules

# Directory containing test suites (apps/accessFlow, apps/accessScan, etc.)
# Point this to the AccessE2E checkout where your test suites live
TEST_E2E_DIR=/Users/jasonquaicoo/Desktop/accessE2E
```

Copy to `server/.env` with actual values for local development.

---

## Step 12: Update .gitignore

Add entries to [.gitignore](.gitignore) for the new backend infrastructure:

```gitignore
# Server backend
server/node_modules
server/dist
server/.env
server/prisma/data/*.db
server/prisma/data/*.db-journal

# MCP output artifacts (generated at runtime)
mcp/mcp-output/screenshots/
mcp/mcp-output/traces/
mcp/mcp-output/sessions/
```

---

## Step 13: Update Root package.json Scripts

Add to [package.json](package.json) for a unified dev experience:

```json
"setup": "npm install && cd server && npm install && npx prisma generate && npx prisma db push",
"server:dev": "cd server && npm run dev",
"server:install": "cd server && npm install",
"server:db:push": "cd server && npx prisma db push",
"server:db:studio": "cd server && npx prisma studio",
"dev:full": "concurrently -n frontend,backend -c cyan,green \"npm start\" \"npm run server:dev\"",
"mcp:start": "npx @playwright/mcp --port 3002",
"dev:all": "concurrently -n frontend,backend,mcp -c cyan,green,magenta \"npm start\" \"npm run server:dev\" \"npm run mcp:start\""
```

Add `concurrently` as a devDependency.

The `setup` script provides a one-command onboarding experience. `dev:full` starts frontend + backend with color-coded output. `dev:all` additionally starts the MCP server.

---

## Step 14: Fix Import Paths in Backend

The backend `server.ts` imports from `../../shared/` (relative to `standalone-app/backend/src/`). After moving to `server/src/`, the relative path `../../shared/` from `server/src/server.ts` correctly resolves to `shared/` at the repo root - so these imports need no changes.

**Verify all other backend files** that import from shared use the same `../../shared/` pattern. Any file deeper in the tree (e.g., `server/src/infrastructure/config/ProjectManager.ts`) uses `../../../../shared/` which also needs validation. Recalculate:

- `server/src/infrastructure/config/` -> `../../../../shared/` = goes 4 levels up to repo root parent, then into shared - this is WRONG
- Should be `../../../shared/` (3 levels: config -> infrastructure -> src -> server, then peer shared/)

Wait: `server/src/infrastructure/config/` -> `../` = `infrastructure/`, `../../` = `src/`, `../../../` = `server/`, `../../../../` = repo root. So `../../../../shared/` = `<repo-root>/shared/` which IS correct.

Verify each backend file importing from shared resolves correctly.

---

## Verification

After completing this plan:

1. `npm run setup` should install all deps, generate Prisma client, and push schema
2. `npm run server:dev` should start the Express server on port 3001
3. `curl http://localhost:3001/api/health` should return `{"status":"ok"}`
4. `curl http://localhost:3001/api/projects` should list loaded projects (may show warnings if test suites aren't at `TEST_E2E_DIR`)
5. The existing CRA app (`npm start`) should still work on port 3000 completely unaffected
6. `npm run dev:full` should start both frontend and backend with color-coded output
