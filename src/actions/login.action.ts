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
        await this.loginPageLocators.loginUsername.fill(username);
        await this.loginPageLocators.loginPassword.fill(password);
        await this.loginPageLocators.loginButton.click();
    }

    async isLoggedIn() {
        expect(this.loginPageLocators.logoutButton).toBeVisible();
        console.log(`[LoginAction] isLoggedIn -> user is logged in successfully`);
    }

    async logout() {
        console.log(`[LoginAction] logout -> logging out`);
        await this.loginPageLocators.logoutButton.click();
    }
}