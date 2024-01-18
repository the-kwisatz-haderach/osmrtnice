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
  console.log({ signature })
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

const router = attachMiddleware()

router.post(async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
  try {
    const webhookSignature = req.headers['webhook-signature']
    const { body: event } = req
    if (isStoryblokEvent(event) && isValidSignature(webhookSignature, event)) {
      switch (event.action.toLowerCase()) {
        case 'published': {
          // if (event.full_slug) {
          //   const path =
          //     event.full_slug === 'home' ? '/' : '/' + event.full_slug
          //   await res.revalidate(path)
          //   return res.status(200).json({ revalidated: true })
          // }
          const url = `https://api.storyblok.com/v2/cdn/stories/${event.story_id}?token=${STORYBLOK_TOKEN}`
          const storyRes = await fetch(url)
          if (storyRes.ok) {
            const { story }: { story: Story<IObituary> } = await storyRes.json()
            if (story.content.component === 'obituary') {
              const obituary = parseObituaryStory(story)
              await req.db.collection('obituaries').updateOne(
                { storyId: event.story_id },
                { $set: obituary },
                {
                  upsert: true,
                }
              )
              try {
                await Promise.all(
                  ['/', `/${story.content.type}/`].map((path) =>
                    res.revalidate(path)
                  )
                )
              } catch (err) {
                return res.status(400).json({
                  event,
                  err,
                  revalidated: false,
                  message: 'revalidation failed',
                })
              }
            }
            return res.status(200).json({ revalidated: true })
          }
          break
        }
        case 'deleted':
        case 'unpublished': {
          if (event.full_slug) {
            const path =
              event.full_slug === 'home' ? '/' : '/' + event.full_slug
            await res.revalidate(path)
            return res.status(200).json({ revalidated: true })
          }
          const result = await req.db
            .collection('obituaries')
            .deleteOne({ storyId: event.story_id })

          if (result.deletedCount > 0) {
            try {
              await Promise.all(
                revalidationPaths.map((path) => res.revalidate(path))
              )
            } catch (err) {
              return res.status(400).json({
                event,
                err,
                revalidated: false,
                message: 'revalidation failed',
              })
            }
            return res.status(200).json({ revalidated: true })
          }
          break
        }
        default: {
          return res.status(404).json({ message: 'invalid message type' })
        }
      }
    }
    return res
      .status(400)
      .json({ message: 'invalid event or signature', event })
  } catch (err) {
    console.error(err)
    return res.status(500).send('unknown error in webhook')
  }
})

export default router.handler({
  onError: (err, req, res) => {
    let message = 'unknown error'
    if (err instanceof Error) {
      console.error(err.stack)
      message = err.message
    }
    res.status(500).end(message)
  },
})
