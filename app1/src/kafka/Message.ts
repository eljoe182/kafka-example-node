type IHeaders = { [key: string]: string | Buffer }

export interface Message {
  key?: Buffer | string | null | undefined;
  value: Buffer | null;
  timestamp?: number;
  offset: number;
  headers?: IHeaders[];
  size: number;
  topic: string;
  partition: number;
}
