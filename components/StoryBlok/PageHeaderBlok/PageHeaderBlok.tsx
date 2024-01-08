import React, { ReactElement } from 'react'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { BlokType, IPageHeader } from '../../../lib/storyblok/types'
import { storyblokEditable } from '@storyblok/react'
import { Contained } from 'components/Contained/Contained'

export default function PageHeaderBlok({
  blok,
}: {
  blok: BlokType<IPageHeader>
}): ReactElement {
  const { title, align = 'left', subtitle, image, height, action_label } = blok
  return (
    <Box
      {...storyblokEditable(blok)}
      color="white"
      minH={
        height === 'large'
          ? { base: '400px', md: '600px' }
          : { base: '300px', md: '400px' }
      }
      display="flex"
      alignItems={align === 'center' ? 'center' : 'flex-end'}
      justifyContent={align}
      backgroundPosition="center"
      backgroundAttachment="fixed"
      backgroundSize={{ base: 'unset', md: 'cover' }}
      bgImage={
        image?.filename
          ? `linear-gradient(to top, rgba(0, 0, 0, 0.4) 90%, transparent), url(${image.filename})`
          : undefined
      }
    >
      <Contained py={[8, 10, 12, 14]}>
        <Box
          textAlign={align}
          width="100%"
          margin={align === 'center' ? 'auto' : 'unset'}
          maxWidth={{ base: '600px', lg: '800px', xl: '1000px' }}
        >
          <Heading as="h1" fontSize={['4xl', '6xl', '7xl', '8xl', '9xl']}>
            {title}
          </Heading>
          {subtitle && (
            <Text mt={2} fontSize={['lg', 'lg', 'xl', '2xl', '3xl']}>
              {subtitle}
            </Text>
          )}
          {action_label && <Button mt={10}>{action_label}</Button>}
        </Box>
      </Contained>
    </Box>
  )
}
