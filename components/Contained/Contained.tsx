import { Container, ContainerProps } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
} & Omit<ContainerProps, 'px' | 'maxW' | 'maxWidth' | 'p'>

export function Contained({ children, ...props }: Props) {
  return (
    <Container
      py={2}
      {...props}
      maxW="container.xl"
      height="100%"
      px={[4, 6, 8, 10, 0]}
    >
      {children}
    </Container>
  )
}
