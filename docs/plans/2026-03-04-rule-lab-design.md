# Rule Lab Design Document

## Problem

The audit-rules app has 158 engine rules and 90 legacy rules, each with hand-crafted success/failure HTML examples and atomic tests. These examples are static and limited -- they don't show how elements actually behave in a real browser, what screen readers announce, or how the same patterns appear across real websites.

## Solution

**Rule Lab** -- a rule-first analysis platform that uses Playwright MCP to:

1. **Analyze existing examples** in a real browser: render each rule's success/failure HTML snippets, extract accessibility tree data, computed ARIA roles, and screen reader narration
2. **Discover real-world instances** by scanning curated well-known sites (e-commerce, government, news, SaaS) and mapping elements to rules
3. **Enrich rule pages** with MCP findings and provide a dedicated Rule Lab workspace for exploration and curation

## Architecture: Rule-First (Approach A)

The rule is the central entity. Every analysis and discovery orbits around a specific rule.

### Data Flow

```
Rule Selected -> Existing Examples Loaded -> MCP Analyzes in Browser
                                          -> Accessibility Tree Extracted
                                          -> Screen Reader Narration Generated
                                          -> Results Stored in DB

Rule Selected -> Curated Site Chosen -> MCP Navigates & Crawls
                                     -> Elements Mapped to Rule Patterns
                                     -> New Examples Discovered
                                     -> Stored as RuleExample (pending curation)
```

### Data Model (extends existing)

**Extend `MCPAnalysis` model:**
- Add optional `ruleId` (String?) and `ruleType` (String? -- "engine" | "legacy")
- Make `testRunId` optional (nullable) so analyses can exist without a test run
- This lets the same model serve both test-result analysis (current) and rule analysis (new)

**New `RuleExample` model:**
- `id`, `ruleId`, `ruleType`, `exampleType` ("success" | "failure" | "false_positive" | "edge_case")
- `htmlSnippet` -- raw HTML found in the wild
- `sourceUrl`, `siteName` -- provenance
- `explanation` -- MCP-generated explanation
- `accessibilityTree` -- JSON snapshot
- `computedRoles` -- JSON array
- `screenReaderNarration` -- text narration
- `screenshotPath` -- element screenshot
- `curated` (boolean) -- human-reviewed?
- `analysisId` -- links to MCPAnalysis

**New `CuratedSite` model:**
- `id`, `name`, `url`, `category` ("ecommerce" | "government" | "news" | "saas" | "social")
- `enabled` (boolean)

### UI: Two surfaces

**1. Rule Lab page (`/test-runner/rule-lab`):**
- Left panel: rule picker (search/filter across all 248 rules)
- Center: existing examples with MCP enrichment (a11y tree, screen reader narration, computed roles)
- Right: discovered examples from curated sites
- Actions: "Analyze Examples", "Discover on Sites", "Curate" (approve/reject discovered examples)

**2. Enhanced rule pages (existing `/engine/*` pages):**
- New "Analysis" tab/section showing MCP findings for this rule
- Curated real-world examples alongside existing hand-crafted ones
- Accessibility tree visualization

### Backend: Extends existing MCPService

- New `RuleAnalysisService` that wraps `MCPService` with rule-specific logic
- Reuses `PlaywrightMCPClient` for browser control
- Reuses `MCPAnalysisRepository` and `MCPArtifactRepository` for storage
- New `RuleExampleRepository` for discovered examples
- New API routes under `/api/rules/` for rule analysis operations

### What we reuse

- `MCPAnalysis` Prisma model (extended with ruleId)
- `MCPArtifact` model (screenshots, traces)
- `MCPService` (Playwright MCP integration)
- `PlaywrightMCPClient` (browser control)
- WebSocket infrastructure (live progress)
- Results UI components (MCPDebugTab, SummaryTab, StepList)
- MUI theme and layout components
