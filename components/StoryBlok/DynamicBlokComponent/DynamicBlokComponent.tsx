import React, { ReactElement } from 'react'
import SbEditable from 'storyblok-react'
import { StoryBlokComponent } from '../../../lib/blokTypes'
import { RichTextBlok } from '../RichTextBlok'
import { PageHeaderBlok } from '../PageHeaderBlok'

export interface Props {
  blok: StoryBlokComponent
}

const components = {
  rich_text: RichTextBlok,
  page_header: PageHeaderBlok,
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
