import React, { ReactElement } from 'react'
import SbEditable from 'storyblok-react'
import { RichTextBlok } from '../RichTextBlok'
import { PageHeaderBlok } from '../PageHeaderBlok'
import { GridBlok } from '../GridBlok'
import { GridColumn } from '../GridColumn'
import { Teaser } from '../Teaser'
import { FullWidthCTABlok } from '../FullWidthCTABlok'
import { ServiceBlok } from '../ServiceBlok'
import { ListBlok } from '../ListBlok'
import { StoryBlokComponent } from '../../../lib/storyblok/types'

export interface Props {
  blok: StoryBlokComponent
}

const components = {
  rich_text: RichTextBlok,
  page_header: PageHeaderBlok,
  grid: GridBlok,
  grid_column: GridColumn,
  teaser: Teaser,
  full_width_cta: FullWidthCTABlok,
  service: ServiceBlok,
  list: ListBlok,
} as const

export default function DynamicBlokComponent({ blok }: Props): ReactElement {
  if (!components[blok.component]) {
    console.error(`Missing component: ${blok.component}.`)
    return <div>There is no component defined for type: {blok.component}.</div>
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component: any = components[blok.component]
  return (
    <SbEditable content={blok}>
      <Component {...blok} />
    </SbEditable>
  )
}
