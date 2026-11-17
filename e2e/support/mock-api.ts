import type { Page } from '@playwright/test';
// Shares the fixtures with the Vitest/MSW layer so the two can't drift.
import { healthFixture } from '@Test/msw/handlers';

export const mockApi = async (page: Page) => {
  await page.route('**/api/health', (route) => route.fulfill({ json: healthFixture }));
};
