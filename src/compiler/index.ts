import { execSync } from "node:child_process";
import { deleteDirectory } from "../fs/index.js";

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Deletes the outDir to guarantee a fresh distribution and compiles the project based on the
 * tsconfig.json file.
 * @param outdir
 * @param tsconfigPath
 * @returns void
 */
const compile = (outDir: string, tsconfigPath: string): void => {
  deleteDirectory(outDir);
  execSync(`tsc --project "${tsconfigPath}"`);
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { compile };
