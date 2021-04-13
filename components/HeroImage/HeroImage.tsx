import React, { ReactElement } from 'react'
import Image from 'next/image'

interface Props {}

export default function HeroImage({}: Props): ReactElement {
  return (
    <Image width={3000} height={2000} src="https://picsum.photos/2000/3000" />
  )
}
