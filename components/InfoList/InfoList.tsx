import { Flex, Text, VStack } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { Link } from '../Link'

interface InfoItem {
  content: string
  label?: string
  href?: string
}

interface Props {
  items: InfoItem[]
}

export default function InfoList({ items }: Props): ReactElement {
  return (
    <VStack spacing={1} alignItems="flex-start">
      {items.map((item, i) => (
        <Flex key={i}>
          {item.label && (
            <Text fontWeight="bold" mr={1}>
              {item.label}:
            </Text>
          )}
          {item.href ? (
            <Link href={item.href}>{item.content}</Link>
          ) : (
            <Text>{item.content}</Text>
          )}
        </Flex>
      ))}
    </VStack>
  )
}
