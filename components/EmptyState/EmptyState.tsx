import React, { ReactElement } from 'react'
import { Box, StackProps, Text, VStack } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

interface Props extends StackProps {
  title: string
  description: string
  icon?: 'warn'
}

const getIcon = (icon: Props['icon']) => {
  switch (icon) {
    case 'warn':
      return faExclamationTriangle
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
    <VStack {...stackProps} spacing={0}>
      {icon && (
        <Box mb={4}>
          <FontAwesomeIcon
            color="rgba(0,0,0,0.8)"
            size="8x"
            icon={getIcon(icon)}
          />
        </Box>
      )}
      <Text fontSize="4xl">{title}</Text>
      <Text fontSize="lg">{description}</Text>
    </VStack>
  )
}