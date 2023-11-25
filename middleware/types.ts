import { Db, MongoClient } from 'mongodb'
import { NextApiRequest } from 'next'

export type EnhancedNextApiRequest = Request &
  NextApiRequest & {
    db: Db
    dbClient: MongoClient
  }
