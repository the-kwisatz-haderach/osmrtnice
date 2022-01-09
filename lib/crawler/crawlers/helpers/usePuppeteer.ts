import puppeteer, { Page } from 'puppeteer'

const usePuppeteer = async (
  headless = true
): Promise<{
  page: Page
  goTo: (path: string) => Promise<void>
  teardown: () => Promise<void>
}> => {
  const browser = await puppeteer.launch({ headless })
  const page = await browser.newPage()

  return {
    page,
    goTo: async (path: string) => {
      await page.goto(path)
    },
    teardown: async () => {
      await page.close()
      await browser.close()
    },
  }
}

export default usePuppeteer
