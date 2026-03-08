# AccessFlow -- QA Testing Platform

Accessibility rule library and interactive testing platform. Browse 248+ rules (162 engine + 90 legacy), examine success/failure examples, analyze accessibility trees with Playwright MCP, track false positives, and run E2E test suites -- all from a unified UI.

## Quick Start

```bash
# First-time setup (installs deps, generates Prisma client, pushes DB schema)
npm run setup

# Start everything (frontend + backend + auto-spawns Playwright MCP)
npm run dev:full
```

| Service            | URL                        |
|--------------------|----------------------------|
| Frontend (React)   | http://localhost:3000       |
| Backend (Express)  | http://localhost:3001       |
| Playwright MCP     | http://localhost:3002       |

The backend automatically detects and spawns the Playwright MCP server in development. No separate process needed.

## Prerequisites

- **Node.js 20.x** and npm
- **Python 3.12+** (optional -- Python test lane only)
- **Java 17+** and Maven (optional -- Java test lane only)

## Architecture

```
┌─────────────────────────────────────────────────────┐
│  Frontend (React 18 + MUI 7)         :3000          │
│  ┌───────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │ Dashboard │ │ Rule Tree│ │ Rule Lab         │   │
│  │ Home      │ │ Sidebar  │ │ Analysis + Trees │   │
│  └───────────┘ └──────────┘ └──────────────────┘   │
│  ┌───────────────────┐ ┌─────────────────────────┐  │
│  │ UnifiedRulePage   │ │ Test Runner             │  │
│  │ Examples + Cards  │ │ Progress + Results      │  │
│  └───────────────────┘ └─────────────────────────┘  │
└────────────────────┬────────────────────────────────┘
                     │ proxy /api → :3001
┌────────────────────▼────────────────────────────────┐
│  Backend (Express + TypeScript)      :3001          │
│  ┌────────┐ ┌──────────┐ ┌────────────┐ ┌───────┐  │
│  │ Rules  │ │ Rule Lab │ │ Test Runs  │ │ Qase  │  │
│  │ API    │ │ Analysis │ │ WebSocket  │ │ Sync  │  │
│  └────────┘ └─────┬────┘ └────────────┘ └───────┘  │
│             Prisma │ SQLite                          │
└───────────────────┬──────────────────────────────────┘
                    │ SSE on /sse
┌───────────────────▼──────────────────────────────────┐
│  Playwright MCP Server               :3002           │
│  @playwright/mcp -- browser automation + snapshots   │
└──────────────────────────────────────────────────────┘
```

## Features

### Rule Library

- **248+ accessibility rules** organized in a two-tier tree sidebar
- **Engine Rules** (162): grouped into 8 categories -- ARIA & Roles, Forms & Inputs, Links & Navigation, Images & Media, Structure & Semantics, Interactive Widgets, Text & Content, Page & Document
- **Legacy Rules** (90): grouped by 12 criteria -- Graphics, Forms, Keyboard, Navigation, Headings, Errors, Context, Clickables, Document, Readability, Tables, Carousels
- Each rule has: overview, success/failure examples with code, MCP analysis actions, WCAG references

### Rule Lab

- Analyze HTML snippets against accessibility rules using Playwright MCP
- View accessibility trees inline on any example card
- Deep-link from example pages: "Analyze in Rule Lab" carries rule context and HTML
- Discover accessibility patterns across curated sites
- Pre-flight MCP health check with graceful offline fallback

### False Positive Tracking

- Flag individual examples as false positives from any example card
- Persisted to localStorage with optional notes and timestamps
- Dashboard shows false positive counts by category

### Test Runner

- Run Playwright E2E test suites from the UI
- Real-time progress via WebSocket
- View results with summary, output, and detailed step breakdowns
- Qase integration for test case sync and validation

### Responsive Design

- Desktop: permanent sidebar with expand/collapse, full search bar
- Mobile (<960px): temporary overlay drawer, bottom navigation (Dashboard / Rules / Rule Lab), tabbed content panels
- Glassmorphism design language throughout

## npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev:full` | Start frontend + backend (MCP auto-spawns) |
| `npm run dev:all` | Alias for `dev:full` |
| `npm start` | Frontend only (port 3000) |
| `npm run server:dev` | Backend only (port 3001) |
| `npm run mcp:start` | Playwright MCP only (port 3002, manual) |
| `npm run setup` | Install all deps + Prisma generate + DB push |
| `npm run build` | Production build |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Playwright interactive UI mode |
| `npm run test:e2e:headed` | Run tests in headed browser |
| `npm run test:e2e:debug` | Debug mode |
| `npm run test:e2e:report` | Open HTML report |
| `npm run server:db:studio` | Open Prisma Studio (DB browser) |

## Environment Variables

Copy `server/.env.example` to `server/.env` and configure:

```env
PORT=3001                              # Backend server port
MCP_SERVER_URL=http://localhost:3002    # Playwright MCP server URL
MCP_PORT=3002                          # MCP server port
MCP_AUTO_SPAWN=true                    # Auto-start MCP in dev (set false in prod)
DATABASE_URL=file:./prisma/data/test-runner.db
TEST_E2E_DIR=/path/to/accessE2E       # E2E test suite directory
```

For SDK test lanes, also set:

```env
ACCESSFLOW_API_KEY=your-key-here
```

## Project Structure

```
.
├── src/                          # React frontend
│   ├── App.js                    # Main layout, routing, responsive drawer
│   ├── api/client.ts             # Backend API client
│   ├── components/
│   │   ├── layout/
│   │   │   ├── RuleTreeSidebar/  # Two-tier tree navigation
│   │   │   ├── UnifiedRulePage.tsx  # Rule detail page
│   │   │   ├── UnifiedExamplePage.jsx  # Shared example page layout
│   │   │   ├── ExampleCard.jsx   # Per-example card with Rule Lab actions
│   │   │   ├── engineIssueSuccess.jsx  # Engine success adapter
│   │   │   ├── engineIssueFailure.jsx  # Engine failure adapter
│   │   │   ├── issueSuccess.jsx  # Legacy success adapter
│   │   │   └── issueFailure.jsx  # Legacy failure adapter
│   │   ├── pages/Home.jsx        # Dashboard with stats, search, coverage
│   │   └── util/                 # Breadcrumbs, helpers
│   ├── data/
│   │   ├── engine-rules-metadata.json  # 162 engine rule definitions
│   │   └── engine-rule-categories.js   # 8-category grouping
│   ├── pages/RuleLab/            # Rule Lab UI
│   └── routes/AppRoutes.jsx      # Route definitions
├── server/                       # Express + TypeScript backend
│   ├── src/
│   │   ├── server.ts             # Entry point, middleware, WebSocket
│   │   ├── config/
│   │   │   ├── mcp.ts            # Centralized MCP config
│   │   │   └── storage.config.ts
│   │   ├── api/
│   │   │   ├── routes/           # REST API routes
│   │   │   └── controllers/      # Route handlers
│   │   ├── services/
│   │   │   ├── MCPService.ts     # Playwright MCP orchestration
│   │   │   ├── RuleAnalysisService.ts  # Rule Lab analysis
│   │   │   ├── QaseService.ts    # Qase API integration
│   │   │   └── ReportService.ts  # Test report management
│   │   └── infrastructure/
│   │       ├── mcp/
│   │       │   ├── PlaywrightMCPClient.ts  # SSE transport client
│   │       │   └── mcpAutoSpawn.ts         # Dev auto-spawn logic
│   │       └── database/
│   │           └── DatabaseService.ts
│   ├── prisma/
│   │   ├── schema.prisma         # Database schema
│   │   └── data/test-runner.db   # SQLite database
│   └── .env.example
├── shared/                       # Shared types and utilities
├── test-suite/                   # Playwright E2E tests (JS)
├── python-tests/                 # Playwright E2E tests (Python)
├── java-tests/                   # Playwright E2E tests (Java)
├── nodeSDK/                      # AccessFlow JS SDK artifact
├── pythonSdk/                    # AccessFlow Python SDK artifact
├── javaSdk/                      # AccessFlow Java SDK artifact
└── package.json
```

## API Endpoints

| Route | Purpose |
|-------|---------|
| `GET /api/health` | Health check |
| `GET /api/rules` | List all rules |
| `GET /api/rules/:id` | Get rule details |
| `POST /api/rule-lab/analyze` | Analyze HTML snippet with MCP |
| `GET /api/rule-lab/health` | MCP connection health |
| `POST /api/rule-lab/discover` | Discover patterns on a URL |
| `GET /api/mcp/status` | MCP server status + available tools |
| `POST /api/runs` | Create a test run |
| `GET /api/runs` | List test runs |
| `GET /api/runs/:id` | Get run details + results |
| `GET /api/database/stats` | Database statistics |
| `GET /api/qase/status` | Qase integration status |

## Database

SQLite via Prisma ORM. Key models:

| Model | Purpose |
|-------|---------|
| `TestRun` | Test run metadata, status, summary |
| `TestResult` | Individual test outcomes |
| `MCPAnalysis` | Playwright MCP accessibility analysis results |
| `RuleExample` | Curated success/failure examples per rule |
| `CuratedSite` | Sites used for Rule Lab discovery |
| `QaseTestCase` | Cached Qase test cases |

Manage with:

```bash
npm run server:db:push     # Push schema changes
npm run server:db:studio   # Open Prisma Studio
```

## MCP Integration

The app uses [Playwright MCP](https://github.com/anthropics/playwright-mcp) for browser automation and accessibility analysis:

- **Auto-spawn in development**: The backend probes port 3002 on startup. If no MCP server is running, it spawns one automatically and waits for readiness.
- **Centralized config**: All MCP consumers (`MCPService`, `RuleAnalysisService`, controllers) use `getMcpConfig()` from `server/src/config/mcp.ts`.
- **Production**: Set `MCP_AUTO_SPAWN=false` and manage the MCP server externally (systemd, Docker, K8s).
- **Manual start**: `npm run mcp:start` if you need to run it independently.

## SDK Test Lanes

Three parallel test lanes for the AccessFlow SDK:

### JavaScript

```bash
npx playwright install --with-deps chromium
npm run test:e2e
```

### Python

```bash
cd python-tests
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python -m playwright install --with-deps chromium
pytest -v
```

### Java

```bash
cd java-tests
mvn compile
mvn exec:java -e -Dexec.mainClass=com.microsoft.playwright.CLI -Dexec.args="install --with-deps chromium"
mvn test
```

## CI / GitHub Actions

The workflow (`.github/workflows/ci-test-deploy.yml`) runs three parallel test jobs across JS, Python, and Java lanes. Deploy to GitHub Pages runs after all lanes pass.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, MUI 7, MUI X Tree View 8, react-router-dom 6, Framer Motion, Prism.js |
| Backend | Express, TypeScript, Prisma (SQLite), WebSocket (ws) |
| MCP | @playwright/mcp, @modelcontextprotocol/sdk |
| Testing | Playwright, pytest, JUnit/Maven |
| Build | Create React App (react-app-rewired), concurrently |
