#!/usr/bin/env node

/**
 * Visual Test Runner - Run generated tests with Chromium visualization
 * Bypasses Qase integration issues for local development
 */

const { spawn } = require('child_process');
const path = require('path');

function runVisualTests(testFile, options = {}) {
  const {
    headed = true,
    slowMo = 500,
    debug = false,
    ui = false
  } = options;

  console.log('🎭 Visual Test Runner for Site Settings');
  console.log('=====================================\n');
  console.log(`📁 Test File: ${testFile}`);
  console.log(`🖥️  Headed Mode: ${headed}`);
  console.log(`⏱️  Slow Motion: ${slowMo}ms`);
  console.log(`🐛 Debug Mode: ${debug}`);
  console.log(`🎨 UI Mode: ${ui}\n`);

  const args = ['playwright', 'test', testFile];
  
  // Add visualization options
  if (ui) {
    args.push('--ui');
  } else {
    if (headed) args.push('--headed');
    if (debug) args.push('--debug');
  }

  // Set environment variables to bypass Qase issues
  const env = {
    ...process.env,
    CI: 'false',
    QASE_ENVIRONMENT: 'local-dev',
    QASE_RUN_TITLE: 'Local Development Run'
  };

  console.log('🚀 Starting test execution...\n');
  console.log('💡 Tips:');
  console.log('   - In UI mode: Click tests to run them individually');
  console.log('   - In headed mode: Watch the browser automation');
  console.log('   - Tests will navigate to http://localhost:4001/settings/site-settings');
  console.log('   - You\'ll see modals opening for Auth Prompt, Cookie Details, and Custom Header\n');

  const child = spawn('npx', args, {
    cwd: __dirname,
    env,
    stdio: 'inherit'
  });

  child.on('close', (code) => {
    if (code === 0) {
      console.log('\n✅ Tests completed successfully!');
    } else {
      console.log(`\n❌ Tests exited with code ${code}`);
    }
  });

  child.on('error', (error) => {
    console.error('❌ Error running tests:', error.message);
  });

  // Handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    console.log('\n⏹️  Stopping test execution...');
    child.kill('SIGINT');
    process.exit(0);
  });
}

// Parse command line arguments
const args = process.argv.slice(2);
const testFile = args[0] || 'tests/Generated/sitesettingspage-regression_generated.spec.ts';

const options = {
  headed: !args.includes('--headless'),
  slowMo: args.includes('--fast') ? 0 : 500,
  debug: args.includes('--debug'),
  ui: args.includes('--ui')
};

// Show usage if no valid test file
if (!testFile.includes('.spec.ts')) {
  console.log('🎭 Visual Test Runner');
  console.log('====================\n');
  console.log('Usage: node visual-test-runner.js [test-file] [options]\n');
  console.log('Options:');
  console.log('  --ui        Open Playwright UI for interactive testing');
  console.log('  --debug     Run in debug mode with step-by-step execution');
  console.log('  --headless  Run without browser window (faster)');
  console.log('  --fast      No slow motion (faster execution)\n');
  console.log('Examples:');
  console.log('  node visual-test-runner.js tests/Generated/sitesettingspage-regression_generated.spec.ts');
  console.log('  node visual-test-runner.js tests/Generated/sitesettingspage-regression_generated.spec.ts --ui');
  console.log('  node visual-test-runner.js tests/Generated/sitesettingspage-regression_generated.spec.ts --debug');
  process.exit(0);
}

runVisualTests(testFile, options);
