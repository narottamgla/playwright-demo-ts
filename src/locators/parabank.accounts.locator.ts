import { type Locator, type Page } from '@playwright/test';

export class ParaBankAccountsLocators {
  readonly page: Page;
  readonly accountsTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountsTable = page.locator('table[id="accounts"]');
  }
}

export default ParaBankAccountsLocators;
