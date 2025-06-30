/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';

test('ダッシュボード画面上のVRT', async ({ page }) => {
  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');
  // Click [placeholder="your\@email\.com"]
  await page.locator('[placeholder="your\\@email\\.com"]').click();
  // Fill [placeholder="your\@email\.com"]
  await page
    .locator('[placeholder="your\\@email\\.com"]')
    .fill('test@hogehoge.com');
  // Press Tab
  await page.locator('[placeholder="your\\@email\\.com"]').press('Tab');
  // Fill [placeholder="Password"]
  await page.locator('[placeholder="Password"]').fill('hogefuga');
  // Click text=Log In
  await page.locator('text=Log In').click();
  // Expect
  await expect(page).toHaveURL(
    'http://localhost:3000/dashboard/authentication/user'
  );
  // Visual Regression Testの実行
  expect(await page.screenshot()).toMatchSnapshot(
    'screenshot.png',
    // 'e2e/expected-screenshots/screenshot-fail.png', // 失敗させたい時に利用
    { threshold: 0.08 } // Diffがあった場合の許容度を設定
  );
});
