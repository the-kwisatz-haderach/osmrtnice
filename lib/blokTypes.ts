import { StoryblokComponent } from 'storyblok-js-client'
import { RichTextBlok } from './types'

export type StoryBlokComponentType =
  | string
  | 'teaser'
  | 'grid'
  | 'full-width-content'
  | 'headline'
  | 'hero-image'
  | 'rich-text'

export type StoryContent<
  Type extends StoryBlokComponentType,
  Fields
> = StoryblokComponent<Type> & Fields

export type StoryBlokComponent = StoryContent<'rich-text', RichTextBlok>
