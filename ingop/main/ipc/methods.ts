import decompress from 'decompress'
import { existsSync, readdirSync, renameSync, unlinkSync } from 'fs'
import { join } from 'path'

import { checkVersionEnv, isNewVersion } from '../methods/check'
import { ingopPaths, ingopPathsArray } from '../methods/config'
import { isWin } from '../methods/config'
import { buildGop } from '../methods/env/compile'
import { EnvManage } from '../methods/env/types'
import { envManage as unixEnvManage } from '../methods/env/unix/execute'
import { envManage as winEnvManage } from '../methods/env/win/execute'
import { initDirs, removeDirs, saveFile } from '../methods/files'
import { Compile, ExistsEnv, FileDataParams } from './types'

export const ingopHome = {
  init: () => {
    initDirs(ingopPathsArray)
  },
  remove: () => {
    removeDirs(ingopPathsArray)
  }
}

export const existsEnv: ExistsEnv = {
  gop: {
    exist: async () => {
      return (await checkVersionEnv('gop')) !== ''
    },
    isNew: async (newVersion: string) => {
      return await isNewVersion('gop', newVersion)
    }
  },
  env: {
    go: {
      exist: async () => {
        return (await checkVersionEnv('go')) !== ''
      },
      isNew: async (newVersion: string) => {
        return await isNewVersion('go', newVersion)
      }
    }
  }
}

export class autoSaveFile {
  path: string
  constructor({ fileName, base64Data }: FileDataParams) {
    this.path = join(ingopPaths.home, fileName)
    saveFile(this.path, base64Data)
  }
  async gop() {
    const { gop_root, home } = ingopPaths
    await decompress(this.path, home)
    const goplus_gop_hash_dir = join(
      home,
      readdirSync(home).filter((dirName) =>
        /goplus-gop-(.*?)/g.test(dirName)
      )[0]
    )
    removeDirs([gop_root])
    renameSync(goplus_gop_hash_dir, gop_root)
    removeDirs([goplus_gop_hash_dir])
    if (existsSync(this.path)) unlinkSync(this.path)
  }
  env = {
    go: async () => {
      await decompress(this.path, ingopPaths.go_root)
      if (existsSync(this.path)) unlinkSync(this.path)
    }
  }
}

export const compile: Compile = {
  gop: async (): Promise<boolean> => {
    return await buildGop()
  }
}

export const envManage: EnvManage = isWin ? winEnvManage : unixEnvManage
