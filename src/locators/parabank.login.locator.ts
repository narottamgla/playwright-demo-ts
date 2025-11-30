import { type Locator, type Page } from '@playwright/test';

export class ParaBankLoginLocators {
  readonly page: Page;
  readonly loginUsername: Locator;
  readonly loginPassword: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.loginUsername = page.locator('input[name="username"]');
    this.loginPassword = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"], button:has-text("Log In")');
    this.logoutButton = page.locator('a:has-text("Log Out")');
  }
}

export default ParaBankLoginLocators;
