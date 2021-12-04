#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format [type]', 'output format')
  .arguments('oldFilePath newFilePath')
  .action((oldFilePath, newFilePath) => {
    const diff = genDiff(oldFilePath, newFilePath);
    console.log(diff);
  })
  .parse();
