import { test, expect } from '@playwright/test';
import { loadPage } from './helpers';

// ============================================================
// Share Feature — File Mode (share button visible)
// ============================================================
test.describe('Share — File Mode', () => {
  test('share button is visible in file mode', async ({ page }) => {
    await loadPage(page);

    const shareBtn = page.locator('#shareBtn');
    await expect(shareBtn).toBeVisible();
    await expect(shareBtn).toHaveText('Share');
  });

  test('share button is enabled and clickable', async ({ page }) => {
    await loadPage(page);

    const shareBtn = page.locator('#shareBtn');
    await expect(shareBtn).toBeEnabled();
  });

  test('no share-related toasts are shown on initial load', async ({ page }) => {
    await loadPage(page);

    const shareToast = page.locator('#toast-share');
    await expect(shareToast).toHaveCount(0);
  });
});
