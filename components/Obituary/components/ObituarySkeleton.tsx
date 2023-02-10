import React, { ReactElement } from 'react'
import { Box, Skeleton, SkeletonText, VStack } from '@chakra-ui/react'

export const ObituarySkeleton = (): ReactElement => {
  return (
    <Box
      height="100%"
      minH="280px"
      borderColor="gray.200"
      borderWidth={1}
      borderStyle="solid"
      borderRadius="sm"
    >
      <VStack p={6} flexDir="column" spacing={3} h="100%">
        <SkeletonText
          startColor="orange.200"
          endColor="orange.400"
          noOfLines={1}
          width="50%"
        />
        <Skeleton
          startColor="orange.200"
          endColor="orange.400"
          width={140}
          height={140}
          style={{ marginTop: 16, marginBottom: 16 }}
        />
        <SkeletonText
          startColor="orange.200"
          endColor="orange.400"
          noOfLines={1}
          width="30%"
          style={{ marginBottom: 16 }}
        />
        <SkeletonText
          startColor="orange.200"
          endColor="orange.400"
          noOfLines={6}
          spacing={3}
          width="100%"
        />
      </VStack>
    </Box>
  )
}
