/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect } from '@playwright/test';

test('ログイン処理のE2Eテスト', async ({ page }) => {
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
  await expect(page).toHaveTitle('ダッシュボード');
});
