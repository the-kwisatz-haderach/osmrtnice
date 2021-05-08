import React, { ReactElement } from 'react'
import SbEditable from 'storyblok-react'
import { StoryBlokComponent, StoryBlokComponentType } from '../../lib/blokTypes'
import { RichTextBlok } from '../RichTextBlok'

export interface Props {
  blok: StoryBlokComponent
}

const components: {
  [key in StoryBlokComponentType]: React.FC<any>
} = {
  'rich-text': RichTextBlok,
}

export default function DynamicBlokComponent({ blok }: Props): ReactElement {
  if (!components[blok.component]) {
    console.error(`Missing component: ${blok.component}.`)
    return <div>There is no component defined for type: {blok.component}.</div>
  }
  const Component = components[blok.component]
  return (
    <SbEditable content={blok}>
      <Component {...blok} />
    </SbEditable>
  )
}
