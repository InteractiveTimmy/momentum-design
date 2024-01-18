import ChildProcess from 'node:child_process';

import type { RunOptions } from './types';

class Executer {
  public static emit(data: string): void {
    process.stdout.write(data);
  }

  public static run(options: RunOptions = {}): Promise<string> {
    const { command } = options;

    if (!command) {
      return Promise.reject(new Error('no command was provided'));
    }

    return new Promise((resolve, reject) => {
      ChildProcess.exec(command, (error, response) => {
        if (error) {
          reject(error);
        }

        resolve(response);
      });
    });
  }
}

export default Executer;
