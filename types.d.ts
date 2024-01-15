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
    storyblok
    IntersectionObserver: typeof IntersectionObserver
    fbAsyncInit: () => void
    FB: {
      init: (options: any) => void
      ui: (options: { display: string; method: string; href: string }) => void
    }
  }
}
