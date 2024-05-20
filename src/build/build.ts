import { IParsedArgs } from 'argv-utils';
import { readTypeScriptConfigFile } from '../ts-config/index.js';
import { compile } from '../compiler/compiler.js';

/**
 * Run Build
 * Runs the Build Process that will be based on the project's tsconfig.json file.
 * @param args
 */
const run = ({ tsconfig }: IParsedArgs) => {
  // read the tsconfig.json file
  const config = readTypeScriptConfigFile(tsconfig);

  // compile the project
  compile(config.compilerOptions.outDir, tsconfig);

  // read the list of compiled files and uglify them
  // minifyProject(config.compilerOptions.outDir);
};




/**
 * Module Exports
 */
export {
  run,
};
