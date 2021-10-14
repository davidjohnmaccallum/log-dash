#!/usr/bin/env node

const yargs = require('yargs')

yargs
  .commandDir('cmds')
  .demandCommand(1, 'Please choose a command')
  .completion('completion', 'Enable bash/zsh-completion shortcuts for commands and options.')
  .help()
  .argv