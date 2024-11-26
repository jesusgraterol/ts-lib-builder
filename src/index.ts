#! /usr/bin/env node
import process from 'node:process';
import { parseArgs } from 'argv-utils';
import { build } from '@/builder/index.js';

(() => {
  try {
    build(parseArgs(process.argv));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
