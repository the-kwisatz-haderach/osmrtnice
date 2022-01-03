import { IObituaryInput } from '../../../domain/types'
import { PageProcessor } from '../../types'
import obituaryProcessor from './obituaryProcessor'

const pageProcessor: PageProcessor<IObituaryInput[]> = async (page) => {
  const obituaries: IObituaryInput[] = []
  try {
    const obituary = await obituaryProcessor(await page.$('.size-vise'))

    if (obituary) {
      obituaries.push(obituary)
    }

    return obituaries
  } catch (err) {
    console.error(err)
    return obituaries
  }
}

export default pageProcessor
