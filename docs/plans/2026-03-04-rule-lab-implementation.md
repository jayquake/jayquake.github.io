# Rule Lab Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Rule Lab that uses Playwright MCP to analyze existing rule examples in a real browser and discover new real-world instances from curated sites.

**Architecture:** Rule-first -- each analysis orbits around a specific rule. Extends the existing MCPService, MCPAnalysis model, and test runner UI. Two new Prisma models (RuleExample, CuratedSite), one new backend service (RuleAnalysisService), new API routes, and a new Rule Lab frontend page.

**Tech Stack:** React 18 (CRA), MUI 7, Prisma/SQLite, Express.js, Playwright MCP, WebSocket (socket.io)

---

## Phase 1: Data Layer (Backend)

### Task 1: Extend Prisma Schema

**Files:**
- Modify: `server/prisma/schema.prisma`

**Step 1: Add ruleId fields to MCPAnalysis**

Add two optional fields to the existing `MCPAnalysis` model:

```prisma
model MCPAnalysis {
  // ... existing fields ...
  ruleId      String?   // Rule ID (e.g. "alt-misuse")
  ruleType    String?   // "engine" | "legacy"

  // Make testRunId optional for rule-only analyses
  testRunId   String?
  testRun     TestRun?  @relation(fields: [testRunId], references: [id], onDelete: Cascade)

  // ... rest stays the same ...
  @@index([ruleId])
}
```

**Step 2: Add RuleExample model**

```prisma
model RuleExample {
  id                    String   @id @default(uuid())
  ruleId                String
  ruleType              String   // "engine" | "legacy"
  exampleType           String   // "success" | "failure" | "false_positive" | "edge_case"
  htmlSnippet           String
  sourceUrl             String?
  siteName              String?
  explanation           String?
  accessibilityTree     String?  // JSON
  computedRoles         String?  // JSON array
  screenReaderNarration String?
  screenshotPath        String?
  curated               Boolean  @default(false)
  analysisId            String?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  @@index([ruleId])
  @@index([ruleType])
  @@index([exampleType])
  @@index([curated])
}
```

**Step 3: Add CuratedSite model**

```prisma
model CuratedSite {
  id        String   @id @default(uuid())
  name      String
  url       String   @unique
  category  String   // "ecommerce" | "government" | "news" | "saas" | "social"
  enabled   Boolean  @default(true)
  createdAt DateTime @default(now())

  @@index([category])
  @@index([enabled])
}
```

**Step 4: Run migration**

Run: `cd server && npx prisma db push`
Expected: Schema applied, no errors.

**Step 5: Commit**

```bash
git add server/prisma/schema.prisma
git commit -m "feat(schema): add RuleExample, CuratedSite models and extend MCPAnalysis with ruleId"
```

---

### Task 2: Seed Curated Sites

**Files:**
- Create: `server/prisma/seeds/curated-sites.json`
- Create: `server/prisma/seed.ts`

**Step 1: Create curated sites seed data**

```json
[
  { "name": "GOV.UK", "url": "https://www.gov.uk", "category": "government" },
  { "name": "USA.gov", "url": "https://www.usa.gov", "category": "government" },
  { "name": "Amazon", "url": "https://www.amazon.com", "category": "ecommerce" },
  { "name": "Target", "url": "https://www.target.com", "category": "ecommerce" },
  { "name": "BBC News", "url": "https://www.bbc.com/news", "category": "news" },
  { "name": "NPR", "url": "https://www.npr.org", "category": "news" },
  { "name": "GitHub", "url": "https://github.com", "category": "saas" },
  { "name": "Notion", "url": "https://www.notion.so", "category": "saas" },
  { "name": "Twitter/X", "url": "https://x.com", "category": "social" },
  { "name": "Reddit", "url": "https://www.reddit.com", "category": "social" }
]
```

**Step 2: Create seed script**

```typescript
import { PrismaClient } from '@prisma/client';
import sites from './seeds/curated-sites.json';

const prisma = new PrismaClient();

async function main() {
  for (const site of sites) {
    await prisma.curatedSite.upsert({
      where: { url: site.url },
      update: { name: site.name, category: site.category },
      create: { ...site, enabled: true },
    });
  }
  console.log(`Seeded ${sites.length} curated sites`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
```

**Step 3: Add seed script to package.json**

In `server/package.json` add script: `"db:seed": "npx tsx prisma/seed.ts"`

**Step 4: Run seed**

Run: `cd server && npm run db:seed`
Expected: "Seeded 10 curated sites"

**Step 5: Commit**

```bash
git add server/prisma/seeds/ server/prisma/seed.ts server/package.json
git commit -m "feat(seeds): add curated sites seed data"
```

---

### Task 3: Create Rule Data API

**Files:**
- Create: `server/src/api/routes/rules.ts`
- Create: `server/src/api/controllers/RuleController.ts`
- Modify: `server/src/server.ts` (mount route)

**Step 1: Create RuleController**

Serves rule metadata from the JSON files that already exist in the frontend (`engine-rules-metadata.json`, `legacy-rules.json`). The controller reads these files and provides a unified API.

Endpoints:
- `GET /api/rules` -- list all rules (engine + legacy) with metadata
- `GET /api/rules/:ruleId` -- get single rule with its examples
- `GET /api/rules/:ruleId/examples` -- get rule's existing HTML examples (reads from the Success/Failure JSX component files)
- `GET /api/rules/:ruleId/analyses` -- get MCP analyses for a rule
- `GET /api/rules/:ruleId/discoveries` -- get discovered RuleExamples

**Step 2: Create rules route**

Wire controller methods to Express routes.

**Step 3: Mount in server.ts**

```typescript
import rulesRouter from './api/routes/rules';
app.use('/api/rules', rulesRouter);
```

**Step 4: Commit**

```bash
git add server/src/api/routes/rules.ts server/src/api/controllers/RuleController.ts server/src/server.ts
git commit -m "feat(api): add /api/rules endpoints for rule metadata and examples"
```

---

## Phase 2: Analysis Engine (Backend)

### Task 4: Create RuleAnalysisService

**Files:**
- Create: `server/src/services/RuleAnalysisService.ts`

This is the core service. It wraps the existing `MCPService` with rule-specific logic.

**Key methods:**

```typescript
class RuleAnalysisService {
  // Analyze an existing example: render HTML in MCP browser, extract a11y data
  async analyzeExample(ruleId: string, ruleType: string, htmlSnippet: string): Promise<RuleAnalysisResult>

  // Discover examples on a curated site for a specific rule
  async discoverOnSite(ruleId: string, ruleType: string, siteUrl: string): Promise<DiscoveryResult>

  // Get the accessibility tree for an element
  private async getAccessibilityTree(selector: string): Promise<any>

  // Generate screen reader narration for an element
  private async getScreenReaderNarration(selector: string): Promise<string>

  // Map a DOM element to matching rules
  private matchElementToRule(elementInfo: any, ruleId: string): boolean
}
```

**analyzeExample flow:**
1. Start MCP browser session
2. Create a temporary HTML page with the example snippet
3. Navigate MCP to the page
4. Use MCP `browser_snapshot` to get the accessibility tree
5. Extract computed roles, ARIA states, screen reader text
6. Take a screenshot
7. Store results in MCPAnalysis (with ruleId) and create/update RuleExample
8. Return analysis result

**discoverOnSite flow:**
1. Navigate MCP to the site URL
2. Use `browser_snapshot` to get page structure
3. Find elements that match the rule's pattern (based on rule type -- e.g., for "alt-misuse", find all elements with `alt` attributes that aren't `<img>`)
4. For each matching element, extract HTML snippet, a11y tree, screenshot
5. Store as RuleExample with `curated: false`
6. Return discovery results

**Step 1: Implement RuleAnalysisService with analyzeExample**

**Step 2: Implement discoverOnSite**

**Step 3: Commit**

```bash
git add server/src/services/RuleAnalysisService.ts
git commit -m "feat(service): add RuleAnalysisService for example analysis and discovery"
```

---

### Task 5: Create Rule Analysis API Routes

**Files:**
- Create: `server/src/api/routes/ruleAnalysis.ts`
- Create: `server/src/api/controllers/RuleAnalysisController.ts`
- Modify: `server/src/server.ts`

Endpoints:
- `POST /api/rule-lab/analyze` -- analyze an existing example `{ ruleId, ruleType, htmlSnippet }`
- `POST /api/rule-lab/discover` -- discover on a site `{ ruleId, ruleType, siteUrl }`
- `GET /api/rule-lab/sites` -- list curated sites
- `POST /api/rule-lab/sites` -- add a curated site
- `PUT /api/rule-lab/examples/:id/curate` -- approve/reject a discovered example
- `GET /api/rule-lab/examples` -- list examples with filters (ruleId, curated, exampleType)

**Step 1: Create controller and routes**

**Step 2: Mount in server.ts**

**Step 3: Commit**

```bash
git add server/src/api/routes/ruleAnalysis.ts server/src/api/controllers/RuleAnalysisController.ts server/src/server.ts
git commit -m "feat(api): add /api/rule-lab endpoints for analysis and discovery"
```

---

### Task 6: Add WebSocket Events for Analysis Progress

**Files:**
- Modify: `server/src/services/RuleAnalysisService.ts`
- Modify: `shared/types/index.ts`

Add new ProgressUpdate types for rule analysis:

```typescript
// In shared/types/index.ts, extend ProgressUpdate type union:
type: '...' | 'rule-analysis-start' | 'rule-analysis-progress' | 'rule-analysis-complete'
    | 'rule-discovery-start' | 'rule-discovery-progress' | 'rule-discovery-complete';
```

The service emits WebSocket events as it progresses through analysis/discovery so the frontend can show live progress.

**Step 1: Add types**

**Step 2: Add WebSocket emissions to RuleAnalysisService**

**Step 3: Commit**

---

## Phase 3: Rule Lab UI (Frontend)

### Task 7: Create API Client Methods

**Files:**
- Modify: `src/api/client.ts`

Add a `ruleLab` namespace to the existing api object:

```typescript
ruleLab: {
  getRules: () => fetch('/api/rules').then(r => r.json()),
  getRule: (id: string) => fetch(`/api/rules/${id}`).then(r => r.json()),
  analyzeExample: (data: { ruleId: string; ruleType: string; htmlSnippet: string }) =>
    fetch('/api/rule-lab/analyze', { method: 'POST', ... }).then(r => r.json()),
  discoverOnSite: (data: { ruleId: string; ruleType: string; siteUrl: string }) =>
    fetch('/api/rule-lab/discover', { method: 'POST', ... }).then(r => r.json()),
  getSites: () => fetch('/api/rule-lab/sites').then(r => r.json()),
  getExamples: (ruleId: string) => fetch(`/api/rule-lab/examples?ruleId=${ruleId}`).then(r => r.json()),
  curateExample: (id: string, curated: boolean) =>
    fetch(`/api/rule-lab/examples/${id}/curate`, { method: 'PUT', ... }).then(r => r.json()),
}
```

**Step 1: Add ruleLab namespace**

**Step 2: Commit**

---

### Task 8: Create Rule Lab Page

**Files:**
- Create: `src/pages/RuleLab/index.tsx`
- Create: `src/pages/RuleLab/RuleLabAppBar.tsx`
- Create: `src/pages/RuleLab/RulePicker.tsx`
- Create: `src/pages/RuleLab/ExampleAnalysisPanel.tsx`
- Create: `src/pages/RuleLab/DiscoveryPanel.tsx`
- Create: `src/pages/RuleLab/AccessibilityTreeView.tsx`

**Layout:**

```
+--------------------------------------------------+
|  Rule Lab AppBar  [rule search] [Analyze] [Discover]
+--------------------------------------------------+
| Rule Picker  | Example Analysis    | Discoveries   |
| (left panel) | (center panel)      | (right panel) |
|              |                     |               |
| [Search]     | Existing Examples:  | Curated Sites:|
| Engine Rules | [Success 1] [a11y]  | [GOV.UK]     |
|  alt-misuse  | [Success 2] [a11y]  | [Amazon]     |
|  btn-disc    | [Failure 1] [a11y]  | [BBC News]   |
|  ...         |                     |               |
| Legacy Rules | MCP Analysis:       | Found Examples:|
|  link-ctx    | Computed Roles: ... | [snippet 1]  |
|  ...         | A11y Tree: ...      | [snippet 2]  |
|              | SR Narration: ...   | [Curate btn] |
+--------------------------------------------------+
```

**RulePicker (left panel):**
- Search input filtering across all 248 rules
- Grouped by type (Engine / Legacy) and criteria
- Selected rule highlighted
- Shows rule count badges per criteria

**ExampleAnalysisPanel (center panel):**
- Shows existing success/failure HTML examples for the selected rule
- Each example has an "Analyze" button
- After analysis: shows accessibility tree visualization, computed roles, screen reader narration, screenshot
- Live progress via WebSocket during analysis

**DiscoveryPanel (right panel):**
- Shows curated sites list with checkboxes
- "Discover" button triggers MCP to scan selected sites for this rule's patterns
- Shows discovered examples with HTML snippet, source URL, site name
- Each discovery has Approve/Reject buttons for curation
- Live progress via WebSocket during discovery

**AccessibilityTreeView:**
- Renders the JSON accessibility tree as a collapsible tree component
- Uses MUI TreeView (`@mui/x-tree-view`)
- Highlights relevant nodes (matching the rule's target elements)

**Step 1: Create RulePicker component**

**Step 2: Create ExampleAnalysisPanel**

**Step 3: Create DiscoveryPanel**

**Step 4: Create AccessibilityTreeView**

**Step 5: Create RuleLabAppBar**

**Step 6: Create main index.tsx composing all panels**

**Step 7: Commit**

---

### Task 9: Add Rule Lab Route

**Files:**
- Modify: `src/routes/AppRoutes.jsx`
- Modify: `src/listItems.js`

**Step 1: Add route**

```jsx
import RuleLab from '../pages/RuleLab/index';

<Route path="/test-runner/rule-lab" element={<RuleLab />} />
```

**Step 2: Add nav link**

Add "Rule Lab" link to the sidebar with a `Science` or `Biotech` icon.

**Step 3: Commit**

---

### Task 10: Enhance Existing Rule Pages

**Files:**
- Modify: `src/components/layout/engineRulePage.jsx`
- Modify: `src/components/layout/engineIssueSuccess.jsx`
- Modify: `src/components/layout/engineIssueFailure.jsx`

Add an "MCP Analysis" section to existing rule pages that shows:
- Curated real-world examples (from RuleExample where `curated: true`)
- Link to open this rule in the Rule Lab
- If analyses exist: show accessibility tree summary and screen reader narration

**Step 1: Add analysis section to engineRulePage**

**Step 2: Add real-world examples to success/failure pages**

**Step 3: Commit**

---

## Phase 4: Integration and Polish

### Task 11: WebSocket Hook for Rule Lab

**Files:**
- Create: `src/hooks/useRuleLabSocket.ts`

Custom hook that connects to the WebSocket and listens for `rule-analysis-*` and `rule-discovery-*` events, updating the UI with live progress.

**Step 1: Create hook**

**Step 2: Integrate into RuleLab page**

**Step 3: Commit**

---

### Task 12: End-to-End Verification

**Step 1:** Start backend: `npm run server:dev`
**Step 2:** Start frontend: `npm start`
**Step 3:** Start MCP: `npm run mcp:start`
**Step 4:** Navigate to `/test-runner/rule-lab`
**Step 5:** Select "alt-misuse" rule
**Step 6:** Click "Analyze" on first success example -- verify a11y tree, computed roles, SR narration appear
**Step 7:** Select GOV.UK, click "Discover" -- verify MCP navigates, finds elements, creates examples
**Step 8:** Approve a discovered example -- verify it appears on the rule page
**Step 9:** Navigate to `/engine/alt-misuse` -- verify the "Analysis" section shows curated findings
