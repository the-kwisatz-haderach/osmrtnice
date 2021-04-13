import React, { PropsWithChildren, ReactElement } from 'react'

interface Props {}

export default function Grid({
  children,
}: PropsWithChildren<Props>): ReactElement {
  return <div className="grid gap-7 grid-cols-4">{children}</div>
}
