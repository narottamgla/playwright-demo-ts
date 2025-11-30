import { type Locator, type Page } from '@playwright/test';

export class ParaBankOpenAccountLocators {
  readonly page: Page;
  readonly openAccountType: Locator;
  readonly openAccountFromAccount: Locator;
  readonly openAccountButton: Locator;
  readonly newAccountIdLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openAccountType = page.locator('select[name="type"]');
    this.openAccountFromAccount = page.locator('select[name="fromAccountId"]');
    this.openAccountButton = page.locator('input[value="Open New Account"], button:has-text("Open New Account")');
    this.newAccountIdLink = page.locator('table#newAccountId a, a[href*="overview.htm"]');
  }
}

export default ParaBankOpenAccountLocators;
