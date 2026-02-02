import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  
  // Locators
  readonly bookList: Locator;
  readonly addBookButton: Locator;
  readonly loadingIndicator: Locator;
  readonly errorMessage: Locator;
  readonly noBooks: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookList = page.getByTestId('book-list');
    this.addBookButton = page.getByRole('button', { name: 'Adicionar Livro' });
    this.loadingIndicator = page.getByTestId('loading-indicator');
    this.errorMessage = page.getByTestId('error-message');
    this.noBooks = page.getByText('Nenhum livro cadastrado');
  }

  async goto() {
    await this.page.goto('/');
  }

  async addNewBook() {
    await this.addBookButton.click();
  }

  async getErrorText(): Promise<string> {
    return await this.errorMessage.textContent() ?? '';
  }

  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  async waitForBooksLoad() {
    await this.page.waitForLoadState('networkidle');
  }
}