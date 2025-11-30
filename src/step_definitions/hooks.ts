import { AfterAll } from '@cucumber/cucumber';
import BrowserFactory from '../support/browser.factory';

AfterAll(async function () {
  try {
    // close the singleton browser after all scenarios in the run
    await BrowserFactory.closeBrowser();
    // eslint-disable-next-line no-console
    console.log('[hooks] closed browser via BrowserFactory AfterAll');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[hooks] AfterAll failed to close browser', String(e));
  }
});
