import React, { ReactElement } from 'react'
import Image from 'next/image'
import { Link } from '../../Link'
import { ITeaser } from '../../../lib/storyblok/types'

export default function Teaser({
  title,
  description,
  image,
  link,
}: ITeaser): ReactElement {
  return (
    <div className="flex flex-col">
      {image.filename !== '' && (
        <div className="relative w-full h-80 mb-3">
          <Image
            alt={image.alt}
            title={image.title}
            src={image.filename}
            layout="fill"
          />
        </div>
      )}
      <div className="leading-10">
        <h4 className="text-4xl">{title}</h4>
        <p>{description}</p>
        {link.url !== '' && (
          <Link className="float-right -mb-2" href={link.url}>
            Read more
          </Link>
        )}
      </div>
    </div>
  )
}
