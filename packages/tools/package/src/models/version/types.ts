export interface Serial {
  major: number;
  minor: number;
  patch: number;
  release?: number;
  tag?: string;
}

export interface IncrementOptions extends Partial<Omit<Serial, 'tag'>> {}
