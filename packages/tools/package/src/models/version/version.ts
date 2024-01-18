import CONSTANTS from './constants';
import type { IncrementOptions, Serial } from './types';

class Version {
  #major: number;

  #minor: number;

  #patch: number;

  #release?: number;

  #tag?: string;

  public constructor(options: Partial<Serial> = {}) {
    this.#major = options.major || CONSTANTS.DEFAULTS.MAJOR;
    this.#minor = options.minor || CONSTANTS.DEFAULTS.MINOR;
    this.#patch = options.patch || CONSTANTS.DEFAULTS.PATCH;
    this.#release = options.release || CONSTANTS.DEFAULTS.RELEASE;
    this.#tag = options.tag || CONSTANTS.DEFAULTS.TAG;
  }

  public get major(): number {
    return this.#major;
  }

  public get minor(): number {
    return this.#minor;
  }

  public get patch(): number {
    return this.#patch;
  }

  public get release(): number | undefined {
    return this.#release;
  }

  public get serial(): Serial {
    return {
      major: this.#major,
      minor: this.#minor,
      patch: this.#patch,
      release: this.#release,
      tag: this.#tag,
    };
  }

  public get string(): string {
    const { major, minor, patch, release, tag } = this;

    const semantics = [major, minor, patch].join('.');
    let revision: string | undefined;

    if (tag) {
      revision = [tag, release || 0].join('.');
    }

    return revision ? [semantics, revision].join('-') : semantics;
  }

  public get tag(): string | undefined {
    return this.#tag;
  }

  public increment(options: IncrementOptions): this {
    const { major, minor, patch, release } = options;

    if (major) {
      this.#major += major;
      this.#minor = 0;
      this.#patch = 0;
      this.#release = 0;
    }

    if (minor) {
      this.#minor += minor;
      this.#patch = 0;
      this.#release = 0;
    }

    if (patch) {
      this.#patch += patch;
      this.#release = 0;
    }

    if (release) {
      this.#release = this.#release ? this.#release + release : release;
    }

    return this;
  }

  public static get CONSTANTS(): any {
    return CONSTANTS;
  }

  public static fromString(version: string): Version {
    const semantics = version.substring(0, version.indexOf('-'));
    const revision = version.substring(version.indexOf('-') + 1);
    const [major, minor, patch] = semantics.split('.').map((value) => parseInt(value, 10));
    const [tag, release] = revision?.split('.') || [];

    return new this({ major, minor, patch, release: parseInt(release, 10), tag });
  }
}

export default Version;
