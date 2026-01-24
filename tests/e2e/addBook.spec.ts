import { test, expect } from '@playwright/test';
import { HomePage } from '../utils/pages/home.page';
import { BookFormPage } from '../utils/pages/bookForm.page';

test.describe('Gerenciamento de Livros', () => {
	test('SC001: Adicionar um novo livro com dados válidos', async ({ page }) => {
		const homePage = new HomePage(page);
		const bookFormPage = new BookFormPage(page);
		await homePage.goto();
		await homePage.addNewBook();
		await bookFormPage.fillForm('O Senhor dos Anéis', 'J.R.R. Tolkien', '1954', 'Fantasia');
		await bookFormPage.submit();
		await expect(homePage.bookList).toContainText('O Senhor dos Anéis');
	});

	test('SC002: Editar um livro existente', async ({ page }) => {
		const homePage = new HomePage(page);
		const bookFormPage = new BookFormPage(page);
		await homePage.goto();
		await homePage.addNewBook();
		await bookFormPage.fillForm('O Hobbit', 'J.R.R. Tolkien', '1937', 'Fantasia');
		await bookFormPage.submit();
		await expect(homePage.bookList).toContainText('O Hobbit');
		// Editar o livro
		await homePage.addNewBook();
		await bookFormPage.fillForm('O Hobbit', 'J.R.R. Tolkien', '1938', 'Fantasia');
		await bookFormPage.submit();
		await expect(homePage.bookList).toContainText('O Hobbit');
	});

	test('SC003: Excluir um livro', async ({ page }) => {
		const homePage = new HomePage(page);
		await homePage.goto();
		await homePage.addNewBook();
		// Excluir o livro
		await page.getByRole('button', { name: 'Excluir' }).click();
		await page.getByRole('button', { name: 'Confirmar' }).click();
		await expect(homePage.bookList).not.toContainText('O Hobbit');
	});

	test('SC004: Verificar estado de carregamento ao buscar livros', async ({ page }) => {
		const homePage = new HomePage(page);
		await homePage.goto();
		// Simular carregamento
		await expect(page.getByTestId('loading-indicator')).toBeVisible();
		await expect(homePage.bookList).toBeVisible();
	});

	test('SC005: Validar campos obrigatórios no formulário de livro', async ({ page }) => {
		const homePage = new HomePage(page);
		const bookFormPage = new BookFormPage(page);
		await homePage.goto();
		await homePage.addNewBook();
		await bookFormPage.fillForm('', '', '', '');
		await bookFormPage.submit();
		const errorMessages = await bookFormPage.getErrorMessages();
		expect(errorMessages).toContain('Título é obrigatório');
		expect(errorMessages).toContain('Autor é obrigatório');
	});

	test('SC006: Adicionar livro com ano inválido', async ({ page }) => {
		const homePage = new HomePage(page);
		const bookFormPage = new BookFormPage(page);
		await homePage.goto();
		await homePage.addNewBook();
		await bookFormPage.fillForm('O Senhor dos Anéis', 'J.R.R. Tolkien', 'ano inválido', 'Fantasia');
		await bookFormPage.submit();
		const errorMessages = await bookFormPage.getErrorMessages();
		expect(errorMessages).toContain('Ano é inválido');
	});

	test('SC007: Exibir mensagem quando não há livros cadastrados', async ({ page }) => {
		const homePage = new HomePage(page);
		await homePage.goto();
		await homePage.verifyNoBooksMessage();
	});

	test('SC008: Verificar erro ao tentar adicionar livro com título em branco', async ({ page }) => {
		const homePage = new HomePage(page);
		const bookFormPage = new BookFormPage(page);
		await homePage.goto();
		await homePage.addNewBook();
		await bookFormPage.fillForm('', 'Autor', '2021', 'Ficção');
		await bookFormPage.submit();
		const errorMessages = await bookFormPage.getErrorMessages();
		expect(errorMessages).toContain('Título é obrigatório');
	});
});
