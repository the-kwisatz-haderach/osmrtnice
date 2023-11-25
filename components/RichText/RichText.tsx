import parse from 'html-react-parser'
import { render } from 'storyblok-rich-text-react-renderer'
import { Box, BoxProps } from '@chakra-ui/react'
import { ISbRichtext } from '@storyblok/react'
import React, { ReactElement, PropsWithChildren } from 'react'

export type Props = PropsWithChildren<{ children: ISbRichtext | string }> &
  BoxProps

const RichText = ({ children, ...props }: Props): ReactElement =>
  typeof children === 'string' ? (
    <>{parse(children)}</>
  ) : (
    <Box {...props}>{render(children)}</Box>
  )

export default RichText
