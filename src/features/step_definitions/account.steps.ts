import { Before, After, Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { ParaBankActions } from '../../actions/parabank.actions';
import { expect } from '@playwright/test';
import { LoiginAction } from '../../actions/login.action';
import { NavActions } from '../../actions/nav.actions';

setDefaultTimeout(60_000);
paraBankActions: ParaBankActions;
let loginAction: LoiginAction;
let navActions: NavActions;



When('User navigates to Open New Account page with type as {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

When('User creates a new Savings account from an existing account', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});

Then('A new Savings account should be created successfully with a unique account number', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
});
