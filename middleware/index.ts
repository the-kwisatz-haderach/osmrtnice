import { dbConnection } from './dbConnection'

import { createRouter } from 'next-connect'
import { NextApiResponse } from 'next'
import { EnhancedNextApiRequest } from './types'

const attachMiddleware = () =>
  createRouter<EnhancedNextApiRequest, NextApiResponse>().use(dbConnection)

export * from './types'
export default attachMiddleware
