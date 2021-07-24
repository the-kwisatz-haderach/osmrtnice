import { IObituaryInput } from '../../../domain/types'
import type { PageProcessor } from '../../types'
import obituaryProcessor from './obituaryProcessor'

const pageProcessor: PageProcessor<IObituaryInput[]> = async (page) => {
  const obituaries: IObituaryInput[] = []
  try {
    const items = await page.$$('.obituaryItem')

    for (const item of items) {
      const values = await obituaryProcessor(item)
      if (values) {
        obituaries.push(values)
      }
    }

    return obituaries
  } catch (err) {
    console.error(err)
    return obituaries
  }
}

export default pageProcessor
