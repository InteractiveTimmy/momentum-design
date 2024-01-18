export interface Options {
  description: string;
  fallback?: string | boolean | Array<string>;
  name: string;
  required?: boolean;
  short?: string;
  type: string;
}

export interface Serial {
  description: string;
  fallback?: string | boolean | Array<string>;
  name: string;
  required: boolean;
  short?: string;
  type: string;
}
