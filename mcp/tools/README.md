# 🛠️ MCP Tools

This directory contains test automation tools and generators that work with the MCP (Model Context Protocol) integration.

## 📋 Available Tools

### 🎭 `page-test-generator.js`
**Advanced Page Object and Test Generator**
- Generates comprehensive page objects with intelligent locator selection
- Creates full test suites with CRUD operations
- Supports Qase integration with test case mapping
- AI-assisted element detection and interaction patterns

**Usage:**
```bash
node mcp/tools/page-test-generator.js --page "LoginPage" --url "/login"
```

### ⚙️ `site-settings-generator.js`
**Site Settings Specific Generator**
- Specialized for AccessFlow site settings page tests
- Generates modal interaction tests
- Creates validation tests for settings sections
- Includes tooltip and error handling patterns

**Usage:**
```bash
node mcp/tools/site-settings-generator.js --section "PreAuditActions"
```

### 🎯 `test-generator.js`
**General Purpose Test Generator**
- Creates basic test structures and patterns
- Supports multiple test frameworks
- Template-based test generation
- Customizable test scenarios

**Usage:**
```bash
node mcp/tools/test-generator.js --type "modal" --component "UserAgent"
```

### 👁️ `visual-test-runner.js`
**Visual Testing Automation**
- Automated visual regression testing
- Screenshot comparison and analysis
- Cross-browser visual validation
- Integration with existing test suites

**Usage:**
```bash
node mcp/tools/visual-test-runner.js --suite "site-settings"
```

## 🤖 AI Integration

These tools are designed to work seamlessly with AI assistants through the MCP protocol:

1. **Intelligent Generation**: AI can analyze existing patterns and generate appropriate tests
2. **Context-Aware**: Tools understand the project structure and existing code patterns
3. **Adaptive**: Generated code follows established conventions and patterns
4. **Extensible**: Easy to add new generators and modify existing ones

## 🚀 Getting Started

1. **Start MCP Server**: `npm run mcp:start`
2. **Connect AI Assistant**: Use config from `../config/mcp-client-config.json`
3. **Generate Tests**: Ask AI to use these tools for test creation
4. **Customize**: Modify generated tests as needed

## 📚 Related Documentation

- [`../guides/GENERATOR_GUIDE.md`](../guides/GENERATOR_GUIDE.md) - Detailed generator documentation
- [`../prompts/`](../prompts/) - AI prompts for test generation
- [`../config/`](../config/) - MCP server configuration

## 🔧 Development

To extend these tools:

1. Follow the existing patterns in each generator
2. Add new templates in the appropriate sections
3. Update this README with new tool documentation
4. Test with MCP integration to ensure AI compatibility

---

**🎯 Pro Tip**: These tools work best when combined with AI assistance through MCP. The AI can help select the right tool, provide context-specific parameters, and customize the generated output.
