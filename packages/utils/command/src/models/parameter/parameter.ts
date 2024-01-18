import { Command as CommanderCommand } from 'commander';

import type { Options, Serial } from './types';

class Parameter {
  #fallback?: string | boolean | Array<string>;

  #description: string;

  #name: string;

  #required: boolean;

  #short?: string;

  #type: string;

  public constructor(options: Options) {
    const { description, fallback, name, required, short, type } = options;

    this.#description = description;
    this.#fallback = Array.isArray(fallback) ? [...fallback] : fallback;
    this.#name = name;
    this.#required = !!required;
    this.#short = short;
    this.#type = type;
  }

  public get definition(): string {
    const { name, short, required, type } = this;

    return [
      short ? `-${short}` : '',
      `--${name}`,
      `${required ? '[' : '<'}${type}${required ? ']' : '>'}`,
    ].filter((item) => !!item).join(' ');
  }

  public get description(): string {
    return this.#description;
  }

  public get fallback(): string | boolean | Array<string> | undefined {
    return this.#fallback;
  }

  public get name(): string {
    return this.#name;
  }

  public get required(): boolean {
    return this.#required;
  }

  public get short(): string | undefined {
    return this.#short;
  }

  public get type(): string {
    return this.#type;
  }

  public get serial(): Serial {
    const { description, fallback, name, required, short, type } = this;

    return { description, fallback, name, required, short, type };
  }

  public mount(target: CommanderCommand): CommanderCommand {
    const { definition, description, fallback } = this;

    return target.option(definition, description, fallback);
  }

  public static deserialize(serial: Serial): Parameter {
    return new this({ ...serial });
  }
}

export default Parameter;
