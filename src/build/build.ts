import { IParsedArgs } from 'argv-utils';
import {
  readTypeScriptConfigFile,
  cleanOutDir,
  compileProject,
  minifyProject,
} from './build.utils.js';

/**
 * Run Build
 * Runs the Build Process that will be based on the project's tsconfig.json file.
 * @param args
 */
const run = ({ tsconfig }: IParsedArgs) => {
  // validate input
  if (typeof tsconfig !== 'string' || !tsconfig.length) {
    throw new Error('The path to the tsconfig.json file must be provided in order to be able to generate a build. Example: ts-lib-builder --tsconfig=tsconfig.build.json');
  }

  // read the tsconfig.json file
  const config = readTypeScriptConfigFile(tsconfig);

  // firstly, clean up the outDir
  cleanOutDir(config.compilerOptions.outDir);

  // compile the project
  compileProject(tsconfig);

  // read the list of compiled files and uglify them
  minifyProject(config.compilerOptions.outDir);
};




/**
 * Module Exports
 */
export {
  run,
};
