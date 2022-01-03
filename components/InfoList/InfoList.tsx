import { HStack, Text, VStack } from '@chakra-ui/react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'
import { Link } from '../Link'

interface InfoItem {
  content: string
  label?: string
  href?: string
  icon?: IconDefinition
}

interface Props {
  items: InfoItem[]
}

export default function InfoList({ items }: Props): ReactElement {
  return (
    <VStack spacing={2} alignItems="flex-start">
      {items.map((item, i) => (
        <HStack key={i}>
          {item.icon && <FontAwesomeIcon icon={item.icon} />}
          {item.label && <Text fontWeight="bold">{item.label}:</Text>}
          {item.href ? (
            <Link href={item.href}>{item.content}</Link>
          ) : (
            <Text>{item.content}</Text>
          )}
        </HStack>
      ))}
    </VStack>
  )
}
