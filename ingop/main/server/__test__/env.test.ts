import { readFileSync } from 'fs'
import { join } from 'path'

import { ingopPaths, ingopPathsArray } from '../common/config'
import { initDirs, removeDirs } from '../common/files'
import { envManage } from '../env/unix/execute'

const envBashPath = join(ingopPaths.env, 'env.bash')

// .ignore
initDirs(ingopPathsArray)

envManage.initGop()
console.info(
  `test env [envManage.initGop()] ${envBashPath} info:\n`,
  readFileSync(envBashPath).toString()
)

envManage.env.initGo()
console.info(
  `test env [envManage.env.initGo()] ${envBashPath} info:\n`,
  readFileSync(envBashPath).toString()
)

envManage.remove()
console.info(
  `test env [envManage.remove()] ${envBashPath} info:\n`,
  readFileSync(envBashPath).toString()
)

// .ignore
removeDirs(ingopPathsArray)
