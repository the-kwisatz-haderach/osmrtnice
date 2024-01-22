import getObituaries from '../../../lib/domain/getObituaries'
import { parseObituaryQuery } from '../../../lib/domain/parseObituaryQuery'
import attachMiddleware from '../../../middleware'

const router = attachMiddleware()

router.get(async (req, res) => {
  try {
    const isAdmin = req.cookies['admin-session'] === 'true'
    const { data, next } = await getObituaries(
      req.db,
      parseObituaryQuery(req.query),
      isAdmin
    )
    if (isAdmin) {
      res.setHeader('Cache-Control', 'no-cache')
    } else {
      res.setHeader('Cache-Control', 's-maxage=3600, max-age=3600')
    }
    res.status(200).json({
      data,
      next,
    })
    return
  } catch (err) {
    console.error(err)
    res.status(500).end()
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
