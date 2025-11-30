import { Page, expect } from '@playwright/test';
import { ParaBankLoginLocators } from '../locators/parabank.login.locator';

export class LoiginAction {

    page :Page
    loginPageLocators: ParaBankLoginLocators;

    constructor(page: Page) {
        this.page = page;
        this.loginPageLocators = new ParaBankLoginLocators(page);
    }

    async login(username: string, password: string) {
        console.log(`[LoginAction] login -> logging in with username: ${username}`);
        // ensure the username field is visible before we attempt to fill it
        try {
            await this.page.waitForSelector('input[name="username"]', { state: 'visible', timeout: 10_000 });
        } catch (e) {
            // If username is not visible, return to home and try again
            // eslint-disable-next-line no-console
            console.warn('[LoginAction] username field not visible, navigating to home and retrying');
            const base = process.env.PARABANK_BASE_URL ?? 'https://parabank.parasoft.com/';
            await this.page.goto(base);
            await this.page.waitForSelector('input[name="username"]', { state: 'visible', timeout: 10_000 });
        }
        await this.loginPageLocators.loginUsername.fill(username);
        await this.loginPageLocators.loginPassword.fill(password);
        await this.loginPageLocators.loginButton.click();
    }

    async isLoggedIn() {
        // wait for the logout link to be visible so we ensure login completed
        await expect(this.loginPageLocators.logoutButton).toBeVisible();
        console.log(`[LoginAction] isLoggedIn -> user is logged in successfully`);
    }

    async logout() {
        console.log(`[LoginAction] logout -> logging out`);
        await this.loginPageLocators.logoutButton.waitFor({ state: 'visible', timeout: 10_000 });
        await this.loginPageLocators.logoutButton.click();
        // wait for the login input to reappear as a basic check the logout completed
        await this.page.waitForSelector('input[name="username"]', { state: 'visible', timeout: 10_000 }).catch(() => {});
    }
}