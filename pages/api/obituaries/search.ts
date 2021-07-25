import { NextApiResponse } from 'next'
import { IObituary, Paginated } from '../../../lib/domain/types'
import Storyblok from '../../../lib/storyblok/client'
import { Story } from '../../../lib/storyblok/types'
import attachMiddleware from '../../../middleware'
import { EnhancedNextApiRequest } from '../../../middleware/types'

export default attachMiddleware().post(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    const result = await req.db
      .collection('obituaries')
      .find({
        $or: [
          { firstname: { $regex: req.body.query, $options: 'i' } },
          { middlename: { $regex: req.body.query, $options: 'i' } },
          { surname: { $regex: req.body.query, $options: 'i' } },
        ],
      })
      .limit(50)
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

    const paginatedObituaries: Array<Story<IObituary>> = [
      ...stories.data.stories,
      ...result,
    ]

    const obituaries: Paginated<Array<Story<IObituary>>> = []
    for (let i = 0; i < paginatedObituaries.length; i += 50) {
      obituaries.push(paginatedObituaries.slice(i, i + 50))
    }

    res.status(200).json(obituaries)
  }
)
