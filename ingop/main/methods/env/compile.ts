import { join } from 'path'

import { execCommand, existsEnv } from '../check'
import { ingopPaths } from '../config'

export async function buildGop(): Promise<boolean> {
  const goBinFile =
    (await existsEnv.env.go.exist()) && (await existsEnv.env.go.isNew('1.16'))
      ? 'go'
      : join(ingopPaths.goBin, 'go')
  const command = `cd "${ingopPaths.gopRoot}" && "${goBinFile}" run cmd/make.go --build`
  try {
    return (await execCommand(command)) !== null
  } catch (e) {
    return false
  }
}
