/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * TypeScript Config
 * The minified type used for interacting with the tsconfig.json file.
 */
interface ITypeScriptConfig {
  compilerOptions: {
    outDir: string;
  };
  include?: string[];
  exclude?: string[];
}

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { ITypeScriptConfig };
