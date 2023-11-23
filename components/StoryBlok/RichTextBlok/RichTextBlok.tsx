import React, { ReactElement } from 'react'
import type { Richtext } from 'storyblok-js-client'
import { RichText } from '../../RichText'

export default function RichTextBlok({
  text,
}: {
  text: Richtext
}): ReactElement {
  return <RichText>{text}</RichText>
}
