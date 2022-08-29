import { execSync } from 'child_process'
import { userInfo } from 'os'
import { join } from 'path'

import { Bash, EnvManage } from '../../types'

const envPath = join(__dirname, '../env')

const bashPath: Bash = {
  gop: join(envPath, 'gop.bat'),
  env: {
    go: join(envPath, 'go.bat')
  },
  remove: join(envPath, 'remove.bat')
}

const username = userInfo().username
const bashCommand: Bash = {
  gop: `icacls "${bashPath.gop}" /grant ${username}:F /t && "${bashPath.gop}"`,
  env: {
    go: `icacls "${bashPath.env.go}" /grant ${username}:F /t && "${bashPath.env.go}"`
  },
  remove: `icacls "${bashPath.remove}" /grant ${username}:F /t && "${bashPath.remove}"`
}

export const envManage: EnvManage = {
  initGop: () => execSync(bashCommand.gop),
  env: {
    initGo: () => execSync(bashCommand.env.go)
  },
  remove: () => {
    execSync(bashCommand.remove)
  }
}
