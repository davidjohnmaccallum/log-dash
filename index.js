#!/usr/bin/env node

const yargs = require('yargs')

yargs
  .commandDir('cmds')
  .demandCommand(1, 'Please choose a command')
  .help()
  .argv