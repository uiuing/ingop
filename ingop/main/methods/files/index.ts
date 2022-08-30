import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'

import { Dirs } from './types'

export function initDirs(dirs: Dirs) {
  for (const dir of dirs)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
}

export function removeDirs(dirs: Dirs) {
  for (const dir of dirs) if (existsSync(dir)) rmSync(dir, { recursive: true })
}

export function saveFile(path: string, base64Data: string) {
  if (existsSync(path)) rmSync(path)
  const dataBuffer = Buffer.from(
    base64Data.replace(/^data:(.*?);base64,/, ''),
    'base64'
  )
  writeFileSync(path, dataBuffer)
}
