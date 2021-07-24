import { Db, MongoClient } from 'mongodb'

// const client = new MongoClient(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

// export async function connectToDb(): Promise<{
//   dbClient: MongoClient
//   db: Db
// }> {
//   try {
//     if (!client.isConnected()) {
//       await client.connect()
//       console.log(`Connected to db: ${process.env.MONGODB_DB}`)
//     }
//     const db = await client.db(process.env.MONGODB_DB)
//     return { dbClient: client, db }
//   } catch {
//     await client.close()
//   }
// }

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (global as any).mongo

if (!cached) {
  cached = (global as any).mongo = { conn: null, promise: null }
}

export async function connectToDb(): Promise<{
  dbClient: MongoClient
  db: Db
}> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
