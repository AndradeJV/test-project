import { Page, Locator } from '@playwright/test';

export class BookFormPage {
  readonly page: Page;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.locator('[data-testid="submit-book"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
  }

  async submit() {
    await this.submitButton.click();
  }

  async getErrorText(): Promise<string> {
    return await this.errorMessage.textContent() ?? '';
  }
}
