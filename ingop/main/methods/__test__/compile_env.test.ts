import { buildGop } from '../env/compile'

export function testBuildGop() {
  buildGop().then((r) => {
    console.info('testBuildGop result:', r)
  })
}

testBuildGop()
