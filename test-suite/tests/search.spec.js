import { AccessFlowSDK } from '@acsbe/accessflow-sdk';

import { test, expect } from '@playwright/test';
// Initialize AccessFlow SDK with API key from environment variable or fallback
AccessFlowSDK.init({ apiKey: 'flow-1lXjXhCBlPhX5aRR9eA0g1uFx0YiRTvE' });

test.describe('Search Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto('/');
    // Wait for the page to load and data to be fetched
    await page.waitForLoadState('networkidle');
    // Wait a bit more for React to render
    await page.waitForTimeout(500);
  });

  test('should display search input when drawer is open', async ({ page }) => {
    // Verify drawer is open by default (search should be visible)
    // Try multiple selectors to find the search input
    const sdk = new AccessFlowSDK(page);
    
    const report = await sdk.audit();
    const r = sdk.generateReport(report);
    console.log(r);
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).or(
      page.locator('textbox').filter({ hasText: /search/i })
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await expect(searchInput).toHaveAttribute('placeholder', 'Search...');
  });


  test('should display result details in dropdown', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Type in the search input
    await searchInput.fill('keyboard');
    
    // Wait for dropdown with results
    await page.waitForTimeout(800);
    
    // Check if result items contain expected information
    // Based on MCP inspection, results are links
    const firstResult = page.locator('a[href*="#"]').or(
      page.locator('[role="link"]')
    ).or(
      page.locator('li').or(
        page.locator('.MuiListItem-root')
      )
    ).first();
    
    await expect(firstResult).toBeVisible({ timeout: 5000 });
    
    // Results should have text content
    const text = await firstResult.textContent();
    expect(text).toBeTruthy();
    expect(text.trim().length).toBeGreaterThan(0);
  });
});

