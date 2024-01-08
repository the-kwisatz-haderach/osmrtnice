import { Container, ContainerProps, forwardRef } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & Omit<ContainerProps, 'px' | 'maxW' | 'maxWidth' | 'p'>

export const Contained = forwardRef(({ children, ...props }: Props, ref) => {
  return (
    <Container
      ref={ref}
      py={2}
      {...props}
      maxW="container.xl"
      height="100%"
      px={[4, 6, 8, 10, 0]}
    >
      {children}
    </Container>
  )
})
