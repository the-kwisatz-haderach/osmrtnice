import { Box, BoxProps } from '@chakra-ui/react'
import React, { ReactElement, PropsWithChildren } from 'react'
import { Richtext } from 'storyblok-js-client'
import Storyblok from '../../lib/storyblok/client'

export type Props = PropsWithChildren<{ children: Richtext }> & BoxProps

const RichText: React.FC<Props> = ({ children, ...props }): ReactElement => {
  const richText = Storyblok.richTextResolver.render(children)
  return (
    <Box
      {...props}
      dangerouslySetInnerHTML={{
        __html: richText,
      }}
    />
  )
}

export default RichText
