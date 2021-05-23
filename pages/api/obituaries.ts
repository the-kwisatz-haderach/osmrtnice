// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiResponse } from 'next'
import Storyblok from '../../lib/storyblok/client'
import { EnhancedNextApiRequest } from '../../middleware/types'

export default async (
  req: EnhancedNextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  switch (req.method) {
    case 'POST': {
      const stories = await Storyblok.getStories({
        starts_with: 'obituaries',
        is_startpage: 0,
        version: 'draft',
        search_term: req.body.query,
      })
      res.status(200).json(stories.data.stories)
      break
    }
    default: {
      res.status(404)
    }
  }
}
