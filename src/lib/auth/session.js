import * as Iron from '@hapi/iron'
import { MAX_AGE, setTokenCookie, getTokenCookie } from './cookies'

export async function setLoginSession(res, session) {
  const obj = { ...session }
  const token = await Iron.seal(obj, process.env.COOKIE_SECRET, Iron.defaults)
  setTokenCookie(res, token)
}

export async function getLoginSession(...args) {
  const token = await getTokenCookie(...args)

  if (!token) return null

  try {
    const session = await Iron.unseal(
      token,
      process.env.COOKIE_SECRET,
      Iron.defaults
    )
    const expires = session.expires + MAX_AGE * 1000
    // Validate the expiration date of the session
    if (Date.now() > expires) {
      throw new Error('Session expired')
    }

    return session
  } catch {
    return null
  }
}
