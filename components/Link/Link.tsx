import React, { ReactElement } from 'react'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import { TranslatedLink } from '../TranslatedLink'

type Props = LinkProps

export default function Link({ children, ...props }: Props): ReactElement {
  return (
    <TranslatedLink href={props.href} passHref>
      <ChakraLink {...props} color="orange.400" fontWeight="bold">
        {children}
      </ChakraLink>
    </TranslatedLink>
  )
}
