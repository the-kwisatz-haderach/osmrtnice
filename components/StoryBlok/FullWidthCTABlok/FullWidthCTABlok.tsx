import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { RichText } from '../../RichText'
import { LinkField } from '../../../lib/storyblok/common/types'
import { Box, Button, HStack, Text } from '@chakra-ui/react'
import { ISbRichtext, storyblokEditable } from '@storyblok/react'
import { BlokType } from 'lib/storyblok/types'
import { Contained } from 'components/Contained/Contained'

interface Props {
  blok: BlokType<{
    title: string
    body: ISbRichtext
    ctaLabel: string
    ctaHref: LinkField
    align: 'center' | 'flex-start'
  }>
}

export default function FullWidthCTABlok({ blok }: Props): ReactElement {
  const { title, body, ctaLabel, ctaHref, align = 'center' } = blok
  const router = useRouter()

  const onClickCTA = async (): Promise<void> => {
    await router.push(ctaHref.cached_url)
  }

  return (
    <Box {...storyblokEditable(blok)} backgroundColor="brand.400">
      <Contained
        color="white"
        py={{ base: 8, lg: 12 }}
        display="flex"
        flexDir="column"
        alignItems={align}
        justifyContent="center"
      >
        <Box>
          <Text
            as="h2"
            flex={1}
            fontSize={['xl', '2xl', '4xl']}
            fontWeight="bold"
            mb={{ base: 2, md: 2 }}
          >
            {title}
          </Text>
          <HStack spacing={{ md: 4 }} wrap="wrap">
            <RichText
              mr={{ base: 0, lg: 4 }}
              mb={[4, 4, 0]}
              fontSize={{ base: 'md', lg: 'xl' }}
              richText={body}
            />
            <Button colorScheme="brand" onClick={onClickCTA}>
              {ctaLabel}
            </Button>
          </HStack>
        </Box>
      </Contained>
    </Box>
  )
}
