import React, { ReactElement } from 'react'
import NextLink from 'next/link'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

type Props = LinkProps

export default function Link({ children, ...props }: Props): ReactElement {
  return (
    <NextLink href={props.href} passHref>
      <ChakraLink {...props} color="orange.400" fontWeight="bold">
        {children}
      </ChakraLink>
    </NextLink>
  )
}
