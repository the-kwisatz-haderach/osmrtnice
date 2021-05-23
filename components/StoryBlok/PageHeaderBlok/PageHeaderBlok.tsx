import React, { ReactElement } from 'react'
import { IPageHeader } from '../../../lib/storyblok/types'
import { Button } from '../../Button'

export default function PageHeaderBlok({
  title,
  subtitle,
  align = 'left',
  image,
  height,
  action_label,
}: IPageHeader): ReactElement {
  return (
    <div
      className="bg-gradient-to-b from-primary-900 to-primary-700 text-white"
      style={{
        height: height === 'large' ? '75vh' : '40vh',
        backgroundImage: image
          ? `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2)), url(${image.filename}) `
          : undefined,
      }}
    >
      <div className="contained flex flex-col items-center justify-center h-full">
        <div
          className="px-10 pb-10 mt-20 w-full"
          style={{
            textAlign: align,
          }}
        >
          <h1 className="relative right-1">{title}</h1>
          {subtitle && <p className="subtitle mt-5">{subtitle}</p>}
        </div>
        {action_label && <Button>{action_label}</Button>}
      </div>
    </div>
  )
}
