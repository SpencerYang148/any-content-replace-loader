import type * as webpack from 'webpack';
import type * as enhancedResolve from 'enhanced-resolve';

export type WebpackLoaderCallback = (
  err: Error | undefined | null,
  content?: string | Buffer,
  sourceMap?: string | any,
) => void;

/** based on https://github.com/webpack/webpack/pull/13164#issuecomment-821357676 */
export interface WebpackLoaderContext {
  version: number;

  /**
   * Hacky access to the Compilation object of webpack.
   */
  _compilation: webpack.Compilation;

  /**
   * Hacky access to the Compiler object of webpack.
   */
  _compiler: webpack.Compiler;

  /**
   * Hacky access to the Module object being loaded.
   */
  _module: webpack.NormalModule;

  addBuildDependency(dep: string): void;

  /**
   * Add a directory as dependency of the loader result.
   * https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L305
   */
  addContextDependency(context: string): void;

  /**
   * Adds a file as dependency of the loader result in order to make them watchable.
   * For example, html-loader uses this technique as it finds src and src-set attributes.
   * Then, it sets the url's for those attributes as dependencies of the html file that is parsed.
   * https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L302
   */
  addDependency(file: string): void;

  /** https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L308 */
  addMissingDependency(context: string): void;

  /**
   * Make this loader async.
   * https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L108
   */
  async(): WebpackLoaderCallback | undefined;

  /**
   * Make this loader result cacheable. By default it's not cacheable.
   * A cacheable loader must have a deterministic result, when inputs and dependencies haven't changed.
   * This means the loader shouldn't have other dependencies than specified with this.addDependency.
   * Most loaders are deterministic and cacheable.
   * https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L297
   */
  cacheable(flag?: boolean): void;

  /** https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L116 */
  callback: WebpackLoaderCallback;

  /**
   * Remove all dependencies of the loader result. Even initial dependencies and these of other loaders. Consider using pitch.
   * https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L320
   */
  clearDependencies(): void;

  /**
   * The directory of the module. Can be used as context for resolving other stuff.
   * eg '/workspaces/ts-loader/examples/vanilla/src'
   * https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L289
   */
  context: string;

  /** https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L358 */
  readonly currentRequest: string;

  /** https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L381 */
  readonly data: any;
  /**
   * alias of addDependency
   * Adds a file as dependency of the loader result in order to make them watchable.
   * For example, html-loader uses this technique as it finds src and src-set attributes.
   * Then, it sets the url's for those attributes as dependencies of the html file that is parsed.
   * https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L302
   */
  dependency(file: string): void;

  /**
   * https://github.com/webpack/webpack/blob/49890b77aae455b3204c17fdbed78eeb47bc1d98/lib/NormalModule.js#L520
   */
  emitError(error: Error | string): void;

  /** https://github.com/webpack/webpack/blob/49890b77aae455b3204c17fdbed78eeb47bc1d98/lib/NormalModule.js#L562 */
  emitFile(
    name: string,
    content: string,
    sourceMap: string,
    assetInfo: webpack.AssetInfo,
  ): void;

  /**
   * https://github.com/webpack/webpack/blob/49890b77aae455b3204c17fdbed78eeb47bc1d98/lib/NormalModule.js#L510
   */
  emitWarning(warning: Error | string): void;

  /** https://github.com/webpack/webpack/blob/49890b77aae455b3204c17fdbed78eeb47bc1d98/lib/NormalModule.js#L590 */
  fs: enhancedResolve.CachedInputFileSystem;

  /** https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L314 */
  getContextDependencies(): string[];

  /** https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L311 */
  getDependencies(): string[];

  /** https://github.com/webpack/webpack/blob/49890b77aae455b3204c17fdbed78eeb47bc1d98/lib/NormalModule.js#L530 */
  getLogger(name: string): webpack.Compilation['logger'];

  /** https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L317 */
  getMissingDependencies(): string[];

  /** https://github.com/webpack/webpack/blob/49890b77aae455b3204c17fdbed78eeb47bc1d98/lib/NormalModule.js#L472 */
  getOptions(schema: any): any;

  /** https://github.com/webpack/webpack/blob/49890b77aae455b3204c17fdbed78eeb47bc1d98/lib/NormalModule.js#L541 */
  getResolve(options: webpack.Configuration): any;

  /**
   * The index in the loaders array of the current loader.
   * In the example: in loader1: 0, in loader2: 1
   * https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L290
   */
  loaderIndex: number;

  /**
   * Resolves the given request to a module, applies all configured loaders and calls
   * back with the generated source, the sourceMap and the module instance (usually an
   * instance of NormalModule). Use this function if you need to know the source code
   * of another module to generate the result.
   */
  loadModule(
    request: string,
    callback: (
      err: Error | null,
      source: string,
      sourceMap: any,
      module: webpack.Module,
    ) => void,
  ): void;

  /** https://github.com/webpack/webpack/blob/49890b77aae455b3204c17fdbed78eeb47bc1d98/lib/NormalModule.js#L586 */
  mode: 'development' | 'production' | 'none';

  /** https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L366 */
  readonly previousRequest: any;

  /** https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L374 */
  readonly query: any;

  /** https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L348 */
  readonly remainingRequest: any;

  /** https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L340 */
  readonly request: any;

  /** https://github.com/webpack/webpack/blob/49890b77aae455b3204c17fdbed78eeb47bc1d98/lib/NormalModule.js#L538 */
  resolve(context: string, request: any, callback: any): any;

  /**
   * Starting with webpack 4, the formerly `this.options.context` is provided as `this.rootContext`.
   * https://github.com/webpack/webpack/blob/49890b77aae455b3204c17fdbed78eeb47bc1d98/lib/NormalModule.js#L583
   */
  rootContext: string;

  /**
   * An array of all the loaders. It is writeable in the pitch phase.
   * loaders = [{request: string, path: string, query: string, module: function}]
   *
   * In the example:
   * [
   *   { request: "/abc/loader1.js?xyz",
   *     path: "/abc/loader1.js",
   *     query: "?xyz",
   *     module: [Function]
   *   },
   *   { request: "/abc/node_modules/loader2/index.js",
   *     path: "/abc/node_modules/loader2/index.js",
   *     query: "",
   *     module: [Function]
   *   }
   * ]
   *
   * https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L291
   * https://github.com/webpack/loader-runner/blob/6221befd031563e130f59d171e732950ee4402c6/lib/LoaderRunner.js#L46
   */
  loaders: { request: string }[];

  /**
   * The resource file.
   * In the example: "/abc/resource.js"
   */
  resourcePath: string;
}
