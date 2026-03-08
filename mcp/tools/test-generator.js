#!/usr/bin/env node

/**
 * CLI tool to demonstrate MCP-assisted test generation
 * Usage: node test-generator.js [page-object-name] [test-type]
 */

const { TestGenerationAssistant } = require('./utils/testGenerationAssistant.js');
const path = require('path');

async function main() {
  const args = process.argv.slice(2);
  const pageObjectName = args[0];
  const testType = args[1] || 'smoke';

  console.log('🤖 Playwright MCP Test Generation Assistant');
  console.log('==========================================\n');

  const pagesDir = path.join(__dirname, 'pages');
  const testsDir = path.join(__dirname, 'tests');
  
  const assistant = new TestGenerationAssistant(pagesDir, testsDir);

  try {
    // Analyze existing page objects
    console.log('📊 Analyzing existing page objects...');
    const analyses = await assistant.analyzePageObjects();
    
    console.log(`Found ${analyses.length} page objects:`);
    analyses.forEach((analysis, index) => {
      console.log(`  ${index + 1}. ${analysis.className} (${analysis.methods.length} methods, ${analysis.locators.length} locators)`);
    });
    console.log('');

    if (pageObjectName) {
      // Generate tests for specific page object
      const targetAnalysis = analyses.find(a => 
        a.className.toLowerCase().includes(pageObjectName.toLowerCase())
      );

      if (!targetAnalysis) {
        console.error(`❌ Page object containing "${pageObjectName}" not found`);
        console.log('Available page objects:', analyses.map(a => a.className).join(', '));
        process.exit(1);
      }

      console.log(`🎯 Generating ${testType} tests for ${targetAnalysis.className}...`);
      const suggestions = assistant.generateTestSuggestions(targetAnalysis, testType);
      
      console.log(`\n📝 Generated ${suggestions.length} test suggestion(s):\n`);
      
      suggestions.forEach((suggestion, index) => {
        console.log(`${index + 1}. ${suggestion.title}`);
        console.log(`   Type: ${suggestion.type}`);
        console.log(`   Description: ${suggestion.description}`);
        console.log(`   Dependencies: ${suggestion.dependencies.join(', ')}`);
        console.log('');
      });

      // Option to save the test file
      const outputPath = path.join(testsDir, 'Generated', `${targetAnalysis.className.toLowerCase()}-${testType}_generated.spec.ts`);
      console.log(`💾 To create a test file, the code would be saved to:`);
      console.log(`   ${outputPath}`);
      console.log('\n📋 Test code preview:');
      console.log('================================');
      console.log(suggestions[0]?.code || 'No code generated');
      console.log('================================\n');

    } else {
      // Show overview of all page objects
      console.log('📈 Test Coverage Analysis:');
      analyses.forEach(analysis => {
        const coverage = analysis.testCoverage.coverage;
        const icon = coverage === 'none' ? '❌' : coverage === 'partial' ? '⚠️' : '✅';
        console.log(`  ${icon} ${analysis.className}: ${coverage} coverage (${analysis.testCoverage.testFiles.length} test files)`);
      });

      console.log('\n💡 Usage examples:');
      console.log('  node test-generator.js audits smoke    # Generate smoke tests for AuditsPage');
      console.log('  node test-generator.js settings regression # Generate regression tests for SettingsPage');
      console.log('  node test-generator.js modal edge-case    # Generate edge case tests for any modal page');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
