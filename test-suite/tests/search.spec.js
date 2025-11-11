const { test, expect } = require('@playwright/test');
const { AccessFlowSDK } = require('@acsbe/accessflow-sdk');

AccessFlowSDK.init({ apiKey: 'flow-1qS6Yt2KyK6fZaRMQJg0J7DdOmeIDKnw' });

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
    await sdk.audit();
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).or(
      page.locator('textbox').filter({ hasText: /search/i })
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await expect(searchInput).toHaveAttribute('placeholder', 'Search...');
  });

  test('should hide search input when drawer is closed', async ({ page }) => {
    // Find the drawer toggle button - look for button with chevron or menu icon
    const drawerToggle = page.locator('button').filter({ 
      has: page.locator('svg')
    }).first();
    
    // Wait for it to be visible
    await expect(drawerToggle).toBeVisible({ timeout: 5000 });
    await drawerToggle.click();
    
    // Wait for drawer animation to complete
    await page.waitForTimeout(500);
    
    // Search should not be visible when drawer is closed
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    );
    await expect(searchInput).not.toBeVisible({ timeout: 5000 });
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Check aria-label is present
    const ariaLabel = await searchInput.getAttribute('aria-label');
    expect(ariaLabel).toBe('Search');
    
    // Check placeholder is present
    await expect(searchInput).toHaveAttribute('placeholder', 'Search...');
  });

  test('should filter results as user types', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Type in the search input
    await searchInput.fill('keyboard');
    
    // Wait for dropdown to appear with results
    await page.waitForTimeout(800);
    
    // Check if dropdown is visible - look for any text containing "Keyboard" or "keyboard"
    const dropdown = page.locator('text=/keyboard/i').first();
    await expect(dropdown).toBeVisible({ timeout: 5000 });
  });

  test('should show dropdown with filtered results', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Type a search query
    await searchInput.fill('form');
    
    // Wait for dropdown animation and data to load
    await page.waitForTimeout(800);
    
    // Check if dropdown list is visible - based on MCP inspection, it's a list element
    const dropdownList = page.locator('[role="list"]').or(
      page.locator('ul').or(
        page.locator('.MuiList-root')
      )
    ).first();
    
    await expect(dropdownList).toBeVisible({ timeout: 5000 });
    
    // Check if results are displayed - based on MCP inspection, results are links
    const listItems = page.locator('a[href*="#"]').or(
      page.locator('[role="link"]')
    ).or(
      page.locator('li').or(
        page.locator('.MuiListItem-root')
      )
    );
    
    const count = await listItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display "No results found" when no matches', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Type a query that won't match anything
    await searchInput.fill('xyz123nonexistent');
    
    // Wait for dropdown to process
    await page.waitForTimeout(800);
    
    // Check for "No results found" message - case insensitive
    const noResults = page.locator('text=/no results found/i');
    await expect(noResults).toBeVisible({ timeout: 5000 });
  });

  test('should clear search when clear button is clicked', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Type in the search input
    await searchInput.fill('test');
    
    // Wait for clear button to appear
    await page.waitForTimeout(500);
    
    // Find the clear button - it should be a button with an SVG icon, typically the last button in the search bar
    const searchBar = searchInput.locator('..').locator('..');
    const clearButton = searchBar.locator('button').last();
    
    // Wait for clear button to be visible
    await expect(clearButton).toBeVisible({ timeout: 5000 });
    await clearButton.click();
    
    // Verify search input is cleared
    await expect(searchInput).toHaveValue('', { timeout: 5000 });
    
    // Verify dropdown is hidden
    await page.waitForTimeout(500);
    const dropdown = page.locator('ul').or(
      page.locator('.MuiList-root')
    ).first();
    
    // Dropdown might still be in DOM but hidden, so check visibility
    const isVisible = await dropdown.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
  });

  test('should navigate to rule page when result is clicked', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Type in the search input
    await searchInput.fill('keyboard');
    
    // Wait for dropdown with results
    await page.waitForTimeout(800);
    
    // Click on the first result - based on MCP inspection, results are links
    const firstResult = page.locator('a[href*="#"]').or(
      page.locator('[role="link"]')
    ).or(
      page.locator('li').or(
        page.locator('.MuiListItem-root')
      )
    ).first();
    
    await expect(firstResult).toBeVisible({ timeout: 5000 });
    
    // Get the current URL before clicking
    const initialUrl = page.url();
    
    // Click on the first result
    await firstResult.click();
    
    // Wait for navigation - URL should change
    await page.waitForTimeout(1000);
    
    // Verify URL changed (should navigate to a rule page)
    const currentUrl = page.url();
    expect(currentUrl).not.toBe(initialUrl);
    expect(currentUrl).toContain('#');
  });

  test('should support keyboard navigation', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Focus on search input
    await searchInput.focus();
    
    // Type a search query
    await searchInput.fill('form');
    
    // Wait for dropdown with results
    await page.waitForTimeout(800);
    
    // Press ArrowDown to navigate through results
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);
    
    // Press Enter to select
    const initialUrl = page.url();
    await page.keyboard.press('Enter');
    
    // Wait for navigation
    await page.waitForTimeout(1000);
    
    // Verify navigation occurred
    const currentUrl = page.url();
    expect(currentUrl).not.toBe(initialUrl);
    expect(currentUrl).toContain('#');
  });

  test('should show search icon', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Material-UI icons might not have data-testid, so check for SVG near search input
    // Navigate up to find the search bar container
    const searchBar = searchInput.locator('..').locator('..');
    const icon = searchBar.locator('svg').first();
    await expect(icon).toBeVisible({ timeout: 5000 });
  });

  test('should filter results case-insensitively', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Test uppercase
    await searchInput.fill('KEYBOARD');
    await page.waitForTimeout(800);
    
    // Based on MCP inspection, results are links
    const resultsUpper = page.locator('a[href*="#"]').or(
      page.locator('[role="link"]')
    ).or(
      page.locator('li').or(
        page.locator('.MuiListItem-root')
      )
    );
    const countUpper = await resultsUpper.count();
    
    // Clear and test lowercase
    await searchInput.clear();
    await page.waitForTimeout(300);
    await searchInput.fill('keyboard');
    await page.waitForTimeout(800);
    
    const resultsLower = page.locator('a[href*="#"]').or(
      page.locator('[role="link"]')
    ).or(
      page.locator('li').or(
        page.locator('.MuiListItem-root')
      )
    );
    const countLower = await resultsLower.count();
    
    // Results should be the same regardless of case
    expect(countUpper).toBe(countLower);
  });

  test('should update dropdown as user types', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Type one character
    await searchInput.fill('k');
    await page.waitForTimeout(800);
    
    // Based on MCP inspection, results are links
    const results1 = page.locator('a[href*="#"]').or(
      page.locator('[role="link"]')
    ).or(
      page.locator('li').or(
        page.locator('.MuiListItem-root')
      )
    );
    const count1 = await results1.count();
    
    // Add more characters
    await searchInput.fill('ke');
    await page.waitForTimeout(800);
    
    const results2 = page.locator('a[href*="#"]').or(
      page.locator('[role="link"]')
    ).or(
      page.locator('li').or(
        page.locator('.MuiListItem-root')
      )
    );
    const count2 = await results2.count();
    
    // Results should change as user types
    // (count2 should be less than or equal to count1)
    expect(count2).toBeLessThanOrEqual(count1);
  });

  test('should handle empty search query', async ({ page }) => {
    const searchInput = page.locator('input[aria-label="Search"]').or(
      page.locator('input[placeholder="Search..."]')
    ).first();
    
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    
    // Type something
    await searchInput.fill('test');
    await page.waitForTimeout(500);
    
    // Clear it
    await searchInput.clear();
    await page.waitForTimeout(500);
    
    // Dropdown should be hidden when empty
    const dropdown = page.locator('ul').or(
      page.locator('.MuiList-root')
    ).first();
    
    // Check if dropdown is not visible
    const isVisible = await dropdown.isVisible().catch(() => false);
    expect(isVisible).toBe(false);
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

