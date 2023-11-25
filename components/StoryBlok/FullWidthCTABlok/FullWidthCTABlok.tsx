import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { RichText } from '../../RichText'
import { LinkField } from '../../../lib/storyblok/common/types'
import { Box, Button, Container, HStack, Text } from '@chakra-ui/react'
import { ISbRichtext, storyblokEditable } from '@storyblok/react'
import { BlokType } from 'lib/storyblok/types'

interface Props {
  blok: BlokType<{
    title: string
    body: ISbRichtext
    ctaLabel: string
    ctaHref: LinkField
  }>
}

export default function FullWidthCTABlok({ blok }: Props): ReactElement {
  const { title, body, ctaLabel, ctaHref } = blok
  const router = useRouter()

  const onClickCTA = async (): Promise<void> => {
    await router.push(ctaHref.cached_url)
  }

  return (
    <Box {...storyblokEditable(blok)} backgroundColor="brand.400">
      <Container
        maxW="container.xl"
        color="white"
        py={[6, 8, 14]}
        px={8}
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Text
            flex={1}
            fontSize={['xl', '2xl', '4xl']}
            fontWeight="bold"
            mb={2}
          >
            {title}
          </Text>
          <HStack spacing={{ md: 8 }} wrap="wrap">
            <Box mb={[4, 4, 0]}>
              <RichText richText={body} />
            </Box>
            <Button colorScheme="brand" onClick={onClickCTA}>
              {ctaLabel}
            </Button>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}
