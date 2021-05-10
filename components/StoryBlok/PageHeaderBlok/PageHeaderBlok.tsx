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
    <div className="bg-primary-800 text-white">
      <div className="contained p-10">
        <h1 className="relative right-1">{title}</h1>
        {subtitle && <p className="subtitle">{subtitle}</p>}
      </div>
    </div>
  )
}
