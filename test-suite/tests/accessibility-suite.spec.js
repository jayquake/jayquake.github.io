const { test, expect } = require('@playwright/test');

test.describe('Accessibility Testing Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto('/');
  });

  test('should have proper page structure and navigation', async ({ page }) => {
    // Check main navigation elements
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    
    // Check if sidebar navigation is present
    await expect(page.locator('text=QA Dashboard')).toBeVisible();
    await expect(page.locator('text=Graphics')).toBeVisible();
    await expect(page.locator('text=Forms')).toBeVisible();
    await expect(page.locator('text=Keyboard')).toBeVisible();
  });

  test('should navigate to keyboard section', async ({ page }) => {
    // Click on Keyboard navigation link
    await page.click('text=10 Keyboard');
    
    // Should navigate to keyboard section
    await expect(page).toHaveURL(/#\/keyboard/);
    await expect(page.locator('text=Keyboard')).toBeVisible();
  });

  test('should navigate to keyboard navigation failure page', async ({ page }) => {
    // Navigate to keyboard section first
    await page.click('text=10 Keyboard');
    await page.waitForURL(/#\/keyboard/);
    
    // Navigate to keyboard navigation failure
    await page.goto('/#/keyboard/keyboard-navigation_failure');
    
    // Verify we're on the correct page
    await expect(page).toHaveURL(/#\/keyboard\/keyboard-navigation_failure/);
    await expect(page.locator('text=Keyboard Navigation')).toBeVisible();
    await expect(page.locator('text=Failure Examples')).toBeVisible();
  });

  test('should test keyboard navigation functionality', async ({ page }) => {
    await page.goto('/#/keyboard/keyboard-navigation_failure');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Test arrow key navigation
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowUp');
    
    // Test Enter key on focused elements
    await page.keyboard.press('Enter');
  });

  test('should verify accessibility attributes', async ({ page }) => {
    await page.goto('/#/keyboard/keyboard-navigation_failure');
    
    // Check for proper ARIA labels
    const breadcrumb = page.locator('nav[aria-label="breadcrumb"]');
    await expect(breadcrumb).toBeVisible();
    
    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toBeVisible();
    
    // Check for proper button roles
    const buttons = page.locator('button');
    await expect(buttons.first()).toBeVisible();
  });

  test('should test responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/#/keyboard/keyboard-navigation_failure');
    
    // Check if content is still accessible on mobile
    await expect(page.locator('text=Failure Examples')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('text=Failure Examples')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('text=Failure Examples')).toBeVisible();
  });

  test('should test form interactions', async ({ page }) => {
    await page.goto('/#/keyboard/keyboard-navigation_failure');
    
    // Look for any form elements and test them
    const searchBox = page.locator('input[type="text"], textbox');
    if (await searchBox.count() > 0) {
      await searchBox.first().fill('test search');
      await expect(searchBox.first()).toHaveValue('test search');
    }
  });

  test('should test error handling and alerts', async ({ page }) => {
    await page.goto('/#/keyboard/keyboard-navigation_failure');
    
    // Check for accessibility failure alerts
    const alert = page.locator('[role="alert"]');
    await expect(alert).toBeVisible();
    
    // Verify alert content
    await expect(alert).toContainText('Accessibility Failure Detected');
  });
});


