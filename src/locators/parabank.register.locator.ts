import { type Locator, type Page } from '@playwright/test';

export class ParaBankRegisterLocators {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly regFirstName: Locator;
  readonly regLastName: Locator;
  readonly regAddress: Locator;
  readonly regCity: Locator;
  readonly regState: Locator;
  readonly regZip: Locator;
  readonly regPhone: Locator;
  readonly regSSN: Locator;
  readonly regUsername: Locator;
  readonly regPassword: Locator;
  readonly regPasswordRepeat: Locator;
  readonly regButton: Locator;
  readonly regSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('h1:has-text("Signing up is easy!")');
    this.regFirstName = page.locator('input[name="customer.firstName"]');
    this.regLastName = page.locator('input[name="customer.lastName"]');
    this.regAddress = page.locator('input[name="customer.address.street"]');
    this.regCity = page.locator('input[name="customer.address.city"]');
    this.regState = page.locator('input[name="customer.address.state"]');
    this.regZip = page.locator('input[name="customer.address.zipCode"]');
    this.regPhone = page.locator('input[name="customer.phoneNumber"]');
    this.regSSN = page.locator('input[name="customer.ssn"]');
    this.regUsername = page.locator('input[name="customer.username"]');
    this.regPassword = page.locator('input[name="customer.password"]');
    this.regPasswordRepeat = page.locator('input[name="repeatedPassword"]');
    this.regButton = page.locator('input[value="Register"], button:has-text("Register")');
    this.regSuccessMessage = page.locator('p:has-text("Your account was created successfully. You are now logged in.")');
  }
}

export default ParaBankRegisterLocators;
