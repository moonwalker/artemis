import { cookies } from '../cookies'

const TOKEN_NAME = 'artemis_token'

interface token {
  get: () => string | null
  set: (token: string) => void
  remove: () => void
  exists: () => boolean
}

const get = () => {
  return cookies.read(TOKEN_NAME)
}

const set = (token: string) => {
  if (token) {
    cookies.write(TOKEN_NAME, token)
  }
}

const remove = () => {
  cookies.erase(TOKEN_NAME)
}

const exists = () => {
  return cookies.exists(TOKEN_NAME)
}

export const token = {
  get,
  set,
  remove,
  exists
}
