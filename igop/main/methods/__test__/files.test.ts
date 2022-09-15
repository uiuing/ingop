import { existsSync, readdirSync } from 'fs'

import { igopPathsArray } from '../config'
import { initDirs, removeDirs } from '../files'

export function __test__initDirs(): [string, string[]][] {
  initDirs(igopPathsArray)
  return igopPathsArray.map((dir) =>
    existsSync(dir) ? [dir, readdirSync(dir)] : [dir, []]
  )
}
export function __test__removeDirs(): [string, string[]][] {
  removeDirs(igopPathsArray)
  return igopPathsArray.map((dir) =>
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
