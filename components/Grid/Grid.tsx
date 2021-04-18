import React, { PropsWithChildren, ReactElement } from 'react'
import cx from 'classnames'
import styles from './Grid.module.css'

export default function Grid({
  children,
  className,
  ...props
}: PropsWithChildren<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>): ReactElement {
  return (
    <div {...props} className={cx(styles.gridContainer, className)}>
      {children}
    </div>
  )
}
