import { IObituary } from 'lib/domain/types'
import NextImage from 'next/image'
import { useState } from 'react'

interface Props {
  img: IObituary['image']
}

const getImgSrc = (img: Props['img']): string =>
  typeof img === 'string' ? img : img?.filename

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
      alt={typeof img === 'string' ? undefined : img?.alt}
      objectFit="cover"
      layout="fill"
      placeholder="blur"
      blurDataURL="/images/placeholder-person.png"
      onError={() => setSrc('/images/placeholder-obit-image.jpeg')}
    />
  )
}
