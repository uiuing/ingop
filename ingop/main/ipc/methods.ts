import decompress from 'decompress'
import { existsSync, readdirSync, renameSync, unlinkSync } from 'fs'
import * as os from 'os'
import { join } from 'path'

import { execCommand, existsEnv } from '../methods/check'
import { ingopPaths, ingopPathsArray, isWin } from '../methods/config'
import { buildGop } from '../methods/env/compile'
import { EnvManage } from '../methods/env/types'
import { envManage as unixEnvManage } from '../methods/env/unix/execute'
import { envManage as winEnvManage } from '../methods/env/win/execute'
import { initDirs, removeDirs, saveFile } from '../methods/files'
import {
  Compile,
  ExistsAllEnvParams,
  ExistsAllEnvResult,
  FileDataParams
} from './types'

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
      isIngop: false
    },
    env: {
      go: {
        exist: false,
        isNew: false,
        isIngop: false
      }
    },
    system: {
      platform: os.platform(),
      arch: os.arch()
    }
  }
  let i = await existsEnv.env.go.exist()
  if (i) {
    r.env.go.exist = i
    r.env.go.isIngop = await existsEnv.env.go.isIngop()
    i = await existsEnv.env.go.isNew(p.env.goNewVersion)
    if (i) {
      r.env.go.isNew = i
      i = await existsEnv.gop.exist()
      if (i) {
        r.gop.exist = i
        i = await existsEnv.gop.isNew(p.gopNewVersion)
        if (i) {
          r.gop.isIngop = await existsEnv.env.go.isIngop()
          r.gop.isNew = true
        }
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

export const compile: Compile = {
  gop: async (): Promise<boolean> => buildGop()
}

export const envManage: EnvManage = isWin ? winEnvManage : unixEnvManage

export function rebootWindows() {
  execCommand('shutdown -r -t 3')
}
