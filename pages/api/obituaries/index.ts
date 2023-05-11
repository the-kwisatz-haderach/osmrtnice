import { NextApiResponse } from 'next'
import { getObituaries } from '../../../lib/domain/getObituaries'
import { parseObituaryQuery } from '../../../lib/domain/parseObituaryQuery'
import attachMiddleware from '../../../middleware'
import { EnhancedNextApiRequest } from '../../../middleware/types'

export default attachMiddleware().get(
  async (req: EnhancedNextApiRequest, res: NextApiResponse) => {
    try {
      const { data, next } = await getObituaries(
        req.db,
        parseObituaryQuery(req.query)
      )
      res.setHeader('Cache-Control', 's-maxage=3600, max-age=0')
      res.status(200).json({
        data,
        next,
      })
    } catch (err) {
      console.error(err)
      res.status(500).end()
    }
  }
)
