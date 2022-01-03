import React, { ReactElement } from 'react'
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { IPageHeader } from '../../../lib/storyblok/types'

export default function PageHeaderBlok({
  title,
  subtitle,
  align = 'left',
  image,
  height,
  action_label,
}: IPageHeader): ReactElement {
  return (
    <Box
      color="white"
      height={height === 'large' ? '65vh' : '40vh'}
      backgroundAttachment="fixed"
      backgroundImage={
        image?.filename
          ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.9) 5%, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7) 95%),
        url(${image.filename})`
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
          <Box width="100%" textAlign={align}>
            <Heading as="h1" fontSize={['4xl', '6xl', '6xl', '8xl']}>
              {title}
            </Heading>
            {subtitle && (
              <Text mt={4} fontSize={['lg', 'xl', 'xl', '3xl']}>
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
