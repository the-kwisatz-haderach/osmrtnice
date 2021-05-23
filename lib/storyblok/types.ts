import { Richtext, StoryblokComponent, StoryData } from 'storyblok-js-client'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { ImageField, LinkField } from './common/types'

export type StoryBlokComponentType = string | 'grid' | 'rich_text'

export type StoryContent<
  Type extends StoryBlokComponentType,
  Fields
> = StoryblokComponent<Type> & Fields

export type StoryBlokComponent =
  | StoryContent<'rich_text', IRichTextBlok>
  | StoryContent<'grid', IGrid>

export type Story<Fields> = StoryData<
  StoryContent<StoryBlokComponentType, Fields>
> & { default_full_slug?: string }

export type PageStory = Story<{ body?: StoryBlokComponent[] }>

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
