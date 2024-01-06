import { ReactElement } from 'react'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, HStack, Text } from '@chakra-ui/react'
import { SITE_NAME } from '../../../lib/domain'

export const FooterBottom = (): ReactElement => (
  <Container
    maxW="container.xl"
    p={5}
    display="flex"
    justifyContent="space-between"
  >
    <HStack alignItems="center" spacing={2}>
      <FontAwesomeIcon icon={faCopyright} />
      <Text>{new Date().getFullYear()}</Text>
      <Text>{SITE_NAME}</Text>
    </HStack>
    {/* <TranslatedLink href="/privacy-policy" passHref>
      <Link>Politika privatnosti</Link>
    </TranslatedLink> */}
  </Container>
)
