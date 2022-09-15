import { homedir, platform } from 'os'
import { join } from 'path'

import { IGopPaths, IsWin } from './types'

export const isWin: IsWin = platform() === 'win32'

export const igopPaths: IGopPaths = ((): IGopPaths => {
  const home = join(homedir(), '.igop')
  const gopRoot = join(home, 'gop')
  const gopBin = join(gopRoot, 'bin')
  const env = join(home, 'env')
  const goRoot = join(env, 'go')
  const goPath = join(goRoot, 'workspace')
  const goBin = join(goRoot, 'bin')
  return {
    home,
    gopRoot,
    gopBin,
    env,
    goRoot,
    goPath,
    goBin
  }
})()

export const igopPathsArray = Object.values(igopPaths)
