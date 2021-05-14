import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Richtext } from 'storyblok-js-client'
import { StoryBlokComponent } from './blokTypes'

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

export interface Post {
  title: string
  image: string
  intro: string
  long_text: Richtext
}

export interface RichTextBlok {
  text: Richtext
}

export interface HeroImage {
  title: string
  subtitle: string
  description: string
  image: string
}

export interface SocialChannelLink {
  title: string
  url: string
  icon: IconDefinition
}

export interface MenuItem {
  href: string
  label: string
}

export interface GlobalSettings {
  logo: string
  address: string
  phone: string
  email: string
}

export interface Grid {
  columns: StoryBlokComponent[]
  col_count: number
  grid_gap: number
}

export interface IGridColumn {
  content: StoryBlokComponent[]
  col_span: number
}

export interface ITeaser {
  title: string
  description: string
  image: ImageField
  link: LinkField
}

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
