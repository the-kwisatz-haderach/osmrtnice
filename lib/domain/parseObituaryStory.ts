import { Story } from 'lib/storyblok/types'
import { IObituary } from './types'

export const parseObituaryStory = (
  story: Story<IObituary>
): Omit<IObituary, '_id'> => ({
  storyId: story.id,
  firstname: story.content.firstname,
  surname: story.content.surname,
  name_misc: story.content.name_misc,
  prefix: story.content.prefix,
  preamble: story.content.preamble,
  additional_information: story.content.additional_information,
  long_text: story.content.long_text,
  city: story.content.city,
  date_created: story.first_published_at,
  date_updated: story.published_at,
  date_of_birth: story.content.date_of_birth,
  date_of_death: story.content.date_of_death,
  faith: story.content.faith,
  is_crawled: false,
  relative: story.content.relative,
  size: story.content.size,
  type: story.content.type,
  image: story.content.image,
  image_second: story.content.image_second,
  firstname_second: story.content.firstname_second,
  surname_second: story.content.surname_second,
  date_of_birth_second: story.content.date_of_birth_second,
  date_of_death_second: story.content.date_of_death_second,
  appreciations: 0,
  symbol_image: {
    filename: story.content.symbol_image.filename,
    alt: story.content.symbol_image.alt,
  },
})
