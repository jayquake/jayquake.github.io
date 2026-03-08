# UI Enhancement Design — March 4, 2026

## Overview

Unify the audit-rules application into a single cohesive product: a glassmorphic shell that houses the rule library, a rule-aware test runner, and the Rule Lab MCP analysis workspace. The test runner becomes rule-aware by integrating the engine's 1,288 atomic test fixtures as a selectable test source, and all rule pages are redesigned with a unified tabbed layout.

## Context

- 90 legacy rules (metadata + HTML examples, no atomic tests)
- 162 engine rules, each with: `validate()` function, 748 pass + 540 fail HTML atomic test fixtures, JSX example pages, 158 Jest unit tests
- Current split: main shell uses glass morphism (hardcoded hex), test runner uses flat MUI theme tokens and bypasses the shell entirely
- Rule Lab already lives inside the shell — test runner needs the same treatment

## Design Areas

### Area 1 — Shell Integration

Remove the `if (isTestRunnerRoute) { return <AppRoutes /> }` early return in `App.js`. All routes render inside the glassy drawer + AppBar shell.

- On `/test-runner/*` paths, auto-collapse the drawer to `60px` (collapsed state) to maximize content space
- The test runner's own `StickyRunHeader` (a sticky inner AppBar for step progress) sits inside the main content area — this is valid MUI pattern
- The glassy animated gradient background wraps all pages consistently

### Area 2 — Test Runner + Rule Integration (B+C)

**B: Atomic Tests as a test source**

`ProjectSelector` gains a new source option alongside Qase projects:

```
Qase Projects (existing) — AccessFlow E2E, Smoke Tests
Engine Rule Atomic Tests (new) — run rule engine against HTML fixtures
```

When "Atomic Tests" selected in `TestLibrary`:
- Left panel: rule browser grouped by impact level (Critical → Serious → Moderate → Minor), searchable, each rule shows its pass/fail fixture counts
- Right panel: same execution config (headless/headed, workers)
- Backend endpoint: `POST /api/atomic-tests/run` — accepts array of rule IDs, runs `validate()` against each selected HTML fixture, streams results via existing WebSocket

**C: Rule-awareness in E2E results**

`ResultsView` gains a "Related Rules" sidebar panel for Playwright E2E test failures. Error messages and test descriptions are scanned against rule IDs, descriptions, and keywords. Matched rules link to their rule page.

### Area 3 — Unified Tabbed Rule Pages

Replace `rulePage.js` (legacy) and `engineRulePage.jsx` (engine) with a shared `UnifiedRulePage` component. Tabs:

| Tab | Engine | Legacy |
|---|---|---|
| Overview | Title, impact chip, rule ID, description, WCAG compliance grid | Title, severity chip, short description, WCAG link |
| Examples | Success/failure nav cards → example pages | Success/failure nav cards → example pages |
| MCP Analysis | Open in Rule Lab button + stored analyses from DB | Open in Rule Lab button |
| References | WCAG criteria cards, additional resources, release JSON | WCAG link, tutorial link, resolution HTML |
| Atomic Tests | Pass fixtures list + fail fixtures list, "Run Selected" button | Hidden (legacy rules have no atomic tests) |

The hero header (breadcrumbs, rule name, chips) is shared across both types above the tab bar. Engine-specific additions (related legacy rule alert, SpeedDial) remain.

### Area 4 — Home Page Refresh

Four-card tools row replaces the two-card browse section:

```
[ Legacy Rules ]  [ Engine Rules ]  [ Test Runner ]  [ Rule Lab ]
  90 rules          158 rules         Run atomics      MCP Analysis
```

Bottom "Why AccessFlow?" section replaced with live-data stats panel:
- Last test run (timestamp, pass/fail count)
- Total Rule Lab analyses run
- Rules with MCP analysis coverage
- Atomic test pass rate across all engine rules

### Area 5 — Legacy Rules Page Enhancement

`/rules` (RulesListing) gains:
- Filter bar: severity chips, WCAG level toggle (A / AA / AAA), category dropdown
- Card grid layout (replaces or supplements the existing table)
- Each card: rule name, severity chip, category tag, "Open Rule" and "Open in Rule Lab" actions

## Implementation Sequence

1. Shell integration (Area 1) — unblock everything else
2. Unified rule page component (Area 3) — shared foundation
3. Home page refresh (Area 4)
4. Legacy rules page enhancement (Area 5)
5. Test runner atomic test source (Area 2-B)
6. E2E result rule-awareness (Area 2-C)

## Success Criteria

- Test runner pages render inside the glassy drawer shell
- All rule pages (engine + legacy) use the same tabbed layout component
- Home page shows 4 tool cards and live stats
- Legacy rules page has working filters
- Engine rule atomic tests can be selected and run from the test runner
- E2E test failures show related rules in ResultsView
