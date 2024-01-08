import React, { ReactElement } from 'react'
import Image from 'next/image'
import { Box, StackProps, Text, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

interface Props extends StackProps {
  title: string
  description: string
  icon?: 'warn' | 'no-results'
}

const getIcon = (icon: Props['icon']) => {
  switch (icon) {
    case 'warn':
      return (
        <FontAwesomeIcon
          color="rgba(0,0,0,0.8)"
          size="8x"
          icon={faExclamationTriangle}
        />
      )
    case 'no-results':
      return (
        <Box opacity={0.15} width={[150, 180, 200]} height={[150, 180, 200]}>
          <Image alt="" src="/images/no-results.png" fill />
        </Box>
      )
    default:
      return undefined
  }
}

export default function EmptyState({
  title,
  description,
  icon,
  ...stackProps
}: Props): ReactElement {
  return (
    <VStack {...stackProps} spacing={0} py={8} color="blackAlpha.500">
      {icon && (
        <Box mb={5} position="relative">
          {getIcon(icon)}
        </Box>
      )}
      <Text fontWeight="500" fontSize={['lg', 'xl', '4xl']}>
        {title}
      </Text>
      <Text fontSize={['md', 'md', 'lg']}>{description}</Text>
    </VStack>
  )
}
