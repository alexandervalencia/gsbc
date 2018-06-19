// https://github.com/diegohaz/arc/wiki/Atomic-Design#do-not-worry
const req = require.context('.', true, /\.\/[^/]+\/[^/]+\/[\w]+\.js$/)

req.keys().forEach((key) => {
  const componentName = key.replace(/^.+\/([^/]+)\/[\w]+\.js/, '$1')
  module.exports[componentName] = req(key).default
})
