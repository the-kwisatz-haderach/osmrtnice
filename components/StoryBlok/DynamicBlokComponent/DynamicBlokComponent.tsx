import React, { ReactElement } from 'react'
import SbEditable from 'storyblok-react'
import { StoryBlokComponent } from '../../../lib/storyblok/types'
import { RichTextBlok } from '../RichTextBlok'
import { PageHeaderBlok } from '../PageHeaderBlok'
import { GridBlok } from '../GridBlok'
import { GridColumn } from '../GridColumn'
import { Teaser } from '../Teaser'

export interface Props {
  blok: StoryBlokComponent
}

const components = {
  rich_text: RichTextBlok,
  page_header: PageHeaderBlok,
  grid: GridBlok,
  grid_column: GridColumn,
  teaser: Teaser,
} as const

export default function DynamicBlokComponent({ blok }: Props): ReactElement {
  if (!components[blok.component]) {
    console.error(`Missing component: ${blok.component}.`)
    return <div>There is no component defined for type: {blok.component}.</div>
  }
  const Component: any = components[blok.component]
  return (
    <SbEditable content={blok}>
      <Component {...blok} />
    </SbEditable>
  )
}
