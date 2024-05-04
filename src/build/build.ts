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
const run = ({ tsconfigPath = './tsconfig.json' }: IParsedArgs) => {
  // read the tsconfig.json file
  const tsconfig = readTypeScriptConfigFile(tsconfigPath);

  // firstly, clean up the outDir
  cleanOutDir(tsconfig.compilerOptions.outDir);

  // compile the project
  compileProject(tsconfigPath);

  // read the list of compiled files and uglify them
  minifyProject(tsconfig.compilerOptions.outDir);
};




/**
 * Module Exports
 */
export {
  // eslint-disable-next-line import/prefer-default-export
  run,
};