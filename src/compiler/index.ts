import { rmSync } from 'node:fs';
import { execSync } from 'node:child_process';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Deletes the output directory if exists.
 */
const __cleanOutDir = (outDir: string): void => rmSync(outDir, { recursive: true, force: true });

/**
 * Deletes the outDir to guarantee a fresh distribution and compiles the project based on the
 * tsconfig.json file.
 * @param outdir
 * @param tsconfigPath
 * @returns void
 */
const compile = (outDir: string, tsconfigPath: string): void => {
  __cleanOutDir(outDir);
  execSync(`tsc --project "${tsconfigPath}"`);
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  compile,
};
