import { Page, expect } from '@playwright/test';
import { ParaBankLoginLocators } from '../locators/parabank.login.locator';
import { ParaBankNavLocators } from '../locators/parabank.nav.locator';
import ParaBankOpenAccountLocators from '../locators/parabank.openaccount.locator';

export class OpenAccountActions {

    page :Page
    paraBankOpenAccountLocators: ParaBankOpenAccountLocators;

    constructor(page: Page) {
        this.page = page;
        this.paraBankOpenAccountLocators = new ParaBankOpenAccountLocators(page);
    }

    async navigateToOpenAccountPage() {
        console.log(`[OpenAccountActions] navigateToOpenAccountPage -> navigating to Open New Account page`);
        // click the global navigation link to open the account form
        await this.page.locator('a:has-text("Open New Account")').click();
        await expect(this.paraBankOpenAccountLocators.openAccountType).toBeVisible();
        console.log(`[OpenAccountActions] navigateToOpenAccountPage -> navigated to Open New Account page successfully`);
    }

    async createNewAccount(accountType: string, fromAccountId: string) {
        console.log(`[OpenAccountActions] createNewAccount -> creating new account of type: ${accountType} from account ID: ${fromAccountId}`);
        await this.paraBankOpenAccountLocators.openAccountType.selectOption({ label: accountType });
        await this.paraBankOpenAccountLocators.openAccountButton.click();
        await this.page.waitForTimeout(5000);
        await expect(this.paraBankOpenAccountLocators.accountSuccessMessage).toBeVisible();
        const newAccountId = await this.paraBankOpenAccountLocators.newAccountId.textContent();
        console.log(`[OpenAccountActions] createNewAccount -> new account created successfully with account ID: ${newAccountId}`);
        return newAccountId;
       // console.log(`[OpenAccountActions] createNewAccount -> new account created successfully with account ID: ${newAccountId}`);
        //return newAccountId;
    }
}
