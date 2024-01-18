import Executer from '../executer';

import type { ListOptions, ListResults, ListResultsItem, ShowOptions, ShowResults } from './types.ts';

class Yarn {
  public static list(options: ListOptions = {}): Promise<ListResults> {
    const { recursive, since, verbose } = options;

    const command = [
      'yarn workspaces list',
      recursive ? '--recursive' : undefined,
      since ? `--since ${since}` : undefined,
      verbose ? '--verbose' : undefined,
      '--json',
    ].filter((value) => !!value).join(' ');

    return Executer.run(command)
      .then((results) => JSON.parse(`[${results}]`))
      .then((json) => json.reduce((output: ListResults, item: ListResultsItem) => ({
        ...output,
        [item.name]: item,
      }), {}));
  }

  public static show(options: ShowOptions = {}): Promise<ShowResults> {
    const { packageName } = options;
    const command = `npm show ${packageName} --json`;

    return Executer.run(command)
      .then((results) => JSON.parse(results));
  }
}

export default Yarn;
