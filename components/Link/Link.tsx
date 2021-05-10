import React, { HTMLAttributes, ReactElement } from 'react'
import NextLink, { LinkProps } from 'next/link'
import cx from 'classnames'

interface Props extends React.PropsWithChildren<LinkProps> {
  className?: HTMLAttributes<HTMLSpanElement>['className']
}

export default function Link({
  children,
  className,
  ...props
}: Props): ReactElement {
  return (
    <span
      className={cx(
        className,
        'underline hover:no-underline text-primary-800 font-bold'
      )}
    >
      <NextLink {...props}>{children}</NextLink>
    </span>
  )
}
