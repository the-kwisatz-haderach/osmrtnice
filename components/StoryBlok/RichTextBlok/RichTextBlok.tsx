import { ISbRichtext, storyblokEditable } from '@storyblok/react'
import { BlokType } from 'lib/storyblok/types'
import React, { ReactElement } from 'react'
import { RichText } from '../../RichText'

export default function RichTextBlok({
  blok,
}: {
  blok: BlokType<ISbRichtext>
}): ReactElement {
  const { text } = blok
  return <RichText {...storyblokEditable(blok)} richText={text} />
}
