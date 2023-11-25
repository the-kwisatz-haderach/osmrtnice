import { MONGODB_DB, MONGODB_URI } from 'lib/constants'
import { Db, MongoClient, MongoClientOptions } from 'mongodb'

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDb(): Promise<{
  dbClient: MongoClient
  db: Db
}> {
  if (cached.conn) {
    return cached.conn
  }
  // eslint-disable-next-line
  if (!cached.promise) {
    const opts: MongoClientOptions = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => ({
      dbClient: client,
      db: client.db(MONGODB_DB),
    }))
  }
  cached.conn = await cached.promise
  return cached.conn
}
