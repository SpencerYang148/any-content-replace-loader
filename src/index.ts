import { LoaderOptions } from './types';
import { WebpackLoaderContext } from './types/webpack';

function loader(this: WebpackLoaderContext, contents: string) {
  this.cacheable && this.cacheable();
  const options = this.getOptions(undefined) as LoaderOptions;
  const { search, replace } = options;
  return contents.replace(search, replace);
}

export = loader;
