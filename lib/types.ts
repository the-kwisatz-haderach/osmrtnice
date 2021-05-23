import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { Richtext } from 'storyblok-js-client'
import { ImageField, LinkField } from './storyblok/common/types'
import { StoryBlokComponent } from './storyblok/types'
export interface IPost {
  title: string
  image: string
  intro: string
  long_text: Richtext
}

export interface IRichTextBlok {
  text: Richtext
}

export interface IHeroImage {
  title: string
  subtitle: string
  description: string
  image: string
}

export interface ISocialChannelLink {
  title: string
  url: string
  icon: IconDefinition
}

export interface IMenuItem {
  href: string
  label: string
}

export interface IGlobalSettings {
  logo: string
  address: string
  phone: string
  email: string
}

export interface IGrid {
  columns: StoryBlokComponent[]
  col_count?: number
  grid_gap?: number
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
