#!/usr/bin/env node

// MCP Server Interaction Script - Post Staging Setup
// This script starts after staging setup is complete and goes directly to site settings
// while the MCP server is running on localhost:3001 for monitoring/analysis

const { chromium } = require('playwright');

async function main() {
  console.log('🚀 Starting MCP-monitored interaction for Pre-Audit Actions (Post-Staging)');
  console.log('🎯 Target: Site Settings → Add Manually → Modal Open → X Close flow');
  console.log('🔍 MCP Server running on: http://localhost:3001');
  console.log('ℹ️  Starting from current page after staging setup completion');
  console.log('');

  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 1500 // Even slower for better MCP observation
  });
  
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Start from the current state (after staging setup)
    console.log('1️⃣ Navigating to current page to check state...');
    await page.goto('http://localhost:4001');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: '/Users/jasonquaicoo/Documents/acccessflow-automation/accessFlow/test-e2e/mcp-output/03-current-state.png', 
      fullPage: true 
    });
    console.log('📸 Current state captured');
    
    // Handle any modal that might be open
    console.log('2️⃣ Checking for any open modals...');
    try {
      const existingModal = page.locator('div[role="dialog"]').first();
      if (await existingModal.isVisible()) {
        console.log('🔍 Found open modal, closing it...');
        const closeBtn = existingModal.locator('button[aria-label="Close"], button:has-text("×"), button:has-text("Close")').first();
        if (await closeBtn.isVisible()) {
          await closeBtn.click();
          await page.waitForTimeout(1000);
        }
      }
    } catch (error) {
      console.log('✅ No modals to close');
    }
    
    // Navigate directly to site settings
    console.log('3️⃣ Navigating to site settings page...');
    await page.goto('http://localhost:4001/settings/site-settings');
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: '/Users/jasonquaicoo/Documents/acccessflow-automation/accessFlow/test-e2e/mcp-output/04-site-settings-page.png', 
      fullPage: true 
    });
    console.log('📸 Site settings page captured');
    
    // Close any Zendesk messages
    console.log('4️⃣ Closing any Zendesk messages...');
    try {
      const zendeskClose = page.locator('[data-testid="zendesk-close-button"], button:has-text("×")').first();
      if (await zendeskClose.isVisible()) {
        await zendeskClose.click();
        await page.waitForTimeout(1000);
      }
    } catch (error) {
      console.log('✅ No Zendesk messages to close');
    }
    
    console.log('5️⃣ Looking for Pre-audit Actions section...');
    const preAuditSection = page.locator('section').filter({ hasText: /Pre-audit actions/ });
    await preAuditSection.waitFor({ state: 'visible', timeout: 15000 });
    console.log('✅ Pre-audit Actions section found');
    
    // Scroll to the section
    await preAuditSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    
    console.log('6️⃣ Looking for Add Manually button...');
    const addManuallyButton = preAuditSection.getByRole('button', { name: /Add manually/i });
    await addManuallyButton.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✅ Add Manually button found and visible');
    
    // Highlight the button for MCP observation
    await addManuallyButton.highlight();
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: '/Users/jasonquaicoo/Documents/acccessflow-automation/accessFlow/test-e2e/mcp-output/05-add-manually-highlighted.png', 
      fullPage: true 
    });
    
    console.log('7️⃣ Clicking Add Manually button...');
    await addManuallyButton.click();
    
    console.log('8️⃣ Waiting for modal to appear...');
    const modal = page.locator('div[role="dialog"]').filter({ hasText: /Pre-audit actions/ });
    await modal.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✅ Pre-audit Actions modal opened successfully');
    
    await page.screenshot({ 
      path: '/Users/jasonquaicoo/Documents/acccessflow-automation/accessFlow/test-e2e/mcp-output/06-modal-open.png', 
      fullPage: true 
    });
    
    console.log('9️⃣ Looking for X close button...');
    const closeButton = modal.getByLabel('Close');
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    console.log('✅ Close button found and visible');
    
    // Highlight the close button for MCP observation
    await closeButton.highlight();
    await page.waitForTimeout(2000);
    
    console.log('🔟 Clicking X button to close modal...');
    await closeButton.click();
    
    console.log('1️⃣1️⃣ Verifying modal is closed...');
    await modal.waitFor({ state: 'hidden', timeout: 10000 });
    console.log('✅ Modal closed successfully');
    
    await page.screenshot({ 
      path: '/Users/jasonquaicoo/Documents/acccessflow-automation/accessFlow/test-e2e/mcp-output/07-modal-closed-final.png', 
      fullPage: true 
    });
    
    console.log('');
    console.log('🎉 SUCCESS! Complete modal interaction flow completed:');
    console.log('   ✅ Site Settings Navigation');
    console.log('   ✅ Add Manually → Modal Open → X Close');
    console.log('📁 Screenshots saved to ./mcp-output/');
    console.log('🔍 MCP Server observed all interactions on localhost:3001');
    
  } catch (error) {
    console.error('❌ Error during interaction:', error.message);
    console.error('Stack:', error.stack);
    await page.screenshot({ 
      path: '/Users/jasonquaicoo/Documents/acccessflow-automation/accessFlow/test-e2e/mcp-output/error-state-post-staging.png', 
      fullPage: true 
    });
    throw error;
  } finally {
    await page.waitForTimeout(3000); // Keep page open for MCP observation
    await browser.close();
  }
}

// Run the script
main().catch(console.error);
