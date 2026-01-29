import { Page } from '@playwright/test';

export async function waitForNetworkIdle(page: Page, timeout = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

export function generateRandomEmail(): string {
  return `test-${Date.now()}@example.com`;
}

export const testData = {
  validUser: {
    email: 'test@example.com',
    password: 'Test123!',
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrong',
  },
};
