import { StoryData } from 'storyblok-js-client'
import {
  StoryBlokComponent,
  StoryBlokComponentType,
  StoryContent,
} from './blokTypes'
import { Obituary } from './domain/types'
import { GlobalSettings } from './types'

export type StoryType = string | 'page' | 'obituary' | 'global'

export type Story<Fields> = StoryData<
  StoryContent<StoryBlokComponentType, Fields>
> & { default_full_slug?: string }

export type PageStory = Story<{ body?: StoryBlokComponent[] }>
export type ObituaryStory = Story<Obituary>
export type GlobalStory = Story<GlobalSettings>

export type Stories = PageStory | GlobalStory | ObituaryStory
