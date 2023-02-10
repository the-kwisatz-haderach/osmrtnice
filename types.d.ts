import type { MongoClient, Db } from 'mongodb'

export {}
declare global {
  var mongo: {
    conn: {
      dbClient: MongoClient
      db: Db
    } | null
    promise: Promise<{
      dbClient: MongoClient
      db: Db
    }> | null
  }

  interface Window {
    IntersectionObserver: typeof IntersectionObserver
    FB: {
      ui: (options: { display: string; method: string; href: string }) => void
    }
  }
}
