interface IHeaders {
  [key: string]: Buffer | string | (Buffer | string)[] | undefined;
}

export interface Message {
  key: Buffer | null;
  value: Buffer | null;
  timestamp: string;
  attributes: number;
  offset: string;
  headers?: IHeaders;
  size?: number;
}
