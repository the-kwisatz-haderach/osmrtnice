import { NextApiResponse } from 'next'
import { getObituaries } from '../../../lib/domain/getObituaries'
import { parseObituaryQuery } from '../../../lib/domain/parseObituaryQuery'
import attachMiddleware from '../../../middleware'
import { EnhancedNextApiRequest } from '../../../middleware/types'

export default attachMiddleware().get(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      const { data, next, nextPage } = await getObituaries(
        req.db,
        parseObituaryQuery(req.query)
      )
      res.status(200).json({
        data,
        next,
        nextPage,
      })
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  }
)
