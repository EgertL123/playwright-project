import { test, expect } from '@playwright/test';

test('Apple homepage loads properly', async ({ page }) => {
    await page.goto('https://www.apple.com/');
    await expect(page).toHaveTitle(/Apple/i);
    await expect(page.getByRole('main')).toBeVisible();
});

test('Navigate to iPhone', async ({ page }) => {
    await page.goto('https://www.apple.com/');
    await page.getByRole('link', { name: /^iPhone$/ }).first().click();
    await expect(page).toHaveURL(/apple\.com\/.*iphone/i);
});

test('Navigate to Mac', async ({ page }) => {
    await page.goto('https://www.apple.com/', { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: /^Mac$/ }).first().click();
    await expect(page).toHaveURL(/apple\.com\/.*mac/i);
    // Basic content presence on the Mac page
    await expect(page.locator('body *').first()).toBeVisible();
});