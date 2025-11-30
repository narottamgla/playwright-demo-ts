import { type Locator, type Page } from '@playwright/test';

export class ParaBankBillPayLocators {
  readonly page: Page;
  readonly billPayPayeeName: Locator;
  readonly billPayAddress: Locator;
  readonly billPayCity: Locator;
  readonly billPayState: Locator;
  readonly billPayZip: Locator;
  readonly billPayPhone: Locator;
  readonly billPayAccount: Locator;
  readonly billPayVerifyAccount: Locator;
  readonly billPayAmount: Locator;
  readonly billPayFromAccount: Locator;
  readonly billPaySendPayment: Locator;

  constructor(page: Page) {
    this.page = page;
    this.billPayPayeeName = page.locator('input[name="payee.name"]');
    this.billPayAddress = page.locator('input[name="payee.address.street"]');
    this.billPayCity = page.locator('input[name="payee.address.city"]');
    this.billPayState = page.locator('input[name="payee.address.state"]');
    this.billPayZip = page.locator('input[name="payee.address.zipCode"]');
    this.billPayPhone = page.locator('input[name="payee.phoneNumber"]');
    this.billPayAccount = page.locator('input[name="payee.accountNumber"]');
    this.billPayVerifyAccount = page.locator('input[name="verifyAccount"]');
    this.billPayAmount = page.locator('input[name="amount"]');
    this.billPayFromAccount = page.locator('select[name="fromAccountId"]');
    this.billPaySendPayment = page.locator('input[value="Send Payment"], button:has-text("Send Payment")');
  }
}

export default ParaBankBillPayLocators;
