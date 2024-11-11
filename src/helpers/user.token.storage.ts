interface UserTokenStorageInterface {
  hasToken: () => boolean
  getToken: () => string | null
  setToken: (value: string) => void
  removeToken: () => void
  clear: () => void
}

class FallbackStorage implements Storage {
  _store: Record<string, string> = {}

  setItem(key: string, value: string) {
    this._store[key] = value
  }

  getItem(key: string): string {
    return this._store[key]
  }

  removeItem(key: string) {
    delete this._store[key]
  }

  clear() {
    this._store = {}
  }

  key(index: number) {
    return Object.keys(this._store)[index]
  }

  get length() {
    return Object.keys(this._store).length
  }
}

class UserTokenStorage implements UserTokenStorageInterface {
  private readonly key: string
  private storage: Storage = new FallbackStorage()

  constructor(key: string) {
    this.key = key
    this.storage = localStorage
  }

  hasToken(): boolean {
    return !(this.getToken() == null)
  }

  getToken(): string | null {
    return this.storage.getItem(this.key)
  }

  setToken(value: string): void {
    this.storage.setItem(this.key, value)
  }

  removeToken(): void {
    this.storage.removeItem(this.key)
  }

  clear(): void {
    this.storage.clear()
  }
}

export const userTokenStorage = new UserTokenStorage('ki-token')
