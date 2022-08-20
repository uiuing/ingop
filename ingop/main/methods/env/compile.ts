import { join } from 'path'

import { checkVersionEnv, execCommand, isNewVersion } from '../check'
import { ingopPaths } from '../config'

export async function buildGop(): Promise<boolean> {
  const goBinFile =
    (await checkVersionEnv('go')) !== '' && (await isNewVersion('go', '1.16'))
      ? 'go'
      : join(ingopPaths.go_bin, 'go')
  const command = `cd "${ingopPaths.gop_root}" && "${goBinFile}" run cmd/make.go --build`
  try {
    return (await execCommand(command)) !== null
  } catch (e) {
    return false
  }
}
