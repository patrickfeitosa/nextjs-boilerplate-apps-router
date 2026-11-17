import { HttpResponse, http } from 'msw';
import type { Health } from '@Schemas/health';

// Fixtures are plain data so Playwright can reuse them (see e2e/support/mock-api.ts).
export const healthFixture: Health = { status: 'ok' };

export const handlers = [http.get('*/api/health', () => HttpResponse.json(healthFixture))];
