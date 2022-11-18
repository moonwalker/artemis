import { getLoginSession } from './session'

export function withAuth(handler) {
  return async function (req, res) {
    const session = await getLoginSession(req)

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    return handler(req, res)
  }
}
