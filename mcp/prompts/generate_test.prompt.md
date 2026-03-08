# Test Generation Prompt Template

## 🎯 Project Context

**Project**: AccessFlow - E2E Test Suite  
**Framework**: Playwright with TypeScript  
**MCP Server**: Microsoft Playwright MCP running at `http://localhost:3001/mcp`  
**Target Application**: `http://localhost:4001`

## 📋 Test Generation Guidelines

### 1. **Page Object Architecture**
- Use existing Page Object Model patterns from `/pages/` directory
- Extend `BasePage` class for new page objects
- Access pages through `pageManager` fixture: `pageManager.sitesettingsPage()`

### 2. **Existing Test Cases Context**
- **Qase Test Cases**: Reference `/utils/test_list/ACCESSFLOW-2025-08-06.json` for existing test coverage
- **Avoid Duplication**: Check existing Qase IDs and test scenarios before generating new tests
- **Test Gap Analysis**: Identify missing test coverage areas by comparing page functionality with existing tests
- **Test Case Mapping**: Map new automated tests to existing Qase test cases where applicable

### 3. **Test Structure Template**
```typescript
import { qase } from 'playwright-qase-reporter';
import { test } from '../../utils/fixtures';

test.describe('[Feature Name] Tests', () => {
  test.beforeEach(async ({ trialSetup }) => {
    await trialSetup;
  });

  test('[Test Description]', async ({ pageManager }) => {
    qase.id([QASE_ID]); // Get from Qase TestOps
    
    // Test implementation
    const page = pageManager.[pageName]();
    await page.[method]();
    
    // Assertions
    // ...
  });
});
```

### 3. **Fixtures Available**
- `pageManager` - Access to all page objects
- `trialSetup` - Pre-test environment setup
- `logger` - Winston logger instance

### 4. **Existing Page Objects**
- `sitesettingsPage()` - Site settings functionality at `/settings/site-settings`
- `auditsPage()` - Audits functionality
- Add more as discovered...

## 🗂️ Existing Test Cases Reference

### **Qase Test Cases Database**
**Location**: `/utils/test_list/ACCESSFLOW-2025-08-06.json`  
**Size**: ~6.6MB with comprehensive test coverage  
**Content**: Detailed test cases with steps, expected results, and metadata

### **Test Case Structure Analysis**
Your existing Qase database contains test cases organized by:

#### **Major Test Suites**:
- **Post-onboarding Product Tour** (Dashboard, Explore, Remediation, Site Settings)
- **Auto Resolve** (Info Screen, Installation, Progress Dashboard, Apply/Remove Fix)
- **Free Trial Conversions** (Header, Modals, Feature Limits)
- **Site Settings** (Auth Prompts, Cookies, Headers, User Agents)

#### **Test Types Covered**:
- `Visibility & UI` - Visual and layout validation
- `Action by mouse` - Mouse-based interactions  
- `Action by keyboard` - Keyboard accessibility
- `Logic` - Business logic validation
- `Error handling` - Error states and edge cases
- `Positive` - Happy path scenarios
- `Negative` - Invalid input/boundary testing

#### **Key Test Areas**:
- **Site Settings Page**: Comprehensive coverage with auth prompts, modal interactions
- **Product Tours**: Step-by-step guided experiences
- **Auto-Resolve**: Full workflow from activation to deactivation
- **Trial Limitations**: Feature restrictions and upgrade flows

### **Using Existing Test Cases for Generation**

#### **1. Avoiding Duplication**
```
Before generating tests, check if similar scenarios exist:
- Search for relevant Qase IDs (e.g., 3901-3902 for site settings)
- Review existing test steps and expected results
- Identify gaps in automation coverage
```

#### **2. Test Gap Analysis**
```
Compare page functionality with existing test cases:
- Manual tests ready for automation (`ready-for-automation`)
- Missing edge cases not covered in Qase
- Cross-browser scenarios needing Playwright implementation
```

#### **3. Test Enhancement Opportunities**
```
Leverage existing test cases to:
- Convert manual steps to automated Playwright actions
- Add visual regression testing to UI validation tests
- Enhance error handling with better assertions
- Add accessibility testing to keyboard interaction tests
```

## 🎭 MCP Integration Instructions

### **Using Playwright MCP for Test Generation**

1. **Start MCP Server**:
   ```bash
   npm run mcp:start
   ```

2. **Connect to Application**:
   - Base URL: `http://localhost:4001`
   - Target Page: `/settings/site-settings` (or specify different page)

3. **MCP Commands for Analysis**:
   ```javascript
   // Navigate and analyze page
   await playwright.goto('http://localhost:4001/settings/site-settings');
   await playwright.screenshot('page-analysis.png');
   
   // Identify interactive elements
   await playwright.locator('button').all();
   await playwright.locator('input').all();
   await playwright.locator('[data-testid]').all();
   
   // Test form interactions
   await playwright.click('button:has-text("Add")');
   await playwright.fill('input[name="username"]', 'test');
   ```

## 📝 Test Generation Prompts

### **For New Page Analysis with Qase Context**
```
Please analyze the page at [URL] and generate comprehensive tests covering:

STEP 1: Review existing Qase test cases in `/utils/test_list/ACCESSFLOW-2025-08-06.json` for [PAGE_NAME]

STEP 2: Identify gaps and generate tests for:
1. **Navigation & Loading** (if not covered in Qase)
2. **Interactive Elements** (enhance existing manual tests)
3. **Data Operations** (automate manual CRUD tests)
4. **Accessibility** (convert keyboard tests to Playwright)

STEP 3: Reference existing Qase IDs for test mapping:
- Use existing Qase ID: `qase.id([EXISTING_ID])` for automation
- Create new tests for gaps not covered in Qase
- Enhance manual tests with Playwright capabilities

Use the existing page object: `pageManager.[pageName]()` or suggest creating a new one.
```

### **For Site Settings Specific Tests**
```
Based on the comprehensive Qase test cases for Site Settings (IDs 3901+), generate automated tests for:

REFERENCE EXISTING COVERAGE:
- Auth Prompt Modal interactions (Qase ID: 3901-3902)
- Site access settings validation  
- Product tour guidance testing

AUTOMATION OPPORTUNITIES:
- Convert manual "Action by mouse/keyboard" tests to Playwright
- Add visual regression to "Visibility & UI" tests
- Enhance "Logic" tests with better assertions

FOCUS AREAS:
- [LIST_SPECIFIC_FUNCTIONALITY_FROM_QASE]

Expected behaviors from Qase test cases:
- [EXTRACT_FROM_EXISTING_EXPECTED_RESULTS]
```

### **For Auto-Resolve Feature Testing**
```
Generate comprehensive Auto-Resolve tests using the extensive Qase coverage as reference:

EXISTING QASE COVERAGE AREAS:
- Info Screen interactions (3609-3617)
- Installation and script validation (3618-3632)  
- Progress dashboard functionality (3633-3658)
- Apply/Remove fix workflows (3667-3674)

AUTOMATION PRIORITIES:
1. Convert "ready-for-automation" Qase tests to Playwright
2. Add cross-browser compatibility to existing manual tests
3. Enhance error handling scenarios with better validation
4. Add performance testing to loading states

REFERENCE: Check Auto-Resolve test suite in Qase for detailed steps and expected results.
```

### **For Trial Conversion Testing**
```
Create trial limitation and conversion tests based on Qase test cases 3696-3729:

EXISTING MANUAL COVERAGE:
- Header countdown visibility
- Modal interactions and upgrade flows
- Feature limitations (Web Pages blur, Journey limits, etc.)
- Verification fix limits and tooltips

PLAYWRIGHT ENHANCEMENT:
- Automate modal trigger scenarios
- Add visual validation for blur effects
- Test upgrade flow end-to-end
- Validate analytics event firing

Use existing Qase expected results as assertions baseline.
```

### **For Regression Testing**
```
Create regression tests for [PAGE/FEATURE] to ensure:

1. **Core functionality** remains intact
2. **Recent changes** don't break existing features  
3. **Cross-browser compatibility** is maintained
4. **Performance** meets baseline standards

Include visual regression tests where appropriate.
```

## 🎨 Site Settings Page Example

### **Current Page Object**: `SiteSettingsPage`
**Location**: `/pages/siteSettingsPage.ts`  
**Methods**: 26 available methods  
**Locators**: 35 defined locators

### **Key Functionality to Test**:
- Auth prompt management (add/edit/delete)
- Cookie configuration
- Header settings
- User agent management
- Modal interactions
- Form validations

### **Sample Test Request**:
```
Generate comprehensive tests for the Site Settings page auth prompt functionality:

1. **Modal Operations**:
   - Opening auth prompt modal
   - Closing modal with cancel/X button
   - Modal backdrop click behavior

2. **Form Interactions**:
   - Username/password input
   - Apply button functionality
   - Form validation messages

3. **CRUD Operations**:
   - Adding new auth prompts
   - Editing existing prompts
   - Deleting prompts
   - Bulk operations

Use the existing `pageManager.sitesettingsPage()` methods.
```

## 🔧 Quality Standards

### **Test Requirements**:
- ✅ Use Qase ID for test management integration
- ✅ Include proper error handling and timeouts
- ✅ Add meaningful assertions with clear failure messages
- ✅ Follow existing naming conventions
- ✅ Include accessibility checks where relevant

### **Code Quality**:
- ✅ TypeScript strict mode compliance
- ✅ ESLint/Prettier formatting
- ✅ Proper async/await usage
- ✅ Clear test descriptions and comments

### **Coverage Goals**:
- ✅ Functional testing (user workflows)
- ✅ UI interaction testing
- ✅ Form validation testing
- ✅ Error condition testing
- ✅ Accessibility testing

## 🚀 Getting Started

1. **Analyze Target Page**: Use MCP to explore the page structure
2. **Identify Test Scenarios**: Based on functionality and user flows  
3. **Generate Test Code**: Using this prompt template
4. **Integrate with Existing**: Use page objects and fixtures
5. **Validate Tests**: Run and verify test reliability

---

**Note**: This prompt file works best with AI assistants that support the Model Context Protocol (MCP) and have access to the running Playwright MCP server at `http://localhost:3001/mcp`.
