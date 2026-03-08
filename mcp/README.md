# 🎭 Microsoft Playwright MCP Integration

> **Model Context Protocol (MCP) for Playwright Test Automation**

This directory contains all MCP-related configuration, documentation, and prompts for integrating AI assistants with your Playwright test automation framework.

## 📁 Directory Structure

```
mcp/
├── README.md                                    # This file - comprehensive MCP guide
├── config/
│   └── mcp-client-config.json                 # Official MCP client configuration
├── guides/
│   ├── PLAYWRIGHT_MCP_GUIDE.md                # Complete Playwright MCP setup guide
│   ├── MCP_CLEANUP_SUMMARY.md                 # Legacy cleanup documentation
│   └── GENERATOR_GUIDE.md                     # Page test generator guide
├── prompts/
│   ├── generate_test.prompt.md                 # General test generation prompts
│   ├── preaudit-actions-test-generation.md     # Specific pre-audit actions prompts
│   └── preaudit-modal-interactions.prompt.md   # Modal interaction test prompts
└── tools/
    ├── page-test-generator.js                  # Page object and test generator
    ├── site-settings-generator.js              # Site settings specific generator
    ├── test-generator.js                       # General test generation tool
    └── visual-test-runner.js                   # Visual testing automation
```

## 🚀 Quick Start

### 1. Start the MCP Server
```bash
# From test-e2e directory
npm run mcp:start      # Headed mode (with browser UI)
npm run mcp:headless   # Headless mode (background)
```

### 2. Configure Your AI Assistant
Use the configuration in `config/mcp-client-config.json`:

```json
{
  "mcpServers": {
    "playwright-test-e2e": {
      "url": "http://localhost:3001/mcp",
      "description": "Microsoft Playwright MCP Server for test-e2e project"
    }
  }
}
```

### 3. Start Testing with AI
The MCP server is now ready to assist with:
- **Intelligent test generation**
- **Smart element selection**
- **Automated page object creation**
- **Test maintenance and optimization**

### 4. Use Automation Tools
Access powerful generators in the `tools/` directory:
- **`page-test-generator.js`** - Advanced page object and test generation
- **`site-settings-generator.js`** - Site settings specific test creation
- **`test-generator.js`** - General purpose test scaffolding  
- **`visual-test-runner.js`** - Visual regression testing automation

See [`tools/README.md`](./tools/README.md) for detailed usage instructions.

## 🎯 What Can You Do?

### Test Generation
- Generate comprehensive test suites from page URLs
- Create tests based on user stories or requirements
- Convert manual test cases to automated Playwright tests

### Page Analysis
- Analyze page structure and suggest optimal selectors
- Identify testable elements and interactions
- Generate page object models automatically

### Test Enhancement
- Add assertions and validations to existing tests
- Optimize test performance and reliability
- Suggest improvements for flaky tests

### Debugging Support
- Analyze test failures and suggest fixes
- Generate debugging traces and screenshots
- Provide troubleshooting guidance

## 📚 Documentation

### Essential Guides
- **[PLAYWRIGHT_MCP_GUIDE.md](./guides/PLAYWRIGHT_MCP_GUIDE.md)** - Complete setup and usage guide
- **[GENERATOR_GUIDE.md](./guides/GENERATOR_GUIDE.md)** - Page test generator documentation
- **[MCP_CLEANUP_SUMMARY.md](./guides/MCP_CLEANUP_SUMMARY.md)** - Legacy cleanup information

### Test Generation Prompts
- **[generate_test.prompt.md](./prompts/generate_test.prompt.md)** - General test generation templates
- **[preaudit-actions-test-generation.md](./prompts/preaudit-actions-test-generation.md)** - Site settings specific prompts

## 🔧 Configuration

### Server Configuration
The MCP server runs with these settings:
- **Port**: 3001
- **Endpoint**: `http://localhost:3001/mcp`
- **Features**: Trace recording, session management, artifact collection
- **Output**: `./mcp-output/` directory

### Package Scripts
```json
{
  "mcp:start": "npx @playwright/mcp --port 3001 --save-trace --save-session --output-dir ./mcp-output --host localhost",
  "mcp:headless": "npx @playwright/mcp --port 3001 --save-trace --save-session --output-dir ./mcp-output --host localhost --headless"
}
```

## 📝 Usage Examples

### Example 1: Generate Site Settings Tests
```markdown
Using the MCP server at http://localhost:3001/mcp, generate comprehensive Playwright tests for the site settings page at http://localhost:4001/settings/site-settings.

Focus on:
- Pre-audit actions management (User Agent, Cookies, Headers, Auth)
- CRUD operations for each configuration type
- Error handling and validation
- UI/UX interactions and tooltips

Use the existing PageManager pattern and follow the test structure in site-settings-auth-prompt_validation.spec.ts.
```

### Example 2: Debug Failing Tests
```markdown
Analyze the failing test in site-settings-preaudit-manage-clean.spec.ts and suggest improvements.

Current issues:
- Modal interactions not working properly
- Assertions failing on dynamic content
- Test timing issues

Please provide specific fixes using the MCP server capabilities.
```

### Example 3: Create Page Objects
```markdown
Create a comprehensive page object for the site settings page by analyzing http://localhost:4001/settings/site-settings.

Include:
- All interactive elements and their selectors
- Methods for common user actions
- Validation methods for different states
- Integration with existing PageManager pattern
```

## 🔗 Integration with Existing Framework

### Page Objects
The MCP integrates seamlessly with your existing page objects:
- `SiteSettingsPage` - Main site settings functionality
- `UserAgentModal`, `CookieDetailsModal`, etc. - Modal interactions
- `PageManager` - Central page management

### Test Fixtures
Uses the established fixture pattern:
```typescript
test('Test Description', async ({ pageManager, trialSetup }) => {
  await trialSetup; // Environment setup
  // MCP-assisted test implementation
});
```

### Qase Integration
Maintains compatibility with Qase test management:
```typescript
qase.id(3894); // Test case mapping
```

## 🎛️ Advanced Features

### Trace Recording
All MCP interactions are automatically traced:
```bash
# View traces
npx playwright show-trace ./mcp-output/trace.zip
```

### Session Management
Sessions are preserved for debugging:
- Browser state maintained across interactions
- Screenshots and videos automatically captured
- Full interaction history available

### Artifact Collection
MCP output includes:
- Traces (`.zip` files)
- Screenshots (`.png` files)  
- Videos (`.webm` files)
- Session data (`.json` files)

## 🚨 Troubleshooting

### Common Issues

**Server won't start:**
```bash
# Check if port 3001 is already in use
lsof -i :3001

# Kill existing process if needed
kill -9 <PID>
```

**Connection refused:**
- Ensure the MCP server is running
- Check firewall settings
- Verify the URL: `http://localhost:3001/mcp`

**Tests not generating properly:**
- Check the prompts in `prompts/` directory
- Verify AI assistant configuration
- Review server logs for errors

### Debug Mode
Run the server in debug mode for detailed logging:
```bash
DEBUG=* npm run mcp:start
```

## 🔄 Maintenance

### Updating MCP Package
```bash
npm update @playwright/mcp
```

### Cleaning Output
```bash
rm -rf mcp-output/*
```

### Checking Server Status
```bash
curl http://localhost:3001/mcp/health
```

## 🎯 Next Steps

1. **Start the MCP server** using `npm run mcp:start`
2. **Configure your AI assistant** with the provided config
3. **Review the guides** in `guides/` directory
4. **Use the prompts** in `prompts/` directory for test generation
5. **Begin generating tests** for your site settings functionality

---

**📞 Need Help?**
- Check the guides in `guides/` directory
- Review existing test examples
- Use the prompts in `prompts/` directory
- Consult the official Playwright MCP documentation

**🎭 Happy Testing with AI!**
