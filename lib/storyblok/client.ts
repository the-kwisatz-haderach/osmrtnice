import { STORYBLOK_TOKEN } from 'lib/constants'
import StoryblokClient from 'storyblok-js-client'

const Storyblok = new StoryblokClient({
  accessToken: STORYBLOK_TOKEN,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
})

export default Storyblok
