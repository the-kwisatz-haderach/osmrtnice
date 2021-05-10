import { StoryblokComponent } from 'storyblok-js-client'
import { Grid, RichTextBlok } from './types'

export type StoryBlokComponentType = string | 'grid' | 'rich_text'

export type StoryContent<
  Type extends StoryBlokComponentType,
  Fields
> = StoryblokComponent<Type> & Fields

export type StoryBlokComponent =
  | StoryContent<'rich_text', RichTextBlok>
  | StoryContent<'grid', Grid>
