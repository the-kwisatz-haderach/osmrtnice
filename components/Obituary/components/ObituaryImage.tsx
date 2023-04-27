import NextImage from 'next/image'
import { useState } from 'react'

interface Props {
  imgSrc: string
}

export const ObituaryImage = ({ imgSrc }: Props) => {
  const [src, setSrc] = useState(
    imgSrc
      ? imgSrc.startsWith('http')
        ? imgSrc
        : `https:${imgSrc}`
      : '/images/placeholder-obit-image.jpeg'
  )
  return (
    <NextImage
      src={src}
      objectFit="cover"
      layout="fill"
      placeholder="blur"
      blurDataURL="/images/placeholder-person.png"
      onError={() => setSrc('/images/placeholder-obit-image.jpeg')}
    />
  )
}
