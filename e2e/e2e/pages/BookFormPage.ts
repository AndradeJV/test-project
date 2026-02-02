import { Page, Locator } from '@playwright/test';

export class BookFormPage {
  readonly page: Page;
  
  // Locators
  readonly titleInput: Locator;
  readonly authorInput: Locator;
  readonly yearInput: Locator;
  readonly genreInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly formErrorMessages: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.getByTestId('title-input');
    this.authorInput = page.getByTestId('author-input');
    this.yearInput = page.getByTestId('year-input');
    this.genreInput = page.getByTestId('genre-input');
    this.submitButton = page.getByRole('button', { name: 'Salvar' });
    this.errorMessage = page.getByTestId('form-error-message');
    this.formErrorMessages = page.getByTestId('validation-error');
  }

  async fillForm(title: string, author: string, year: string, genre: string) {
    await this.titleInput.fill(title);
    await this.authorInput.fill(author);
    await this.yearInput.fill(year);
    await this.genreInput.fill(genre);
  }

  async submit() {
    await this.submitButton.click();
  }

  async getErrorMessages(): Promise<string[]> {
    const elements = await this.formErrorMessages.all();
    const messages: string[] = [];
    for (const element of elements) {
      const text = await element.textContent();
      if (text) messages.push(text);
    }
    return messages;
  }

  async getFormErrorText(): Promise<string> {
    return await this.errorMessage.textContent() ?? '';
  }

  async isFormErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }
}