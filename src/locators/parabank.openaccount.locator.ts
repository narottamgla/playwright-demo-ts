import { type Locator, type Page } from '@playwright/test';

export class ParaBankOpenAccountLocators {
  readonly page: Page;
  readonly openAccountType: Locator;
  readonly openAccountFromAccount: Locator;
  readonly openAccountButton: Locator;
  readonly accountSuccessMessage: Locator;
  readonly newAccountId: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openAccountType = page.locator('select[id="type"]');
    this.openAccountFromAccount = page.locator('select[name="fromAccountId"]');
    this.openAccountButton = page.locator('input[value="Open New Account"], button:has-text("Open New Account")');
    this.accountSuccessMessage = page.locator('p:has-text("Congratulations, your account is now open.")');
    this.newAccountId = page.locator('div[id="newAccountId"] strong');
  }
}

export default ParaBankOpenAccountLocators;
