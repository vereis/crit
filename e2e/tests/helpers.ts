import { expect, type Page, type APIRequestContext } from '@playwright/test';

// Clear all comments across all files via the bulk DELETE endpoint.
export async function clearAllComments(request: APIRequestContext) {
  await request.delete('/api/comments');
}

// Navigate to the root page and wait for loading to complete.
export async function loadPage(page: Page) {
  await page.goto('/');
  await expect(page.locator('.loading')).toBeHidden({ timeout: 10_000 });
}

// Scope selectors to the plan.md file section.
export function mdSection(page: Page) {
  return page.locator('.file-section').filter({ hasText: 'plan.md' });
}

// Scope selectors to the server.go file section.
export function goSection(page: Page) {
  return page.locator('#file-section-server\\.go');
}

// Scope selectors to the handler.js file section.
export function jsSection(page: Page) {
  return page.locator('#file-section-handler\\.js');
}

// In git mode, markdown defaults to diff view. Click the Document toggle to switch.
export async function switchToDocumentView(page: Page) {
  const section = mdSection(page);
  await expect(section).toBeVisible();
  const docBtn = section.locator('.file-header-toggle .toggle-btn[data-mode="document"]');
  await expect(docBtn).toBeVisible();
  await docBtn.click();
  await expect(section.locator('.document-wrapper')).toBeVisible();
}

// Perform a mouse drag between two elements (for gutter range selection).
export async function dragBetween(page: Page, startEl: ReturnType<Page['locator']>, endEl: ReturnType<Page['locator']>) {
  const startBox = await startEl.boundingBox();
  const endBox = await endEl.boundingBox();

  expect(startBox).toBeTruthy();
  expect(endBox).toBeTruthy();

  if (startBox && endBox) {
    await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2, { steps: 5 });
    await page.mouse.up();
  }
}

// Click body at (0,0) to clear any focused element.
export async function clearFocus(page: Page) {
  await page.locator('body').click({ position: { x: 0, y: 0 } });
}
