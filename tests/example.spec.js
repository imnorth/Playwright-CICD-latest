const { test, expect } = require('@playwright/test');

test.describe('Playwright docs homepage', () => {
  test('has title and get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle(/Playwright/);

    const getStarted = page.getByRole('link', { name: 'Get started' });
    await expect(getStarted).toBeVisible();

    await getStarted.click();

    await expect(page).toHaveURL(/.*docs\/intro/);
  });
});

