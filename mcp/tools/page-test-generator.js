#!/usr/bin/env node

/**
 * Flexible Page Test Generator - MCP-assisted test generation for any page
 * Usage: node page-test-generator.js <page-name> [test-type] [options]
 * 
 * Examples:
 *   node page-test-generator.js siteSettingsPage smoke
 *   node page-test-generator.js auditsPage regression --save
 *   node page-test-generator.js trialStartedModal edge-case
 */

const fs = require('fs');
const path = require('path');

class FlexiblePageTestGenerator {
  constructor(pageName, options = {}) {
    this.pageName = pageName;
    this.options = options;
    this.pagesDir = path.join(__dirname, 'pages');
    this.testsDir = path.join(__dirname, 'tests');
  }

  findPageFile() {
    // Try different naming conventions
    const possibleNames = [
      `${this.pageName}.ts`,
      `${this.pageName}Page.ts`,
      `${this.pageName.toLowerCase()}.ts`,
      `${this.pageName.toLowerCase()}Page.ts`,
      `${this.pageName.replace(/page$/i, '')}.ts`,
      `${this.pageName.replace(/page$/i, '')}Page.ts`
    ];

    for (const fileName of possibleNames) {
      const filePath = path.join(this.pagesDir, fileName);
      if (fs.existsSync(filePath)) {
        return { fileName, filePath };
      }
    }

    // If not found in pages directory, search recursively
    const allFiles = this.findFilesRecursively(this.pagesDir, '.ts');
    const matchingFile = allFiles.find(file => 
      file.toLowerCase().includes(this.pageName.toLowerCase())
    );

    if (matchingFile) {
      return {
        fileName: path.basename(matchingFile),
        filePath: matchingFile
      };
    }

    return null;
  }

  findFilesRecursively(dir, extension) {
    let results = [];
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        results = results.concat(this.findFilesRecursively(filePath, extension));
      } else if (file.endsWith(extension)) {
        results.push(filePath);
      }
    }

    return results;
  }

  analyzePageObject(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath, '.ts');
    
    return {
      fileName,
      className: this.extractClassName(content),
      filePath,
      methods: this.extractMethods(content),
      locators: this.extractLocators(content),
      imports: this.extractImports(content),
      baseClass: this.extractBaseClass(content),
      hasLogger: content.includes('winston.Logger') || content.includes('logger'),
      complexity: this.calculateComplexity(content),
      testCoverage: this.calculateTestCoverage(fileName)
    };
  }

  extractClassName(content) {
    const match = content.match(/export class (\w+)/);
    return match ? match[1] : 'UnknownPage';
  }

  extractMethods(content) {
    const methodMatches = content.match(/async\s+(\w+)\s*\([^)]*\)/g) || [];
    return methodMatches.map(match => {
      const methodName = match.match(/async\s+(\w+)/)?.[1];
      const params = match.match(/\(([^)]*)\)/)?.[1] || '';
      return {
        name: methodName || '',
        params: params.split(',').map(p => p.trim()).filter(Boolean),
        type: this.categorizeMethod(methodName || '')
      };
    }).filter(method => method.name);
  }

  categorizeMethod(methodName) {
    if (methodName.includes('navigate') || methodName.includes('goto')) return 'navigation';
    if (methodName.includes('validate') || methodName.includes('verify') || methodName.includes('check')) return 'validation';
    if (methodName.includes('click') || methodName.includes('open') || methodName.includes('close')) return 'interaction';
    if (methodName.includes('fill') || methodName.includes('enter') || methodName.includes('input')) return 'input';
    if (methodName.includes('hover') || methodName.includes('tooltip')) return 'hover';
    if (methodName.includes('wait') || methodName.includes('load')) return 'wait';
    return 'utility';
  }

  extractLocators(content) {
    // Extract both private and readonly locators
    const patterns = [
      /readonly\s+(\w+):\s*Locator/g,
      /private\s+(\w+):\s*Locator/g,
      /public\s+(\w+):\s*Locator/g,
      /(\w+):\s*Locator/g
    ];

    const locators = [];
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const name = match[1];
        if (!locators.find(l => l.name === name)) {
          locators.push({ 
            name, 
            type: 'Locator',
            visibility: this.getLocatorVisibility(content, name)
          });
        }
      }
    });

    return locators;
  }

  getLocatorVisibility(content, locatorName) {
    if (content.includes(`private ${locatorName}`)) return 'private';
    if (content.includes(`readonly ${locatorName}`)) return 'readonly';
    if (content.includes(`public ${locatorName}`)) return 'public';
    return 'unknown';
  }

  extractImports(content) {
    const imports = [];
    const importMatches = content.match(/import\s+.*\s+from\s+['"][^'"]+['"]/g) || [];
    importMatches.forEach(imp => {
      imports.push(imp.trim());
    });
    return imports;
  }

  extractBaseClass(content) {
    const match = content.match(/extends\s+(\w+)/);
    return match ? match[1] : null;
  }

  calculateComplexity(content) {
    const lines = content.split('\n').length;
    const methods = (content.match(/async\s+\w+\s*\(/g) || []).length;
    const locators = (content.match(/:\s*Locator/g) || []).length;
    
    return {
      lines,
      methods,
      locators,
      score: Math.round((methods * 2 + locators + lines / 10) / 10)
    };
  }

  calculateTestCoverage(fileName) {
    try {
      const testFiles = this.findFilesRecursively(this.testsDir, '.spec.ts');
      const relatedTests = testFiles.filter(file => {
        const content = fs.readFileSync(file, 'utf8');
        return content.toLowerCase().includes(fileName.toLowerCase());
      });

      return {
        hasTests: relatedTests.length > 0,
        testFiles: relatedTests.map(f => path.relative(this.testsDir, f)),
        coverage: relatedTests.length > 0 ? 'partial' : 'none'
      };
    } catch (error) {
      return { hasTests: false, testFiles: [], coverage: 'none' };
    }
  }

  generateTests(analysis, testType = 'smoke') {
    const generators = {
      smoke: () => this.generateSmokeTests(analysis),
      regression: () => this.generateRegressionTests(analysis),
      'edge-case': () => this.generateEdgeCaseTests(analysis),
      accessibility: () => this.generateAccessibilityTests(analysis),
      comprehensive: () => this.generateComprehensiveTests(analysis),
      custom: () => this.generateCustomTests(analysis)
    };

    const generator = generators[testType] || generators.smoke;
    return generator();
  }

  generateSmokeTests(analysis) {
    const pageManagerCall = this.getPageManagerCall(analysis.className);
    const navigationMethod = this.findMethodByType(analysis.methods, 'navigation')[0];
    const validationMethod = this.findMethodByType(analysis.methods, 'validation')[0];

    return [{
      title: `${analysis.className} - Basic functionality smoke test`,
      type: 'smoke',
      code: `test('${analysis.className} - Basic functionality smoke test', async ({ pageManager }) => {
  qase.id(/* Add Qase ID here */);
  
  ${navigationMethod ? 
    `// Navigate to the page\n  await ${pageManagerCall}.${navigationMethod.name}();` :
    `// Navigate to the page\n  await ${pageManagerCall}.navigateTo${analysis.className}();`
  }
  
  ${validationMethod ?
    `// Validate page is loaded\n  await ${pageManagerCall}.${validationMethod.name}();` :
    `// Validate page is loaded\n  // TODO: Add page validation method`
  }
  
  // Close any overlays (following your pattern)
  await pageManager.general().closeZendeskMessage();
  
  ${analysis.locators.slice(0, 3).map(loc => 
    `// Verify ${loc.name} is visible\n  await expect(${pageManagerCall}.${loc.name}).toBeVisible();`
  ).join('\n  ')}
});`,
      description: `Basic smoke test for ${analysis.className} following your existing patterns`,
      dependencies: ['qase.id', 'pageManager fixture']
    }];
  }

  generateRegressionTests(analysis) {
    const pageManagerCall = this.getPageManagerCall(analysis.className);
    const interactionMethods = this.findMethodByType(analysis.methods, 'interaction');
    
    return interactionMethods.slice(0, 3).map(method => ({
      title: `${analysis.className} - ${method.name} functionality`,
      type: 'regression',
      code: `test('${analysis.className} - ${method.name} works correctly', async ({ pageManager }) => {
  qase.id(/* Add Qase ID here */);
  
  // Setup
  await ${pageManagerCall}.navigateTo${analysis.className}();
  await pageManager.general().closeZendeskMessage();
  
  // Test ${method.name} functionality
  await ${pageManagerCall}.${method.name}(${method.params.map(() => '/* add parameter */').join(', ')});
  
  // Add appropriate assertions based on expected behavior
  // TODO: Add specific validation for ${method.name} result
});`,
      description: `Regression test for ${method.name} method in ${analysis.className}`,
      dependencies: ['qase.id', 'pageManager fixture']
    }));
  }

  generateEdgeCaseTests(analysis) {
    const pageManagerCall = this.getPageManagerCall(analysis.className);
    
    return [{
      title: `${analysis.className} - Error handling and edge cases`,
      type: 'edge-case',
      code: `test('${analysis.className} - Error handling and boundary conditions', async ({ pageManager }) => {
  qase.id(/* Add Qase ID here */);
  
  await ${pageManagerCall}.navigateTo${analysis.className}();
  await pageManager.general().closeZendeskMessage();
  
  // Test error states and boundary conditions
  // TODO: Add specific edge case scenarios for ${analysis.className}
  
  // Example edge cases to consider:
  // - Invalid input handling
  // - Network failure scenarios  
  // - Permission boundary tests
  // - Data boundary conditions
  
  ${analysis.methods.filter(m => m.type === 'input').slice(0, 2).map(method => 
    `// Test ${method.name} with invalid input\n  // TODO: await ${pageManagerCall}.${method.name}(/* invalid data */);`
  ).join('\n  ')}
});`,
      description: `Edge case and error handling test for ${analysis.className}`,
      dependencies: ['qase.id', 'pageManager fixture']
    }];
  }

  generateAccessibilityTests(analysis) {
    const pageManagerCall = this.getPageManagerCall(analysis.className);
    const hoverMethods = this.findMethodByType(analysis.methods, 'hover');
    
    return [{
      title: `${analysis.className} - Accessibility compliance`,
      type: 'accessibility',
      code: `test('${analysis.className} - Accessibility compliance', async ({ pageManager, page }) => {
  qase.id(/* Add Qase ID here */);
  
  await ${pageManagerCall}.navigateTo${analysis.className}();
  await pageManager.general().closeZendeskMessage();
  
  // Test keyboard navigation
  await page.keyboard.press('Tab');
  
  ${hoverMethods.slice(0, 2).map(method => 
    `// Test ${method.name}\n  await ${pageManagerCall}.${method.name}(/* add parameters */);`
  ).join('\n  ')}
  
  // Basic accessibility checks
  ${analysis.locators.slice(0, 3).map(loc => 
    `await expect(${pageManagerCall}.${loc.name}).toBeVisible();`
  ).join('\n  ')}
  
  // TODO: Add axe-core integration for comprehensive accessibility testing
  // TODO: Test focus management and ARIA attributes
});`,
      description: `Accessibility test for ${analysis.className}`,
      dependencies: ['qase.id', 'pageManager fixture', 'page fixture']
    }];
  }

  generateComprehensiveTests(analysis) {
    // Combine multiple test types
    return [
      ...this.generateSmokeTests(analysis),
      ...this.generateRegressionTests(analysis).slice(0, 2),
      ...this.generateAccessibilityTests(analysis)
    ];
  }

  generateCustomTests(analysis) {
    // Template for custom test generation
    const pageManagerCall = this.getPageManagerCall(analysis.className);
    
    return [{
      title: `${analysis.className} - Custom test template`,
      type: 'custom',
      code: `test('${analysis.className} - Custom test scenario', async ({ pageManager }) => {
  qase.id(/* Add Qase ID here */);
  
  // Your custom test logic here
  await ${pageManagerCall}.navigateTo${analysis.className}();
  
  // Available methods in this page object:
  ${analysis.methods.slice(0, 5).map(method => 
    `// await ${pageManagerCall}.${method.name}(${method.params.map(() => '/* param */').join(', ')});`
  ).join('\n  ')}
  
  // Available locators:
  ${analysis.locators.slice(0, 5).map(loc => 
    `// await expect(${pageManagerCall}.${loc.name}).toBeVisible();`
  ).join('\n  ')}
});`,
      description: `Custom test template for ${analysis.className}`,
      dependencies: ['qase.id', 'pageManager fixture']
    }];
  }

  findMethodByType(methods, type) {
    return methods.filter(method => method.type === type);
  }

  getPageManagerCall(className) {
    // Convert ClassName to pageManager.className() format
    const pageName = className.replace(/Page$/, '').toLowerCase();
    return `pageManager.${pageName}Page()`;
  }

  createTestFile(suggestions, testType) {
    const imports = `import { qase } from 'playwright-qase-reporter';
import { test } from '../utils/fixtures';
import { expect } from '@playwright/test';`;

    const testSuite = `
test.describe('${this.pageName} - ${testType} Tests', () => {
  test.beforeEach(async ({ trialSetup }) => {
    await trialSetup;
  });

${suggestions.map(suggestion => suggestion.code).join('\n\n')}

  test.afterEach(async ({ page }, testInfo) => {
    const endISO = new Date().toISOString();
    const startISO = new Date(Date.now() - (testInfo.duration ?? 0)).toISOString();

    await testInfo.attach('execution-log', {
      body: [
        \`Test: \${testInfo.title}\`,
        \`Status: \${testInfo.status}\`,
        \`Start: \${startISO}\`,
        \`End:   \${endISO}\`,
        \`Duration(ms): \${testInfo.duration ?? 0}\`,
      ].join('\\n'),
      contentType: 'text/plain',
    });

    // Refresh page to avoid freezing in local env
    try {
      await page.reload({ timeout: 10000 });
    } catch (e) {
      console.warn('Page reload failed after test', e);
    }
  });
});`;

    return imports + testSuite;
  }

  saveTestFile(content, testType) {
    const outputDir = path.join(this.testsDir, 'Generated');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileName = `${this.pageName.toLowerCase()}-${testType}_generated.spec.ts`;
    const filePath = path.join(outputDir, fileName);
    
    fs.writeFileSync(filePath, content, 'utf8');
    return filePath;
  }
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🤖 Flexible Page Test Generator (MCP-Assisted)');
    console.log('==============================================\n');
    console.log('Usage: node page-test-generator.js <page-name> [test-type] [options]\n');
    console.log('Available test types:');
    console.log('  smoke        - Basic functionality tests');
    console.log('  regression   - Complete workflow tests');
    console.log('  edge-case    - Error handling and boundary tests');
    console.log('  accessibility- A11y compliance tests');
    console.log('  comprehensive- All test types combined');
    console.log('  custom       - Template for custom tests\n');
    console.log('Options:');
    console.log('  --save       - Save generated tests to file');
    console.log('  --preview    - Show code preview only\n');
    console.log('Examples:');
    console.log('  node page-test-generator.js siteSettingsPage smoke');
    console.log('  node page-test-generator.js auditsPage regression --save');
    console.log('  node page-test-generator.js modal edge-case --preview');
    process.exit(0);
  }

  const pageName = args[0];
  const testType = args[1] || 'smoke';
  const shouldSave = args.includes('--save');
  const previewOnly = args.includes('--preview');

  console.log('🤖 Flexible Page Test Generator (MCP-Assisted)');
  console.log('==============================================\n');
  console.log(`🎯 Target Page: ${pageName}`);
  console.log(`📝 Test Type: ${testType}`);
  console.log(`💾 Save to file: ${shouldSave ? 'Yes' : 'No'}\n`);

  const generator = new FlexiblePageTestGenerator(pageName, { save: shouldSave });

  try {
    // Find the page file
    console.log('🔍 Searching for page object...');
    const pageFile = generator.findPageFile();
    
    if (!pageFile) {
      console.error(`❌ Page object '${pageName}' not found`);
      console.log('\n💡 Available page objects:');
      const allPages = fs.readdirSync(generator.pagesDir).filter(f => f.endsWith('.ts'));
      allPages.forEach(page => console.log(`   ${page.replace('.ts', '')}`));
      process.exit(1);
    }

    console.log(`✅ Found: ${pageFile.fileName}`);
    console.log(`📁 Path: ${pageFile.filePath}\n`);

    // Analyze the page object
    console.log('📊 Analyzing page object...');
    const analysis = generator.analyzePageObject(pageFile.filePath);
    
    console.log(`📋 Analysis Results:`);
    console.log(`   Class: ${analysis.className}`);
    console.log(`   Methods: ${analysis.methods.length}`);
    console.log(`   Locators: ${analysis.locators.length}`);
    console.log(`   Complexity: ${analysis.complexity.score}/10`);
    console.log(`   Test Coverage: ${analysis.testCoverage.coverage}\n`);

    // Generate tests
    console.log(`🎯 Generating ${testType} tests...`);
    const suggestions = generator.generateTests(analysis, testType);
    
    console.log(`\n📝 Generated ${suggestions.length} test suggestion(s):\n`);
    
    suggestions.forEach((suggestion, index) => {
      console.log(`${index + 1}. ${suggestion.title}`);
      console.log(`   Type: ${suggestion.type}`);
      console.log(`   Description: ${suggestion.description}`);
      console.log('');
    });

    if (previewOnly || !shouldSave) {
      console.log('\n📋 Test code preview:');
      console.log('================================');
      console.log(suggestions[0]?.code || 'No code generated');
      console.log('================================\n');
    }

    if (shouldSave) {
      const testContent = generator.createTestFile(suggestions, testType);
      const savedPath = generator.saveTestFile(testContent, testType);
      console.log(`💾 Test file saved to: ${savedPath}\n`);
    }

    if (!shouldSave && !previewOnly) {
      console.log('💡 Add --save to save the test file or --preview to see full code');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
