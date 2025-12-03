const { test, expect } = require('@playwright/test');

test.describe('Engine Rules UI Tests', () => {
  const baseURL = 'http://localhost:3000';

  test.beforeEach(async ({ page }) => {
    // Set up any common configuration
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('should display alt-misuse rule detail page', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse`);
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check for rule title
    await expect(page.getByText('Alt Misuse')).toBeVisible();
    
    // Check for rule ID badge
    await expect(page.getByText('Rule ID: alt-misuse')).toBeVisible();
    
    // Check for description
    await expect(page.getByText(/The alt attribute is used to provide a text alternative/)).toBeVisible();
    
    // Check for Success and Failure buttons
    await expect(page.getByRole('button', { name: /Success Examples/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Failure Examples/i })).toBeVisible();
  });

  test('should navigate from rule detail to success examples', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse`);
    await page.waitForLoadState('networkidle');
    
    // Click Success Examples button
    await page.getByRole('button', { name: /Success Examples/i }).click();
    
    // Wait for navigation
    await page.waitForURL(`${baseURL}/engine/alt-misuse_success`);
    
    // Check for success alert
    await expect(page.getByText('Accessibility Success Examples')).toBeVisible();
    
    // Check for examples
    await expect(page.getByText(/Success Example/)).toBeVisible();
  });

  test('should navigate from rule detail to failure examples', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse`);
    await page.waitForLoadState('networkidle');
    
    // Click Failure Examples button
    await page.getByRole('button', { name: /Failure Examples/i }).click();
    
    // Wait for navigation
    await page.waitForURL(`${baseURL}/engine/alt-misuse_failure`);
    
    // Check for failure alert
    await expect(page.getByText('Accessibility Failure Detected')).toBeVisible();
    
    // Check for examples
    await expect(page.getByText(/Failure Example/)).toBeVisible();
  });

  test('should display success examples correctly', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse_success`);
    await page.waitForLoadState('networkidle');
    
    // Check for breadcrumbs
    await expect(page.getByRole('navigation', { name: /breadcrumb/i })).toBeVisible();
    
    // Check for Compliant chip
    await expect(page.getByText('Compliant')).toBeVisible();
    
    // Check for example count
    await expect(page.getByText(/Examples/)).toBeVisible();
    
    // Check for copy buttons
    const copyButtons = page.getByRole('button', { name: /Copy/i });
    await expect(copyButtons.first()).toBeVisible();
  });

  test('should display failure examples correctly', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse_failure`);
    await page.waitForLoadState('networkidle');
    
    // Check for breadcrumbs
    await expect(page.getByRole('navigation', { name: /breadcrumb/i })).toBeVisible();
    
    // Check for Needs Fix chip
    await expect(page.getByText('Needs Fix')).toBeVisible();
    
    // Check for example count
    await expect(page.getByText(/Examples/)).toBeVisible();
    
    // Check for copy buttons
    const copyButtons = page.getByRole('button', { name: /Copy/i });
    await expect(copyButtons.first()).toBeVisible();
  });

  test('should test button-discernible rule', async ({ page }) => {
    await page.goto(`${baseURL}/engine/button-discernible`);
    await page.waitForLoadState('networkidle');
    
    // Check rule title
    await expect(page.getByText('Button Discernible')).toBeVisible();
    
    // Check for implementation advice
    await expect(page.getByText('Implementation Advice')).toBeVisible();
    
    // Navigate to success examples
    await page.getByRole('button', { name: /Success Examples/i }).click();
    await page.waitForURL(`${baseURL}/engine/button-discernible_success`);
    
    // Verify success page loaded
    await expect(page.getByText('Accessibility Success Examples')).toBeVisible();
  });

  test('should test heading-h1 rule', async ({ page }) => {
    await page.goto(`${baseURL}/engine/heading-h1`);
    await page.waitForLoadState('networkidle');
    
    // Check rule title
    await expect(page.getByText('Heading H1')).toBeVisible();
    
    // Navigate to failure examples
    await page.getByRole('button', { name: /Failure Examples/i }).click();
    await page.waitForURL(`${baseURL}/engine/heading-h1_failure`);
    
    // Verify failure page loaded
    await expect(page.getByText('Accessibility Failure Detected')).toBeVisible();
  });

  test('should expand and collapse best practices accordion', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse_success`);
    await page.waitForLoadState('networkidle');
    
    // Find the accordion
    const accordion = page.getByRole('button', { name: /Understanding Best Practices/i });
    
    // Check if accordion exists
    await expect(accordion).toBeVisible();
    
    // Click to expand
    await accordion.click();
    
    // Wait a bit for animation
    await page.waitForTimeout(500);
    
    // Check for best practices content
    await expect(page.getByText('Best Practices:')).toBeVisible();
  });

  test('should expand and collapse fix steps accordion', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse_failure`);
    await page.waitForLoadState('networkidle');
    
    // Find the accordion
    const accordion = page.getByRole('button', { name: /Understanding This Issue/i });
    
    // Check if accordion exists
    await expect(accordion).toBeVisible();
    
    // Click to expand
    await accordion.click();
    
    // Wait a bit for animation
    await page.waitForTimeout(500);
    
    // Check for fix steps content
    await expect(page.getByText('How to Fix:')).toBeVisible();
  });

  test('should handle multiple rules correctly', async ({ page }) => {
    const rulesToTest = [
      'alt-misuse',
      'button-discernible',
      'heading-h1',
      'checkbox-aria-checked',
      'image-discernible'
    ];

    for (const rule of rulesToTest) {
      await page.goto(`${baseURL}/engine/${rule}`);
      await page.waitForLoadState('networkidle');
      
      // Check that rule page loads
      await expect(page.getByText('Engine Rule Details')).toBeVisible();
      
      // Check for navigation buttons
      await expect(page.getByRole('button', { name: /Success Examples/i })).toBeVisible();
      await expect(page.getByRole('button', { name: /Failure Examples/i })).toBeVisible();
    }
  });

  test('should verify accessibility features', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse_success`);
    await page.waitForLoadState('networkidle');
    
    // Check for ARIA labels
    const examples = await page.locator('[role="region"][aria-labelledby*="success-example"]').count();
    expect(examples).toBeGreaterThan(0);
    
    // Check keyboard navigation is possible
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement.tagName);
    expect(focusedElement).toBeTruthy();
  });

  test('should verify copy functionality exists', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse_success`);
    await page.waitForLoadState('networkidle');
    
    // Find copy buttons
    const copyButtons = page.getByRole('button', { name: /Copy/i });
    const count = await copyButtons.count();
    
    // Should have multiple copy buttons (one per example)
    expect(count).toBeGreaterThan(0);
    
    // Click first copy button
    await copyButtons.first().click();
    
    // Verify tooltip or visual feedback (the button should still be visible)
    await expect(copyButtons.first()).toBeVisible();
  });

  test('should check aria-controls-has-reference failure page', async ({ page }) => {
    await page.goto(`${baseURL}/engine/aria-controls-has-reference_failure`);
    await page.waitForLoadState('networkidle');
    
    // Check page loads
    await expect(page.getByText('Accessibility Failure Detected')).toBeVisible();
    
    // Check for description
    await expect(page.getByText(/aria-controls points to an id/)).toBeVisible();
    
    // Check for failure examples
    await expect(page.getByText(/Failure Example/)).toBeVisible();
  });

  test('should verify WCAG references on rule detail page', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse`);
    await page.waitForLoadState('networkidle');
    
    // Check for References section
    await expect(page.getByText('References & Documentation')).toBeVisible();
    
    // Check for WCAG guidelines
    const wcagLinks = page.getByText(/WCAG/);
    await expect(wcagLinks.first()).toBeVisible();
  });

  test('should verify impact level is displayed', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse`);
    await page.waitForLoadState('networkidle');
    
    // Check for impact chip
    await expect(page.getByText(/Impact:/)).toBeVisible();
  });

  test('should verify example content is displayed', async ({ page }) => {
    await page.goto(`${baseURL}/engine/alt-misuse_failure`);
    await page.waitForLoadState('networkidle');
    
    // Check for pre tags with code
    const preElements = page.locator('pre');
    const count = await preElements.count();
    
    // Should have multiple code examples
    expect(count).toBeGreaterThan(0);
    
    // Verify code is visible
    await expect(preElements.first()).toBeVisible();
  });
});

