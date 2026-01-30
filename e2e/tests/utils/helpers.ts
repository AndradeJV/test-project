import { Page } from '@playwright/test';

/**
 * Aguarda até que não haja atividade de rede por um período especificado
 */
export async function waitForNetworkIdle(page: Page, timeout = 5000) {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Aguarda um elemento aparecer na tela
 */
export async function waitForElement(page: Page, selector: string, timeout = 10000) {
  await page.waitForSelector(selector, { timeout });
}

/**
 * Gera dados de teste para livros
 */
export const testBookData = {
  validBook: {
    title: 'O Cortiço',
    author: 'Aluísio Azevedo',
    year: '1890',
    genre: 'Naturalismo'
  },
  anotherValidBook: {
    title: 'Iracema',
    author: 'José de Alencar',
    year: '1865',
    genre: 'Romance'
  },
  invalidBook: {
    title: '',
    author: '',
    year: 'ano inválido',
    genre: ''
  }
};

/**
 * Simula delay para testes que precisam aguardar
 */
export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Intercepta requests para simular erros de API
 */
export async function mockApiError(page: Page, url: string, errorMessage: string) {
  await page.route(url, route => {
    route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ error: errorMessage })
    });
  });
}

/**
 * Remove todos os mocks de uma página
 */
export async function clearAllMocks(page: Page) {
  await page.unrouteAll();
}