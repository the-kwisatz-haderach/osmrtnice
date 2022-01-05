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
    <div>
      {image.filename !== '' && (
        <div>
          <Image
            alt={image.alt}
            title={image.title}
            src={image.filename}
            layout="fill"
          />
        </div>
      )}
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
        {link.url !== '' && <Link href={link.url}>Read more</Link>}
      </div>
    </div>
  )
}
