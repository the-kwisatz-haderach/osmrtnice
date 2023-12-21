import { getImgSrc } from 'lib/domain/getImgSrc'
import { IObituary } from 'lib/domain/types'
import NextImage from 'next/image'
import { useState } from 'react'

interface Props {
  img: IObituary['image']
}

export const ObituaryImage = ({ img }: Props) => {
  const [src, setSrc] = useState(() => {
    const imgSrc = getImgSrc(img)
    return imgSrc
      ? imgSrc.startsWith('http')
        ? imgSrc
        : `https:${imgSrc}`
      : '/images/placeholder-obit-image.jpeg'
  })
  return (
    <NextImage
      src={src}
      alt={typeof img === 'string' ? '' : img?.alt}
      style={{
        objectFit: 'cover',
      }}
      fill
      placeholder="blur"
      blurDataURL="/images/placeholder-person.png"
      onError={() => setSrc('/images/placeholder-obit-image.jpeg')}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
