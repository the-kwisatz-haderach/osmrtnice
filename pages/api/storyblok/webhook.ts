import crypto from 'crypto'
import { NextApiResponse } from 'next'
import attachMiddleware from 'middleware'
import { EnhancedNextApiRequest } from 'middleware/types'
import { isStoryblokEvent, IStoryblokEvent } from './types'
import { IObituary } from 'lib/domain/types'
import { Story } from 'lib/storyblok/types'

const isValidSignature = (
  signature: unknown,
  event: IStoryblokEvent
): boolean => {
  if (typeof signature !== 'string') return false
  try {
    const secret = process.env.STORYBLOK_WEBHOOK_SECRET
    const bodyHmac = crypto
      .createHmac('sha1', secret)
      .update(JSON.stringify(event))
      .digest('hex')
    if (bodyHmac !== signature) return false
    return true
  } catch (err) {
    if (err instanceof Error) {
      console.warn(err?.message)
    } else {
      console.warn(err)
    }
    return false
  }
}

export default attachMiddleware().post(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      const webhookSignature = req.headers['webhook-signature']
      const { body: event } = req
      if (
        isStoryblokEvent(event) &&
        isValidSignature(webhookSignature, event)
      ) {
        switch (event.action) {
          case 'published': {
            const url = `https://api.storyblok.com/v2/cdn/stories/${event.story_id}?token=${process.env.STORYBLOK_TOKEN}`
            const storyRes = await fetch(url)
            if (storyRes.ok) {
              const {
                story,
              }: { story: Story<IObituary> } = await storyRes.json()
              const obituary: Omit<IObituary, '_id'> = {
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
                appreciations: 0,
              }
              const result = await req.db
                .collection('obituaries')
                .insertOne(obituary)
              if (result.result.ok === 1) {
                return res.status(200).end()
              }
            }
            break
          }
          case 'unpublished':
          case 'deleted': {
            const result = await req.db
              .collection('obituaries')
              .deleteOne({ storyId: event.story_id })
            if (result.result.ok === 1) {
              return res.status(200).end()
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
