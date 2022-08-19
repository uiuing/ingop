import { homedir, platform } from 'os'
import { join } from 'path'

import { IngopPaths, IsWin } from './types'

export const isWin: IsWin = platform() === 'win32'

export const ingopPaths: IngopPaths = ((): IngopPaths => {
  const home = join(homedir(), '.ingop')
  const gop_root = join(home, 'gop')
  const gop_bin = join(gop_root, 'bin')
  const env = join(home, 'env')
  const go_root = join(env, 'go')
  const go_path = join(go_root, 'workspace')
  const go_bin = join(go_root, 'bin')
  return {
    home,
    gop_root,
    gop_bin,
    env,
    go_root,
    go_path,
    go_bin
  }
})()

export const ingopPathsArray = Object.values(ingopPaths)
