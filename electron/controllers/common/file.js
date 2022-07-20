const fs = require('fs')
const path = require('path')
const sudo = require('sudo-prompt')
const request = require('request')
const decompress = require('decompress')
const {
  rootPath,
  authorizationCommand,
  envGoPath,
  gopPath
} = require('./config')
const { existsRoot } = require('./check')

/**
 * @param command
 * @returns {Promise<boolean>}
 */
function sudoExecCommand(command) {
  return new Promise((resolve) => {
    sudo.exec(
      command,
      {
        name: 'InGop',
        icns: path.join(__dirname, '../../../dist/app-icon.icns')
      },
      (err) => {
        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      }
    )
  })
}

/**
 * @param filePath
 * @param remote
 * @returns {Promise<unknown>}
 */
function download(filePath, remote) {
  return new Promise((resolve) => {
    const stream = fs.createWriteStream(filePath)
    request(remote)
      .pipe(stream)
      .on('close', () => {
        if (fs.existsSync(filePath)) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
  })
}

/**
 * @param dirname
 * @returns {boolean}
 */
const mkdirRecursive = (dirname) => {
  if (fs.existsSync(dirname)) return true

  if (mkdirRecursive(path.dirname(dirname))) {
    fs.mkdirSync(dirname)
    return true
  }
  return false
}

/**
 * @param remote
 * @returns {string}
 */
const getRemoteFile = (remote) => /\/([^/]+)$/.exec(remote)[1]

/**
 * @description download remote file to local
 * @param filePath
 * @param remote
 * @returns {Promise<void>}
 */
const downloadRemoteFile = async (filePath, remote) => {
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  await download(filePath, remote)
}

/**
 * @param filePath
 * @param pathDir
 * @returns {Promise<void>}
 */
const decompressFile = async (filePath, pathDir) => {
  await decompress(filePath, pathDir)
  fs.unlinkSync(filePath)
}

/**
 * @description initDir is used to create the catalogue environment
 * @returns {Promise<boolean>}
 */
const initDir = async () => {
  if (existsRoot()) return true
  const command = fs.existsSync(rootPath)
    ? authorizationCommand
    : `mkdir "${rootPath}" && ${authorizationCommand}`
  const status = await sudoExecCommand(command)
  if (status && existsRoot()) {
    mkdirRecursive(envGoPath.dir)
    mkdirRecursive(gopPath.dir)
    return true
  }
  return false
}

module.exports = {
  mkdirRecursive,
  getRemoteFile,
  downloadRemoteFile,
  decompressFile,
  initDir
}
