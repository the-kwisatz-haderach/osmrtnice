import { GridItem } from '@chakra-ui/react'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react'
import React, { ReactElement } from 'react'
import { BlokType, IGridColumn } from '../../../lib/storyblok/types'

export default function GridColumn({
  blok,
}: {
  blok: BlokType<IGridColumn>
}): ReactElement {
  const { content, col_span } = blok
  return (
    <GridItem {...storyblokEditable(blok)} colSpan={col_span}>
      {content.map((blok) => (
        <StoryblokComponent key={blok._uid} blok={blok} />
      ))}
    </GridItem>
  )
}
