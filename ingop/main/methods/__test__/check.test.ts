import { checkVersionEnv, execCommand, isNewVersion } from '../check'

async function test() {
  console.info(
    'test check function [execCommand("ls")] :',
    await execCommand('ls')
  )

  console.info(
    'test check function [checkVersionEnv("go")] :',
    await checkVersionEnv('go')
  )

  console.info(
    'test check function [isNewVersion("go","1.16")] :',
    await isNewVersion('go', '1.16')
  )
}

test()
