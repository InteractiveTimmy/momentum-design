export interface ShowOptions {
  packageName?: string;
}

export interface ShowResults {
  'dist-tags': Record<string, string>;
}

export interface ListOptions {
  recursive?: boolean;
  since?: string;
  verbose?: boolean;
}

export interface ListResultsItem {
  location: string,
  name: string,
  workspaceDependencies?: Array<string>;
  mismatchedWorkspaceDependencies?: Array<string>;
}

export type ListResults = Record<string, ListResultsItem>;
