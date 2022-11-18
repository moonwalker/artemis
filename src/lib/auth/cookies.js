import { serialize, parse } from 'cookie'

const TOKEN_NAME = 'ct_token'

export const MAX_AGE = 60 * 60 * 8 // 8 hours

export function setTokenCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax'
  })

  res.setHeader('Set-Cookie', cookie)
}

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/'
  })

  res.setHeader('Set-Cookie', cookie)
}

export function parseCookies(req) {
  // For API Routes we don't need to parse the cookies.
  if (req.cookies) return req.cookies

  // For pages we do need to parse the cookies.
  const cookie = req.headers?.cookie
  return parse(cookie || '')
}

export async function getTokenCookie(...args) {
  let req

  const isRSC = args.length === 0
  if (isRSC) {
    const { headers, cookies } = require('next/headers')
    req = {
      // headers: Object.fromEntries(headers()),
      cookies: Object.fromEntries(
        cookies()
          .getAll()
          .map((c) => [c.name, c.value])
      )
    }
  } else {
    req = args[0]
  }

  const parsed = parseCookies(req)
  return parsed[TOKEN_NAME]
}
