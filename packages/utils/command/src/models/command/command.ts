import { Command as CommanderCommand } from 'commander';

import Argument from '../argument';
import Parameter from '../parameter';

import type { Options, Serial } from './types';

class Command {
  #args: Array<Argument>;

  #description: string;

  #name: string;

  #params: Array<Parameter>;

  public constructor(options: Options) {
    const { args, description, name, params } = options;

    this.#args = Array.isArray(args) ? [...args] : [];
    this.#description = description;
    this.#name = name;
    this.#params = Array.isArray(params) ? [...params] : [];
  }

  public get args(): Array<Argument> {
    return [...this.#args];
  }

  public get description(): string {
    return this.#description;
  }

  public get name(): string {
    return this.#name;
  }

  public get params(): Array<Parameter> {
    return [...this.#params];
  }

  public get serial(): Serial {
    const { args, description, name, params } = this;

    return {
      args: args.map((arg) => arg.serial),
      description,
      name,
      params: params.map((param) => param.serial),
    };
  }

  public mount(target: CommanderCommand): CommanderCommand {
    const { args, description, name, params } = this;

    target.command(name).description(description);

    args.forEach((arg) => arg.mount(target));
    params.forEach((param) => param.mount(target));

    return target;
  }

  public static deserialize(serial: Serial): Command {
    const { args, description, name, params } = serial;

    return new this({
      args: args.map((arg) => Argument.deserialize(arg)),
      description,
      name,
      params: params.map((param) => Parameter.deserialize(param)),
    });
  }
}

export default Command;
