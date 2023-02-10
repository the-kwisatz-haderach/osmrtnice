import { Db, MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'development'

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

  if (cached.promise !== null) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => ({
      dbClient: client,
      db: client.db(MONGODB_DB),
    }))
  }
  cached.conn = await cached.promise
  return cached.conn
}
