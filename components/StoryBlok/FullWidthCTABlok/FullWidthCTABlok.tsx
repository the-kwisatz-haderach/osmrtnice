import React, { ReactElement } from 'react'
import { Richtext } from 'storyblok-js-client'
import { useRouter } from 'next/router'
import { RichText } from '../../RichText'
import { LinkField } from '../../../lib/storyblok/common/types'
import { Box, Button, Container, Flex, HStack, Text } from '@chakra-ui/react'

interface Props {
  title: string
  body: Richtext
  ctaLabel: string
  ctaHref: LinkField
}

export default function FullWidthCTABlok({
  title,
  body,
  ctaLabel,
  ctaHref,
}: Props): ReactElement {
  const router = useRouter()

  const onClickCTA = async (): Promise<void> => {
    await router.push(ctaHref.cached_url)
  }

  return (
    <Box backgroundColor="orange.400">
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
              <RichText>{body}</RichText>
            </Box>
            <Button colorScheme="orange" onClick={onClickCTA}>
              {ctaLabel}
            </Button>
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}
