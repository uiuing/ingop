import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

const createDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

createDir(path.join(os.homedir(), '.goplus'))
