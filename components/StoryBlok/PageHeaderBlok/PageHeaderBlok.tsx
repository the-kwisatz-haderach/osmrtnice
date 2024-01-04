import React, { ReactElement } from 'react'
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { BlokType, IPageHeader } from '../../../lib/storyblok/types'
import { storyblokEditable } from '@storyblok/react'

export default function PageHeaderBlok({
  blok,
}: {
  blok: BlokType<IPageHeader>
}): ReactElement {
  const { title, subtitle, align = 'left', image, height, action_label } = blok
  return (
    <Box
      {...storyblokEditable(blok)}
      color="white"
      minHeight={height === 'large' ? '60vh' : '40vh'}
      backgroundAttachment="fixed"
      backgroundSize={{ base: 'unset', md: 'cover' }}
      bgImage={
        image?.filename
          ? `linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7) 95%), url(${image.filename})`
          : undefined
      }
    >
      <Container maxW="container.xl" height="100%">
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          py={10}
        >
          <Box
            width="100%"
            maxWidth={{ base: '100%', md: '800px' }}
            textAlign={align}
          >
            <Heading mb="1rem" as="h1" fontSize={['4xl', '6xl', '6xl', '8xl']}>
              {title}
            </Heading>
            {subtitle && (
              <Text mt={4} fontSize={['lg', 'xl', 'xl', '2xl']}>
                {subtitle}
              </Text>
            )}
          </Box>
          {action_label && <Button mt={10}>{action_label}</Button>}
        </Flex>
      </Container>
    </Box>
  )
}
