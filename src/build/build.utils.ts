import {
  rmSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { execSync } from 'node:child_process';
import UglifyJS from 'uglify-js';
import { ITypeScriptConfig } from './types.js';

/* ***********************************************************************************************
 *                                 TYPESCRIPT CONFIG FILE HELPERS                                *
 *********************************************************************************************** */

/**
 * Removes all single and multi-line comments from a given string.
 * @param {*} s
 * @returns string
 */
const __removeComments = (s: string): string => s.replace(
  /\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g,
  '',
).trim();

/**
 * Given the contents of the tsconfig.json file, it will remove all the comments and return a
 * parsed version.
 * @param {*} content
 * @returns ITypeScriptConfig
 */
const __parseTypeScriptConfigFile = (content: string): ITypeScriptConfig => {
  if (typeof content !== 'string' || !content.length) {
    throw new Error('The tsconfig file content must be a valid string.');
  }

  // remove the comments and parse the config content. Also ensure the essential properties exist
  const tsconfig: ITypeScriptConfig = JSON.parse(__removeComments(content));
  if (!tsconfig || !tsconfig.compilerOptions || typeof tsconfig.compilerOptions !== 'object') {
    throw new Error('The compilerOptions property is not present in the tsconfig object.');
  }
  if (typeof tsconfig.compilerOptions.outDir !== 'string' || !tsconfig.compilerOptions.outDir.length) {
    throw new Error('The outDir property could not be extracted from the compilerOptions property.');
  }
  return tsconfig;
};

/**
 * Reads the tsconfig.json file, parses and returns its contents.
 * @returns ITypeScriptConfig
 */
const readTypeScriptConfigFile = (path: string): ITypeScriptConfig => {
  const tsconfigRaw = readFileSync(path, { encoding: 'utf8' });
  return __parseTypeScriptConfigFile(tsconfigRaw);
};





/* ***********************************************************************************************
 *                                      COMPILATION HELPERS                                      *
 *********************************************************************************************** */

/**
 * Deletes the output directory if exists.
 */
const cleanOutDir = (outDir: string) => rmSync(outDir, { recursive: true, force: true });

/**
 * Compiles the project based on the tsconfig.json file.
 * @returns Buffer
 */
const compileProject = (tsconfigPath: string): Buffer => execSync(`tsc --project "${tsconfigPath}"`);

/**
 * Extracts the list of compiled JavaScript files present in the outDir.
 * @param {*} outDir
 * @returns string[]
 */
const __listMinifiableFiles = (outDir: string): string[] => {
  const files = readdirSync(outDir, { recursive: true, encoding: 'utf-8' });
  return files.filter((file) => /.js$/.test(file));
};

/**
 * Uglifies every compiled file (.js) from the outDir directory.
 * @param {*} outDir
 */
const minifyProject = (outDir: string) => {
  __listMinifiableFiles(outDir).forEach((filePath) => {
    writeFileSync(
      `${outDir}/${filePath}`,
      UglifyJS.minify(readFileSync(`${outDir}/${filePath}`, 'utf8')).code,
      'utf8',
    );
  });
};





/* ***********************************************************************************************
 *                                         MODULE EXPORTS                                        *
 *********************************************************************************************** */
export {
  // typescript config file helpers
  readTypeScriptConfigFile,

  // compilation helpers
  cleanOutDir,
  compileProject,
  minifyProject,
};