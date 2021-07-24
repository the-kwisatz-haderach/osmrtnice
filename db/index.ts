import { Db, MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export async function connectToDb(): Promise<{
  dbClient: MongoClient
  db: Db
}> {
  try {
    if (!client.isConnected()) {
      await client.connect()
      console.log(`Connected to db: ${process.env.MONGODB_DB}`)
    }
    const db = await client.db(process.env.MONGODB_DB)
    return { dbClient: client, db }
  } catch {
    await client.close()
  }
}
