import React, { PropsWithChildren, ReactElement } from 'react'
import { LinkProps } from 'next/link'
import { Link as ChakraLink } from '@chakra-ui/react'
import { TranslatedLink } from '../TranslatedLink'

type Props = LinkProps & {
  onClick?: () => void
  bold?: boolean
}

export default function Link({
  children,
  href,
  onClick,
  bold,
  ...props
}: PropsWithChildren<Props>): ReactElement {
  return (
    <TranslatedLink {...props} href={href} passHref>
      <ChakraLink
        color="brand.500"
        fontWeight={bold ? 600 : 400}
        onClick={
          onClick
            ? (e) => {
                e.preventDefault()
                onClick()
              }
            : undefined
        }
      >
        {children}
      </ChakraLink>
    </TranslatedLink>
  )
}
