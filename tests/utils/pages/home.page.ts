import { Page, Locator } from '@playwright/test';

export class HomePage {
	readonly page: Page;
	readonly addBookButton: Locator;
	readonly bookList: Locator;
	readonly noBooksMessage: Locator;

	constructor(page: Page) {
		this.page = page;
		this.addBookButton = page.getByRole('button', { name: 'Adicionar Novo Livro' });
		this.bookList = page.getByTestId('book-list');
		this.noBooksMessage = page.getByText('Nenhum livro cadastrado. Adicione seu primeiro livro!');
	}

	async goto() {
		await this.page.goto('/');
	}

	async addNewBook() {
		await this.addBookButton.click();
	}

	async verifyNoBooksMessage() {
		await this.noBooksMessage.isVisible();
	}
}
