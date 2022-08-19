import decompress from 'decompress'
import { existsSync, readdirSync, renameSync, unlinkSync } from 'fs'
import { join } from 'path'

import { ingopPaths, ingopPathsArray } from '../../server/config'
import { isWin } from '../../server/config'
import { EnvManage } from '../../server/env/types'
import { envManage as unixEnvManage } from '../../server/env/unix/execute'
import { envManage as winEnvManage } from '../../server/env/win/execute'
import { initDirs, removeDirs, saveFile } from '../../server/files'
import { FileData } from '../types'

export const ingopHome = {
  init: () => {
    initDirs(ingopPathsArray)
  },
  remove: () => {
    removeDirs(ingopPathsArray)
  }
}

export class autoSaveFile {
  path: string
  constructor({ fileName, base64Data }: FileData) {
    this.path = join(ingopPaths.home, fileName)
    saveFile(this.path, base64Data)
  }
  async gop() {
    const { gop_root } = ingopPaths
    await decompress(this.path, gop_root)
    const goplus_gop_hash_dir = readdirSync(gop_root).filter((dirName) =>
      /goplus-gop-(.*?)/g.test(dirName)
    )[0]
    renameSync(goplus_gop_hash_dir, gop_root)
    if (existsSync(this.path)) unlinkSync(this.path)
  }
  env = {
    go: async () => {
      await decompress(this.path, ingopPaths.go_root)
      if (existsSync(this.path)) unlinkSync(this.path)
    }
  }
}

export const envManage: EnvManage = isWin ? winEnvManage : unixEnvManage
