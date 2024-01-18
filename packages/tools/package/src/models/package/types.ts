import { VersionSerial } from '../version';

export interface Serial {
  location: string,
  name: string,
  tag: string,
  versions?: Record<string, VersionSerial>,
}
