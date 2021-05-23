import { Db, MongoClient } from 'mongodb'
import { NextApiRequest } from 'next'

export interface EnhancedNextApiRequest extends NextApiRequest {
  db: Db
  dbClient: MongoClient
}
