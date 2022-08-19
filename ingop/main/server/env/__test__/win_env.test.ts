import { ingopPathsArray } from '../../common/config'
import { initDirs, removeDirs } from '../../common/files'
import { envManage } from '../win/execute'

// .ignore
initDirs(ingopPathsArray)

envManage.initGop()
console.info(`test env [envManage.initGop()]\n`)

envManage.env.initGo()
console.info(`test env [envManage.env.initGo()]\n`)

envManage.remove()
console.info(`test env [envManage.remove()]\n`)

// .ignore
removeDirs(ingopPathsArray)
