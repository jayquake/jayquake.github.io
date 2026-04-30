# 🤖 GEMINI.md - AI Assistant Project Guide

> This document provides comprehensive guidance for AI assistants (like GitHub Copilot, Claude, or Gemini) working with this accessibility rule testing project.

## 📋 Project Overview

**Project Name:** Accessibility Rule Testing (audit-rules)
**Type:** React Web Application
**Purpose:** Interactive documentation and testing interface for automated accessibility validation rules
**Tech Stack:** React 18, Material-UI, React Router, Playwright
**Build Tool:** Create React App (CRA)

---

## 🏗️ Project Structure

```
audit-rules/
├── public/                          # Static assets
│   ├── data.json                   # Public metadata file
│   └── index.html                  # HTML template
├── src/
│   ├── components/
│   │   ├── layout/                 # Layout components
│   │   │   ├── engineIssueSuccess.jsx    # Success example layout
│   │   │   ├── engineIssueFailure.jsx    # Failure example layout
│   │   │   ├── itemPage.jsx              # Generic rule page layout
│   │   │   └── rulePage.js               # Legacy rule page layout
│   │   ├── pages/
│   │   │   ├── engine-rules/       # 160+ engine rule folders (auto-generated)
│   │   │   │   ├── {rule-name}/
│   │   │   │   │   ├── index.ts            # Rule definition (TypeScript)
│   │   │   │   │   ├── metadata.js         # Extracted metadata (auto-generated)
│   │   │   │   │   ├── {RuleName}Success.jsx   # Success component (auto-generated)
│   │   │   │   │   ├── {RuleName}Failure.jsx   # Failure component (auto-generated)
│   │   │   │   │   └── atomic-tests/       # HTML test files
│   │   │   │   │       ├── pass/           # Passing examples
│   │   │   │   │       └── fail/           # Failing examples
│   │   │   ├── EngineRulesListing.jsx     # Table view of all engine rules
│   │   │   └── Engine/
│   │   │       └── EngineLibrary.jsx      # Card view of all engine rules
│   │   └── util/                   # Utility components
│   ├── data/
│   │   └── engine-rules-metadata.json    # Aggregated metadata (auto-generated)
│   ├── routes/
│   │   ├── AppRoutes.jsx           # Main routing configuration
│   │   └── engineRoutes.js         # Engine rule routes (auto-generated)
│   ├── App.js                      # Main application component
│   ├── App.css                     # App-specific styles
│   ├── index.js                    # React entry point
│   ├── index.css                   # Global styles
│   └── listItems.js                # Sidebar navigation items
├── scripts/                        # Build and generation scripts
│   ├── extract-rule-metadata.js           # Extract metadata from index.ts
│   ├── aggregate-rule-metadata.js         # Combine metadata into JSON
│   ├── generate-rule-components-v2.js     # Generate Success/Failure components
│   ├── generate-engine-routes.js          # Generate routing configuration
│   └── deploy-via-actions.sh              # GitHub Actions deployment
├── sdk/tests/playwright/node/                     # Playwright E2E tests
├── build/                          # Production build output (generated)
└── package.json                    # Project dependencies and scripts
```

---

## 🔄 Data Flow & Generation Pipeline

### Pipeline Overview

```
index.ts → metadata.js → engine-rules-metadata.json → React Components → Routes
```

### Step-by-Step Process

1. **Rule Definition** (`index.ts`)

   - TypeScript files defining accessibility rules
   - Contains: id, title, description, advice, impact, refs, validation logic
   - Located in: `src/components/pages/engine-rules/{rule-name}/index.ts`

2. **Metadata Extraction** (`metadata.js`)

   ```bash
   node scripts/extract-rule-metadata.js
   ```

   - Parses `index.ts` files without executing imports
   - Extracts: id, title, description, advice, impact, refs
   - Generates: `metadata.js` per rule (161 rules total)
   - Uses brace-counting algorithm for nested object parsing
   - Supports both template literals (for nested quotes) and double quotes

3. **Metadata Aggregation** (`engine-rules-metadata.json`)

   ```bash
   node scripts/aggregate-rule-metadata.js
   ```

   - Reads all `metadata.js` files
   - Combines into central JSON array
   - Adds URLs: detailUrl, successUrl, failureUrl
   - Output: `src/data/engine-rules-metadata.json` (162 rules)
   - Used by: EngineRulesListing.jsx, EngineLibrary.jsx

4. **Component Generation** (Success/Failure pages)

   ```bash
   node scripts/generate-rule-components-v2.js
   ```

   - Reads: `metadata.js` and `atomic-tests/` folders
   - Generates: `{RuleName}Success.jsx` and `{RuleName}Failure.jsx`
   - Uses: `EngineIssueSuccess` and `EngineIssueFailure` layouts
   - Includes: title, description, helpText, HTML examples
   - Total: 318 components (159 rules × 2)

5. **Route Generation** (`engineRoutes.js`)
   ```bash
   node scripts/generate-engine-routes.js
   ```
   - Scans `engine-rules/` directories
   - Generates: 477 routes (159 rules × 3: detail, success, failure)
   - Output: `src/routes/engineRoutes.js`
   - Imported by: `AppRoutes.jsx`

### Running the Complete Pipeline

```bash
# Full regeneration workflow
node scripts/extract-rule-metadata.js
node scripts/aggregate-rule-metadata.js
node scripts/generate-rule-components-v2.js
node scripts/generate-engine-routes.js
npm run build
```

---

## 🎨 Key Components & Patterns

### Layout Components

**EngineIssueSuccess.jsx**

- Purpose: Display passing examples for accessibility rules
- Props: `ruleId`, `title`, `description`, `helpText`, `bestPractices`, `htmlExamples`
- Features: Breadcrumbs, copy code buttons, Material-UI cards, scroll-to-top

**EngineIssueFailure.jsx**

- Purpose: Display failing examples with fix guidance
- Props: `ruleId`, `title`, `description`, `helpText`, `fixSteps`, `htmlExamples`
- Features: Error alerts, accordion sections, code syntax highlighting

### Page Components

**EngineRulesListing.jsx**

- Purpose: Table view of all engine rules with search/filter
- Data source: `src/data/engine-rules-metadata.json`
- Features: Search by ID/title/description, filter by impact, pagination
- Columns: ID, Title, Description, Impact, References

**EngineLibrary.jsx**

- Purpose: Card-based view of all engine rules
- Data source: `src/data/engine-rules-metadata.json`
- Features: Search, impact filter, infinite scroll, responsive grid
- Display: Cards with rule details, WCAG references, "View details" buttons

---

## 🔧 Common Tasks & Solutions

### Adding a New Rule

1. Create rule directory:

   ```bash
   mkdir -p src/components/pages/engine-rules/my-new-rule
   ```

2. Create `index.ts` with Rule definition:

   ```typescript
   export const MyNewRule: Rule = {
     id: "my-new-rule",
     impact: "serious",
     title: "Rule title here",
     description: "Description here",
     advice: "How to fix here",
     refs: [{ type: "WCAG", id: "X.X.X", level: "AA", link: "..." }],
     // ... validation logic
   };
   ```

3. Create atomic test files:

   ```bash
   mkdir -p src/components/pages/engine-rules/my-new-rule/atomic-tests/{pass,fail}
   # Add HTML files to pass/ and fail/ folders
   ```

4. Run generation pipeline:
   ```bash
   node scripts/extract-rule-metadata.js
   node scripts/aggregate-rule-metadata.js
   node scripts/generate-rule-components-v2.js
   node scripts/generate-engine-routes.js
   ```

### Fixing Metadata Issues

**Problem:** Empty metadata in components or JSON

**Solution:** Check `metadata.js` format

- Should use template literals for fields with nested quotes
- Example:
  ```javascript
  export const RuleName = {
    id: "rule-id",
    title: `Title with "quotes" or role="button"`,
    description: `Description here`,
    advice: `Fix instructions here`,
    impact: "serious",
    refs: [{ type: "WCAG", id: "1.1.1", level: "A", link: "..." }],
  };
  ```

**If extraction fails:**

1. Check `index.ts` structure matches expected format
2. Manually create/update `metadata.js` file
3. Re-run aggregation and component generation

### Escaping Issues (Nested Quotes)

**Problem:** Syntax errors with nested quotes in JSX

**Solution:** Use template literals in `metadata.js`

- Template literals (backticks) for multiline text with nested quotes
- Double quotes with escaping for simple strings
- Example: `aria-invalid="true"` inside description → use template literal

**Scripts handle escaping:**

- `escapeForJSX()` - For template literals (backticks, dollar signs)
- `escapeForDoubleQuotes()` - For quoted strings (quotes, backslashes)

### Scrolling/Height Issues

**Problem:** Content clipped at viewport height, scanner can't see full page

**Solution:** Use flexible heights, not fixed `100vh`

- Main container: `minHeight: "100vh"`, `height: "auto"`, `overflow: "visible"`
- Body: `overflow-y: auto`, `min-height: 100%`
- See: `SCROLLING_FIX_SUMMARY.md` for details

---

## 📊 Important Data Structures

### Rule Metadata Object

```javascript
{
  id: "rule-id",                    // Kebab-case identifier
  kebabId: "rule-id",               // Same as id (for routing)
  title: "Human readable title",    // Display name
  description: "Detailed description of what the rule checks",
  advice: "How to fix violations", // Guidance for developers
  impact: "serious",                // critical | serious | moderate | minor
  refs: [                           // Standards references
    {
      type: "WCAG",                 // WCAG | ACT | W3C | Non-Standard
      id: "1.1.1",                  // Standard ID (if applicable)
      level: "A",                   // A | AA | AAA (for WCAG)
      link: "https://..."           // Reference URL
    }
  ],
  detailUrl: "/engine/rule-id",             // Detail page route
  successUrl: "/engine/rule-id_success",    // Success examples route
  failureUrl: "/engine/rule-id_failure"     // Failure examples route
}
```

### Impact Levels

- **critical** (26 rules) - Blocks essential functionality
- **serious** (96 rules) - Major accessibility barriers
- **moderate** (21 rules) - Significant but not blocking
- **minor** (19 rules) - Small improvements

---

## 🧪 Testing

### Unit Tests

```bash
npm test
```

### E2E Tests (Playwright)

```bash
npm run test:e2e              # Headless mode
npm run test:e2e:ui           # UI mode
npm run test:e2e:headed       # Headed mode
npm run test:e2e:debug        # Debug mode
```

### Test Structure

- Location: `sdk/tests/playwright/node/tests/`
- Includes: Accessibility tests, keyboard navigation, search functionality
- Config: `sdk/tests/playwright/node/playwright.config.js`

---

## 🚀 Build & Deployment

### Development

```bash
npm start                     # Start dev server on http://localhost:3000
```

### Production Build

```bash
npm run build                 # Creates optimized build/ folder
npm run deploy                # Deploys to GitHub Pages
```

### Deployment Methods

1. **GitHub Actions** (recommended)

   ```bash
   npm run deploy:actions
   ```

2. **Direct deployment**
   ```bash
   npm run deploy:direct
   ```

---

## 🎯 Key Files to Know

### Configuration

- `package.json` - Dependencies, scripts, homepage URL
- `public/index.html` - HTML template
- `.gitignore` - Excluded files

### Entry Points

- `src/index.js` - React app entry point
- `src/App.js` - Main app component with routing and layout
- `src/routes/AppRoutes.jsx` - Main routing configuration

### Data Files

- `src/data/engine-rules-metadata.json` - Central metadata (auto-generated)
- `public/data.json` - Public metadata copy

### Styles

- `src/index.css` - Global styles (including scroll fixes)
- `src/App.css` - App-specific styles
- `src/styles.css` - Additional component styles

---

## 🐛 Common Issues & Solutions

### Issue: "N/A" appearing in components

**Cause:** Metadata extraction failed or metadata.js has empty fields
**Fix:**

1. Check `src/components/pages/engine-rules/{rule}/metadata.js`
2. Manually update with correct metadata
3. Re-run `generate-rule-components-v2.js`

### Issue: Rules not showing in listing pages

**Cause:** `engine-rules-metadata.json` has empty fields
**Fix:**

1. Update `metadata.js` files for affected rules
2. Re-run `aggregate-rule-metadata.js`
3. Refresh browser (clear cache)

### Issue: Syntax errors with quotes

**Cause:** Nested quotes in HTML attributes (e.g., `aria-invalid="true"`)
**Fix:** Use template literals in `metadata.js` for fields with nested quotes

### Issue: Page content cut off

**Cause:** Fixed viewport height (`100vh`) in containers
**Fix:** Use `minHeight: "100vh"` and `height: "auto"` with `overflow: "visible"`

### Issue: Build warnings about unused imports

**Cause:** Generated components may import but not use all Material-UI components
**Fix:** These are warnings, not errors - can be ignored or cleaned up manually

---

## 📚 Important Patterns

### Routing Pattern

```
/engine/{rule-id}           → Detail page (index.ts content)
/engine/{rule-id}_success   → Success examples
/engine/{rule-id}_failure   → Failure examples
```

### Component Naming Convention

- File: `{PascalCase}Success.jsx` or `{PascalCase}Failure.jsx`
- Component: Matches file name
- Export: Default export

### Metadata File Format

```javascript
// metadata.js
export const RuleName = {
  id: "rule-name",
  title: `Title`,
  description: `Description`,
  advice: `Advice`,
  impact: "level",
  refs: [...]
};
```

---

## 🔍 Search & Navigation

### Search Features

- **EngineRulesListing:** Search by ID, title, or description
- **EngineLibrary:** Search with real-time filtering
- Both support impact level filtering

### Navigation Structure

- Home → Engine Rules Listing
- Engine Rules Listing → Individual Rule Details
- Rule Details ↔ Success Examples ↔ Failure Examples

---

## 💡 Tips for AI Assistants

1. **Always check existing patterns** before creating new components
2. **Use the generation scripts** instead of manually creating components
3. **Template literals are preferred** for text with nested quotes
4. **Metadata flows** from index.ts → metadata.js → JSON → components
5. **Don't modify generated files directly** - update source and regenerate
6. **Clear browser cache** after changes to see updates
7. **Check build output** for errors before assuming success
8. **Atomic tests** in `pass/` and `fail/` folders provide HTML examples

---

## 📖 Related Documentation

- `README.md` - Project setup and overview
- `DEPLOYMENT.md` - Deployment instructions
- `SCROLLING_FIX_SUMMARY.md` - Scrolling issue resolution
- `ENGINE_RULES_COMPLETE_IMPLEMENTATION.md` - Engine rules implementation details
- `QUICK_REFERENCE.md` - Quick command reference

---

## 📊 Current Project Stats

- **Total Rules:** 162 (160 active + 2 aliases)
- **Complete Metadata:** 162/162 (100%)
- **Generated Components:** 318 (159 rules × 2)
- **Generated Routes:** 477 (159 rules × 3)
- **Impact Distribution:**
  - Critical: 26 rules
  - Serious: 96 rules
  - Moderate: 21 rules
  - Minor: 19 rules

---

## 🤝 Contributing Guidelines

When modifying this project:

1. **Add new rules:** Follow the "Adding a New Rule" workflow
2. **Fix metadata:** Update `metadata.js`, then regenerate
3. **Update layouts:** Modify layout components in `src/components/layout/`
4. **Test thoroughly:** Run E2E tests after major changes
5. **Document changes:** Update relevant .md files
6. **Build before deploying:** Always test build output

---

**Last Updated:** December 8, 2025
**AI Assistant:** This file is specifically for you! Use it as a reference when working with this project.
**Maintained By:** Project contributors

---

> 💡 **Pro Tip:** When in doubt, check the generation scripts in `scripts/` to understand how components are created and what format they expect.
