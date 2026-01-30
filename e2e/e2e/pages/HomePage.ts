import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly bookList: Locator;
  readonly addBookButton: Locator;
  readonly loadingIndicator: Locator;
  readonly errorMessage: Locator;
  readonly noBooksMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bookList = page.getByTestId('book-list');
    this.addBookButton = page.getByRole('button', { name: 'Adicionar Livro' });
    this.loadingIndicator = page.getByTestId('loading-indicator');
    this.errorMessage = page.getByTestId('error-message');
    this.noBooksMessage = page.getByTestId('no-books-message');
  }

  async goto() {
    await this.page.goto('/');
  }

  async addNewBook() {
    await this.addBookButton.click();
  }

  async waitForBooksToLoad() {
    await this.page.waitForLoadState('networkidle');
    await this.loadingIndicator.waitFor({ state: 'hidden' });
  }

  async isLoadingVisible(): Promise<boolean> {
    return await this.loadingIndicator.isVisible();
  }

  async getErrorText(): Promise<string> {
    return await this.errorMessage.textContent() ?? '';
  }

  async isBooksListVisible(): Promise<boolean> {
    return await this.bookList.isVisible();
  }

  async getBookCount(): Promise<number> {
    return await this.bookList.locator('[data-testid="book-item"]').count();
  }

  async isNoBooksMsgVisible(): Promise<boolean> {
    return await this.noBooksMessage.isVisible();
  }
}