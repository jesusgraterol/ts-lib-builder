import {
  rmSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { minify_sync } from 'terser';

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
 * Minifed the .js file located at the given path.
 * @param codePath
 * @returns string
 * @throws
 * - if the file cannot be minified for any reason
 */
const __minifyFile = (codePath: string): string => {
  const minified = minify_sync(readFileSync(codePath, 'utf-8'), { compress: true, mangle: true });
  if (
    !minified
    || typeof minified !== 'object'
    || typeof minified.code !== 'string'
    || !minified.code.length
  ) {
    throw new Error(`The file '${codePath}' could not be minified.`);
  }
  return minified.code;
};

/**
 * Uglifies every compiled file (.js) from the outDir directory.
 * @param {*} outDir
 */
const minifyProject = (outDir: string) => {
  __listMinifiableFiles(outDir).forEach((filePath) => {
    const codePath: string = join(outDir, filePath);
    writeFileSync(codePath, __minifyFile(codePath), 'utf8');
  });
};





/* ***********************************************************************************************
 *                                         MODULE EXPORTS                                        *
 *********************************************************************************************** */
export {
  // compilation helpers
  cleanOutDir,
  compileProject,
  minifyProject,
};
