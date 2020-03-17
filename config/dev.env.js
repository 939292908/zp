'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  NODE_ENV_SHORT: '"dev"',//环境配置简写
  ENV_CONFIG : '""',
  ENV_PATH : '""'
})
