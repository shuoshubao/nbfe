#!/usr/bin/env node

/* eslint-disable no-console */

require('core-js')
const { Command } = require('commander')
const pkg = require('../package.json')

const binName = Object.keys(pkg.bin)[0]

const program = new Command()

program.version(pkg.version)

program
  .command('serve')
  .description('start development server')
  .usage(`${binName} serve`)
  .action(async () => {
    process.env.REACT_CLI__ENV = 'development'
    try {
      const { webpackServe } = require('../lib')
      webpackServe()
    } catch (e) {
      console.log(e)
    }
  })

program
  .command('build')
  .description('build for production')
  .usage(`${binName} build`)
  .action(async () => {
    process.env.REACT_CLI__ENV = 'production'
    try {
      const { webpackBuild } = require('../lib')
      webpackBuild()
    } catch (e) {
      console.log(e)
    }
  })

program
  .command('inspect')
  .description('inspect internal webpack config')
  .usage(`${binName} inspect`)
  .action(async () => {
    try {
      const { inspectWebpackConfig } = require('../lib')
      inspectWebpackConfig()
    } catch (e) {
      console.log(e)
    }
  })

program.parse(process.argv)
