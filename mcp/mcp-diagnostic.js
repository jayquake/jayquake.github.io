#!/usr/bin/env node

// MCP Server Diagnostic Script - Form Element Detection
// This script will help identify the actual form elements on the staging page

const { chromium } = require('playwright');

async function main() {
  console.log('🔍 Starting MCP Form Diagnostic Script');
  console.log('🎯 Target: Identify actual form elements on staging page');
  console.log('');

  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 2000 // Very slow for observation
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('1️⃣ Navigating to staging setup page...');
    await page.goto('http://localhost:4001');
    await page.waitForLoadState('networkidle');
    
    console.log('2️⃣ Taking initial screenshot...');
    await page.screenshot({ 
      path: '/Users/jasonquaicoo/Documents/acccessflow-automation/accessFlow/test-e2e/mcp/mcp-output/diagnostic-01-initial.png', 
      fullPage: true 
    });
    
    console.log('3️⃣ Analyzing all input elements on page...');
    
    // Get all input elements
    const allInputs = await page.locator('input').all();
    console.log(`Found ${allInputs.length} input elements:`);
    
    for (let i = 0; i < allInputs.length; i++) {
      const input = allInputs[i];
      try {
        const type = await input.getAttribute('type') || 'text';
        const name = await input.getAttribute('name') || 'no-name';
        const id = await input.getAttribute('id') || 'no-id';
        const placeholder = await input.getAttribute('placeholder') || 'no-placeholder';
        const isVisible = await input.isVisible();
        
        console.log(`  Input ${i + 1}: type="${type}" name="${name}" id="${id}" placeholder="${placeholder}" visible=${isVisible}`);
        
        // Highlight each input for 1 second
        if (isVisible) {
          await input.highlight();
          await page.waitForTimeout(1000);
        }
      } catch (error) {
        console.log(`  Input ${i + 1}: Error getting attributes - ${error.message}`);
      }
    }
    
    console.log('4️⃣ Analyzing all button elements...');
    
    // Get all button elements
    const allButtons = await page.locator('button, input[type="submit"]').all();
    console.log(`Found ${allButtons.length} button elements:`);
    
    for (let i = 0; i < allButtons.length; i++) {
      const button = allButtons[i];
      try {
        const type = await button.getAttribute('type') || 'button';
        const text = await button.textContent() || 'no-text';
        const isVisible = await button.isVisible();
        
        console.log(`  Button ${i + 1}: type="${type}" text="${text.trim()}" visible=${isVisible}`);
        
        // Highlight each button for 1 second
        if (isVisible) {
          await button.highlight();
          await page.waitForTimeout(1000);
        }
      } catch (error) {
        console.log(`  Button ${i + 1}: Error getting attributes - ${error.message}`);
      }
    }
    
    console.log('5️⃣ Analyzing all form elements...');
    
    // Get all form elements
    const allForms = await page.locator('form').all();
    console.log(`Found ${allForms.length} form elements`);
    
    for (let i = 0; i < allForms.length; i++) {
      const form = allForms[i];
      try {
        const action = await form.getAttribute('action') || 'no-action';
        const method = await form.getAttribute('method') || 'no-method';
        const isVisible = await form.isVisible();
        
        console.log(`  Form ${i + 1}: action="${action}" method="${method}" visible=${isVisible}`);
        
        if (isVisible) {
          await form.highlight();
          await page.waitForTimeout(2000);
        }
      } catch (error) {
        console.log(`  Form ${i + 1}: Error getting attributes - ${error.message}`);
      }
    }
    
    console.log('6️⃣ Taking final screenshot...');
    await page.screenshot({ 
      path: '/Users/jasonquaicoo/Documents/acccessflow-automation/accessFlow/test-e2e/mcp/mcp-output/diagnostic-02-final.png', 
      fullPage: true 
    });
    
    console.log('');
    console.log('🎉 Diagnostic complete! Check console output above for element details.');
    console.log('📁 Screenshots saved to mcp-output/diagnostic-*.png');
    
  } catch (error) {
    console.error('❌ Error during diagnostic:', error.message);
    await page.screenshot({ 
      path: '/Users/jasonquaicoo/Documents/acccessflow-automation/accessFlow/test-e2e/mcp/mcp-output/diagnostic-error.png', 
      fullPage: true 
    });
    throw error;
  } finally {
    await page.waitForTimeout(5000); // Keep page open for observation
    await browser.close();
  }
}

// Run the script
main().catch(console.error);
