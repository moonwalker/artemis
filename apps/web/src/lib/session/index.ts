import { cookies } from '../cookies'

export interface User {
  token: string
  login: string
  image: string
}

export interface SessionProvider {
  get: () => User | null
  set: (user: User) => void
  remove: () => void
  exists: () => boolean
}

export class CookieSession implements SessionProvider {
  name: string
  constructor(name: string) {
    this.name = name
  }

  get(): User | null {
    const stored = cookies.read(this.name)
    if (stored !== null) {
      return JSON.parse(stored) as User
    }
    return null
  }

  set(user: User): void {
    return cookies.write(this.name, JSON.stringify(user))
  }

  remove(): void {
    return cookies.erase(this.name)
  }

  exists(): boolean {
    return cookies.exists(this.name)
  }
}

export class LocalStorageSession implements SessionProvider {
  name: string
  constructor(name: string) {
    this.name = name
  }

  get(): User | null {
    const stored = localStorage.getItem(this.name)
    if (stored !== null) {
      return JSON.parse(stored) as User
    }
    return null
  }

  set(user: User): void {
    return localStorage.setItem(this.name, JSON.stringify(user))
  }

  remove(): void {
    return localStorage.removeItem(this.name)
  }

  exists(): boolean {
    return localStorage.getItem(this.name) !== null
  }
}
