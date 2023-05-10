export const DEFAULT_LIST_LIMIT = 50
export const MAX_LIST_LIMIT = 100
export const REVALIDATE_TIME_SECONDS = 60 * 60
export const STORYBLOK_VERSION =
  process.env.NODE_ENV === 'development' ? 'draft' : 'published'
