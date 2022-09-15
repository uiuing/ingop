export function parseFileName(url: string): string {
  const arr = url.split('/')
  return arr[arr.length - 1]
}

export function parseVersion(url: string): string {
  const reg = /v(.*?).tar/
  const arr = reg.exec(url)
  if (arr) {
    return arr[1]
  }
  return ''
}

export function refresh() {
  const { location } = window
  location.hash = ''
  location.reload()
}

export function isNewVersion(nowVersion: string, newVersion: string): boolean {
  const l1 = nowVersion.split('.')
  const l2 = newVersion.split('.')
  const length = Math.max(l1.length, l2.length)
  for (let i = 0; i < length; i += 1) {
    const now = i < l1.length ? parseInt(l1[i], 10) : 0
    const nv = i < l2.length ? parseInt(l2[i], 10) : 0
    if (now > nv) return true
    if (now < nv) return false
  }
  return true
}
