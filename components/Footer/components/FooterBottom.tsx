import { ReactElement } from 'react'
import NextLink from 'next/link'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Flex, Link, Text } from '@chakra-ui/react'

export const FooterBottom = (): ReactElement => (
  <Container
    maxW="container.xl"
    p={5}
    display="flex"
    justifyContent="space-between"
  >
    <Flex alignItems="center">
      <FontAwesomeIcon icon={faCopyright} />
      <Text ml={2}>Osmrtnice</Text>
    </Flex>
    <NextLink href="/privacy-policy" passHref>
      <Link>Privacy policy</Link>
    </NextLink>
  </Container>
)
