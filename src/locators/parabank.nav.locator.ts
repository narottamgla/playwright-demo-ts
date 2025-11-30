import { type Locator, type Page } from '@playwright/test';

export class ParaBankNavLocators {
  readonly page: Page;
  readonly registartionLink: Locator;
  readonly solutionsLink: Locator;
  readonly aboutUsLink: Locator;
  readonly servicesLink: Locator;
  readonly contactUsLink: Locator;
  readonly productsLink: Locator;
  constructor(page: Page) {
    this.page = page;
    this.solutionsLink = page.locator('a:has-text("Solutions")');
    this.aboutUsLink = page.locator('a:has-text("About Us")');
    this.servicesLink = page.locator('a:has-text("Services")');
    this.contactUsLink = page.locator('a:has-text("Contact Us")');
    this.productsLink = page.locator('a:has-text("Products")');
    this.registartionLink = page.locator('a:has-text("Register")');
  }
}

export default ParaBankNavLocators;
