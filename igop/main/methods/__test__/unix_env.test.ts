import { readFileSync } from 'fs'
import { join } from 'path'

import { igopPaths, igopPathsArray } from '../config'
import { envManage } from '../env/unix/execute'
import { initDirs, removeDirs } from '../files'

const envBashPath = join(igopPaths.env, 'env.bash')

// .ignore
initDirs(igopPathsArray)

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
removeDirs(igopPathsArray)
