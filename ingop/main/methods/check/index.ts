import { exec } from 'child_process'

import { AsyncBoolean, AsyncString, AsyncStringNull, ExistsEnv } from './types'

export function execCommand(cmd: string): AsyncStringNull {
  return new Promise((resolve) => {
    exec(`${cmd}`, { encoding: 'utf8' }, (err, stdout) => {
      if (err) resolve(null)
      resolve(stdout)
    })
  })
}

async function checkVersionEnv(cmd: string): AsyncString {
  const s = await execCommand(`${cmd} version`)
  if (s === null) return ''
  const r = s.match(/[0-9.]+/)
  return r === null ? '' : r[0]
}

async function isNewVersion(cmd: string, newVersion: string): AsyncBoolean {
  const nowVersion = await checkVersionEnv(cmd)
  if (!nowVersion) return false
  const levels1 = nowVersion.split('.')
  const levels2 = newVersion.split('.')
  const length = Math.max(levels1.length, levels2.length)
  for (let i = 0; i < length; i++) {
    const _now = i < levels1.length ? parseInt(levels1[i]) : 0
    const _new = i < levels2.length ? parseInt(levels2[i]) : 0
    if (_now > _new) return true
    if (_now < _new) return false
  }
  return true
}

export const existsEnv: ExistsEnv = {
  gop: {
    exist: async () => {
      return (await checkVersionEnv('gop')) !== ''
    },
    isNew: async (newVersion: string) => {
      return await isNewVersion('gop', newVersion)
    }
  },
  env: {
    go: {
      exist: async () => {
        return (await checkVersionEnv('go')) !== ''
      },
      isNew: async (newVersion: string) => {
        return await isNewVersion('go', newVersion)
      }
    }
  }
}
