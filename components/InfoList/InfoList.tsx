import { HStack, Text, VStack, Link as ChakraLink } from '@chakra-ui/react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactElement } from 'react'
import { Link } from '../Link'

interface InfoItem {
  content: string
  label?: string
  href?: string
  icon?: IconDefinition
  isMailto?: boolean
}

interface Props {
  items: InfoItem[]
}

export default function InfoList({ items }: Props): ReactElement {
  return (
    <VStack spacing={2} alignItems="flex-start">
      {items.map((item, i) => (
        <HStack key={i} wrap="wrap">
          {item.icon && <FontAwesomeIcon icon={item.icon} />}
          {item.label && <Text fontWeight="bold">{item.label}:</Text>}
          {item.href ? (
            !item.isMailto ? (
              <Link href={item.href}>{item.content}</Link>
            ) : (
              <ChakraLink
                color="brand.400"
                isExternal
                rel="noopener noreferrer"
                href={item.href}
              >
                {item.content}
              </ChakraLink>
            )
          ) : (
            <Text>{item.content}</Text>
          )}
        </HStack>
      ))}
    </VStack>
  )
}
