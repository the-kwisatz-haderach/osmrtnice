import { NextApiResponse } from 'next'
import Storyblok from '../../../lib/storyblok/client'
import attachMiddleware from '../../../middleware'
import { EnhancedNextApiRequest } from '../../../middleware/types'

export default attachMiddleware().post(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    const result = await req.db
      .collection('obituaries')
      .find({ firstname: { $regex: req.body.query, $options: 'i' } })
      .toArray()
      .then((res) =>
        res.map((obituary) =>
          JSON.parse(
            JSON.stringify({
              uuid: obituary._id,
              content: obituary,
            })
          )
        )
      )

    const stories = await Storyblok.getStories({
      starts_with: 'obituaries',
      is_startpage: 0,
      version: 'draft',
      search_term: req.body.query,
    })

    res.status(200).json(stories.data.stories.concat(result))
  }
)
