import React, { ReactElement } from 'react'

interface Props {
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export default function PageHeaderBlok({
  title,
  subtitle,
  align = 'left',
}: Props): ReactElement {
  return (
    <div
      className="bg-gradient-to-b from-primary-900 to-primary-700 text-white"
      style={{
        height: '50vh',
      }}
    >
      <div className="contained flex items-end justify-start h-full">
        <div
          className="px-10 pb-10 pt-20 w-full"
          style={{
            textAlign: align,
          }}
        >
          <h1 className="relative right-1">{title}</h1>
          {subtitle && <p className="subtitle relative left-2">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}
