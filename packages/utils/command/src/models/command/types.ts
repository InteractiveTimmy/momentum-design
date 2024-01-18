import Argument from '../argument';
import Parameter from '../parameter';

import type { ArgumentSerial } from '../argument';
import type { ParameterSerial } from '../parameter';

export interface Options {
  args?: Array<Argument>;
  description: string;
  name: string;
  params?: Array<Parameter>;
}

export interface Serial {
  args: Array<ArgumentSerial>;
  description: string;
  name: string;
  params: Array<ParameterSerial>;
}
