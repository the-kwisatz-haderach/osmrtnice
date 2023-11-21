import crypto from 'crypto'
import { NextApiResponse } from 'next'
import attachMiddleware from 'middleware'
import { EnhancedNextApiRequest } from 'middleware/types'
import { IObituary } from 'lib/domain/types'
import { isStoryblokEvent, IStoryblokEvent, Story } from 'lib/storyblok/types'
import { STORYBLOK_TOKEN, STORYBLOK_WEBHOOK_SECRET } from 'lib/constants'
import { parseObituaryStory } from 'lib/domain/parseObituaryStory'
import { obituaryTypes } from 'lib/domain'

const isValidSignature = (
  signature: unknown,
  event: IStoryblokEvent
): boolean => {
  if (typeof signature !== 'string') return false
  try {
    const secret = STORYBLOK_WEBHOOK_SECRET
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

const revalidationPaths = ['/', ...obituaryTypes.map((type) => `/${type}/`)]

export default attachMiddleware().post(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      const webhookSignature = req.headers['webhook-signature']
      const { body: event } = req
      if (
        isStoryblokEvent(event) &&
        isValidSignature(webhookSignature, event)
      ) {
        switch (event.action.toLowerCase()) {
          case 'published': {
            const url = `https://api.storyblok.com/v2/cdn/stories/${event.story_id}?token=${STORYBLOK_TOKEN}`
            const storyRes = await fetch(url)
            if (storyRes.ok) {
              const {
                story,
              }: { story: Story<IObituary> } = await storyRes.json()
              if (story.content.component === 'obituary') {
                const obituary = parseObituaryStory(story)
                const { result } = await req.db
                  .collection('obituaries')
                  .updateOne(
                    { storyId: event.story_id },
                    { $set: obituary },
                    {
                      upsert: true,
                    }
                  )

                if (result.ok !== 1) {
                  break
                }
                await Promise.all(
                  ['/', `/${story.content.type}/`].map((path) =>
                    res.revalidate(path)
                  )
                )
              }
              return res.status(200).end()
            }
            break
          }
          case 'unpublished': {
            const { result } = await req.db
              .collection('obituaries')
              .deleteOne({ storyId: event.story_id })
            if (result.ok === 1) {
              await Promise.all(
                revalidationPaths.map((path) => res.revalidate(path))
              )
              return res.status(200).end()
            }
            break
          }
          case 'deleted': {
            const { result } = await req.db
              .collection('obituaries')
              .deleteOne({ storyId: event.story_id })
            if (result.ok === 1) {
              await Promise.all(
                revalidationPaths.map((path) => res.revalidate(path))
              )
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
