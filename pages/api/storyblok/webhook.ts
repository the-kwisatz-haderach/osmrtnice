import { NextApiResponse } from 'next'
import attachMiddleware from 'middleware'
import { EnhancedNextApiRequest } from 'middleware/types'
import Storyblok from 'lib/storyblok/client'

type IStoryblokEventType = 'published' | 'unpublished' | 'deleted'

interface IStoryblokEvent {
  action: IStoryblokEventType
  text: string
  story_id: number
  space_id: number
}

const isStoryblokEvent = (e: any): e is IStoryblokEvent => {
  if (typeof e !== 'object' || e === null) return false
  if (!('text' in e && typeof e.text === 'string')) return false
  if (!('story_id' in e && typeof e.story_id === 'number')) return false
  if (!('space_id' in e && typeof e.space_id === 'number')) return false
  if (!('action' in e && typeof e.action === 'string')) return false
  if (!['published', 'unpublished', 'deleted'].some((t) => t === e.action))
    return false
  return (e as IStoryblokEvent).text !== undefined
}

export default attachMiddleware().post(
  async ({ body: event }: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      if (isStoryblokEvent(event)) {
        switch (event.action) {
          case 'published': {
            const url = `https://api.storyblok.com/v2/cdn/stories/${event.story_id}?token=${Storyblok.accessToken}`
            const story = await fetch(url)
            const parsed = await story.json()
            return res.status(200).json(parsed)
          }
          case 'unpublished': {
            const story = await Storyblok.getStory(event.story_id.toString())
            return res.status(200).json(story)
          }
          case 'deleted': {
            return res.status(200).end()
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
