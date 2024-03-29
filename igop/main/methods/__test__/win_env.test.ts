import { igopPathsArray } from '../config'
import { envManage } from '../env/win/execute'
import { initDirs, removeDirs } from '../files'

// .ignore
initDirs(igopPathsArray)

envManage.initGop()
console.info(`test env [envManage.initGop()]\n`)

envManage.env.initGo()
console.info(`test env [envManage.env.initGo()]\n`)

envManage.remove()
console.info(`test env [envManage.remove()]\n`)

// .ignore
removeDirs(igopPathsArray)
