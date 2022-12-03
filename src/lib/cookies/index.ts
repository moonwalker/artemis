interface cookies {
  write: (name: string, value: string, days?: number) => string
  read: (name: string) => string
  erase: (name: string) => void
  check: () => boolean
  exists: (name: string) => boolean
}

export const cookies = {
  write: function (name: string, value: string, days?: number) {
    var expires
    if (!!days) {
      var date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      expires = '; expires=' + date.toUTCString()
    } else {
      expires = ''
    }
    const cookie = name + '=' + value + expires + '; path=/'
    document.cookie = cookie
  },
  read: function (name: string) {
    if (document.cookie) {
      var nameEQ = name + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length)
        }
        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length)
        }
      }
    }
    return null
  },
  erase: function (name: string) {
    this.write(name, '', -1)
  },
  check: function () {
    this.create('cookiesEnabled', 'moonwalker.tech')
    if (this.read('cookiesEnabled') !== null) {
      this.erase('cookiesEnabled')
      return false
    }
    return true
  },
  exists: function (name: string) {
    return this.read(name) !== null
  }
}
