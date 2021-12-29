import React, { ReactElement } from 'react'
import Image from 'next/image'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { IService } from '../../../lib/storyblok/types'

export default function ServiceBlok({
  title,
  description,
  image,
}: IService): ReactElement {
  return (
    <Flex flexDir={['column', 'column', 'row-reverse']}>
      {image.filename && (
        <Box
          ml={{ md: 10 }}
          mb={[6, 6, 0]}
          width={300}
          height={200}
          position="relative"
          boxShadow="0px 20px 30px -15px #000000cc"
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
