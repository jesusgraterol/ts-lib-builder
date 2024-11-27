import { rmSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Removes a directory as well as its contents recursively.
 * @param dirPath
 */
const deleteDirectory = (dirPath: string): void =>
  rmSync(dirPath, { recursive: true, force: true });

/**
 * Reads the files and directories that exist in dirPath.
 * @param dirPath
 * @returns string[]
 */
const readDirectory = (dirPath: string): string[] =>
  readdirSync(dirPath, {
    recursive: true,
    encoding: "utf8",
  });

/**
 * Reads the contents of a file and returns them.
 * @param filePath
 * @returns string
 */
const readFile = (filePath: string): string =>
  readFileSync(filePath, { encoding: "utf8" });

/**
 * Creates or updates a file at a filePath.
 * @param filePath
 * @param content
 */
const writeFile = (filePath: string, content: string): void =>
  writeFileSync(filePath, content, "utf8");

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { deleteDirectory, readDirectory, readFile, writeFile };
