import decompress from 'decompress'
import { existsSync, readdirSync, renameSync, unlinkSync } from 'fs'
import * as os from 'os'
import { join } from 'path'

import { execCommand, existsEnv } from '../methods/check'
import { ingopPaths, ingopPathsArray, isWin } from '../methods/config'
import { EnvManage } from '../methods/env/types'
import { envManage as unixEnvManage } from '../methods/env/unix/execute'
import { envManage as winEnvManage } from '../methods/env/win/execute'
import { initDirs, removeDirs, saveFile } from '../methods/files'
import { ExistsAllEnvParams, ExistsAllEnvResult, FileDataParams } from './types'

export const ingopHome = {
  init: () => {
    initDirs(ingopPathsArray)
  },
  remove: {
    all: () => removeDirs(ingopPathsArray),
    gop: () => removeDirs([ingopPaths.gopRoot])
  }
}

export async function existsAllEnv(
  p: ExistsAllEnvParams
): Promise<ExistsAllEnvResult> {
  const r: ExistsAllEnvResult = {
    gop: {
      exist: false,
      isNew: false,
      isIngop: false,
      version: null
    },
    env: {
      go: {
        exist: false,
        isNew: false,
        isIngop: false,
        version: null
      }
    },
    system: {
      platform: os.platform(),
      arch: os.arch()
    }
  }
  let i = await existsEnv.env.go.exist()
  if (i.e) {
    r.env.go.exist = i.e
    r.env.go.version = i.v
    r.env.go.isIngop = await existsEnv.env.go.isIngop()
    let iv = await existsEnv.env.go.isNew(p.env.goNewVersion)
    if (iv) {
      r.env.go.isNew = iv
      i = await existsEnv.gop.exist()
      r.gop.exist = i.e
      r.gop.version = i.v
      iv = await existsEnv.gop.isNew(p.gopNewVersion)
      r.gop.isIngop = await existsEnv.env.go.isIngop()
      if (iv) {
        r.gop.isNew = true
      }
    }
  }
  return r
}

export class AutoSaveFile {
  path: string

  constructor({ fileName, base64Data }: FileDataParams) {
    this.path = join(ingopPaths.home, fileName)
    saveFile(this.path, base64Data)
  }

  async gop() {
    const { gopRoot, home } = ingopPaths
    await decompress(this.path, home)
    const goplusGopHashDir = join(
      home,
      readdirSync(home).filter((dirName) =>
        /goplus-gop-(.*?)/g.test(dirName)
      )[0]
    )
    removeDirs([gopRoot])
    renameSync(goplusGopHashDir, gopRoot)
    removeDirs([goplusGopHashDir])
    if (existsSync(this.path)) unlinkSync(this.path)
    return true
  }

  env = {
    go: async () => {
      removeDirs([ingopPaths.goRoot])
      await decompress(this.path, ingopPaths.env)
      if (existsSync(this.path)) unlinkSync(this.path)
      return true
    }
  }
}

export const envManage: EnvManage = isWin ? winEnvManage : unixEnvManage

export function rebootWindows() {
  execCommand('shutdown -r -t 3')
}
