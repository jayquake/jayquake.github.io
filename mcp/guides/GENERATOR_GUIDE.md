# Page Test Generator - MCP-Assisted Test Generation

A flexible tool that analyzes any page object in your test suite and generates intelligent test suggestions based on the page's methods, locators, and complexity.

## 🚀 Quick Start

```bash
# Show available options and examples
npm run generate-tests

# Generate smoke tests for site settings page
npm run generate-tests siteSettingsPage smoke --preview

# Generate and save regression tests
npm run generate-tests siteSettingsPage regression --save

# Generate accessibility tests for any page
npm run generate-tests auditsPage accessibility --preview
```

## 📋 Available Commands

### Basic Usage
```bash
node page-test-generator.js <page-name> [test-type] [options]
```

### Page Names
The tool automatically finds your page objects using flexible matching:
- `siteSettingsPage` → finds `siteSettingsPage.ts`
- `audits` → finds `auditsPage.ts` 
- `modal` → finds any file containing "modal"
- `settings` → finds any file containing "settings"

### Test Types

| Type | Description | Use Case |
|------|-------------|----------|
| `smoke` | Basic functionality tests | Quick validation of core features |
| `regression` | Complete workflow tests | Full testing of all interactive methods |
| `edge-case` | Error handling tests | Boundary conditions and error scenarios |
| `accessibility` | A11y compliance tests | Keyboard navigation, tooltips, screen readers |
| `comprehensive` | All types combined | Complete test coverage |
| `custom` | Template with available methods | Starting point for custom tests |

### Options

| Option | Description |
|--------|-------------|
| `--save` | Save generated tests to file |
| `--preview` | Show full code preview |

## 🎯 Examples for Your Site Settings Page

### 1. Generate Basic Smoke Tests
```bash
npm run generate-tests siteSettingsPage smoke --preview
```
Generates: Basic navigation and visibility tests

### 2. Generate Complete Regression Suite
```bash
npm run generate-tests siteSettingsPage regression --save
```
Generates: Tests for all modal interactions (Auth Prompt, Cookie Details, Custom Header, User Agent)

### 3. Generate Accessibility Tests
```bash
npm run generate-tests siteSettingsPage accessibility --save
```
Generates: Keyboard navigation, tooltip validation, focus management

### 4. Generate Edge Case Tests
```bash
npm run generate-tests siteSettingsPage edge-case --preview
```
Generates: Error handling, invalid inputs, boundary conditions

## 📊 What the Tool Analyzes

For each page object, the tool automatically detects:

- **Methods by Type**: Navigation, validation, interaction, input, hover, utility
- **Locator Visibility**: Private, readonly, public locators
- **Complexity Score**: Based on lines of code, methods, and locators
- **Test Coverage**: Existing test files that reference this page
- **Base Class**: Whether it extends BasePage or other classes

## 🔧 Smart Test Generation

The tool generates tests that:

✅ **Follow your existing patterns**: Uses your pageManager fixture structure  
✅ **Include Qase integration**: Adds qase.id() placeholders  
✅ **Match your test structure**: Includes beforeEach/afterEach hooks  
✅ **Use your existing methods**: Calls actual methods from your page objects  
✅ **Respect your architecture**: Maintains your Page Object Model patterns  

## 📁 Output Location

Generated tests are saved to:
```
test-e2e/tests/Generated/{pagename}-{testtype}_generated.spec.ts
```

## 🎨 Customization

The tool is designed to be easily customizable:

1. **Method categorization**: Modify `categorizeMethod()` to fit your naming conventions
2. **Page manager calls**: Adjust `getPageManagerCall()` for your specific structure  
3. **Test templates**: Modify the `generate*Tests()` methods for your test patterns
4. **Locator detection**: Update `extractLocators()` for your locator patterns

## 💡 Pro Tips

1. **Start with smoke tests** to validate basic functionality
2. **Use --preview first** to see what will be generated before saving
3. **Combine with existing tests** - generated tests complement your manual tests
4. **Customize the templates** to match your team's testing standards
5. **Use comprehensive type** for new pages that need full coverage

## 🔄 Integration with Your Workflow

This tool integrates seamlessly with your existing setup:
- Works with your current page objects
- Uses your existing fixtures and utilities
- Follows your Qase TestOps integration
- Maintains your test execution patterns
- Supports your CI/CD pipeline

The generated tests are starting points that you can customize and extend based on your specific testing needs.
