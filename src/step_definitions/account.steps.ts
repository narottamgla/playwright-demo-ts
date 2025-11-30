import { Before, After, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import type { BrowserContext } from 'playwright';
import BrowserFactory from '../support/browser.factory';
import { ParaBankActions } from '../actions/parabank.actions';
import { expect } from '@playwright/test';
import { LoiginAction } from '../actions/login.action';
import { NavActions } from '../actions/nav.action';
import { OpenAccountActions } from '../actions/openaccount.action';

setDefaultTimeout(60_000);
let paraBankActions: ParaBankActions;
let loginAction: LoiginAction;
let navActions: NavActions;
let openAccountActions: OpenAccountActions;
let contextForScenario: BrowserContext | undefined;
let firstAccountId: string | undefined;
let secondAccountId: string | undefined;

// ensure we create a fresh context for each scenario so we don't leak state
Before(async function () {
    const { context, page } = await BrowserFactory.newPage();
    contextForScenario = context;
    this.page = page;
    paraBankActions = new ParaBankActions(this.page);
    loginAction = new LoiginAction(this.page);
    navActions = new NavActions(this.page);
    openAccountActions = new OpenAccountActions(this.page);
    // attach to world so steps can use this.openAccountActions
   // (this as any).openAccountActions = openAccountActions;
});

After(async function () {
    try {
        if (this.page) await this.page.close();
        if (contextForScenario) await contextForScenario.close();
    } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[account.steps] teardown error', String(err));
    }
});



When('User navigates to Open New Account page with type as {string}', async function (type: string) {
    // make sure we use the active page on the world and avoid stale action instances
    const openAccount = new OpenAccountActions(this.page!);
    await openAccount.navigateToOpenAccountPage();
});

When('User creates a new Savings account from an existing account', async function () {
    const openAccount = new OpenAccountActions(this.page!);
    // choose a savings account and submit the form (fromAccountId optional)
    const created = await openAccount.createNewAccount('SAVINGS', '');
    console.log(`Created account ID: ${created}`);
    // store result on the world for verification step
    this.firstAccountId = created;
});


When('User creates a new Savings account from an existing account2', async function () {
    const openAccount = new OpenAccountActions(this.page!);
    // choose a savings account and submit the form (fromAccountId optional)
    const created = await openAccount.createNewAccount('SAVINGS', '');
    console.log(`Created account ID: ${created}`);
    // store result on the world for verification step
    this.secondAccountId = created;
});


Then('Verify both the newly created account IDs are different', async function () {
    expect(this.firstAccountId).toBeDefined();
    expect(this.secondAccountId).toBeDefined();
    expect(this.firstAccountId).not.toEqual(this.secondAccountId);
});