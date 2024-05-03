#! /usr/bin/env node
import process from 'node:process';

/* ************************************************************************************************
 *                                           EXECUTION                                            *
 ************************************************************************************************ */
(() => {
  try {
    // execute an action
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
