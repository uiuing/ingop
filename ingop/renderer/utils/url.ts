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
