import ChildProcess from 'node:child_process';

class Executer {
  public static emit(data: string): void {
    process.stdout.write(data);
  }

  public static run(command: string): Promise<string> {
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
