import { GridItem } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { IGridColumn } from '../../../lib/storyblok/types'
import { DynamicBlokComponent } from '../DynamicBlokComponent'

export default function GridColumn({
  content,
  col_span,
}: IGridColumn): ReactElement {
  return (
    <GridItem colSpan={col_span}>
      {content.map((blok) => (
        <DynamicBlokComponent key={blok._uid} blok={blok} />
      ))}
    </GridItem>
  )
}
