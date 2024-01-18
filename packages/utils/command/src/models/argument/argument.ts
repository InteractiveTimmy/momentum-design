import { Command as CommanderCommand } from 'commander';
import type { Options, Serial } from './types';

class Argument {
  #description: string;

  #name: string;

  #required: boolean;

  #spread: boolean;

  #warning?: string;

  public constructor(options: Options) {
    const { description, name, required, spread, warning } = options;

    this.#description = description;
    this.#name = name;
    this.#required = !!required;
    this.#spread = !!spread;
    this.#warning = warning;
  }

  public get definition(): string {
    const { name, required, spread } = this;

    return `${required ? '[' : '<'}${name}${spread ? '...' : ''}${required ? ']' : '>'}`;
  }

  public get description(): string {
    return this.#description;
  }

  public get name(): string {
    return this.#name;
  }

  public get required(): boolean {
    return this.#required;
  }

  public get spread(): boolean {
    return this.#spread;
  }

  public get warning(): string | undefined {
    return this.#warning;
  }

  public get serial(): Serial {
    const { description, name, required, spread, warning } = this;

    return { description, name, required, spread, warning };
  }

  public mount(target: CommanderCommand): CommanderCommand {
    const { definition, description, required, warning } = this;

    return target.argument(definition, description, required && warning ? warning : undefined);
  }

  public static deserialize(serial: Serial): Argument {
    return new this({ ...serial });
  }
}

export default Argument;
