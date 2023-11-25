import { dbConnection } from './dbConnection'

import { createEdgeRouter } from 'next-connect'
import { NextApiResponse } from 'next'
import { EnhancedNextApiRequest } from './types'

const attachMiddleware = () =>
  createEdgeRouter<EnhancedNextApiRequest, NextApiResponse>().use(dbConnection)

export * from './types'
export default attachMiddleware
