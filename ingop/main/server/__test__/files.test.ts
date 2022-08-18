import { readdirSync } from 'fs'
import { homedir } from 'os'
import { join } from 'path'

import { goplusPath } from '../common/config'
import { initDirs, removeDirs } from '../common/files'
import { existsSync } from 'next/dist/lib/find-pages-dir'

const user_home = homedir()
const __test_goplus_home = join(__dirname, '__test_goplus_home__')
const test_goplus_dirs = Object.values(goplusPath).map((dir) =>
  dir.replace(user_home, __test_goplus_home)
)

function __test__initDirs(): [string, string[]][] {
  initDirs(test_goplus_dirs)
  return test_goplus_dirs.map((dir) =>
    existsSync(dir) ? [dir, readdirSync(dir)] : [dir, []]
  )
}

function __test__removeDirs(): [string, string[]][] {
  removeDirs(test_goplus_dirs)
  removeDirs([__test_goplus_home])
  return test_goplus_dirs.map((dir) =>
    existsSync(dir) ? [dir, readdirSync(dir)] : [dir, []]
  )
}

console.info(
  'Files function [initDirs] test document structure',
  __test__initDirs()
)

console.info(
  'Files function [removeDirs] test document structure',
  __test__removeDirs()
)
