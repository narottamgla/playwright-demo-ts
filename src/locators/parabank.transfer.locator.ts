import { type Locator, type Page } from '@playwright/test';

export class ParaBankTransferLocators {
  readonly page: Page;
  readonly transferAmount: Locator;
  readonly transferFromAccount: Locator;
  readonly transferToAccount: Locator;
  readonly transferButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.transferAmount = page.locator('input[name="amount"]');
    this.transferFromAccount = page.locator('select[name="fromAccountId"]');
    this.transferToAccount = page.locator('select[name="toAccountId"]');
    this.transferButton = page.locator('input[value="Transfer"], button:has-text("Transfer")');
  }
}

export default ParaBankTransferLocators;
