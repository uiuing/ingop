export function parseFileName(url: string): string {
  const arr = url.split('/')
  return arr[arr.length - 1]
}
