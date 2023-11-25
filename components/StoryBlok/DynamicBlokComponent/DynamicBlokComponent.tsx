import React, { ReactElement } from 'react'
import { useStoryblokState, StoryblokComponent } from '@storyblok/react'
import { Story } from '../../../lib/storyblok/types'

export interface Props {
  story: Story<any>
}

export default function DynamicBlokComponent({
  story: initialStory,
}: Props): ReactElement {
  const story = useStoryblokState(initialStory)
  if (!story.content) {
    return <div>Loading...</div>
  }
  return <StoryblokComponent blok={story.content} />
}
