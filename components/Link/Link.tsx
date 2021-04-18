import React, { HTMLAttributes, ReactElement } from 'react'
import { default as NextLink, LinkProps } from 'next/link'
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
        'text-secondary-900 underline hover:no-underline'
      )}
    >
      <NextLink {...props}>{children}</NextLink>
    </span>
  )
}
