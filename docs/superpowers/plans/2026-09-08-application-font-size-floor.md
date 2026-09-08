# Application Font-Size Floor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enforce a 12px minimum for product UI text without changing intentional accessibility fixtures.

**Architecture:** Define one `MIN_TEXT_SIZE` token in the MGS theme tokens, consume it from MUI theme defaults and explicit product UI styles, and leave fixture/example content untouched. A focused Jest test guards shared typography defaults; source searches and the production build verify the broader mechanical normalization.

**Tech Stack:** React 18, Material UI 7, Emotion, TypeScript/JavaScript, CRA Jest, react-app-rewired

---

## File Map

- Create `src/theme.test.ts`: regression coverage for shared typography floors.
- Modify `src/theme/mgsTokens.ts`: define and apply the shared minimum text token.
- Modify `src/theme.ts`: apply the token to MUI typography and text-bearing component defaults.
- Modify `src/index.css`: raise the product HUD readout utility to 12px.
- Modify product UI files listed in Tasks 3–5: replace explicit text sizes below 12px.
- Do not modify `src/components/pages/Criteria/Readability/rules/Failures/Font-sizesFailure.jsx`, engine-rule atomic HTML fixtures, or engine-rule success/failure example components.

### Task 1: Add the shared typography regression test

**Files:**
- Create: `src/theme.test.ts`
- Read: `src/theme.ts`
- Read: `src/theme/mgsTokens.ts`

- [ ] **Step 1: Write the failing theme-floor test**

Create `src/theme.test.ts`:

```ts
import { theme } from './theme';
import { MIN_TEXT_SIZE, raidenType } from './theme/mgsTokens';

const ROOT_FONT_SIZE = 16;
const MINIMUM_PIXELS = 12;

function toPixels(value: unknown): number {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') {
    throw new Error(`Unsupported font size: ${String(value)}`);
  }
  if (value.endsWith('rem')) return Number.parseFloat(value) * ROOT_FONT_SIZE;
  if (value.endsWith('px')) return Number.parseFloat(value);
  throw new Error(`Unsupported font-size unit: ${value}`);
}

describe('product typography floor', () => {
  it('defines the shared minimum as 12px', () => {
    expect(toPixels(MIN_TEXT_SIZE)).toBe(MINIMUM_PIXELS);
  });

  it.each(['subtitle2', 'overline', 'caption'] as const)(
    'keeps the %s typography variant at or above 12px',
    (variant) => {
      expect(toPixels(theme.typography[variant].fontSize)).toBeGreaterThanOrEqual(MINIMUM_PIXELS);
    },
  );

  it.each(['MuiButton', 'MuiChip', 'MuiTab'] as const)(
    'keeps %s root text at or above 12px',
    (componentName) => {
      const root = theme.components?.[componentName]?.styleOverrides?.root;
      if (!root || typeof root === 'function' || Array.isArray(root)) {
        throw new Error(`Expected an object root override for ${componentName}`);
      }
      expect(toPixels(root.fontSize)).toBeGreaterThanOrEqual(MINIMUM_PIXELS);
    },
  );

  it.each(['tableHead', 'ruleId', 'sectionLabel', 'navLabel'] as const)(
    'keeps raidenType.%s at or above 12px',
    (preset) => {
      expect(toPixels(raidenType[preset].fontSize)).toBeGreaterThanOrEqual(MINIMUM_PIXELS);
    },
  );
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run:

```bash
CI=true npm test -- src/theme.test.ts
```

Expected: FAIL because `MIN_TEXT_SIZE` is not exported yet and existing shared values are below 12px.

### Task 2: Implement the shared token and theme defaults

**Files:**
- Modify: `src/theme/mgsTokens.ts:47-92`
- Modify: `src/theme.ts:1-2,31-66,93-101,130-134,187-194`
- Test: `src/theme.test.ts`

- [ ] **Step 1: Define and consume the token in MGS presets**

Add this named export near the existing font constants in `src/theme/mgsTokens.ts`:

```ts
export const MIN_TEXT_SIZE = '0.75rem';
```

Update the four complete presets to:

```ts
tableHead: {
  fontFamily: mgsFonts.display,
  fontSize: MIN_TEXT_SIZE,
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: MGS.raidenCyanBright,
},
ruleId: {
  fontFamily: mgsFonts.hud,
  fontSize: MIN_TEXT_SIZE,
  letterSpacing: '0.04em',
  color: MGS.raidenCyan,
},
sectionLabel: {
  fontFamily: mgsFonts.hud,
  fontSize: MIN_TEXT_SIZE,
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: MGS.raidenCyanBright,
},
navLabel: {
  fontFamily: mgsFonts.display,
  fontSize: MIN_TEXT_SIZE,
  fontWeight: 600,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
},
```

- [ ] **Step 2: Apply the token to MUI defaults**

Update the import and only the affected declarations in `src/theme.ts`:

```ts
import { MGS, MIN_TEXT_SIZE, carbonWeave, mgsFonts } from './theme/mgsTokens';
```

Replace only the five existing `fontSize` property lines, preserving every sibling property:

```ts
// typography.subtitle2
fontSize: MIN_TEXT_SIZE,
// typography.overline
fontSize: MIN_TEXT_SIZE,
// components.MuiButton.styleOverrides.root
fontSize: MIN_TEXT_SIZE,
// components.MuiChip.styleOverrides.root
fontSize: MIN_TEXT_SIZE,
// components.MuiTab.styleOverrides.root
fontSize: MIN_TEXT_SIZE,
```

Expand the existing caption declaration to this complete object:

```ts
caption: {
  color: MGS.textSecondary,
  fontFamily: mgsFonts.tactical,
  fontSize: MIN_TEXT_SIZE,
},
```

Also re-export `MIN_TEXT_SIZE` from the final export statement in `src/theme.ts`.

- [ ] **Step 3: Run the focused test**

Run:

```bash
CI=true npm test -- src/theme.test.ts
```

Expected: PASS.

- [ ] **Step 4: Commit checkpoint if explicitly requested**

Stage only `src/theme.test.ts`, `src/theme.ts`, and `src/theme/mgsTokens.ts`; use a message describing the 12px shared typography floor. Do not commit without explicit user authorization.

### Task 3: Normalize Engine Rules and shared layout text

**Files:**
- Modify: `src/App.js:205`
- Modify: `src/components/pages/Engine/EngineRulesTable.jsx:22,30-47,112-172,203-330,444-455`
- Modify: `src/components/pages/Engine/EngineRuleDetailPane.jsx:25,191,229`
- Modify: `src/components/layout/RuleTreeSidebar/index.jsx:271,348,430`
- Modify: `src/components/layout/SidebarStatusFooter.jsx:119`
- Modify: `src/components/layout/UnifiedExamplePage.jsx:122,129,213`
- Modify: `src/components/layout/UnifiedRulePage.tsx:389-927`
- Modify: `src/components/layout/ExampleCard.jsx:295-539`
- Modify: `src/components/layout/ExamplePageNav.jsx:14-89`
- Modify: `src/components/layout/customNavLink.js:70-196`
- Modify: `src/components/layout/AuditResultsPanel.tsx:78-366`

- [ ] **Step 1: Import the shared token**

In each file, extend the nearest existing `theme/mgsTokens` import, or add the correctly relative import:

```ts
import { MIN_TEXT_SIZE } from '<relative-path>/theme/mgsTokens';
```

Preserve existing imported token names and file quote style.

- [ ] **Step 2: Replace every text value below the floor**

For text-bearing `sx` declarations in the listed ranges, replace `0.58rem`, `0.6rem`, `0.62rem`, `0.65rem`, `0.68rem`, `0.7rem`, `0.72rem`, and `0.74rem` with the token:

```tsx
fontSize: MIN_TEXT_SIZE
```

For responsive declarations, preserve values already above the floor:

```tsx
fontSize: { xs: MIN_TEXT_SIZE, md: '0.8rem' }
```

The reported rule link in `EngineRulesTable.jsx` must become:

```tsx
sx={{
  ...ruleLinkSx,
  ...raidenType.ruleId,
  fontSize: MIN_TEXT_SIZE,
}}
```

Do not change icon declarations such as `<OpenInNewIcon sx={{ fontSize: 14 }} />`, decorative dots, chip heights, or example fixture content.

- [ ] **Step 3: Run the focused test**

Run:

```bash
CI=true npm test -- src/theme.test.ts
```

Expected: PASS with no import or TypeScript errors.

- [ ] **Step 4: Commit checkpoint if explicitly requested**

Stage only the Engine and layout files from this task; do not commit without explicit user authorization.

### Task 4: Normalize test-management and Rule Lab text

**Files:**
- Modify: `src/components/pages/listRules.jsx:695,772,942,1022`
- Modify: `src/pages/TestHistory.tsx:547,573,577,690,697`
- Modify: `src/pages/TestLibrary/index.tsx:645,654,662`
- Modify: `src/pages/TestLibrary/RunQueue.tsx:119,125,147`
- Modify: `src/pages/TestLibrary/StickyRunHeader.tsx:81`
- Modify: `src/pages/TestLibrary/TestFileTree.tsx:133,136,173,225`
- Modify: `src/pages/RuleLab/components/DiscoveryPanel.tsx:267,374,418,457`
- Modify: `src/pages/RuleLab/components/ExampleAnalysisPanel.tsx:308,356,406,469`
- Modify: `src/pages/RuleLab/components/RulePicker.tsx:146,168,174`

- [ ] **Step 1: Import `MIN_TEXT_SIZE` into each file**

Use the correct relative path to `src/theme/mgsTokens.ts`, preserving existing imports:

```ts
import { MIN_TEXT_SIZE } from '<relative-path>/theme/mgsTokens';
```

- [ ] **Step 2: Raise explicit text values**

Replace the listed `0.6rem`, `0.65rem`, and `0.7rem` text sizes with:

```tsx
fontSize: MIN_TEXT_SIZE
```

Replace numeric MUI text values `9`, `10`, and `11` in `RunQueue.tsx`, `StickyRunHeader.tsx`, and `TestFileTree.tsx` with:

```tsx
fontSize: MIN_TEXT_SIZE
```

Do not alter icon sizes or tree indentation/geometry.

- [ ] **Step 3: Run the focused test**

Run:

```bash
CI=true npm test -- src/theme.test.ts
```

Expected: PASS.

- [ ] **Step 4: Commit checkpoint if explicitly requested**

Stage only the product UI files from this task; do not commit without explicit user authorization.

### Task 5: Normalize result views, standalone components, and CSS utility

**Files:**
- Modify: `src/pages/ResultsView/components/MCPDebugTab.tsx:290,661`
- Modify: `src/pages/ResultsView/components/SdkAuditTab.tsx:122,147,310,463,600,692,860,909,921`
- Modify: `src/pages/ResultsView/components/SummaryTab.tsx:589`
- Modify: `src/components/standalone/QaseTestCaseCard.tsx:220,288`
- Modify: `src/components/standalone/ErrorBoundary.tsx:70`
- Modify: `src/index.css:103-109`

- [ ] **Step 1: Import and apply `MIN_TEXT_SIZE`**

Add correctly relative imports and replace each listed `0.65rem`, `0.7rem`, or `0.72rem` text size:

```tsx
fontSize: MIN_TEXT_SIZE
```

Do not alter `AlertCircleIcon` or other icon sizes.

- [ ] **Step 2: Raise the HUD CSS utility**

Update `src/index.css`:

```css
.mgs-readout {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #007a68;
}
```

- [ ] **Step 3: Commit checkpoint if explicitly requested**

Stage only the result, standalone, and CSS files from this task; do not commit without explicit user authorization.

### Task 6: Verify exclusions and application integrity

**Files:**
- Verify: all files modified in Tasks 1–5
- Verify unchanged: `src/components/pages/Criteria/Readability/rules/Failures/Font-sizesFailure.jsx`
- Verify unchanged: `src/components/pages/engine-rules/**/atomic-tests/**`
- Verify unchanged: `src/components/pages/engine-rules/**/*Success.jsx`
- Verify unchanged: `src/components/pages/engine-rules/**/*Failure.jsx`

- [ ] **Step 1: Search product UI for remaining sub-floor rem values**

Run:

```bash
rg -n 'fontSize:\s*["'\'']0\.(58|6|60|62|65|68|7|70|72|74)rem|font-size:\s*0\.(58|6|60|62|65|68|7|70|72|74)rem' src \
  --glob '!components/pages/engine-rules/**' \
  --glob '!components/pages/Criteria/**'
```

Expected: no text-bearing product UI matches. Review any result manually so icon/decorative sizing is not changed.

- [ ] **Step 2: Search for remaining numeric text sizes below 12**

Run:

```bash
rg -n 'fontSize:\s*(9|10|11)([,}])' src/pages src/components/layout src/components/standalone src/components/pages/Engine src/components/pages/listRules.jsx
```

Expected: only icon/decorative matches, if any. Confirm each remaining match renders no text.

- [ ] **Step 3: Confirm intentional fixtures remain**

Run:

```bash
rg -n 'font-size:\s*(6|7|8|9|10|11)px' \
  src/components/pages/Criteria/Readability/rules/Failures/Font-sizesFailure.jsx \
  src/components/pages/engine-rules/font-sizes
```

Expected: intentional sub-12px examples are still present.

- [ ] **Step 4: Run the full frontend test suite**

Run:

```bash
CI=true npm test
```

Expected: all tests pass.

- [ ] **Step 5: Run the production build**

Run:

```bash
npm run build
```

Expected: build completes successfully with no TypeScript, import, or CSS errors.

- [ ] **Step 6: Check edited-file diagnostics**

Read IDE diagnostics for every modified source file. Expected: no newly introduced errors.

- [ ] **Step 7: Re-scan and resolve the AccessFlow issue**

After deploying or exposing the updated application to the configured AccessFlow environment, retrieve `Font-Sizes-2a5d8a11e7` again. Confirm the affected Engine Rules links compute to at least 12px, then mark the issue resolved through AccessFlow.

- [ ] **Step 8: Final commit only if explicitly requested**

Review `git diff` and `git status`, stage only the planned files, and commit only after explicit user authorization.
