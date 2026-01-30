import { Page, Locator } from '@playwright/test';

export class BookFormPage {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly authorInput: Locator;
  readonly yearInput: Locator;
  readonly genreInput: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.getByTestId('title-input');
    this.authorInput = page.getByTestId('author-input');
    this.yearInput = page.getByTestId('year-input');
    this.genreInput = page.getByTestId('genre-input');
    this.submitButton = page.getByRole('button', { name: 'Salvar' });
    this.cancelButton = page.getByRole('button', { name: 'Cancelar' });
    this.errorMessages = page.getByTestId('error-message');
  }

  async fillForm(title: string, author: string, year: string, genre: string) {
    if (title) await this.titleInput.fill(title);
    if (author) await this.authorInput.fill(author);
    if (year) await this.yearInput.fill(year);
    if (genre) await this.genreInput.fill(genre);
  }

  async submit() {
    await this.submitButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async getErrorMessages(): Promise<string[]> {
    const errors = await this.errorMessages.allTextContents();
    return errors.filter(error => error.trim() !== '');
  }

  async clearForm() {
    await this.titleInput.clear();
    await this.authorInput.clear();
    await this.yearInput.clear();
    await this.genreInput.clear();
  }

  async isFormVisible(): Promise<boolean> {
    return await this.titleInput.isVisible();
  }
}