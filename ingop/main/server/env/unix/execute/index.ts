import { execSync } from 'child_process'
import { join } from 'path'

import { Bash, EnvManage } from './types'

const envPath = join(__dirname, '../env')

const bashPath: Bash = {
  gop: join(envPath, 'gop.bash'),
  env: {
    go: join(envPath, 'go.bash')
  },
  remove: join(envPath, 'remove.bash')
}

const bashCommand: Bash = {
  gop: `chmod 777 '${bashPath.gop}' && '${bashPath.gop}'`,
  env: {
    go: `chmod 777 '${bashPath.env.go}' && '${bashPath.env.go}'`
  },
  remove: `chmod 777 '${bashPath.remove}' && '${bashPath.remove}'`
}

export const envManage: EnvManage = {
  initGop: () => execSync(bashCommand.gop),
  env: {
    initGo: () => execSync(bashCommand.env.go)
  },
  remove: () => execSync(bashCommand.remove)
}
