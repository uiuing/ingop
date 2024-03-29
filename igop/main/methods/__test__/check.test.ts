// eslint-disable-next-line no-console

import { existsEnv } from '../check'

async function test() {
  console.info(
    'test check function [existsEnv.gop.exist()] :',
    await existsEnv.gop.exist()
  )
  console.info(
    'test check function [existsEnv.gop.isNew("2.0.1")] :',
    await existsEnv.gop.isNew('2.0.1')
  )
  console.info(
    'test check function [existsEnv.gop.isIGop()] :',
    await existsEnv.gop.isIGop()
  )

  console.info(
    'test check function [existsEnv.env.go.exist()] :',
    await existsEnv.env.go.exist()
  )
  console.info(
    'test check function [existsEnv.env.go.isNew("1.16")] :',
    await existsEnv.env.go.isNew('1.16')
  )
  console.info(
    'test check function [existsEnv.env.go.isIGop()] :',
    await existsEnv.env.go.isIGop()
  )
}

test()
