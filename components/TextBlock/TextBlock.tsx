import React, { PropsWithChildren, ReactElement } from 'react'
import { Box, BoxProps, Text } from '@chakra-ui/react'

interface Props
  extends Omit<
    BoxProps,
    'py' | 'px' | 'borderRadius' | 'borderStyle' | 'borderWidth'
  > {
  label?: string
  align?: 'center' | 'start'
}

export default function TextBlock({
  children,
  label,
  align = 'center',
  hidden,
  ...boxProps
}: PropsWithChildren<Props>): ReactElement {
  return (
    <Box
      {...boxProps}
      hidden={!children || hidden}
      display="flex"
      flexDir="column"
      alignItems={align}
      justifyContent="center"
      borderWidth={1}
      borderStyle="solid"
      borderRadius={5}
      py={[4, 8]}
      px={[6, 10]}
    >
      {label && (
        <Text mb={1} fontWeight="bold" fontSize={['lg', 'xl']}>
          {label}
        </Text>
      )}
      {children}
    </Box>
  )
}
