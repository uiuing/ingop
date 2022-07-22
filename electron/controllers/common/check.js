const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { rootPath } = require('./config')

/**
 * @description Check if the catalogue environment exists
 * @returns {boolean}
 */
const existsRoot = () => {
  if (!fs.existsSync(rootPath)) return false
  const testFile = path.join(rootPath, 'test')
  if (fs.existsSync(testFile)) {
    fs.rmdirSync(testFile)
    return !fs.existsSync(testFile)
  }
  try {
    fs.mkdirSync(testFile)
  } catch (e) {
    return false
  }
  fs.rmdirSync(testFile)
  return true
}

/**
 * @param cmd
 * @returns {boolean|string}
 */
const checkVersionEnv = (cmd) => {
  try {
    const outVersion = execSync(`${cmd} version`).toString('utf8')
    const reg = /[0-9]+\.[0-9]+\.[0-9]+/
    return reg.test(outVersion) ? outVersion : false
  } catch (e) {
    return false
  }
}

/**
 * @param cmd
 * @param newVersion
 * @returns {boolean}
 */
const checkVersionSize = (cmd, newVersion) => {
  const nowVersion = checkVersionEnv(cmd)
  if (!nowVersion) return false
  const nowVersionArr = nowVersion.split('.')
  const newVersionArr = newVersion.split('.')
  return (
    nowVersionArr[0] >= newVersionArr[0] &&
    nowVersionArr[1] >= newVersionArr[1] &&
    nowVersionArr[2] >= newVersionArr[2]
  )
}

/**
 * @description Check for a match with the local version
 * @type {{
 *  go(string): boolean,
 *  gop(string): boolean
 * }}
 */
const existsEnv = {
  go(version) {
    return checkVersionSize('go', version)
  },
  goVersion() {
    return checkVersionEnv('go')
  },
  gop(version) {
    return checkVersionSize('gop', version)
  },
  gopVersion() {
    return checkVersionEnv('gop')
  }
}

module.exports = {
  existsRoot,
  existsEnv
}
