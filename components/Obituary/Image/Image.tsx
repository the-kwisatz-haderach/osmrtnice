import { useState } from 'react'
import NextImage, { ImageProps } from 'next/image'

interface Props extends Omit<ImageProps, 'src' | 'onError'> {
  imgSrc: string
  placeholderImgSrc: string
}

export const Image = ({
  imgSrc,
  placeholderImgSrc,
  ...nextImageProps
}: Props) => {
  const [src, setSrc] = useState(
    imgSrc
      ? imgSrc.startsWith('http')
        ? imgSrc
        : `https:${imgSrc}`
      : '/images/placeholder-obit-image.jpeg'
  )
  return (
    <NextImage
      {...nextImageProps}
      src={src}
      layout="fill"
      placeholder="blur"
      blurDataURL="/images/placeholder-person.png"
      onError={() => setSrc(placeholderImgSrc)}
    />
  )
}
