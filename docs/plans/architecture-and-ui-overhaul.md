# Architecture + UI/UX overhaul: master plan

> The single source of truth for this effort. Update it whenever a decision is made or an iteration lands, so nobody has to reconstruct it from memory.
> Started 2026-11-09. Last updated 2026-11-10.

## Goal

Overhaul the RAIDEN audit-rules UI/UX on **shadcn/Tailwind** and **remove MUI entirely**, while deepening the architecture so the UI work lands on clean seams. The architecture work follows `/improve-codebase-architecture`, and its vocabulary is defined in `GLOSSARY.md` (domain) and the `codebase-design` skill (module, interface, depth, seam, adapter, leverage, locality).

## Global decisions (settled)

| Topic | Decision |
|---|---|
| Overhaul scope | App chrome **and all MUI app pages** (RuleLab, test runner, results, progress, history, atomic tests, login, rule and example pages) |
| MUI | **Remove the dependency fully.** Fixture pages that use MUI are rewritten so their **DOM and a11y pass/fail behaviour stay identical** (verify with before/after audits). |
| Fixtures | Criteria `rules/{Success,Failure}` and `engine-rules/**` example pages are test targets with **intentional a11y failures**. Never restyle or "fix" them. |
| Theme | **Light by default plus a dark toggle** (CSS variables, persisted per user) |
| Iteration order | **7 → 1 → 2 (2a, 2b) → 3 → 5 → 4 → 6**. #6 also carries full MUI removal and dark mode. |
| Delivery | **One branch + PR per iteration, stacked.** Each must pass the build, tests, the route crawl and the flow checks before the next starts. |
| main | The local baseline commit `a91001ae` is on local `main` only (not pushed). PRs target `origin/main` and carry it (via #24). **Do not push main directly.** |
| Asking | Present decisions to the user through the question UI (AskUserQuestion), not plain text. |

## Status

| # | Iteration | Branch | PR | State |
|---|---|---|---|---|
| 7 | Delete the dead legacy chain + fix the build-breaking hook | `refactor/arch-07-dead-code` | [#24](https://github.com/jayquake/jayquake.github.io/pull/24) → main | ✅ open, verified |
| 1 | Library location module | `refactor/arch-01-library-location` | [#25](https://github.com/jayquake/jayquake.github.io/pull/25) → #24 | ✅ open, verified |
| 2a | Rule data sync (engine + legacy) | `data/arch-02a-rule-data-sync` | [#26](https://github.com/jayquake/jayquake.github.io/pull/26) → #25 | ✅ open, verified |
| 2b | Rules catalog module | — | — | ⏳ decided, not started |
| 3 | Rule tree model | — | — | ⏳ not grilled |
| 5 | Example page adapter | — | — | ⏳ not grilled |
| 4 | Example audit module | — | — | ⏳ not grilled |
| 6 | Design tokens + MUI removal + dark mode | — | — | ⏳ not grilled |

When #24 merges, retarget #25 to `main`, then rebase each later branch in the stack.

---

## ✅ #7: Dead code (PR #24)

- Deleted every file unreachable from `src/index.js`, found with an import-reachability script. That removed about 10k lines: `engineRoutes.jsx`, `routes.js`, `rulePage`, the modals, list pages, 12 Criteria category pages, the Tables template, `SearchContext`, `ModalContext`, the `navigate` prop chain and `/test-item`.
- Pruned 45 unreachable `isEngine` branches from `UnifiedRulePage` (only the legacy path is live).
- Kept the `engineIssue{Success,Failure}` wrappers and `useResolvedHtmlExamples`, because 328 engine fixtures import them.
- Kept the unused shadcn primitives (`select`, `separator`, `scroll-area`, `input-group`) for the overhaul.
- Deferred the data JSONs to #2.
- Fixed `EngineRuleDetailPane`, which called a hook after an early return. That made `npm run build` **fail on main**.
- Replaced the CRA template `App.test.js` with a shell smoke test, and added a Jest `moduleNameMapper` for `@radix-ui/primitive/is-development` (Jest 27 can't read package `exports`).

## ✅ #1: Library location (PR #25)

**Module:** `src/lib/libraryLocation.js` (pure) plus `src/hooks/useLibraryLocation.js` (thin binding).
- It owns the route grammar (engine and legacy, `_success`/`_failure`), the query and every library href.
- Query params use short names and are left out at their defaults: `q`, `category`, `impact`, `level`, `wcag`, `legacy=1|0`. Invalid values fall back to "all".
- Only `detail=closed` is ever written.
- The search input is local, with a **250 ms debounced** history *replace*. Opening a rule *pushes* history.
- Both table layouts get the same **5 filters**, plus "Clear filters (n)" and an empty-state "Clear search and filters".
- Every library link carries q + filters. Example-page Back returns to the rule with state. Rule Lab links carry no library state.
- **Fixed:**
  - Legacy tree hrefs pointed at `/engine/<route>_success`.
  - The mobile sheet didn't open on tap. It's now driven by the URL.
  - The drawer didn't close on link click.
  - `?debug=mcp` was dead.
- **Known follow-up:** "MCP Debug" and "Rule Lab" now open the same page (Rule Lab reads neither `view` nor `mode`). Merge them in the shadcn pass.

---

## 🚧 #2a: Rule data sync (data only, no app code beyond what the data needs)

### Engine rules
- [x] `git pull --ff-only` in `~/Desktop/core-engine-auditor` (clean on `main`). Fast-forwarded 2026-11-10; only `package.json` / lock churn, no rule content delta.
- [x] `npm run sync:engine-rules` (copies rule folders into `src/components/pages/engine-rules`).
- [x] Regenerate the engine metadata and catalog with the existing scripts (`aggregate-rule-metadata.js` → `generate-engine-rules-index.js`). #2b replaces these scripts.
- [x] Put the engine data changes in their **own commit**. *(No commit needed: sync produced only `generatedAt` churn, reverted.)*

### Legacy rules (source: `acsbe/accessFlow` main, `deps/mongodb/dump-json/accessFlow/rules.json`)
Facts:
- The dump is a Mongo export of concatenated JSON documents, not one JSON array.
- It has 96 rules: 90 existing plus 6 new (`targetSize`, `sliderAlternativeInput`, `carouselAlternativeNavigation`, `navigationLabel`, `unobscuredHeaderFocus`, `unobscuredFooterFocus`). 18 are disabled.
- There are 17 criteria; the repo only knows 12.
- **48 rules moved criteria** (e.g. `linkContext`: clickables → interactive-content). `brokenAriaLabels` changed route (`errors/broken-aria-labels` → `interactive-content/aria-label-misuse`).
- Field drift: `issueWCAGLinks` (array) replaced `issueWCAGLink` (string). New fields: `wcagVersion`, `engineRules`, `confidence`, `isAutoResolvable`, AI-validation fields.
- 34 rules carry `engineRules`: engine rule ids referenced by **engine `id`, not kebabId**.
- Conflict report (confirmed 2026-11-10): **27 agree, 7 differ, 49 local-only**; AccessFlow references retired ids `interactive-not-tabbable`, `tabbable-non-interactive`, `navigation-submenu-region`, `icon-discernible`.

Decisions:
- [x] A new `scripts/sync-legacy-rules-from-accessflow.js` (`npm run sync:legacy-rules`). It fetches through `gh api` from `acsbe/accessFlow@main`, or reads a local path from `ACCESSFLOW_RULES_PATH`, and parses the concatenated docs. It writes `public/data.json` and `src/data/legacy-rules.json` in the existing shape, plus a derived `issueWCAGLink` (the first of `issueWCAGLinks`) so current readers keep working. Also writes `legacy-redirects.json`, `legacy-criteria.json`, `legacy-example-fixtures.json`. Re-running after a sync **keeps** existing redirects. `--rewrite-routes` re-keys `*Routes.jsx` paths.
- [x] **Keep disabled rules**, badged "Disabled in AccessFlow".
- [x] **New rules get rule pages.** Their example pages show "No examples yet" until fixtures exist (12 slots: 6 rules × success/failure).
- [x] **Criteria routes are derived from the data**, replacing the hard-coded `CRITERIA_PREFIXES` in `src/routes/criteriaPathUtils.js` (used by `isCriteriaPath` and `parseRoute`).
- [x] **URLs move to the new criteria, with redirects** (user decision, 2026-11-10):
  - Canonical URL: `/<new-criteria>/<route>[_success|_failure]`.
  - Old URLs (`/<old-criteria>/<route>…`, and `brokenAriaLabels`' old route) **redirect** with `replace` to the new ones via `LegacyRedirect` + `src/data/legacy-redirects.json` (144 entries).
  - **Re-keyed the Criteria fixture route files** (96 path attrs in 8 files). Fixture component files and folders stay **untouched**.
  - Static prerender / GitHub Pages: deep links rely on `build/404.html` SPA shell (documented in `prerender-spa-routes.js`); client then replace-redirects.
  - Re-crawled 270 old URLs: **0 path mismatches**.
- [x] Legacy ↔ engine mapping conflict report printed by sync (merge deferred to 2b).
- [x] Commit legacy data changes separately from the script and route changes.

### Verification for 2a
- [x] Build (`BUILD_EXIT=0`; 4 engine prerender timeouts on existing flaky fixtures: `popup-focus_*`, `region-main-navigation-mismatch_*`).
- [x] App Jest: 55 passed with `--testPathIgnorePatterns engine-rules`.
- [x] Crawl vs #25 build (758 routes): 0 material diffs after filtering new-criteria baseline noise + textLen timing; 42 textLen-only.
- [x] Crawl of every old legacy URL: 270/270 path redirects OK; rule-name present on rule pages.
- [x] Legacy tree shows **96** rules; data has **17** criteria.

---

## ⏳ #2b: Rules catalog module (decided)

- **A shared module (CommonJS)** that the app, the Node build scripts and the server can all load. It:
  - normalises one rule row
  - uses **kebabId as the slug** everywhere (URLs, categories, example folders, tree keys)
  - holds the categories
  - owns `query(rules, libraryQuery)`, which returns rules ranked (id/title hits first) plus facets (levels, criteria)
- **One generator** writes `public/engine-rules.json`.
  - Rows gain `kebabId`, raw *and* plain `advice`, **all ref types**, and `populated`.
  - `generatedAt` changes **only when rule content changes**.
  - Delete `public/engine-rules-index.json` (nothing reads it) and both copies of `engine-rules-metadata.json`.
- **App:** a catalog hook (load once, byId, query) replaces `useEngineRulesIndex`, `useEngineRuleFull` (a pass-through) and RuleTreeSidebar's own loader.
  - **One full-text search** for the table and the tree.
  - Rule Lab and Atomic Tests **fetch** the catalog instead of bundling the 200 KB JSON, and show stubs by kebabId with "No description yet".
  - The library and tree hide the 12 stubs.
- **Node consumers** read the catalog from disk through the shared module: `server/src/api/controllers/RuleController.ts`, `scripts/qase/lib/engine-rule-case-builder.js` and `scripts/prerender-example-pages.js`. Server consumers need raw advice, all refs, stubs and kebabId.
- **id ≠ kebabId for 8 rules:**
  - `breadcrumbs-in-nav`/`breadcrumbs-nav`
  - `broken-aria-references`/`broken-aria-reference`
  - `captcha-accessible-provider-v2.0`/`-2.0`
  - `…-v2.2`/`-2.2`
  - `had-meta-viewport`/`page-meta-viewport`
  - `list-item-missuse`/`list-item-misuse`
  - `region-main-navigation`/`region-main-navigation-mismatch`
  - `search-input-announcement`/`search-input-dynamic-results-announcement`

  Old `/engine/<id>` URLs redirect to `/engine/<kebabId>`. The catalog resolves both ids, which AccessFlow's `engineRules` needs because it uses engine `id`.
- **Category fix:** `dialog-modal-discernible` goes into the category with the other `dialog-modal-*` rules. 9 rules currently show no category.
- **Merged legacy ↔ engine mapping:** the union of the local mapping and AccessFlow's `engineRules`, with retired ids resolved to the current rule where a rename is known.
- **Housekeeping:**
  - `npm run build` runs prebuild **twice**, so drop the explicit `npm run prebuild &&`.
  - Exclude `src/components/pages/engine-rules/` from `npm test` (`testPathIgnorePatterns`, with a comment). Those 163 specs import `~/rules/interfaces` and `@acsbe/core-engine-*` from the core repo and always fail.
- **Tests:** unit tests for normalise and query (ranking, facets, stubs), the id → kebabId redirect, then build, crawl and flows.

---

## ⏳ #3: Rule tree model (strong; not grilled yet)

Split `RuleTreeSidebar/index.jsx` (about 630 lines, six jobs) into a **pure tree model** with a thin shadcn view. The model takes the catalog, legacy rules, search, location and health, and returns nodes {label, count, href, active, expanded}.

Known issues to fold in:
- `healthMap` is memoised with `[]`, so it never refreshes.
- Legacy categories, colours and order are hard-coded. They should come from the 2a data, which has 17 criteria.
- The legacy count falls back to a magic `|| 90`.
- Expanded state persists in localStorage.

## ⏳ #5: Example page adapter (worth exploring)

Collapse `issueFailure`/`issueSuccess`/`engineIssueFailure`/`engineIssueSuccess` (shallow duplicates) into one example-page module that takes the variant plus HTML or children. The rule comes from the library location module, not from parsing the pathname. **Keep the 4 default exports as one-line re-exports so no fixture file changes.**

## ⏳ #4: Example audit module (worth exploring)

One module for "analyse an example (backend if healthy, else client), cache it, flag false positives, give per-rule health". The backend and the client are two adapters. Today it's duplicated in `ExampleCard.jsx` and `RuleLab/ExampleAnalysisPanel.tsx`, with two separate false-positive stores in localStorage.

## ⏳ #6: Design tokens + MUI removal + dark mode

- One token source that emits CSS variables for light and dark. The severity family maps impact → label → colour once.
- Remove hard-coded `#00a38d` and similar values.
- **Remove MUI**: migrate every MUI app page to shadcn and rewrite MUI fixtures with identical DOM and a11y behaviour.
- Delete `theme.ts` once MUI is gone, and replace `theme.test.ts` with a token contrast and parity test.

---

## UI/UX backlog (fold into the iteration that touches the area)

- **Navigation:** convert the remaining non-anchor navigation to real links (all in live MUI pages):
  - `UnifiedRulePage` (5 `navigate()` card and button actions)
  - `ExampleCard` (a clickable `<span>` "Open in Rule Lab")
  - `ProjectSelector` (clickable cards)
  - `TestHistory` (clickable `TableRow`s and cards)
  - `AtomicTestLibrary` (buttons)
  - `ResultsAppBar` and `ProgressAppBar` (MUI `<Link onClick>` renders an **`<a>` with no href**)
  - `StickyRunHeader`, `ProjectBreadcrumbItem` (MenuItem), `SummaryTab` and `SdkAuditTab` (Chips)
- **Detail panel:**
  - Escape closes it, and focus moves into the panel on open and back on close.
  - The mobile sheet becomes a real dialog (role, focus trap, Escape).
  - Persist panel sizes (`autoSaveId`).
- **Filters:** replace `NativeSelect` with shadcn `Select`, and fold the compact-layout filters into a "Filters" popover.
- Hide or collapse the sidebar rule tree on `/` when the full table is showing.
- Merge the duplicate "MCP Debug" and "Rule Lab" actions.
- Show a "Rule not found" message instead of a silent redirect for unknown rules.

## Verification method (every iteration)

1. **Build:** `npm run build`. On this machine it takes over 10 minutes, so run it in the background.
2. **Jest:** `CI=true npx react-app-rewired test --watchAll=false` (until 2b excludes them, ignore the 163 known-failing `engine-rules/**/index.spec.ts`). CRA's `resetMocks: true` wipes `jest.fn` implementations, so use plain functions for global stubs.
3. **Route crawl:** serve the previous iteration's build and the new build, then crawl about 752 routes with Playwright. That covers static routes, every engine rule and its `_success`/`_failure`, every Criteria example route and every legacy rule page. Compare the path, h1, same-origin HTTP errors and page errors. Text-length deltas are mostly timing noise (the HUD "MISSION" clock), so confirm with a settled text diff.
4. **Flow checks:** a Playwright script of the iteration's user-visible behaviour against the built app.
5. Check that `public/engine-rules.json` didn't pick up `generatedAt` churn before committing (until 2b fixes it).

Verification scripts live in `scripts/verify/` (`crawl.js`, `reach.js`, `textdiff.js`, `flows01.js`, `verify*.sh`, `crawl-legacy-redirects.js`). Outputs and copied builds stay gitignored under `scripts/verify/out/` and `scripts/verify/baseline/`.

## Reference facts

- GitHub: `jayquake/audit-rules` redirects to `jayquake/jayquake.github.io`. `gh` is authenticated as `Jasonqua`.
- AccessFlow repo: `acsbe/accessFlow`, local checkout `~/Documents/acccessflow-automation/accessFlow`. Note the triple "c" in "acccessflow"; `~/Desktop/accessFlow` is *not* the repo.
- Core engine: `~/Desktop/core-engine-auditor` (the `sync:engine-rules` source, overridable with `CORE_ENGINE_RULES`).
- `accessflow-mcp-server` ≥ 2.x no longer ships a `rules.json`; it's an API client now.
- The architecture review report from 2026-11-09 was written to the OS temp dir (`architecture-review-20261109-164544.html`) and may be gone. This document supersedes it.
