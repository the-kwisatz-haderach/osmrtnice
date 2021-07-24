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
    console.log('connecting')
    if (!client.isConnected()) {
      console.log('Is not connected...')
      await client.connect()
      console.log(`Connected to db: ${process.env.MONGODB_DB}`)
    }
    const db = await client.db(process.env.MONGODB_DB)
    console.log('db', db)
    return { dbClient: client, db }
  } catch {
    await client.close()
  }
}
