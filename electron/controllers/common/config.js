const Path = require('path')

const IS_WIN = process.platform === 'win32'

const ROOT_PATH = {
  win32: 'C:/Program Files/GoPlus',
  unix: '/usr/local/goplus'
}

const USER_NAME = process.env.USER || process.env.USERNAME

// --------------------------------------------------------------------------------------------------------------------

const rootPath = (() => {
  const key = IS_WIN ? 'win32' : 'unix'
  return ROOT_PATH[key]
})()

const authorizationCommand = (() => {
  if (IS_WIN) {
    return `icacls "${ROOT_PATH.win32}" /grant ${USER_NAME}:(OI)(CI)(F) /T`
  }
  return `chown -R ${USER_NAME} ${ROOT_PATH.unix}`
})()

const envPath = {
  dir: Path.join(rootPath, 'env'),
  goBin: Path.join(rootPath, 'env', 'go', 'bin')
}

const gopPath = {
  dir: Path.join(rootPath, 'gop'),
  bin: Path.join(rootPath, 'gop', 'bin')
}

/**
 * @description Parse Release Config
 * @param releaseJSON
 * @returns {{remote: {go:string,gop:string}, version: {go:string,gop:string}}}
 * @constructor
 */
function Releases(releaseJSON) {
  const { go, gop } = releaseJSON
  this.remote = {
    go: go[process.platform][process.arch],
    gop: gop[process.platform][process.arch]
  }
  this.version = {
    go: go.version,
    gop: gop.version
  }
  return this
}
// --------------------------------------------------------------------------------------------------------------------

module.exports = {
  rootPath,
  authorizationCommand,
  envPath,
  gopPath,
  Releases
}
