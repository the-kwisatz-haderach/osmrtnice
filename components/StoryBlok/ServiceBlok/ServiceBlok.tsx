import React, { ReactElement } from 'react'
import Image from 'next/image'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { BlokType, IService } from '../../../lib/storyblok/types'
import { storyblokEditable } from '@storyblok/react'

export default function ServiceBlok({
  blok,
}: {
  blok: BlokType<IService>
}): ReactElement {
  const { title, description, image } = blok
  return (
    <Flex
      {...storyblokEditable(blok)}
      flexDir={['column', 'column', 'row-reverse']}
      alignItems={['center']}
    >
      {image.filename && (
        <Box
          ml={{ md: 10 }}
          mb={[6, 6, 0]}
          width={300}
          height={200}
          position="relative"
          boxShadow="xl"
        >
          <Image
            src={
              image.filename.startsWith('http')
                ? image.filename
                : `https:${image.filename}`
            }
            alt={image.alt}
            title={image.title}
            width={300}
            height={200}
            layout="responsive"
          />
        </Box>
      )}
      <Box flex={1}>
        <Heading as="h3" mb={2}>
          {title}
        </Heading>
        <Text>{description}</Text>
      </Box>
    </Flex>
  )
}
