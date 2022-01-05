import React, { PropsWithChildren, ReactElement } from 'react'
import { LinkProps } from 'next/link'
import { Link as ChakraLink } from '@chakra-ui/react'
import { TranslatedLink } from '../TranslatedLink'

type Props = LinkProps

export default function Link({
  children,
  href,
  ...props
}: PropsWithChildren<Props>): ReactElement {
  return (
    <TranslatedLink {...props} href={href} passHref>
      <ChakraLink color="orange.400" fontWeight="bold">
        {children}
      </ChakraLink>
    </TranslatedLink>
  )
}
