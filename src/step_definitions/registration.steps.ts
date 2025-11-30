import { Before, After, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import type { Browser, Page, BrowserContext } from 'playwright';
import BrowserFactory from '../support/browser.factory';
import { ParaBankActions } from '../actions/parabank.actions';
import { generateUniqueUser } from '../utils/user.util';
import { expect } from '@playwright/test';
import { LoiginAction } from '../actions/login.action';
import { NavActions } from '../actions/nav.action';

setDefaultTimeout(60_000);
let paraBankActions: ParaBankActions;
let loginAction: LoiginAction;
let navActions: NavActions;
let user: { username: string; password: string };

// typed per-scenario context/page so hooks are easy to understand
let browserCtx: BrowserContext | undefined;


Before(async function () {
    // create a fresh browser context + page for each scenario using the BrowserFactory
    const { context, page } = await BrowserFactory.newPage();
    browserCtx = context;
    this.page = page;
    paraBankActions = new ParaBankActions(this.page);
    loginAction = new LoiginAction(this.page);
    navActions = new NavActions(this.page);
    // attach to world so older steps that use `this.*` continue to work
    (this as any).paraBankActions = paraBankActions;
    (this as any).loginAction = loginAction;
    (this as any).navActions = navActions;
});

After(async function () {
    // teardown
    try {
        if (this.page) await this.page.close();
        if (browserCtx) await browserCtx.close();
    } catch (e) {
        // best-effort cleanup; log then swallow
        // eslint-disable-next-line no-console
        console.warn('[registration.steps] teardown error', String(e));
    }
});

Given('User open the ParaBank home page', async function () {
    await this.paraBankActions.gotoHome();
});

Given('User register a new unique user', async function () {
    await this.paraBankActions.navigateToRegistarationPage();
    this.user = generateUniqueUser('e2e');
    await this.page.waitForTimeout(10000);
    await this.paraBankActions.registerUser(this.user.username, this.user.password);

    await this.page.waitForTimeout(10000);

    await this.loginAction.isLoggedIn();
    await this.loginAction.logout();
});

Given('User login with the newly created user', async function () {
   // await this.loginAction.login(this.user.username, this.user.password);
    const uname = this.user?.username ?? process.env.PARABANK_TEST_USER ?? 'test@mailinator.com';
    const pwd = this.user?.password ?? process.env.PARABANK_TEST_PASSWORD ?? 'Password@123';
    await this.loginAction.login(uname, pwd);
    await this.page.waitForTimeout(10000);

});

Then('User should be logged in successfully', async function () {
    await this.loginAction.isLoggedIn();
});

Then('Verify if the Global navigation menu in home page is working as expected', async function () {
    await this.navActions.verifyGlobalNavMenu();
});