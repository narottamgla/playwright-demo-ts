import { Page, expect } from '@playwright/test';
import ParaBankNavLocators from '../locators/parabank.nav.locator';
import ParaBankLoginLocators from '../locators/parabank.login.locator';
import ParaBankRegisterLocators from '../locators/parabank.register.locator';
import ParaBankOpenAccountLocators from '../locators/parabank.openaccount.locator';
import ParaBankAccountsLocators from '../locators/parabank.accounts.locator';
import ParaBankTransferLocators from '../locators/parabank.transfer.locator';
import ParaBankBillPayLocators from '../locators/parabank.billpay.locator';


export class ParaBankActions {
    readonly nav: ParaBankNavLocators;
    readonly loginLoc: ParaBankLoginLocators;
    readonly registerLoc: ParaBankRegisterLocators;
    readonly openAcctLoc: ParaBankOpenAccountLocators;
    readonly accountsLoc: ParaBankAccountsLocators;
    readonly transferLoc: ParaBankTransferLocators;
    readonly billPayLoc: ParaBankBillPayLocators;

    constructor(private page: Page) {
        this.nav = new ParaBankNavLocators(page);
        this.loginLoc = new ParaBankLoginLocators(page);
        this.registerLoc = new ParaBankRegisterLocators(page);
        this.openAcctLoc = new ParaBankOpenAccountLocators(page);
        this.accountsLoc = new ParaBankAccountsLocators(page);
        this.transferLoc = new ParaBankTransferLocators(page);
        this.billPayLoc = new ParaBankBillPayLocators(page);
    }

    // removed writeLog; console.log used instead

    async gotoHome() {
        const base = process.env.PARABANK_BASE_URL ?? 'https://parabank.parasoft.com/';
        console.log(`[ParaBankActions] gotoHome -> navigating to ${base}`);
        await this.page.goto(base);
        console.log(`[ParaBankActions] gotoHome -> navigation complete`);
    }

    async navigateToRegistarationPage() {
        await this.nav.registartionLink.click();
        await this.page.waitForURL('**/register.htm');
        expect(this.registerLoc.pageTitle).toHaveText('Signing up is easy!');
    }

    async registerUser(userName: string, password: string) {
        console.log(`[ParaBankActions] registerUser -> registering user: ${userName}`);
        await this.registerLoc.regFirstName.fill('Auto');
        await this.registerLoc.regLastName.fill('User');
        await this.registerLoc.regAddress.fill('123 Main St');
        await this.registerLoc.regCity.fill('City');
        await this.registerLoc.regState.fill('State');
        await this.registerLoc.regZip.fill(('12345').toString());
        await this.registerLoc.regPhone.fill('1234567890'.toString());
        await this.registerLoc.regSSN.fill('111-11-1111');
        // use usernameToTry (may change on retry)
        await this.registerLoc.regUsername.fill(userName);
        await this.registerLoc.regPassword.fill(password);
        await this.registerLoc.regPasswordRepeat.fill(password);
        await this.page.waitForTimeout(10000);
        await this.registerLoc.regButton.click();
    }

    async isRegitsrationSuccess() {
        await expect(this.registerLoc.regSuccessMessage).toBeVisible();
        console.log(`[ParaBankActions] isRegitsrationSuccess -> registration successful`);
    }
}
export default ParaBankActions;
