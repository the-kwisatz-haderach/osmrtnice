import { ReactElement } from 'react'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, HStack, Link, Text } from '@chakra-ui/react'
import { SITE_NAME } from '../../../lib/domain'
import { TranslatedLink } from '../../TranslatedLink'

export const FooterBottom = (): ReactElement => (
  <Container
    maxW="container.xl"
    p={5}
    display="flex"
    justifyContent="space-between"
  >
    <HStack alignItems="center" spacing={4}>
      <FontAwesomeIcon icon={faCopyright} />
      <Text ml={2}>{new Date().getFullYear()}</Text>
      <Text ml={2}>{SITE_NAME}</Text>
    </HStack>
    <TranslatedLink href="/privacy-policy" passHref>
      <Link>Politika privatnosti</Link>
    </TranslatedLink>
  </Container>
)
