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
        <div
          style={{
            opacity: 0.2,
          }}
        >
          <Image src="/images/no-results.png" width={200} height={200} />
        </div>
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
    <VStack {...stackProps} spacing={0} color="blackAlpha.900">
      {icon && (
        <Box mb={4} position="relative">
          {getIcon(icon)}
        </Box>
      )}
      <Text fontSize="4xl">{title}</Text>
      <Text fontSize="lg">{description}</Text>
    </VStack>
  )
}
