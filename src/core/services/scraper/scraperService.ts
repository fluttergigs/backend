export type ScraperJob<R> = (...args: any) => R;


export abstract class BaseScraperService<T> {
  /**
   * Scrape raw HTML content from a URL using Puppeteer.
   * @param {string} url - The URL to scrape.
   * @returns {Promise<string>} - A promise that resolves to the raw HTML content.
   */

  abstract scrape(url: string): Promise<string>;


}
