import fs from 'fs'
import { createObituaries } from './createMockData'

export const createMockFile = () => {
  fs.writeFileSync('obituaries.json', JSON.stringify(createObituaries(20)))
}
