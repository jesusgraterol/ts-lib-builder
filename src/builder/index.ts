import { IParsedArgs } from "argv-utils";
import { readTypeScriptConfigFile } from "../ts-config/index.js";
import { compile } from "../compiler/index.js";
import { minify } from "../minifier/index.js";

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Runs the build process by reading the configuration file, compiling the project and lastly,
 * minifying the outputs.
 * @param args
 * @throws
 * - if the provided path to the tsconfig.json file is invalid
 * - if the tsconfig file has no content
 * - if the tsconfig's content cannot be parsed
 * - if the compilerOptions property is not present in the config object
 * - if the outDir property is not present in the config object
 * - if no minifiable files are found
 * - if a file cannot be minified for any reason
 */
const build = ({ tsconfig }: IParsedArgs) => {
  const config = readTypeScriptConfigFile(tsconfig);
  compile(config.compilerOptions.outDir, tsconfig);
  minify(config.compilerOptions.outDir);
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { build };
