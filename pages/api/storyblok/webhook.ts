import { NextApiResponse } from 'next'
import attachMiddleware from 'middleware'
import { EnhancedNextApiRequest } from 'middleware/types'
import Storyblok from 'lib/storyblok/client'
import { isStoryblokEvent } from './types'
import { IObituary } from 'lib/domain/types'
import { Story } from 'lib/storyblok/types'

export default attachMiddleware().post(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      const { body: event } = req
      if (isStoryblokEvent(event)) {
        switch (event.action) {
          case 'published': {
            const url = `https://api.storyblok.com/v2/cdn/stories/${event.story_id}?token=${Storyblok.accessToken}`
            const storyRes = await fetch(url)
            if (storyRes.ok) {
              const {
                story,
              }: { story: Story<IObituary> } = await storyRes.json()
              const obituary: IObituary = {
                _id: story.uuid,
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
              }
              const result = await req.db
                .collection('obituaries')
                .findOneAndUpdate({ _id: obituary._id }, obituary, {
                  upsert: true,
                })
              if (result.ok === 1) {
                return res.status(200).json(story)
              }
            }
            break
          }
          case 'unpublished':
          case 'deleted': {
            const url = `https://api.storyblok.com/v2/cdn/stories/${event.story_id}?token=${Storyblok.accessToken}`
            const storyRes = await fetch(url)
            if (storyRes.ok) {
              const {
                story,
              }: { story: Story<IObituary> } = await storyRes.json()
              const result = await req.db
                .collection('obituaries')
                .deleteOne({ _id: story.uuid })
              if (result.result.ok === 1) {
                return res.status(200).end()
              }
            }
            break
          }
          default: {
            return res.status(404).end()
          }
        }
      }
      return res.status(400).end()
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  }
)
