import parse from 'html-react-parser'
import { render } from 'storyblok-rich-text-react-renderer'
import { Box, BoxProps } from '@chakra-ui/react'
import { ISbRichtext } from '@storyblok/react'
import React, { ReactElement } from 'react'

export type Props = BoxProps & {
  richText: ISbRichtext | string
}

const RichText = ({ children, richText, ...props }: Props): ReactElement =>
  typeof richText === 'string' ? (
    <>{parse(richText)}</>
  ) : (
    <Box {...props}>{render(richText)}</Box>
  )

export default RichText
