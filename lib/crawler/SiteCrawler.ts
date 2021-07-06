import { CronJob } from 'cron'
import puppeteer from 'puppeteer'
import type { ErrorHandler, OutputHandler, PageProcessor } from './types'

interface SiteCrawlerArgs<U> {
  url: string
  documentProcessor: PageProcessor<U>
  cronSchedule?: string | Date
  outputHandler?: OutputHandler<U>
  errorHandler?: ErrorHandler
}

export default class SiteCrawler<U> {
  private readonly url: string
  private readonly cronSchedule?: string | Date
  private readonly documentProcessor: PageProcessor<U>
  private readonly outputHandler: OutputHandler<U>
  private readonly errorHandler: ErrorHandler

  constructor({
    url,
    documentProcessor,
    outputHandler,
    cronSchedule,
    errorHandler,
  }: SiteCrawlerArgs<U>) {
    this.url = url
    this.documentProcessor = documentProcessor
    this.cronSchedule = cronSchedule
    this.outputHandler = outputHandler ?? console.log
    this.errorHandler = errorHandler ?? console.error
  }

  async init(): Promise<void> {
    if (this.cronSchedule) {
      /* eslint-disable-next-line */
      new CronJob(this.cronSchedule, this.crawl, null, false).start()
    } else {
      this.crawl().catch(console.error)
    }
  }

  private async crawl(): Promise<void> {
    const browser = await puppeteer.launch({
      headless: process.env.PUPPETEER_HEADLESS === 'true',
      slowMo: process.env.PUPPETEER_SLOW_MO === 'true' ? 150 : undefined,
    })
    try {
      const page = await browser.newPage()
      page.setDefaultNavigationTimeout(
        parseInt(process.env.PUPPETEER_NAVIGATION_TIMEOUT)
      )
      await page.goto(this.url, {
        waitUntil: 'domcontentloaded',
      })
      await this.documentProcessor(page).then(this.outputHandler)
    } catch (err) {
      this.errorHandler(err)
    } finally {
      await browser.close()
    }
  }
}
