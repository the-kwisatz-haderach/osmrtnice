import React, { ReactElement } from 'react'

interface Props {
  title: string
  subtitle?: string
}

export default function PageHeaderBlok({
  title,
  subtitle,
}: Props): ReactElement {
  return (
    <div className="bg-primary-800 p-10 text-white">
      <h1 className="relative right-1">{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  )
}
