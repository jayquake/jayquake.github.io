# Microsoft Playwright MCP Integration Guide

## 🎭 What is the Playwright MCP?

The Microsoft Playwright MCP server provides a bridge between AI assistants and Playwright, allowing intelligent browser automation, testing, and web interaction through a standardized protocol.

## 🚀 Quick Start

### 1. Start the MCP Server
```bash
# From test-e2e directory
npm run mcp:start

# Or for headless mode (CI environments)
npm run mcp:headless
```

The server will be available at: `http://localhost:3001/mcp`

### 2. Configure Your MCP Client
Use the configuration in `mcp-client-config.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:3001/mcp"
    }
  }
}
```

## 🎯 Site Settings Page Integration

Your site settings page at `http://localhost:4001/settings/site-settings` can now be automated intelligently through the MCP.

#### 1. Navigate and Interact
```javascript
// Navigate to site settings
await playwright.goto('http://localhost:4001/settings/site-settings');

// Take a screenshot
await playwright.screenshot('site-settings-initial.png');

// Open Auth Prompt Modal
await playwright.click('button:has-text("Add")');
```

#### 2. Form Testing
```javascript
// Fill auth prompt form
await playwright.fill('input[name="username"]', 'testuser');
await playwright.fill('input[name="password"]', 'testpass');
await playwright.click('button:has-text("Apply")');

// Verify success state
await playwright.waitForSelector('text="Username: testuser"');
```

#### 3. Accessibility Testing
```javascript
// Check keyboard navigation
await playwright.press('Tab');
await playwright.press('Enter');

// Verify tooltips
await playwright.hover('svg[data-testid="info-icon"]');
await playwright.waitForSelector('text="Set authentication details"');
```

## 🔧 Advanced Features

### 1. Trace Recording
```bash
# Traces are automatically saved to ./mcp-output/
# View traces with:
npx playwright show-trace ./mcp-output/trace.zip
```

### 2. Session Persistence
```bash
# Sessions are saved for reuse
# Continue previous session by loading storage state
```

### 3. Multi-Modal Capabilities
- **Vision**: AI can "see" the page and describe what's happening
- **PDF**: Generate PDF reports of test results
- **Screenshots**: Automatic visual documentation

## 🎨 Integration with Your Existing Tests

### 1. Enhance Generated Tests
```typescript
// Your generated test enhanced with MCP
test('Site Settings - Auth Prompt with MCP assistance', async ({ page }) => {
  // Use MCP for intelligent page interaction
  await mcp.navigateAndVerify('http://localhost:4001/settings/site-settings');
  
  // MCP can analyze the page and suggest optimal selectors
  await mcp.interactWithElement('auth-prompt-add-button', { strategy: 'smart' });
  
  // Automatic validation with AI assistance
  await mcp.validatePageState('auth-prompt-modal-open');
});
```

### 2. Visual Regression Testing
```typescript
// MCP can help with visual comparisons
test('Site Settings - Visual regression', async ({ page }) => {
  await mcp.goto('/settings/site-settings');
  
  // AI-powered visual comparison
  await mcp.compareScreenshot('site-settings-baseline.png', {
    threshold: 0.95,
    regions: ['modals', 'forms', 'buttons']
  });
});
```

## 🔄 Workflow Integration

### 1. Development Workflow
```bash
# Start MCP server
npm run mcp:start

# In another terminal, run your tests with MCP assistance
npm run test:ui

# Generate tests with MCP insights
npm run generate-tests siteSettingsPage comprehensive --mcp
```

### 2. CI/CD Integration
```yaml
# Add to your CircleCI config
- run:
    name: Start MCP Server
    command: cd test-e2e && npm run mcp:headless
    background: true

- run:
    name: Run MCP-enhanced tests
    command: cd test-e2e && npm test
```

## 📊 Benefits for Your AccessFlow Project

### 1. **Intelligent Test Generation**
- AI understands your page structure
- Suggests optimal test strategies
- Identifies edge cases automatically

### 2. **Enhanced Debugging**
- Visual traces with AI annotations
- Automatic error analysis
- Suggested fixes for failing tests

### 3. **Accessibility Insights**
- AI-powered accessibility audits
- Keyboard navigation verification
- Screen reader compatibility checks

### 4. **Cross-browser Intelligence**
- Smart selector strategies across browsers
- Automatic fallback mechanisms
- Browser-specific optimizations

## 🛠️ Available Commands

### Core Navigation
- `goto(url)` - Navigate to URL
- `click(selector)` - Click element
- `fill(selector, text)` - Fill input
- `type(selector, text)` - Type text
- `press(key)` - Press key

### Validation
- `waitForSelector(selector)` - Wait for element
- `screenshot(filename)` - Take screenshot
- `textContent(selector)` - Get text
- `isVisible(selector)` - Check visibility

### Advanced
- `evaluate(script)` - Run JavaScript
- `hover(selector)` - Hover element
- `selectOption(selector, value)` - Select dropdown
- `dragAndDrop(from, to)` - Drag and drop

## 🎯 Next Steps

1. **Start the MCP server** (`npm run mcp:start`)
2. **Connect your AI assistant** using the config
3. **Try basic commands** on your site settings page
4. **Enhance existing tests** with MCP capabilities
5. **Generate new tests** with AI assistance

## 🔧 Troubleshooting

### Common Issues
1. **Port conflicts**: Change port with `--port 3002`
2. **CORS issues**: Use `--allowed-origins` flag
3. **Headless mode**: Add `--headless` for CI environments

### Debug Mode
```bash
# Run with verbose logging
DEBUG=playwright:* npm run mcp:start
```

This integration gives you the power of Microsoft's official Playwright MCP with your existing test architecture, enabling AI-assisted testing while preserving your current patterns and workflows.
