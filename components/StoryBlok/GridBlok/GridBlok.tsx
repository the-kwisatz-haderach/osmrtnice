import React, { ReactElement } from 'react'
import cx from 'classnames'
import { Grid } from '../../../lib/types'
import { DynamicBlokComponent } from '../DynamicBlokComponent'
import styles from './GridBlok.module.css'

export default function GridBlok({
  columns,
  grid_gap,
  col_count,
}: Grid): ReactElement {
  const className = cx('contained p-10 grid', styles.grid)
  return (
    <div
      className={className}
      style={{
        gridTemplateColumns: `repeat(${col_count}, 1fr)`,
        gap: `${grid_gap}px`,
      }}
    >
      {columns.map((col) => (
        <DynamicBlokComponent key={col._uid} blok={col} />
      ))}
    </div>
  )
}
