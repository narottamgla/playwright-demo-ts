import { Page, expect } from '@playwright/test';
import { ParaBankLoginLocators } from '../locators/parabank.login.locator';
import { ParaBankNavLocators } from '../locators/parabank.nav.locator';

export class NavActions {

    page :Page
    paraBankNavLocators: ParaBankNavLocators;

    constructor(page: Page) {
        this.page = page;
        this.paraBankNavLocators = new ParaBankNavLocators(page);
    }

    async verifyGlobalNavMenu() {
        console.log(`[NavActions] verifyGlobalNavMenu -> verifying global navigation menu links`);
        await expect(this.paraBankNavLocators.solutionsLink).toBeVisible();
        await expect(this.paraBankNavLocators.aboutUsLink).toBeVisible();
        await expect(this.paraBankNavLocators.servicesLink).toBeVisible();
        await expect(this.paraBankNavLocators.contactUsLink).toBeVisible();
        await expect(this.paraBankNavLocators.productsLink).toBeVisible();
        console.log(`[NavActions] verifyGlobalNavMenu -> all global navigation menu links are visible`);
    }

}
