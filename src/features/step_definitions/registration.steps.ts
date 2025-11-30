import { Before, After, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { ParaBankActions } from '../../actions/parabank.actions';
import { generateUniqueUser } from '../../utils/user.util';
import { expect } from '@playwright/test';
import { LoiginAction } from '../../actions/login.action';
import { NavActions } from '../../actions/nav.actions';

setDefaultTimeout(60_000);
paraBankActions: ParaBankActions;
let loginAction: LoiginAction;
let navActions: NavActions;
let user: { username: string; password: string };


Before(async function () {
    const headless = false;
    this.browser = await chromium.launch({ headless, slowMo: 300, devtools: true });
    const context = await this.browser.newContext();
    this.page = await context.newPage();
    this.paraBankActions = new ParaBankActions(this.page);
    this.loginAction = new LoiginAction(this.page);
    this.navActions = new NavActions(this.page);
});

After(async function () {
    // teardown
    if (this.page) await this.page.close();
    if (this.browser) await this.browser.close();
});

Given('User open the ParaBank home page', async function () {
    await this.paraBankActions.gotoHome();
});

Given('User register a new unique user', async function () {
    await this.paraBankActions.navigateToRegistarationPage();
    this.user = generateUniqueUser('e2e');
    await this.paraBankActions.registerUser(this.user.username, this.user.password);

    await this.page.waitForTimeout(10000);

    await this.loginAction.isLoggedIn();
    await this.loginAction.logout();
});

Given('User login with the newly created user', async function () {
    await this.loginAction.login(this.user.username, this.user.password);
});

Then('User should be logged in successfully', async function () {
    await this.loginAction.isLoggedIn();
});

Then('Verify if the Global navigation menu in home page is working as expected', async function () {
    await this.navActions.verifyGlobalNavMenu();
});