import { NextApiResponse } from 'next'
import { IObituary } from '../../../../lib/domain/types'
import Storyblok from '../../../../lib/storyblok/client'
import { Story } from '../../../../lib/storyblok/types'
import attachMiddleware from '../../../../middleware'
import { EnhancedNextApiRequest } from '../../../../middleware/types'

export default attachMiddleware()
  .put(
    async (
      req: EnhancedNextApiRequest,
      res: NextApiResponse
    ): Promise<void> => {
      try {
        const id = req.query.id as string
        const obituaries = req.db.collection<IObituary>('obituaries')
        if (!req.body) {
          return res.status(400).end()
        }
        const obituary = await obituaries.findOneAndUpdate(
          { _id: id },
          req.body,
          { returnDocument: 'after' }
        )
        return res.status(200).json(obituary)
      } catch (err) {
        console.error(err)
        return res.status(500).end()
      }
    }
  )
  .get(
    async (
      req: EnhancedNextApiRequest,
      res: NextApiResponse
    ): Promise<void> => {
      try {
        const id = req.query.id as string
        let obituary: IObituary
        if (req.query.is_story) {
          const story = await Storyblok.getStory(id, {
            find_by: 'uuid',
          })
          obituary = {
            ...(story.data.story.content as Story<
              Omit<IObituary, '_id'>
            >['content']),
            date_created: story.data.story.first_published_at,
            date_updated: story.data.story.published_at,
            _id: story.data.story.uuid,
            is_crawled: false,
          }
        } else {
          obituary = await req.db
            .collection<IObituary>('obituaries')
            .findOne({ _id: id })
        }
        return res.status(200).json(obituary)
      } catch (err) {
        console.error(err)
        return res.status(500).end()
      }
    }
  )
