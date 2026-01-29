import { test, expect } from '@playwright/test';
import { BookFormPage } from '../pages/BookFormPage';

test.describe('Criação de Livro', () => {
  let bookFormPage: BookFormPage;

  test.beforeEach(async ({ page }) => {
    bookFormPage = new BookFormPage(page);
    // Simular estar na página de criação de livro após login
    // e preenchimento do formulário com dados inválidos ou tentativa de submissão quando o servidor está inacessível
  });

  test('TC001: Tentativa de criação de livro com dados inválidos', async ({ page }) => {
    await bookFormPage.submit();
    await expect(bookFormPage.getErrorText()).toContain('Erro ao criar livros');
  });

  test('TC002: Tentativa de criação de livro quando o servidor está inacessível', async ({ page }) => {
    await bookFormPage.submit();
    await expect(bookFormPage.getErrorText()).toContain('Erro ao criar livros');
  });
});