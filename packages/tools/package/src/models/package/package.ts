import fs from 'fs/promises';
import path from 'path';

import { Yarn } from '../../utils';

import Version from '../version';
import { Serial } from './types';

class Package {
  #name: string;

  #location: string;

  #tag: string;

  #versions: Record<string, Version>;

  public constructor(options: Serial) {
    const { location, name, tag, versions } = options;

    this.#location = location;
    this.#name = name;
    this.#tag = tag;

    this.#versions = versions
      ? Object.entries(versions).reduce((output, [key, value]) => ({
        ...output,
        [key]: new Version(value),
      }), {})
      : {};
  }

  public get location(): string {
    return this.#location;
  }

  public get name(): string {
    return this.#name;
  }

  public get serial(): Serial {
    const { location, name, tag } = this;

    return {
      location,
      name,
      tag,
      versions: Object.entries(this.versions).reduce((output, [key, value]) => ({
        ...output,
        [key]: value.serial,
      }), {}),
    };
  }

  public get tag(): string {
    return this.#tag;
  }

  public get version(): Version {
    return this.versions[this.tag];
  }

  public get versions(): Record<string, Version> {
    return { ...this.#versions };
  }

  public sync(): Promise<this> {
    const { name } = this;

    return Yarn.show({ packageName: name })
      .then((definition) => {
        const distributions = definition['dist-tags'];

        Object.entries(distributions).forEach(([tag, version]) => {
          this.#versions[tag] = Version.fromString(version);
        });

        return this;
      });
  }

  public write(): Promise<this> {
    const location = path.join(process.cwd(), this.#location);

    return fs.readFile(location)
      .then((buffer) => buffer.toString('utf-8'))
      .then((string) => JSON.parse(string))
      .then((json) => ({ ...json, version: this.version.string }))
      .then((definition) => JSON.stringify(definition, null, 2))
      .then((output) => fs.writeFile(location, output, 'utf-8'))
      .then(() => this);
  }
}

export default Package;
