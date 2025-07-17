import { join } from 'node:path';
import { minify_sync } from 'terser';
import { readDirectory, readFile, writeFile } from '../fs/index.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Extracts the list of compiled JavaScript files present in the outDir.
 * @param {*} outDir
 * @returns string[]
 * @throws
 * - if no minifiable files are found
 */
const __listMinifiableFiles = (outDir: string): string[] => {
  const files = readDirectory(outDir).filter((file) => /.js$/.test(file));
  if (!files.length) {
    throw new Error(
      'The project could not be minified because no .js files were found in the output.',
    );
  }
  return files;
};

/**
 * Minifed the .js file located at the given path.
 * @param codePath
 * @returns string
 * @throws
 * - if the file cannot be minified for any reason
 */
const __minifyFile = (codePath: string): string => {
  const minified = minify_sync(readFile(codePath), {
    compress: true,
    mangle: true,
  });
  if (
    !minified ||
    typeof minified !== 'object' ||
    typeof minified.code !== 'string' ||
    !minified.code.length
  ) {
    throw new Error(`The file '${codePath}' could not be minified.`);
  }
  return minified.code;
};

/**
 * Uglifies every compiled file (.js) from the outDir directory.
 * @param {*} outDir
 * @throws
 * - if no minifiable files are found
 * - if a file cannot be minified for any reason
 */
const minify = (outDir: string) => {
  __listMinifiableFiles(outDir).forEach((filePath) => {
    const codePath: string = join(outDir, filePath);
    writeFile(codePath, __minifyFile(codePath));
  });
};

/* ***********************************************************************************************
 *                                         MODULE EXPORTS                                        *
 *********************************************************************************************** */
export { minify };
