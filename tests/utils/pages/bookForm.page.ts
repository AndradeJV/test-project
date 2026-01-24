import { Page, Locator } from '@playwright/test';

export class BookFormPage {
	readonly page: Page;
	readonly titleInput: Locator;
	readonly authorInput: Locator;
	readonly yearInput: Locator;
	readonly genreInput: Locator;
	readonly saveButton: Locator;
	readonly errorMessages: Locator;

	constructor(page: Page) {
		this.page = page;
		this.titleInput = page.getByTestId('title-input');
		this.authorInput = page.getByTestId('author-input');
		this.yearInput = page.getByTestId('year-input');
		this.genreInput = page.getByTestId('genre-input');
		this.saveButton = page.getByRole('button', { name: 'Salvar' });
		this.errorMessages = page.getByTestId('error-messages');
	}

	async fillForm(title: string, author: string, year: string, genre: string) {
		await this.titleInput.fill(title);
		await this.authorInput.fill(author);
		await this.yearInput.fill(year);
		await this.genreInput.fill(genre);
	}

	async submit() {
		await this.saveButton.click();
	}

	async getErrorMessages() {
		return await this.errorMessages.innerText();
	}
}
