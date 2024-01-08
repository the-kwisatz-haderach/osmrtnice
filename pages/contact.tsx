import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'
import { ContactForm } from '../components/Forms/ContactForm'
import { PageStory } from '../lib/storyblok/types'
import { faInfoCircle as infoIcon } from '@fortawesome/free-solid-svg-icons'
import useAppContext from 'contexts/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { REVALIDATE_TIME_SECONDS, STORYBLOK_VERSION } from 'lib/constants'
import {
  getStoryblokApi,
  StoryblokComponent,
  useStoryblokState,
} from '@storyblok/react'
import { ContactInfo } from 'components/ContactInfo'

interface Props {
  story: PageStory
}

export default function Contact({ story: initialStory }: Props): ReactElement {
  const story = useStoryblokState(initialStory)
  const { t } = useTranslation()
  const {
    ingress,
    phone,
    email,
    showInfoBlock,
    infoBlockText,
  } = useAppContext()
  return (
    <div>
      <StoryblokComponent blok={story.content} />
      <Container my={10} maxW="container.xl">
        <Stack
          direction={['column', 'column', 'row']}
          alignItems="flex-start"
          justifyContent="center"
          spacing={6}
        >
          <Stack spacing={6} w={['100%', '100%', '350px']}>
            {showInfoBlock && (
              <Box
                flexDirection="column"
                borderRadius={4}
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                p={8}
                color="white"
                backgroundColor="brand.400"
              >
                <FontAwesomeIcon icon={infoIcon} size="3x" />
                <Text mt={4}>{infoBlockText}</Text>
              </Box>
            )}
            <Box
              backgroundColor="gray.50"
              p={8}
              height="fit-content"
              borderRadius={4}
              borderColor="gray.200"
              borderStyle="solid"
              borderWidth={1}
            >
              <Heading as="h3" size="xl" mb={4}>
                {t('contact-details')}
              </Heading>
              <Text mb="2">{ingress}</Text>
              <ContactInfo email={email} phoneNumbers={phone.split(/,\s+/)} />
            </Box>
          </Stack>
          <ContactForm />
        </Stack>
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const storyblokApi = getStoryblokApi()
  const story = await storyblokApi.getStory('contact', {
    version: STORYBLOK_VERSION,
    language: locale,
  })
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      story: story.data.story,
    },
    revalidate: REVALIDATE_TIME_SECONDS,
  }
}
