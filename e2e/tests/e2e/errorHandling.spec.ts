import { test, expect } from '@playwright/test';
import { HomePage } from '../../e2e/pages/HomePage';
import { BookFormPage } from '../../e2e/pages/BookFormPage';
import { mockApiError } from '../utils/helpers';

test.describe('Error Handling - Mensagens de Erro', () => {
  let homePage: HomePage;
  let bookFormPage: BookFormPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    bookFormPage = new BookFormPage(page);
  });

  test('TC001: Exibição de mensagem de erro ao falhar carregamento de livros', async ({ page }) => {
    // Arrange - Mock API para retornar erro no carregamento
    await page.route('**/api/books', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Server Error' })
      });
    });

    // Act - Acessar a aplicação
    await homePage.goto();
    
    // Aguardar tentativa de carregamento
    await page.waitForTimeout(1000);

    // Assert - Verificar se mensagem de erro específica é exibida
    await expect(homePage.errorMessage).toBeVisible();
    const errorText = await homePage.getErrorText();
    expect(errorText).toContain('Erro ao carregar livros - Revise seu PR');
  });

  test('TC002: Exibição de mensagem de erro ao falhar criação de livro', async ({ page }) => {
    // Arrange - Mock API de listagem funcionando
    await page.route('**/api/books', async route => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        });
      } else if (route.request().method() === 'POST') {
        // Mock API de criação com erro
        await route.fulfill({
          status: 400,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Bad Request' })
        });
      }
    });

    // Act - Carregar aplicação
    await homePage.goto();
    await homePage.waitForBooksLoad();
    
    // Acessar formulário de criação
    await homePage.addNewBook();
    
    // Preencher dados do novo livro
    await bookFormPage.fillForm('O Senhor dos Anéis', 'J.R.R. Tolkien', '1954', 'Fantasia');
    
    // Submeter formulário
    await bookFormPage.submit();
    
    // Aguardar processamento
    await page.waitForTimeout(1000);

    // Assert - Verificar mensagem de erro na criação
    const isErrorVisible = await bookFormPage.isFormErrorVisible();
    if (isErrorVisible) {
      const errorText = await bookFormPage.getFormErrorText();
      expect(errorText).toContain('Erro ao criar livros');
    } else {
      // Verificar se erro aparece na página principal
      await expect(homePage.errorMessage).toBeVisible();
      const errorText = await homePage.getErrorText();
      expect(errorText).toContain('Erro ao criar livros');
    }
  });

  test('TC001 - Variação: Verificar comportamento com diferentes status de erro na API', async ({ page }) => {
    // Test com status 404
    await page.route('**/api/books', async route => {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Not Found' })
      });
    });

    await homePage.goto();
    await page.waitForTimeout(1000);
    
    await expect(homePage.errorMessage).toBeVisible();
    const errorText = await homePage.getErrorText();
    expect(errorText).toContain('Erro ao carregar livros - Revise seu PR');
  });

  test('TC002 - Variação: Verificar erro em criação com timeout', async ({ page }) => {
    // Mock GET funcionando
    await page.route('**/api/books', async route => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([])
        });
      } else if (route.request().method() === 'POST') {
        // Simular timeout
        await page.waitForTimeout(5000);
        await route.fulfill({
          status: 408,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Request Timeout' })
        });
      }
    });

    await homePage.goto();
    await homePage.addNewBook();
    await bookFormPage.fillForm('Livro Teste', 'Autor Teste', '2023', 'Teste');
    await bookFormPage.submit();
    
    // Aguardar timeout e erro
    await page.waitForTimeout(6000);
    
    // Verificar mensagem de erro
    const errorVisible = await bookFormPage.isFormErrorVisible() || await homePage.isErrorVisible();
    expect(errorVisible).toBe(true);
  });
});