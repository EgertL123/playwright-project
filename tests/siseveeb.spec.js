const { test, expect } = require('@playwright/test');

test('VS24 tunniplaani screenshot', async ({ page }) => {
    await page.goto('https://siseveeb.voco.ee/veebivormid/tunniplaan', { waitUntil: 'domcontentloaded' });
    await page.getByRole('link', { name: 'VS24' }).click();
    await expect(page.locator(".chosen-single").getByText("VS24")).toBeVisible();
    await page.screenshot({ path: "vs24.png", fullPage: true });
});

test("Timo Puistaja tunniplaan", async ({ page }) => {
    await page.goto('https://siseveeb.voco.ee/veebivormid/tunniplaan');

    await page.waitForTimeout(1000);

    await page.locator("#ui-id-2").click();

    await page.waitForTimeout(1000);

    await page.screenshot({ path: "timo_puistaja.png", fullPage: true });

    await page.getByRole("link", { name: "Puistaja, Timo" }).click();

    await page.waitForTimeout(2000);

    await page.screenshot({ path: "timo_puistaja.png", fullPage: true });
});

test("Tunniplaani performance test", async ({ page }) => {
    const start = performance.now();
    await page.goto('https://siseveeb.voco.ee/');
    const end = performance.now();
    const loadTime = end - start;
    console.log(`Page load time: ${loadTime} ms`);
    expect(loadTime).toBeLessThan(3000);
});

test("Wrong account test", async ({ page }) => {
    await page.goto('https://siseveeb.voco.ee/');
    await page.getByRole('textbox', { name: 'Kasutajatunnus' }).fill("test123");
    await page.getByRole('textbox', { name: 'Parool' }).fill("qwerty");
    await page.getByRole('button', { name: 'Sisene' }).click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: "wrong_account.png", fullPage: true });
});