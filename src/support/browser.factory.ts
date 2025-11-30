import { chromium, Browser, BrowserContext, LaunchOptions } from 'playwright';

/**
 * BrowserFactory centralizes Playwright Browser creation and lifecycle.
 * - creates a singleton Browser instance (launched on demand)
 * - provides helpers to create fresh contexts/pages
 * - can be configured from environment variables for headed/slowMo
 */
export class BrowserFactory {
  private static browser: Browser | undefined;

  // returns the singleton browser instance, launching it if needed
  static async getBrowser(): Promise<Browser> {
    if (!BrowserFactory.browser) {
      const slowMo = process.env.PARABANK_SLOWMO ? Number(process.env.PARABANK_SLOWMO) : undefined;
      // default for feature runs: headed unless explicitly requested headless
      const headless = process.env.PARABANK_HEADLESS === 'true' ? true : false;
      const devtools = process.env.PARABANK_SHOW_BROWSER === 'true' || process.env.PWDEBUG === '1' || process.env.PWDEBUG === 'true';
      const opts: LaunchOptions = { headless, slowMo, devtools };
      // eslint-disable-next-line no-console
      console.log(`[BrowserFactory] launching browser: headless=${opts.headless} slowMo=${opts.slowMo ?? 0} devtools=${opts.devtools}`);
      BrowserFactory.browser = await chromium.launch(opts as LaunchOptions);
    }
    return BrowserFactory.browser;
  }

  // returns a new context; wrapper for clarity
  static async newContext(contextOptions?: Parameters<Browser['newContext']>[0]): Promise<BrowserContext> {
    const browser = await BrowserFactory.getBrowser();
    return await browser.newContext(contextOptions);
  }

  // convenience to create a new page on a fresh context
  static async newPage(contextOptions?: Parameters<Browser['newContext']>[0]) {
    const context = await BrowserFactory.newContext(contextOptions);
    return { context, page: await context.newPage() };
  }

  // close the underlying browser (useful for full-run teardown)
  static async closeBrowser() {
    if (BrowserFactory.browser) {
      try {
        await BrowserFactory.browser.close();
      } finally {
        BrowserFactory.browser = undefined;
      }
    }
  }
}

export default BrowserFactory;
