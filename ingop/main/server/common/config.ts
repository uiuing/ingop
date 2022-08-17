import { homedir, platform } from 'os'
import { join } from 'path'

const isWin = platform() === 'win32'

const ROOT_PATH = homedir()

const envPath = {
  dir: join(ROOT_PATH, 'env'),
  goBin: join(ROOT_PATH, 'env', 'go', 'bin')
}

// TODO 创造文件夹

module.exports = {
  isWin,
  envPath
}
