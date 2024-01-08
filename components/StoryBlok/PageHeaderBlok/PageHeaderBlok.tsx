import React, { ReactElement } from 'react'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { BlokType, IPageHeader } from '../../../lib/storyblok/types'
import { storyblokEditable } from '@storyblok/react'
import { Contained } from 'components/Contained/Contained'
import Image from 'next/image'

export default function PageHeaderBlok({
  blok,
}: {
  blok: BlokType<IPageHeader>
}): ReactElement {
  const {
    title,
    align = 'left',
    subtitle,
    image,
    height,
    action_label,
    prefix = '',
  } = blok
  return (
    <Box
      {...storyblokEditable(blok)}
      color="white"
      height="100%"
      minH={
        height === 'large'
          ? { base: '400px', md: '600px' }
          : { base: '300px', md: '400px' }
      }
      display="flex"
      alignItems={align === 'center' ? 'center' : 'flex-end'}
      justifyContent={align}
      backgroundAttachment="fixed"
      backgroundPosition="center"
      backgroundSize={{ base: 'unset', md: 'cover' }}
      bgImage={
        image?.filename
          ? `linear-gradient(to top, rgba(0, 0, 0, 0.4) 90%, transparent), url(${image.filename})`
          : undefined
      }
    >
      <Contained py={[8, 10, 12, 14, 16]}>
        <Box
          textAlign={align}
          width="100%"
          display="flex"
          flexDir="column"
          alignItems={align}
          margin={align === 'center' ? 'auto' : 'unset'}
          maxWidth={{ base: '600px', lg: '800px', xl: '1000px' }}
        >
          {prefix && (
            <>
              <Text
                borderBottomStyle="solid"
                borderBottomWidth={{ base: 1, md: 2 }}
                borderBottomColor="rgba(255,255,255,0.7)"
                width="fit-content"
                fontWeight="600"
                mb={[1, 2]}
                pl={align === 'center' ? 3 : 0}
                pr={3}
                pb={1}
                fontSize={['sm', 'md', 'lg', 'xl', '2xl']}
              >
                {prefix}
              </Text>
            </>
          )}
          <Heading
            as="h1"
            lineHeight={1}
            fontSize={['5xl', '6xl', '7xl', '8xl', '9xl']}
          >
            {title}
          </Heading>
          {subtitle && (
            <Text
              mt={align === 'center' ? [4, 6, 8] : 2}
              fontSize={['md', 'lg', 'xl', '2xl', '3xl']}
            >
              {subtitle}
            </Text>
          )}
          {action_label && <Button mt={10}>{action_label}</Button>}
        </Box>
      </Contained>
    </Box>
  )
}
