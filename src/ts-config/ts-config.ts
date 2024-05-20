import { readFileSync } from 'node:fs';
import { ITypeScriptConfig } from '../shared/index.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */
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
 * Removes the comments from the content and attempt to parse it.
 * @param content
 * @returns string
 * @throws
 * - if it is unable to parse the JSON content
 */
const __parseContent = (content: string): ITypeScriptConfig => {
  try {
    return JSON.parse(__removeComments(content));
  } catch (e) {
    const msg: string = e instanceof Error ? e.message : JSON.stringify(e);
    throw new Error(`The tsconfig.json's content could not be parsed: ${msg}`);
  }
};

/**
 * Given the contents of the tsconfig.json file, it will remove all the comments and return a
 * parsed version.
 * @param {*} content
 * @returns ITypeScriptConfig
 * @throws
 * - if it is unable to parse the JSON content
 */
const __parseTypeScriptConfigFile = (content: string): ITypeScriptConfig => {
  if (typeof content !== 'string' || !content.length) {
    throw new Error('The tsconfig file content must be a valid string.');
  }

  // parse the content and ensure the required properties exist
  const tsconfig: ITypeScriptConfig = __parseContent(content);
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
 * @throws
 * - if the provided path to the tsconfig.json file is invalid
 * - if the tsconfig file has no content
 * - if the tsconfig's content cannot be parsed
 * - if the compilerOptions property is not present in the config object
 * - if the outDir property is not present in the config object
 */
const readTypeScriptConfigFile = (path: string): ITypeScriptConfig => {
  if (typeof path !== 'string' || !path.length) {
    throw new Error('The path to the tsconfig.json file must be provided in order to be able to generate a build. Example: ts-lib-builder --tsconfig=tsconfig.build.json');
  }
  return __parseTypeScriptConfigFile(readFileSync(path, { encoding: 'utf8' }));
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  readTypeScriptConfigFile,
};
