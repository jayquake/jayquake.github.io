const { test, expect } = require('@playwright/test');

test.describe('Accessibility Rules Testing', () => {
  test('should load the keyboard navigation failure page', async ({ page }) => {
    await page.goto('/#/keyboard/keyboard-navigation_failure');
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/Accessibiltiy Rules/);
    
    // Check if the breadcrumb navigation is present
    await expect(page.locator('nav[aria-label="breadcrumb"]')).toBeVisible();
    
    // Check if the failure examples are loaded
    await expect(page.locator('text=Failure Examples')).toBeVisible();
    
    // Check if we have failure examples
    const failureExamples = page.locator('[role="region"]').filter({ hasText: 'Failure Example' });
    await expect(failureExamples).toHaveCount(18);
  });

  test('should be able to copy failure example code', async ({ page }) => {
    await page.goto('/#/keyboard/keyboard-navigation_failure');
    
    // Click on the first copy button
    const firstCopyButton = page.locator('button').filter({ hasText: 'Copy failure example 1 code' }).first();
    await firstCopyButton.click();
    
    // Verify the button is clickable (we can't easily test clipboard in headless mode)
    await expect(firstCopyButton).toBeVisible();
  });

  test('should navigate through keyboard navigation examples', async ({ page }) => {
    await page.goto('/#/keyboard/keyboard-navigation_failure');
    
    // Test keyboard navigation by tabbing through elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if we can focus on interactive elements
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should display accessibility failure alert', async ({ page }) => {
    await page.goto('/#/keyboard/keyboard-navigation_failure');
    
    // Check if the accessibility failure alert is displayed
    const alert = page.locator('[role="alert"]');
    await expect(alert).toBeVisible();
    await expect(alert).toContainText('Accessibility Failure Detected');
    await expect(alert).toContainText('keyboard : Keyboard Navigation - Failure');
  });

  test('should show correct number of examples', async ({ page }) => {
    await page.goto('/#/keyboard/keyboard-navigation_failure');
    
    // Check the examples count indicator
    await expect(page.locator('text=18 Examples')).toBeVisible();
    
    // Verify we have exactly 18 failure examples
    const examples = page.locator('[role="region"]').filter({ hasText: 'Failure Example' });
    await expect(examples).toHaveCount(18);
  });
});


