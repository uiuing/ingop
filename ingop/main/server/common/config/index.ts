import { homedir, platform } from 'os'
import { join } from 'path'

import { GoplusPath, IsWin } from './types'

export const isWin: IsWin = platform() === 'win32'

export const goplusPath: GoplusPath = ((): GoplusPath => {
  const home = join(homedir(), 'goplus')
  const gop_root = join(home, 'gop')
  const gop_bin = join(gop_root, 'bin')
  const env = join(home, 'env')
  const go_root = join(env, 'go')
  const go_path = join(go_root, 'workspace')
  const go_bin = join(go_root, 'bin')
  const source = join(home, 'source')
  return {
    home,
    gop_root,
    gop_bin,
    env,
    go_root,
    go_path,
    go_bin,
    source
  }
})()
