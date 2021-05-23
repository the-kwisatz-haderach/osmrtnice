import { StoryblokComponent, StoryData } from 'storyblok-js-client'
import { IGrid, IRichTextBlok } from '../types'

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
