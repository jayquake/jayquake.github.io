# Using Engine Rules UI - Quick Start Guide

## 🚀 Quick Start

The Engine Rules UI is now fully integrated into your application. Here's how to use it:

## 📍 Accessing Engine Rules

### 1. **Rule Detail Page**
Navigate to any engine rule using the URL pattern:
```
http://localhost:3000/engine/{rule-name}
```

**Examples:**
- `http://localhost:3000/engine/alt-misuse`
- `http://localhost:3000/engine/button-discernible`
- `http://localhost:3000/engine/heading-h1`
- `http://localhost:3000/engine/checkbox-aria-checked`

### 2. **Success Examples Page**
View all passing examples for a rule:
```
http://localhost:3000/engine/{rule-name}_success
```

**Examples:**
- `http://localhost:3000/engine/alt-misuse_success`
- `http://localhost:3000/engine/button-discernible_success`

### 3. **Failure Examples Page**
View all failing examples for a rule:
```
http://localhost:3000/engine/{rule-name}_failure
```

**Examples:**
- `http://localhost:3000/engine/alt-misuse_failure`
- `http://localhost:3000/engine/button-discernible_failure`

## 🎨 UI Features

### Rule Detail Page Shows:
- 📋 **Rule Title & Description** - What the rule checks
- 💡 **Implementation Advice** - How to implement correctly
- ⚠️ **Impact Level** - Severity (critical, major, moderate, minor)
- 📚 **WCAG References** - Relevant WCAG guidelines
- ✅ **Success Examples Button** - Navigate to passing examples
- ❌ **Failure Examples Button** - Navigate to failing examples

### Success Examples Page Shows:
- ✅ Multiple passing examples from atomic tests
- 📝 Description of what makes them compliant
- 💡 Best practices accordion
- 📋 Copy-to-clipboard for each example
- 🎨 Green-themed success UI

### Failure Examples Page Shows:
- ❌ Multiple failing examples from atomic tests
- 📝 Description of what makes them fail
- 🔧 Fix steps accordion
- 📋 Copy-to-clipboard for each example
- 🎨 Red-themed warning UI

## 📝 Complete List of Available Rules

All 156 engine rules are available. Here are some examples:

### ARIA Rules
- `/engine/aria-controls-has-reference`
- `/engine/aria-describedby-has-reference`
- `/engine/aria-invalid-mismatch`
- `/engine/aria-invalid-misuse`
- `/engine/aria-labelledby-has-reference`

### Button Rules
- `/engine/button-discernible`
- `/engine/button-mismatch`
- `/engine/toggle-button-correct-state`
- `/engine/toggle-button-mismatch`
- `/engine/toggle-button-misuse`

### Checkbox Rules
- `/engine/checkbox-aria-checked`
- `/engine/checkbox-discernible`
- `/engine/checkbox-mismatch`
- `/engine/checkbox-misuse`

### Heading Rules
- `/engine/heading-discernible`
- `/engine/heading-h1`
- `/engine/heading-lengthy`
- `/engine/heading-mismatch`
- `/engine/heading-misuse`
- `/engine/heading-order`
- `/engine/heading-order-optimal`
- `/engine/heading-single-h1`

### Image Rules
- `/engine/image-discernible`
- `/engine/image-discernible-correctly`
- `/engine/image-mismatch`
- `/engine/image-misuse`
- `/engine/background-image-discernible`
- `/engine/background-image-discernible-image`

### Link Rules
- `/engine/link-anchor-ambiguous`
- `/engine/link-anchor-discernible`
- `/engine/link-context`
- `/engine/link-current-page`
- `/engine/link-homepage-warning`
- `/engine/link-navigation-discernible`

### Navigation Rules
- `/engine/navigation-discernible`
- `/engine/navigation-item-link`
- `/engine/navigation-mismatch`
- `/engine/navigation-misuse`
- `/engine/navigation-not-nested`
- `/engine/main-navigation-discernible`

### Table Rules
- `/engine/table-column-header`
- `/engine/table-header-not-empty`
- `/engine/table-headers`
- `/engine/table-misuse`
- `/engine/table-not-nested`
- `/engine/table-row-header`

### Form Rules
- `/engine/form-context-change-warning`
- `/engine/form-duplicate-id`
- `/engine/form-mismatch`
- `/engine/form-submit-button-mismatch`
- `/engine/input-discernible`
- `/engine/required-form-field-aria-required`

### Dialog/Modal Rules
- `/engine/dialog-modal-focus`
- `/engine/dialog-modal-mismatch`
- `/engine/dialog-modal-misuse`

### Carousel Rules
- `/engine/carousel-aria-live`
- `/engine/carousel-discernible`
- `/engine/carousel-mismatch`
- `/engine/carousel-next-slide-discernible`
- `/engine/carousel-previous-slide-discernible`
- `/engine/carousel-slide-picker-discernible`

### And Many More!
View all 156 rules at: `ENGINE_RULES_UI_SUMMARY.md`

## 🔄 User Flow

### Typical Navigation Pattern:
1. **Start**: Browse list of engine rules
2. **Select Rule**: Click on a rule to view details
3. **View Detail**: Read rule description, advice, and references
4. **Check Examples**:
   - Click "Success Examples" to see correct implementations
   - Click "Failure Examples" to see common mistakes
5. **Copy Code**: Use copy button to grab example code
6. **Implement**: Apply learnings to your codebase

## 🛠️ Developer Features

### Copy-to-Clipboard
Every example has a copy button (📋) that copies the HTML code to your clipboard.

### Expandable Sections
- **Best Practices** (Success pages) - Click to expand/collapse
- **Fix Steps** (Failure pages) - Click to expand/collapse

### Responsive Design
All pages are mobile-friendly and adapt to different screen sizes.

### Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Screen reader friendly
- High contrast colors

## 📊 Statistics

- **Total Rules**: 156
- **Total Components**: 312 (156 Success + 156 Failure)
- **Total Routes**: 468
- **Atomic Test Examples**: 1000+ across all rules

## 🔍 Finding a Specific Rule

### By Feature
If you're looking for rules about a specific feature:
- **Buttons**: Search for "button" in the rule name
- **Images**: Search for "image" in the rule name
- **Forms**: Search for "form" or "input" in the rule name
- **Navigation**: Search for "nav" in the rule name
- **Tables**: Search for "table" in the rule name

### By ARIA Attribute
If you're looking for rules about ARIA:
- `/engine/aria-*` - All ARIA-related rules
- Examples: `aria-controls-has-reference`, `aria-invalid-misuse`

### By HTML Element
If you're looking for rules about specific HTML elements:
- **divs**: `alt-misuse`, `article-misuse`, `button-mismatch`
- **headings**: `heading-h1`, `heading-order`, `heading-misuse`
- **images**: `image-discernible`, `image-mismatch`, `svg-discernible`

## 🎯 Pro Tips

### 1. **Use Success Examples First**
Start with success examples to understand the correct implementation before looking at failures.

### 2. **Compare Success vs Failure**
Open both pages in different tabs to compare correct and incorrect implementations side-by-side.

### 3. **Copy Real Examples**
The examples come from actual atomic tests, so they're real-world scenarios you can trust.

### 4. **Check WCAG References**
Click through to WCAG documentation for deeper understanding of the accessibility requirements.

### 5. **Test Incrementally**
Fix one rule at a time and test thoroughly before moving to the next.

## 🐛 Troubleshooting

### "Page Not Found" Error
- Check that the rule name is kebab-case (lowercase with hyphens)
- Verify the rule exists in `src/components/pages/engine-rules/`
- Ensure you're using the correct URL pattern

### No Examples Showing
- Check that the rule has atomic tests in `atomic-tests/pass/` or `atomic-tests/fail/`
- Verify the component was generated correctly
- Run the generator script again if needed

### Component Looks Broken
- Clear your browser cache
- Check browser console for errors
- Verify all dependencies are installed (`npm install`)

## 🔄 Regenerating Components

If you update atomic tests or need to regenerate components:

### Regenerate All Components
```bash
node scripts/generate-rule-components.js
```

### Regenerate Routes
```bash
node scripts/generate-engine-routes.js
```

### Regenerate Everything
```bash
node scripts/generate-rule-components.js && node scripts/generate-engine-routes.js
```

## 📚 Additional Resources

- **Engine Rules Summary**: `ENGINE_RULES_UI_SUMMARY.md`
- **Component Generator**: `scripts/generate-rule-components.js`
- **Route Generator**: `scripts/generate-engine-routes.js`
- **Layout Components**:
  - `src/components/layout/engineRulePage.jsx`
  - `src/components/layout/issueSuccess.jsx`
  - `src/components/layout/issueFailure.jsx`

## 🎉 Success Indicators

You'll know the engine rules UI is working correctly when:
- ✅ You can navigate to any rule detail page
- ✅ Success and Failure buttons navigate to example pages
- ✅ Examples display with proper HTML code
- ✅ Copy buttons work for each example
- ✅ Breadcrumbs show correct navigation path
- ✅ UI has beautiful glassmorphic design
- ✅ Pages are responsive and accessible

---

**Need Help?**
Check the main documentation or regenerate components using the scripts in the `scripts/` folder.

