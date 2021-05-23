import { NextApiResponse } from 'next'
import { connectToDb } from '../db'
import { EnhancedNextApiRequest } from './types'

export const dbConnection = async (
  req: EnhancedNextApiRequest,
  _: NextApiResponse,
  next: () => void
): Promise<void> => {
  const { dbClient, db } = await connectToDb()
  req.dbClient = dbClient
  req.db = db

  next()
}
