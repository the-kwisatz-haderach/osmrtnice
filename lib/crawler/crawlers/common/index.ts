import path from 'path'
import fs from 'fs'
import { ObituaryMap, ObituaryOutputHandler } from '../../types'
import { obituaryIdGenerator } from '../../helpers/obituaryIdGenerator'
import { createObituary } from '../../../domain/obituary'
import { IObituaryInput } from '../../../domain/types'

export const createOutputWriter = (
  fileName: string
): ObituaryOutputHandler => async (obituaries) => {
  const data = obituaries.reduce<ObituaryMap>(
    (acc, curr) => ({
      ...acc,
      [obituaryIdGenerator(curr)]: curr,
    }),
    {}
  )

  const outputPath = path.resolve(
    process.cwd(),
    'crawl-results',
    `${fileName}.json`
  )
  fs.writeFile(outputPath, JSON.stringify(data), (err) => {
    if (err) {
      throw err
    }
  })
}

export const obituaryInputDefault: IObituaryInput = {
  firstname: '',
  surname: '',
  date_of_birth: null,
  date_of_death: null,
}

export const obituaryDefaults = createObituary({
  firstname: '',
  surname: '',
  date_of_birth: null,
  date_of_death: null,
  type: 'OBITUARY',
})
