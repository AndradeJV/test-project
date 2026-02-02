import { Page, Route } from '@playwright/test';

/**
 * Mock API error responses for testing error handling
 */
export async function mockApiError(page: Page, endpoint: string, method: string = 'GET', status: number = 500) {
  await page.route(endpoint, async (route: Route) => {
    if (route.request().method() === method) {
      await route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Mocked error for testing' })
      });
    } else {
      await route.continue();
    }
  });
}

/**
 * Mock successful API responses
 */
export async function mockApiSuccess(page: Page, endpoint: string, data: any, method: string = 'GET') {
  await page.route(endpoint, async (route: Route) => {
    if (route.request().method() === method) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(data)
      });
    } else {
      await route.continue();
    }
  });
}

/**
 * Wait for network requests to complete
 */
export async function waitForNetworkIdle(page: Page, timeout = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Generate test book data
 */
export const testBookData = {
  valid: {
    title: 'O Senhor dos Anéis',
    author: 'J.R.R. Tolkien',
    year: '1954',
    genre: 'Fantasia'
  },
  invalid: {
    title: '',
    author: '',
    year: 'ano inválido',
    genre: ''
  }
};

/**
 * Error messages constants
 */
export const errorMessages = {
  loadBooks: 'Erro ao carregar livros - Revise seu PR',
  createBook: 'Erro ao criar livros',
  requiredTitle: 'Título é obrigatório',
  requiredAuthor: 'Autor é obrigatório',
  invalidYear: 'Ano é inválido'
};

/**
 * Wait for specific error message to appear
 */
export async function waitForErrorMessage(page: Page, expectedMessage: string, timeout = 5000) {
  await page.waitForFunction(
    (message) => {
      const errorElement = document.querySelector('[data-testid="error-message"]') || 
                          document.querySelector('[data-testid="form-error-message"]');
      return errorElement && errorElement.textContent?.includes(message);
    },
    expectedMessage,
    { timeout }
  );
}

/**
 * Simulate network delay for testing loading states
 */
export async function simulateNetworkDelay(page: Page, endpoint: string, delay: number = 2000) {
  await page.route(endpoint, async (route: Route) => {
    await page.waitForTimeout(delay);
    await route.continue();
  });
}