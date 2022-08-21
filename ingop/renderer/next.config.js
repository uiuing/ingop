// eslint-disable-next-line @typescript-eslint/no-var-requires
const semi = require('@douyinfe/semi-next').default({})
module.exports = semi({
  distDir: '../out/renderer/.next',
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : '/'
})
