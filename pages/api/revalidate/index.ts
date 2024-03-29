import { STORYBLOK_WEBHOOK_SECRET } from 'lib/constants'
import attachMiddleware from 'middleware'

const router = attachMiddleware()

router.get(async (req, res) => {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== STORYBLOK_WEBHOOK_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    if (req.query.path && typeof req.query.path === 'string') {
      await res.revalidate(req.query.path)
    }
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
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
