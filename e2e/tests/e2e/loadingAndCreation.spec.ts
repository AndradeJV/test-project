import { test, expect } from '@playwright/test';
import { HomePage } from '../../e2e/pages/HomePage';
import { BookFormPage } from '../../e2e/pages/BookFormPage';
import { waitForNetworkIdle } from '../utils/helpers';

test.describe('Carregamento e Criação de Livros', () => {
  let homePage: HomePage;
  let bookFormPage: BookFormPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    bookFormPage = new BookFormPage(page);
  });

  test('TC004: Carregamento bem-sucedido não afetado', async ({ page }) => {
    // Arrange
    await homePage.goto();
    
    // Act
    await waitForNetworkIdle(page);
    
    // Assert
    await expect(homePage.bookList).toBeVisible();
    
    // Verificar que não há mensagem de erro exibida
    const errorText = await homePage.getErrorText();
    expect(errorText).toBe('');
    
    // Verificar que o indicador de carregamento não está mais visível
    await expect(homePage.loadingIndicator).toBeHidden();
    
    // Verificar que a lista de livros está carregada (pode estar vazia ou com livros)
    const isBooksListVisible = await homePage.isBooksListVisible();
    expect(isBooksListVisible).toBe(true);
  });

  test('TC005: Criação bem-sucedida não afetada', async ({ page }) => {
    // Arrange
    const bookData = {
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      year: '1899',
      genre: 'Romance'
    };
    
    await homePage.goto();
    await waitForNetworkIdle(page);
    
    const initialBookCount = await homePage.getBookCount();
    
    // Act
    await homePage.addNewBook();
    await expect(bookFormPage.titleInput).toBeVisible();
    
    await bookFormPage.fillForm(
      bookData.title,
      bookData.author,
      bookData.year,
      bookData.genre
    );
    
    await bookFormPage.submit();
    await waitForNetworkIdle(page);
    
    // Assert
    // Verificar que o livro foi criado com sucesso
    await expect(homePage.bookList).toContainText(bookData.title);
    await expect(homePage.bookList).toContainText(bookData.author);
    
    // Verificar que a lista foi atualizada com o novo livro
    const finalBookCount = await homePage.getBookCount();
    expect(finalBookCount).toBe(initialBookCount + 1);
    
    // Verificar que não há mensagem de erro
    const errorText = await homePage.getErrorText();
    expect(errorText).toBe('');
    
    // Verificar que o formulário foi fechado após criação bem-sucedida
    const isFormVisible = await bookFormPage.isFormVisible();
    expect(isFormVisible).toBe(false);
  });
});