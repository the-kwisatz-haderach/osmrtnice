export const DEFAULT_LIST_LIMIT = 50
export const MAX_LIST_LIMIT = 100
export const REVALIDATE_TIME_SECONDS = 60 * 60
export const STORYBLOK_VERSION =
  process.env.NODE_ENV === 'development' ? 'draft' : 'published'
export const STORYBLOK_TOKEN =
  process.env.NODE_ENV === 'development'
    ? process.env.STORYBLOK_TOKEN
    : process.env.NEXT_PUBLIC_STORYBLOK_TOKEN
export const STORYBLOK_WEBHOOK_SECRET = process.env.STORYBLOK_WEBHOOK_SECRET
export const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017'
export const MONGODB_DB = process.env.MONGODB_DB || 'development'
