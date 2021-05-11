import React, { ReactElement } from 'react'
import { IGridColumn } from '../../../lib/types'
import { DynamicBlokComponent } from '../DynamicBlokComponent'

export default function GridColumn({
  content,
  col_span,
}: IGridColumn): ReactElement {
  return (
    <div
      style={{
        gridColumnStart: `span ${col_span}`,
      }}
    >
      {content.map((blok) => (
        <DynamicBlokComponent key={blok._uid} blok={blok} />
      ))}
    </div>
  )
}
