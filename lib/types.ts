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

export interface Headline {
  title: string
  description: string
  color: Color
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

export interface Grid {
  columns: StoryBlokComponent[]
  col_count: number
  grid_gap: number
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
}
