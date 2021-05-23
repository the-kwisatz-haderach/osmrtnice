export interface StoryBlokLink {
  id: number
  slug: string
  name: string
  is_folder: boolean
  parent_id: number
  published: boolean
  position: number
  uuid: string
  is_startpage: boolean
  path: string
  real_path: string
  alternates?: Array<{ path: string; name: null | string; lang: string }>
}

export type Color =
  | 'primary-dark'
  | 'primary-light'
  | 'secondary-dark'
  | 'secondary-light'

export interface LinkField {
  cached_url: string
  fieldtype: 'multilink'
  id: string
  linktype: 'url'
  url: string
}

export interface ImageField {
  alt: string
  copyright: string
  fieldtype: 'asset'
  filename: string
  focus: null
  id: number
  name: string
  title: string
}
