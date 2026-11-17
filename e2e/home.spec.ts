import { expect, test } from '@playwright/test';
import { mockApi } from './support/mock-api';

test('home page renders the heading', async ({ page }) => {
  await mockApi(page);
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('unknown route renders the not-found page', async ({ page }) => {
  await page.goto('/this-route-does-not-exist');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
