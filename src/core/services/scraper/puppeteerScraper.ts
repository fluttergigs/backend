import {BaseScraperService} from "./scraperService";
import puppeteer from 'puppeteer-extra';
import {Browser, Page} from 'puppeteer'
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin())

export class PuppeteerScraperService implements BaseScraperService<any> {

  async scrape(url: string): Promise<string> {

    const browser: Browser = await puppeteer.launch();
    const page: Page = await browser.newPage();


    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setUserAgent('Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36')
    /*await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://www.google.com/'
    });*/

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      const headers = request.headers();
      // Remove or modify CSP headers
      delete headers['content-security-policy'];
      delete headers['content-security-policy-report-only'];
      delete headers['clear-site-data'];

      request.continue({headers});
    });

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 200000
    });

    const content = await page.content(); // Get the raw HTML content
    await browser.close();

    return content;
  }

}
